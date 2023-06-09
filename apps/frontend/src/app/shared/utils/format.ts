import { UserType } from "@carbon/zod";

/**
 * A formatted time string
 * @param user The user
 * @returns The formatted time string
 */
export const getFormattedTime = (user: UserType): string => {
  const startDate = user.entryDate;

  const today = new Date();
  const start = new Date(startDate);
  const years = today.getFullYear() - start.getFullYear();
  const months = today.getMonth() - start.getMonth();
  const days = today.getDate() - start.getDate();
  if (years > 0) return years + (years === 1 ? " an" : " ans");
  if (months > 0) return months + (months === 1 ? " mois" : " mois");
  if (days > 0) return days + (days === 1 ? " jour" : " jours");
  return "0";
};

/**
 * Get the start year of a user
 * @param user The user
 * @returns The start year
 */
export const getYear = (user: UserType): string => {
  const startDate = user.entryDate;
  const start = new Date(startDate);
  return start.getFullYear().toString();
};

export const getRank = (level: number): string => {
  switch (true) {
    case level <= 10:
      return "🌱";
    case level <= 20:
      return "🌲";
    case level <= 30:
      return "🏆";
    case level <= 40:
      return "⭐️";
    case level <= 50:
      return "👑";
    default:
      return "💎";
  }
};
