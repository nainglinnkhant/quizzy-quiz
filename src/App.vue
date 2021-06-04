<template>
     <quiz-app></quiz-app>
</template>

<script>
import QuizApp from './components/QuizApp.vue';

export default {
     components: {
          QuizApp
     }
}
</script>

<style>
* {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
body {
     background: #1f232a;
}
</style>
