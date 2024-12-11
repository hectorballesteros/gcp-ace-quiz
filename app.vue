<template>
  <div class="dark min-h-screen bg-gray-800 text-gray-200">
    <div class="container mx-auto py-8">

      <!-- Título -->
      <h1 class="text-3xl font-bold text-center mb-8">Test de Preguntas GCP ACE</h1>

      <!-- Selección del tamaño del test -->
      <div v-if="!testStarted" class="text-center">
        <h2 class="text-xl font-semibold mb-4">Selecciona el tamaño del test</h2>
        <div class="flex justify-center space-x-4">
          <button
            @click="startTest(5)"
            class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
          >
            5 Preguntas
          </button>
          <button
            @click="startTest(10)"
            class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
          >
            10 Preguntas
          </button>
          <button
            @click="startTest(20)"
            class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
          >
            20 Preguntas
          </button>
          <button
            @click="startTest(50)"
            class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
          >
            50 Preguntas
          </button>
        </div>
      </div>

      <!-- Preguntas -->
      <div v-if="testStarted">
        <div
          v-for="(question, index) in questions"
          :key="index"
          :class="{
            'border border-green-500 bg-green-100 dark:bg-green-800': showResults && question.isCorrect,
            'border border-red-500 bg-red-100 dark:bg-red-800': showResults && !question.isCorrect,
          }"
          class="p-6 mb-6 rounded-lg shadow-md bg-white dark:bg-gray-900"
        >
          <h3 class="text-xl font-medium mb-4">{{ question.pregunta }}</h3>

          <!-- Opciones como botones -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              v-for="(text, key) in question.opciones"
              :key="key"
              @click="setAnswer(index, key)"
              :disabled="showResults"
              :class="{
                'bg-green-500 text-white': showResults && key === question.respuesta_correcta,
                'bg-red-500 text-white': showResults && userAnswers[index] === key && key !== question.respuesta_correcta,
                'bg-gray-600 text-white hover:bg-blue-700': !showResults && userAnswers[index] !== key,
                'bg-gray-500': showResults && userAnswers[index] !== key && key !== question.respuesta_correcta,
              }"
              class="px-4 py-2 rounded-lg font-semibold shadow-lg transition-all"
            >
              {{ key }}: {{ text }}
            </button>
          </div>
        </div>
      </div>

      <!-- Botón para enviar -->
      <div v-if="testStarted && !showResults" class="text-center mt-6">
        <button
          @click="submitTest"
          class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700"
        >
          Terminar Test
        </button>
      </div>

      <!-- Resultados -->
      <div v-if="showResults" class="text-center mt-6">
        <h2 class="text-2xl font-semibold mb-4">Resultados</h2>
        <p class="text-lg mb-4">Porcentaje de acierto: <span class="font-bold">{{ score }}%</span></p>
        <p class="text-lg mb-4">Preguntas correctas: <span class="font-bold">{{ correctCount }}</span> de {{ questions.length }}</p>
        <button
          @click="resetTest"
          class="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700"
        >
          Reiniciar Test
        </button>
      </div>
    </div>
  </div>
</template>





<script setup>
  import { ref, computed } from 'vue';
  import useQuestions from '~/composables/useQuestions';

  const { questions, fetchQuestions } = useQuestions();
  const userAnswers = ref([]);
  const showResults = ref(false);
  const testStarted = ref(false);

  const startTest = async (size) => {
    await fetchQuestions();
    // Seleccionar el número deseado de preguntas aleatorias
    const shuffledQuestions = [...questions.value].sort(() => 0.5 - Math.random());
    questions.value = shuffledQuestions.slice(0, size);

    userAnswers.value = Array(questions.value.length).fill(null);
    testStarted.value = true;
  };

  const setAnswer = (index, answer) => {
    userAnswers.value[index] = answer;
  };

  const submitTest = () => {
    questions.value.forEach((question, index) => {
      question.isCorrect = question.respuesta_correcta === userAnswers.value[index];
    });
    showResults.value = true;
  };

  const resetTest = () => {
    testStarted.value = false;
    showResults.value = false;
    userAnswers.value = [];
  };

  const correctCount = computed(() => {
    return questions.value.filter((q) => q.isCorrect).length;
  });

  const score = computed(() => {
    return ((correctCount.value / questions.value.length) * 100).toFixed(2);
  });
</script>




