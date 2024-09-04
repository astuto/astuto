import { EMAIL_REGEX } from "../constants/regex";

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};