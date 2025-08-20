import { Router } from "express";
import {
  createPoll,
  getAllPolls,
  getPollById,
  votePoll,
  deletePoll,
  deletePollOption,

} from "../controllers/poll.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validatePoll } from "../validate/validateAll";


const router = Router();

router.post("/poll", authMiddleware,createPoll);

router.get("/polls", authMiddleware, getAllPolls);

// router.get("/polls/department" , authMiddleware ,getOwnDepartmentPolls)

router.get("/poll/:id", authMiddleware, getPollById);

router.post("/polls/:pollId/vote/:optionIndex", authMiddleware, votePoll);

router.delete("/poll/:id", authMiddleware, deletePoll);

// router.delete("/poll/:pollId/option/:index/delete", authMiddleware, deletePollOption);

export default router;
