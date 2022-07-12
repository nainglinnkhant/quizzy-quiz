<template>
     <finish-quiz-dialog v-if="isQuizFinished" :marks="marks" @play-again="playAgain"></finish-quiz-dialog>

     <div class="quiz-container container">
          <h2>Quiz App</h2>

          <select name="category" id="category" v-model="selectedCategory">
               <option value="" selected disabled hidden>Choose a category</option>
               <option-list v-for="category in categories" :key="category.id" :category="category"></option-list>
          </select>

          <div v-if="isLoading" class="spinner-container">
               <spinner />
          </div>

          <div class="quiz-box" v-if="isQuizStarted">
               <div class="container">
                    <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                         <div class="question-box">
                              <p>{{ question }}</p>
                         </div>

                         <suggestion-list 
                              v-for="suggestion in suggestions" 
                              :key="suggestion"
                              :suggestion="suggestion"
                              @select-answer="selectAnswer"
                              :correctAnswer="correctAnswer"
                              :selectedAnswer="selectedAnswer"
                              :nextButtonClicked="nextButtonClicked">
                         </suggestion-list>

                         <button v-if="!isLastQuestion" @click="goNextQuestion">Next</button>

                         <button v-else @click="finishQuiz">Finish</button>

                         <div class="quiz-stats">
                              <p class="float-left">Questions {{ questionNumber + 1 }}/10</p>
                              <p class="float-right">Correct: {{ marks }}</p>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import OptionList from './OptionList.vue';
import SuggestionList from './SuggestionList.vue';
import FinishQuizDialog from './FinishQuizDialog.vue';
import Spinner from './Spinner.vue';

export default {
     components: {
          OptionList,
          SuggestionList,
          FinishQuizDialog,
          Spinner,
     },
     setup() {
          const selectedCategory = ref('');
          const questionNumber = ref(0);
          const isLastQuestion = ref(false);
          const isQuizStarted = ref(false);
          const marks = ref(0);
          const selectedAnswer = ref(null);
          const nextButtonClicked = ref(false);
          const isQuizFinished = ref(false);
          const isLoading = ref(false);

          const store = useStore();

          const categories = computed(function() {
               return store.getters.categories;
          });

          const question = computed(function() {
               return store.getters.quizzes[questionNumber.value].question;
          });

          const suggestions = computed(function() {
               return store.getters.quizzes[questionNumber.value].suggestions;
          });

          const correctAnswer = computed(function() {
               return store.getters.quizzes[questionNumber.value].correctAnswer;
          });

          watch(selectedCategory, async function(_, oldValue) {
               if(selectedCategory.value !== '' && oldValue !== selectedCategory.value) {
                    restartQuiz();

                    isLoading.value = true;
                    await store.dispatch('fetchQuiz', {
                         selectedCategory: selectedCategory.value  
                    });
                    isLoading.value = false;

                    isQuizStarted.value = true;
               }
          });

          function goNextQuestion() {
               nextButtonClicked.value = true;
               if(correctAnswer.value === selectedAnswer.value) {
                    marks.value++;
               }
               setTimeout(() => {
                    questionNumber.value++;

                    if(questionNumber.value === 9) {
                         isLastQuestion.value = true;
                    }

                    nextButtonClicked.value = false;
               }, 1000);
          }

          function finishQuiz() {
               nextButtonClicked.value = true;
               if(correctAnswer.value === selectedAnswer.value) {
                    marks.value++;
               }
               setTimeout(() => {
                    nextButtonClicked.value = false;
                    isQuizFinished.value = true;
               }, 1000);
          }

          function selectAnswer(selectedValue) {
               selectedAnswer.value = selectedValue;
          }

          function playAgain() {
               selectedCategory.value = '';
               restartQuiz();
          }

          function restartQuiz() {
               marks.value = 0;
               questionNumber.value = 0;
               isQuizStarted.value = false;
               isQuizFinished.value = false;
               isLastQuestion.value = false;
          }

          return {
               categories,
               selectedCategory,
               isQuizStarted,
               question,
               suggestions,
               questionNumber,
               goNextQuestion,
               isLastQuestion,
               selectAnswer,
               correctAnswer,
               selectedAnswer,
               nextButtonClicked,
               marks,
               finishQuiz,
               isQuizFinished,
               playAgain,
               isLoading,
          };
     }
}
</script>

<style scoped>
.quiz-container {
     margin-top: 50px;
     color: #61dbfb;
     text-align: center;
}
h2 {
     margin-bottom: 40px;
     font-size: 25px;
}
label {
     display: block;
     font-size: 18px;
     padding-bottom: 10px;
     background: #1f232a;
}
select {
     padding: 7px 12px;
     margin-bottom: 10px;
     border-radius: 5px;
}
select:focus {
     outline: none;
     color: #1f232a;
}
.spinner-container {
     display: flex;
     justify-content: center;
     margin-top: 80px;
}
.quiz-box {
     padding: 20px 0;
}
.question-box {
     padding: 5px 0;
}
button {
     color: #61dbfb;
     border: 2px solid #61dbfb;
     border-radius: 10px;
     background: transparent;
     padding: 8px 30px;
     font-size: 13px;
     margin: 10px 0;
     cursor: pointer;
}
button:focus {
     outline: none;
}
.quiz-stats {
     padding-top: 20px;
}
</style>