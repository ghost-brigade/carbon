import {
  FileCreateSchema,
  FileCreateType,
  FileParamsType,
  FileType,
  UserType,
} from "@carbon/zod";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { UserService } from "../user/user.service";
import { RolesValues } from "@carbon/enum";
import hasRight from "../core/utils/hasRight";

@Injectable()
export class FileService {
  private S3: S3Client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {
    this.S3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.AWS_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  /**
   * Formats a filename to be used as a path in the S3 bucket
   * @param filename
   * @returns
   */
  public getFormattedFilename(filename: string): string {
    return filename
      .toLowerCase()
      .split(".")
      .shift()
      .replace(/ /g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  public getFileExtension(filename: string): string {
    return filename.split(".").pop();
  }

  public isFileExtensionSupported(filename: string): boolean {
    if (
      !filename.match(
        /\.(jpg|jpeg|png|gif|webp|pdf|docx|xlsx|xls|csv|txt|mp3|mp4|mov|avi|zip|rar|tar|gz|json|pptx|ppt|odt|odp|ods)$/
      )
    ) {
      throw new BadRequestException("File type is not supported");
    }

    return true;
  }

  public async isFileExistsInS3(
    id: string,
    filename: string
  ): Promise<boolean> {
    try {
      const file = await this.S3.send(
        new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${id}/${filename}`,
        })
      );

      return file ? true : false;
    } catch (error) {
      return false;
    }
  }

  public async getSignedUrl({
    id,
    filename,
  }: {
    id: string;
    filename: string;
  }): Promise<string> {
    try {
      return await getSignedUrl(
        this.S3,
        new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${id}/${filename}`,
        }),
        { expiresIn: 3600 }
      );
    } catch (error) {
      throw new InternalServerErrorException("Failed to get signed url");
    }
  }

  async create(file: Express.Multer.File, fileCreate: FileCreateType) {
    if (file === undefined) {
      throw new BadRequestException("Invalid file");
    }

    const parsed = FileCreateSchema.safeParse(fileCreate);

    if (parsed.success === false) {
      throw new BadRequestException("Invalid file create data");
    }

    if (
      fileCreate.type === "avatar" &&
      ["jpg", "jpeg", "png", "gif", "webp"].includes(
        this.getFileExtension(file.originalname)
      ) === false
    ) {
      throw new BadRequestException("Invalid file type");
    }

    try {
      const filename = `${this.getFormattedFilename(
        file.originalname
      )}.${this.getFileExtension(file.originalname)}`;

      const newFile = await this.prisma.file.create({
        data: {
          name: file.originalname,
          description: fileCreate.description,
          tags: fileCreate.tags,
          path: filename,
        },
      });

      await this.S3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${newFile.id}/${filename}`,
          Body: Buffer.from(file.buffer),
        })
      );

      return newFile;
    } catch (error) {
      throw new InternalServerErrorException("Error while creating file");
    }
  }

  async findAll(params: FileParamsType): Promise<FileType[]> {
    try {
      const query = {};

      if (params.tags) query["tags"] = { hasSome: params.tags };
      if (params.type) query["type"] = params.type;

      const files = await this.prisma.file.findMany({
        where: query,
      });

      return await Promise.all(
        files.map(async (file: FileType) => {
          const updatedFile: FileType = { ...file };
          updatedFile.signedUrl = await this.getSignedUrl({
            id: file.id,
            filename: file.path,
          });

          return updatedFile;
        })
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error while fetching files");
    }
  }

  async findOne(id: string): Promise<FileType> {
    if (!id) {
      throw new BadRequestException("Invalid file id");
    }

    try {
      const file = (await this.prisma.file.findUnique({
        where: {
          id,
        },
      })) as FileType;

      file.signedUrl = await this.getSignedUrl({
        id: file.id,
        filename: file.path,
      });

      return file;
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching file");
    }
  }

  async remove(id: string, user: UserType): Promise<boolean> {
    if (!id) {
      throw new BadRequestException("Invalid file id");
    }

    const file = await this.findOne(id);

    if (!file) {
      throw new BadRequestException("File not found");
    }

    if (hasRight(user, [RolesValues.COMMERCIAL, RolesValues.HR]) === false) {
      if (typeof user.avatar === "string") {
        throw new BadRequestException("User has an avatar");
      }

      if (file.type !== "avatar") {
        throw new BadRequestException("File type is not avatar");
      }

      if (file.id !== user.avatar.id) {
        throw new BadRequestException("File is not your avatar");
      }
    }

    try {
      await this.S3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${file.id}/${file.path}`,
        })
      );

      await this.prisma.user.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException("Error while deleting user");
    }
  }
}
