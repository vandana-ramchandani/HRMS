import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const googleAuthCallback = async (
  req: Request,
  res: Response
): Promise<any> => {
  const user = req.user as any;

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const token = jwt.sign(
    {
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      role: user.role,
      orgId: user.orgId,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // const redirectUrl = `http://localhost:8000/auth/callback?token=${token}`;
  // return res.json({
  //   token,
  //   status: true,
  //   message: "User logged in successfully!",
  //   timestamp: new Date(),
  //   data: {
  //     id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     role: user.role,
  //     googleId: user.googleId,
  //   },
  //   redirectUrl,
  // });

  const redirectUrl = `http://localhost:5173/auth/callback?token=${token}`;
  return res.redirect(redirectUrl);
};
