import { ERROR_MESSAGES } from "../constants/errorMessage";
import LandingCardModel from "../models/landingcard.model";

export const addLandingCardService = async (
  title: String,
  description: String,
  image: String,
  amount: Number
) => {
  try {
    const newCard = await LandingCardModel.create({
      title,
      description,
      image,
      amount,
    });
    await newCard.save();
    return newCard;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
  }
};

export const getLandingCardService = async () => {
  try {
    const landingCard = await LandingCardModel.find();
    if (!landingCard) {
      throw new Error(ERROR_MESSAGES.LANDING_CARD_NOT_FOUND);
    }
    return landingCard;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
  }
};

export const landingCardServie = async () => {
  const cardsData = [
    {
      id: 1,
      title: "Automation",
      description: "Payroll",
      amount: 234,
      images: [
        "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703136/posts/ssayeg5gas4cb8d8pbzd.png",
        "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703041/posts/qjv9mgnqzbhej80vdoqe.png",
      ],
    },
    {
      id: 2,
      title: "Analytics",
      images: [
        "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703041/posts/tvfny18e2q6iywjen9oc.png",
        "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703041/posts/rgsm7rqu9hxg9zsh81dw.png",
      ],
    },
    {
      id: 3,
      title: "Recognition",
      images: [
        "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703136/posts/q86jiogusp9nt5ur1gso.png",
      ],
    },
    {
      id: 4,
      title: "Feedback",
      images: [
        "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703041/posts/cgndtklhqudlukcqbr1m.png",
      ],
    },
    {
      id: 5,
      title: "Objectives",
      amount: "$20M",
      images: [
        "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703136/posts/hlrcz9u6pigoqzry9ehc.png",
      ],
    },
    {
      id: 6,
      title: "expenses",
      amount: "234",
      images: [
        "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703041/posts/xzxajsqatsi46eyw6t8q.png",
      ],
    },
  ];
  return cardsData;
};
