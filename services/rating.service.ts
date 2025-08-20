import { ERROR_MESSAGES } from "../constants/errorMessage";
import RatingModel from "../models/rating.model";

export const createRatingService = async (
  userId: string,
  rating: number,
  platform: string
) => {
  try {
    const existingRating = await RatingModel.findOne({ userId, platform });
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return existingRating;
    }
    const newRating = await RatingModel.create({ userId, rating, platform });
    return newRating;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ERROR_CREATING_CATEGORY);
  }
};

export const getRatingService = async () => {
  try {
    const randomG2Rating = Math.floor(Math.random() * 5) + 1;
    const randomCapterraRating = Math.floor(Math.random() * 5) + 1;

    const g2RatingSentence = `${randomG2Rating} rating on G2`;
    const capterraRatingSentence = `${randomCapterraRating} rating on Capterra`;
    const ratings = {
      g2: g2RatingSentence,
      capterra: capterraRatingSentence,
    };
    return ratings;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.FAILED_TO_GET_RATING);
  }
};
