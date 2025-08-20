import bcrypt from "bcrypt";

/**
 * Hash a plain password
 * @param password 
 * @returns hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare plain password with hashed password
 * @param plainPassword 
 * @param hashedPassword 
 * @returns true if match, false if not
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
