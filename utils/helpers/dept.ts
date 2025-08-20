import User from "../../models/user.model";

export const getDepartmentIdByUserId = async (userId: string): Promise<string | null> => {
  try {
    const user = await User.findById(userId).select("departmentId");

    if (!user || !user.departmentId) {
      return null;
    }

    return user.departmentId.toString();
  } catch (error) {
    console.error("Error fetching departmentId for userId:", userId, error);
    return null;
  }
};
