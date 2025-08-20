import { ERROR_MESSAGES } from "../constants/errorMessage";
import { Request } from "express"; 
import { addRelationService } from "../services/relation.service";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

export const addRelation = async (req: Request, res: any) => {
   try{
    const{userId}=req.user
    const realationdetails= await addRelationService(userId,req.body)
    res.status(201).json({message:SUCCESS_MESSAGES.REALTION_ADDED,data:realationdetails})
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
