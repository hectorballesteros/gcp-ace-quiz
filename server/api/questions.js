import connectToDatabase from '../lib/mongodb';
import Question from '../models/Question';

export default defineEventHandler(async () => {
  await connectToDatabase();

  // Obtén 20 preguntas aleatorias
  const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
  return questions;
});
