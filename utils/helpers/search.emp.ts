import User from "../../models/user.model";

export const searchEmp = async (req: any, res: any) => {
  try {
    const { name } = req.params;
    const employees = await User.find({
      role: "employee",
      name: { $regex: name, $options: "i" },
    }).select("_id name");

    res.status(200).json({
      status: true,
      data: employees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Error searching employees",
    });
  }
};
