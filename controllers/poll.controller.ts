import * as pollService from "../services/poll.service";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import pollModel from "../models/poll.model";
import { io } from "../server";
import { getPaginationParams } from "../utils/helpers/pagination";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";



export const createPoll = async (req: AuthenticatedRequest, res: any) => {
  try {

    const { title, options, expiresAt, departments, isAnonymous } = req.body;
    const userId = req.user.userId;
    //    const departmentId = await getDepartmentIdByUserId(userId);
    if (!title || !options || options.length < 2 || !expiresAt) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid poll data" });
    }
    // const createdBy = isAnonymous ? "Anonymous" : userId;
    const poll = await pollService.createPoll({
      title,
      options,
      expiresAt,
      departments,
      isAnonymous,
      createdBy: userId,
    });

    res
      .status(201)
      .json({ status: true, message: SUCCESS_MESSAGES.POLL_CREATED });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: ERROR_MESSAGES.POLL_NOT_CREATED });
  }
};

// all poll based on dept id

// export const getAllPolls = async (req: Request, res: Response) => {
//   try {
//     const { departmentId } = req.query;
//     const polls = await pollService.getAllPolls(departmentId as string);
//     res.status(201).json({status:true,message:SUCCESS_MESSAGES.POLL_FETCHED ,data:polls});
//   } catch (error) {
//     res.status(500).json({ status:false,message:ERROR_MESSAGES.POLLS_NOT_FOUND });
//   }
// };

export const getAllPolls = async (req: AuthenticatedRequest, res: any) => {
  try {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const { skip, limit: pageSize } = await getPaginationParams(page, limit);
    const totalPolls = await pollModel.countDocuments();

    const polls = await pollModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .select("-__v")
      .sort({createdAt :-1})
      .lean();
    const data = polls.map((poll: { isAnonymous: any }) => {
      if (poll.isAnonymous) {
        return {
          ...poll,
          createdBy: "Anonymous",
        };
      }
      return poll;
    });

    res
      .status(201)
      .json({
        status: true,
        message: SUCCESS_MESSAGES.POLL_FETCHED,
        data: { data, totalPolls },
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: ERROR_MESSAGES.POLLS_NOT_FOUND });
  }
};

export const getPollById = async (req: AuthenticatedRequest, res: any) => {
  try {
    const poll = await pollService.getPollById(req.params.id);
    if (!poll) {
      return res
        .status(404)
        .json({ status: false, message: ERROR_MESSAGES.POLL_NOT_FOUND });
    }
    res
      .status(201)
      .json({
        status: true,
        message: SUCCESS_MESSAGES.POLL_CREATED,
        data: poll,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: ERROR_MESSAGES.POLLS_NOT_FOUND });
  }
};

export const votePoll = async (req: AuthenticatedRequest, res: any) => {
  try {
    const { pollId, optionIndex } = req.params;
    const userId = req.user.userId;
    const index = parseInt(optionIndex);
    if (isNaN(index)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid option index" });
    }
    const updatedPoll = await pollService.votePoll(pollId, index, userId);
    io.emit("voteUpdate", {
      pollId,
      updatedPoll,
    });
    res.json({
      status: true,
      message: SUCCESS_MESSAGES.POLL_VOTE_SUBMITTED,
      data: updatedPoll,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.POLL_NOT_VOTED,
    });
  }
};

export const deletePoll = async (req: AuthenticatedRequest, res: any) => {
  try {
    const uId = req.user.userId;
    const oId =
      req.user.role === "organisation" ? req.user.userId : req.user.userId;
    await pollService.deletePoll(req.params.id, uId, oId);
    res.json({ status: true, message: SUCCESS_MESSAGES.POLL_DELETED });
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .json({ status: false, message: ERROR_MESSAGES.POLL_NOT_DELETED });
  }
};

export const deletePollOption = async (req: AuthenticatedRequest, res: any) => {
  try {
    const { pollId, index} = req.params;

    const ind = parseInt(index);
    if (isNaN(ind)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid option index" });
    }
    const poll = await pollService.deletePollOption(pollId, ind);
    res.json({ message: SUCCESS_MESSAGES.POLL_OPTION_REMOVED, poll });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: ERROR_MESSAGES.POLL_NOT_REMOVED });
  }
};

// export const getOwnDepartmentPolls = async (req: any, res: any) => {
//   try {

//     const user = await User.findById(req.user.userId).select("departmentId");
//     console.log(user)
//     if (!user || !user.departmentId) {
//       return res.status(404).json({
//         status: false,
//         message: ERROR_MESSAGES.DEPARTMENT_NOT_FOUND,
//       });
//     }
//     const polls = await pollService.getAllPolls(user.departmentId.toString());
//     return res.status(200).json({
//       status: true,
//       message: SUCCESS_MESSAGES.POLL_FETCHED,
//       data: polls,
//     });
//   } catch (error) {
//     console.error("Error in getOwnDepartmentPolls:", error);
//     res.status(500).json({
//       status: false,
//       message: ERROR_MESSAGES.POLLS_NOT_FOUND,
//     });
//   }
// };
