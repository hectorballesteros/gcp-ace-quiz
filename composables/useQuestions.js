import { ref } from 'vue';

export default function useQuestions() {
  const questions = ref([]);
  const fetchQuestions = async () => {
    const response = await $fetch('/api/questions');
    questions.value = response;
  };

  return {
    questions,
    fetchQuestions,
  };
}
