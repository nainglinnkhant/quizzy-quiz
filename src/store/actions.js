export default {
     async fetchQuiz(context, payload) {
          const selectedCategory = payload.selectedCategory;
          const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`);
          const responseData = await response.json();

          if(!response.ok) {
               const error = new Error(responseData.message);
               throw error;
          }

          const quizzes = [];

          for(let i = 0; i < responseData.results.length; i++) {
               const incorrectAnswers = responseData.results[i].incorrect_answers;
               const correctAnswer = responseData.results[i].correct_answer;
               const suggestionCount = responseData.results[i].type === 'multiple'? 3 : 1;

               const answers = [...incorrectAnswers, correctAnswer];

               const suggestions = [];
               
               for (let index = 0; index < answers.length; index++) {
                    const randomNumber = Math.round(Math.random() * suggestionCount);
                    if(!suggestions[randomNumber]) {
                         const answer = document.createElement("textarea");
                         answer.innerHTML = answers[index];
                         suggestions[randomNumber] = answer.value;
                    }
                    else {
                         --index;
                    }
               }

               const question = document.createElement("textarea");
               question.innerHTML = responseData.results[i].question;

               const rightAnswer = document.createElement("textarea");
               rightAnswer.innerHTML = responseData.results[i].correct_answer;

               const quiz = {
                    question: question.value,
                    difficulty: responseData.results[i].difficulty,
                    correctAnswer: rightAnswer.value,
                    suggestions: suggestions
               }
               quizzes.push(quiz);
          }

          context.commit('fetchQuiz', quizzes);
     }
};