import { AVATAR_COLORS } from "../constants.js";

export const generateAvatarColor = () => {
  const index = Math.floor(Math.random() * AVATAR_COLORS.length);
  return AVATAR_COLORS[index];
};