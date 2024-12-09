import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  pregunta: String,
  opciones: Object,
  respuesta_correcta: String,
});

const Question = mongoose.models.Question || mongoose.model('preguntas', QuestionSchema);
export default Question;
