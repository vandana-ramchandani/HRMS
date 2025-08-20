import { Request } from "express";
export interface AuthenticatedRequest extends Request {
  user: {
    name?: string;
    userId: string;
    orgId?: string;
    role?: string;
    email?:string;
    isActive?:boolean;
  };
  userData: {
    id: string;
    email: string;
    orgData: {
      id: string;
    };
  };
}
