export type GetUserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  entryDate: string;
  experience: number;
  role: string;
  avatarId: null;
  createdAt: string;
  updatedAt: string;
  skills: Skill[];
  avatar: null;
  taskLists: TaskList[];
  missions: Mission[];
  UserPreference: UserPreference[];
  School: School[];
  UserAchievement: UserAchievement[];
};

export type School = {
  id: string;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type UserPreference = {
  id: string;
  userId: string;
  achievement?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
};
export type UserAchievement = {
  id: string;
  userId: string;
  achievement?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
};

export type Mission = {
  id: string;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  rating: number;
  averageDailyRate: number;
  feedback: string;
  societyId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type Skill = {
  userId: string;
  skillId: string;
  level: number;
  createdAt: string;
  updatedAt: string;
  skill: SkillSkill;
};

export type SkillSkill = {
  name: string;
};

export type TaskList = {
  id: string;
  taskListId: string;
  userId: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
};

export type Status = "accepted";
