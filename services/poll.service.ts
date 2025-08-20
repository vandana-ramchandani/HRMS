import { error } from 'console';
import Poll from '../models/poll.model';
import { Types } from 'mongoose';

interface CreatePollInput {
  title: string;
  options: { text: string }[];
  expiresAt: Date;
  departments: Types.ObjectId[];
  isAnonymous?: boolean;
  createdBy: string;
}

export const createPoll = async (data: CreatePollInput) => {
 
  const poll = new Poll(data);
  return await poll.save();
};

// on the basis of departmentID

// export const getAllPolls = async (departmentId?: string) => {
//   const query = departmentId ? { departments: departmentId } : {};
//   return Poll.find(query).populate('departments createdBy', 'name').select("-__v");
// };


export const getPollById = async (pollId: string) => {
  return Poll.findById(pollId).populate('departments createdBy', 'name').sort({createdAt : -1}).select("-__v");
};


export const votePoll = async (pollId: string, optionIndex: number, userId: string) => {
  const poll = await Poll.findById(pollId);
  if (!poll) throw new Error('Poll not found');
  if (poll.expiresAt < new Date()) throw new Error('Poll has expired');
  if (optionIndex < 0 || optionIndex >= poll.options.length) {
    throw new Error('Invalid option index');
  }

  const prevVoteIndex = poll.votedUsers.get(userId);

  if (prevVoteIndex !== undefined) {
    poll.options[prevVoteIndex].votes -= 1;
  }


  poll.options[optionIndex].votes += 1;
  poll.votedUsers.set(userId, optionIndex);

  return await poll.save();
};


export const deletePoll = async (pollId: string, uid:string,oId:string) => {
  const poll = await Poll.findById(pollId).select("-__v");
  if (!poll) throw new Error('Poll not found');
  if (poll.createdBy.toString() !== uid.toString() || uid !== oId) {

    throw new Error('Not authorized');
  }
  await poll.deleteOne();
};

export const deletePollOption = async (pollId: any, optionIndex: number) => {
  const poll = await Poll.findById(pollId);
  if (!poll) throw new Error('Poll not found');
  if (optionIndex < 0 || optionIndex >= poll.options.length) {
    throw new Error('Invalid option index');
  }

  poll.options.splice(optionIndex, 1);
  return await poll.save();
};

