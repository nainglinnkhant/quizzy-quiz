<template>
     <button class="suggestion-item" 
          @click="selectAnswer(suggestion)"
          :class="{
               wrong: isAnswerWrong,
               correct: isAnswerCorrect,
               selected: selectedAnswer === suggestion,
          }">
          {{ suggestion }}
     </button>
</template>

<script>
import { computed } from 'vue';

export default {
     props: ['suggestion', 'correctAnswer', 'selectedAnswer', 'nextButtonClicked'],
     emits: ['select-answer'],
     setup(props, context) {
          const isAnswerWrong = computed(function() {
               return props.suggestion === props.selectedAnswer && props.suggestion !== props.correctAnswer  && props.nextButtonClicked;
          });

          const isAnswerCorrect = computed(function() {
               return props.suggestion === props.correctAnswer && props.nextButtonClicked;
          });

          function selectAnswer(suggestion) {
               context.emit('select-answer', suggestion);
          }

          return {
               selectAnswer,
               isAnswerWrong,
               isAnswerCorrect
          };
     }
}
</script>

<style scoped>
.suggestion-item {
     display: block;
     font-size: 14px;
     width: 100%;
     padding: 10px 0;
     margin: 15px 0;
     color: #61dbfb;
     border: 2px solid #61dbfb;
     border-radius: 10px;
     cursor: pointer;
     transition: 0.5s;
}
.suggestion-item:hover {
     border-color: #1f232a;
     background: #61dbfb;
     color: #1f232a;
}
.suggestion-item:focus {
     outline: none;
}
.wrong {
     color: #ffffff !important;
     background: #e3242b !important;
     border-color: #e3242b !important;
}
.correct, .selected {
     color: #1f232a;
     background: #61dbfb;
     border-color: #61dbfb;
}
</style>