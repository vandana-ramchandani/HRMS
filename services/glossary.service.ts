import Glossary from "../models/glossary.model";
import { AppError } from "../utils/helpers/ global.error.handler";
import { ERROR_MESSAGES } from "../constants/errorMessage";

export const createGlossaryService = async (
  term: string,
  definition: string
) => {
  if (!term || !definition) {
    throw new AppError(ERROR_MESSAGES.MISSING_FIELDS, 400);
  }
  const existingGlossary = await Glossary.findOne({
    term: { $regex: `^${term}$`, $options: "i" },
  });
  if (existingGlossary) {
    throw new AppError(ERROR_MESSAGES.DATA_ALREADY_EXISTS, 400);
  }
  const newGlossary = new Glossary({
    term,
    definition,
    category: term.charAt(0).toUpperCase(),
  });
  await newGlossary.save();
  return newGlossary;
};

export const getGlossaryService = async () => {
  const glossaryData = await Glossary.find().sort({ category: 1, term: 1 });
  const groupedGlossary = glossaryData.reduce((acc: any, glossary) => {
    const category = glossary.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(glossary);
    return acc;
  }, {});
  return groupedGlossary;
};

export const updateGlossaryData = async (
  id: any,
  term: any,
  definition: any
) => {
  const updatedGlossary = await Glossary.findByIdAndUpdate(
    id,
    { $set: { term, definition } },
    { new: true }
  );
  if (!updatedGlossary) {
    throw new AppError(ERROR_MESSAGES.DATA_NOT_FOUND, 404);
  }
  return updatedGlossary;
};
export const deleteGlossaryData = async (id: any) => {
  return await Glossary.findByIdAndDelete(id);
};
