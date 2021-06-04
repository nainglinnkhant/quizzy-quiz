<template>
     <teleport to="body">
          <div class="backdrop"></div>

          <dialog open>
               <h3>Your score is {{ marks }}!</h3>
               <button @click="playAgain">Play again</button>
          </dialog>
     </teleport>
</template>

<script>
export default {
     props: ['marks'],
     emits: ['play-again'],
     setup(_, context) {
          function playAgain() {
               context.emit('play-again');
          }

          return {
               playAgain
          };
     }
}
</script>

<style scoped>
.backdrop {
     position: fixed;
     top: 0;
     left: 0;
     height: 100vh;
     width: 100%;
     background-color: rgba(0, 0, 0, 0.75);
     z-index: 10;
}

dialog {
     position: fixed;
     top: 20vh;
     left: 10%;
     width: 80%;
     z-index: 100;
     border-radius: 12px;
     border: 3px solid #61dbfb;
     color: #61dbfb;
     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
     padding: 2rem;
     margin: 0;
     overflow: hidden;
     background-color: #1f232a;
     text-align: center;
}

h3 {
     margin: 0;
     padding-bottom: 30px;
     font-size: 20px;
}

button {
     color: #61dbfb;
     font-size: 14px;
     padding: 10px 20px;
     border: 1px solid #61dbfb;
     background: #1f232a;
     border-radius: 10px;
     cursor: pointer;
}

@media (min-width: 768px) {
     dialog {
          left: calc(50% - 20rem);
          width: 40rem;
     }
}
</style>