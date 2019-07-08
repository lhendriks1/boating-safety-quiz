
let questionNumber = 0;
let score = 0 ;

//---------listen for click to start quiz, then hide 'js-start-quiz' section on click & unhide 'js-quiz-form'-------------
function startQuiz() {
  $('#js-q-number').text(questionNumber);
  $('#js-score').text(score);
  $('.js-start-button').click(function(){
    $('.js-start-quiz').remove();
    $('.js-quiz-section').css('display','block');
    $('#js-q-number').text(questionNumber+1);
  });
}

//---------Render html for final results----------
function renderResults() {
   function resultMsg() {
    if (score < 5) {return 'Yikes - You better stick to the beaches for now...'}
      else if (score <8) {return 'Second mate status - not too shabby!'}
        else {return 'Way to go, Captain! You know your stuff!'};}
  $('.stats').hide();
  $('.js-quiz-section').html(`
    <div class="feedback">
    <h1>Final Score:</h1>
    <h1>${score}/10 Correct</h1>
    <h2>${resultMsg()}</h2>
    <button type="button" class="js-restart-button restart-button">Retake Quiz</button>
    </div>`
  );
  }
//--------listen for click on restart quiz button-------
function restartQuiz() {
  $('.js-quiz-section').on('click', '.js-restart-button', function(){
    questionNumber = 0;
    score = 0;
    $('.stats').show();
    takeQuiz();
    $('#js-q-number').text(questionNumber+1);
  });
}

//---------generate html for quiz questions-----------
function generateQuestion(){
  console.log('generateQuestion called');
  if (questionNumber < STORE.length) {
    return `<form id="js-quiz-form">
          <legend class="question">${STORE[questionNumber].question}</legend>
            <fieldset class="radio-group">
              <label class="option row1">
                <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required><span>${STORE[questionNumber].answers[0]}</span>
              </label>
              <label class="option row2">
                <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required><span>${STORE[questionNumber].answers[1]}</span>
              </label>
              <label class="option row3">
                <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required><span>${STORE[questionNumber].answers[2]}</span>
              </label>
              <label class="option row4">
                <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required><span>${STORE[questionNumber].answers[3]}</span>
              </label>
              <button type="submit" class="submit-button">Submit</button>
            </fieldset>
            </form>`;
  }
    else {
      renderResults();
      restartQuiz();
    }
  }

//Render to DOM html for quiz questions--------
  function renderQuestion() {
    $('.js-quiz-section').html(generateQuestion());
  }

  //--------handle user answer & go to next question------

  function answeredCorrectly() {
    score ++;
    $('#js-score').text(score);
    $('.js-quiz-section').html(`
      <div class="feedback">
        <img src="./photos-icons/firework-celebration.svg" alt="fireworks-celebration-icon">
        <h2>Correct!</h2>
        <p>${STORE[questionNumber].correctAnswerMsg}</p>
        <button type="button" class="next-button js-next-button">Next</button>
      </div>`
    );
  }

  function answeredIncorrectly() {
    $('.js-quiz-section').html(`
      <div class="feedback">
      <img src="./photos-icons/incorrect-icon.svg" alt="incorrect \'x\' icon">
      <h2>Nope, that wasn't it</h2>
      <p>The correct answer is: "${STORE[questionNumber].correctAnswer}"</p>
      <p>${STORE[questionNumber].correctAnswerMsg}</p>
      <button type="button" class="next-button js-next-button">Next</button>
      </div>`
    );
  }

  function goToNextQuestion(){
    $('.js-quiz-section').on('click', '.js-next-button', function(){
      incrementQuestion();
      renderQuestion();
      $('#js-q-number').text(questionNumber+1)
      handleUserAnswers();
      checkedLabelColor();
    });
  }

  function handleUserAnswers(){
    $('form').submit(function(event) {
    console.log('handleUserAnswers called');
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      answeredCorrectly();
    } else {
      selected.parent().addClass('wrong');
      answeredIncorrectly();
    }
  });
}

  function incrementQuestion() {
      questionNumber ++;
    }

  function updateScore() {
    console.log('updateScore called');

  }


//------Call all the functions to take the quiz
function takeQuiz(){
  startQuiz();
  renderQuestion();
  handleUserAnswers();
  goToNextQuestion();
}

$(takeQuiz);





//jQuery for stylesheet

function checkedLabelColor (){
 $('form').on('change', 'input', function() {
    $("label").removeClass("highlight");
   if ($(this).is(":checked")) $(this).closest("label").addClass("highlight");
 });
}

$(checkedLabelColor);
