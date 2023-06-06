import { Logger, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({ origin: [process.env?.CORS_ORIGIN || "*"] });
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, "1"],
    type: VersioningType.HEADER,
    header: "Accept-Version",
  });

  await app.listen(process.env.PORT || 3000);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
