import { ERROR_MESSAGES } from "../constants/errorMessage"
import RealtionModel from "../models/relation.model"

export const addRelationService = async (userId:String,data:any) => {
    try {
        const relationData= {userId,...data}
        console.log(relationData,"<===========")
        // return 0
        const relationDetails= await RealtionModel.create(relationData)
        return relationDetails
    } catch (error) {
        throw new Error(ERROR_MESSAGES.CREATE_RELATION_ERROR)
    }
   
}