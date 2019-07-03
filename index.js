

//---------render current question number---------------
let questionNumber = 1;
let score = 1;

function updateQuestionNumber() {
  $('#js-q-number').text(questionNumber);
}

//---------render current Score-----------
function updateScore() {
  $('#js-score').text(score);
}

//-------render stats--------
function renderStats() {
updateQuestionNumber();
updateScore();
}

$(renderStats);



//---------START QUIZ-------------------------
//---------start Quiz: remove HTML-------------
function removeStartElements() {
  $('.js-start-button').click(function(){
  $('.js-start-quiz').remove();
  $('.js-quiz-form').css('display','block');
});
}

//---------start Quiz: add new HTML-----------


//------Call functions to START QUIZ
function startQuiz(){
  removeStartElements();
}

$(startQuiz);

//jQuery for stylesheet

function checkedLabelColor (){
 $('form').on('change', 'input', function() {
    $("label").removeClass("highlight");
   if ($(this).is(":checked")) $(this).closest("label").addClass("highlight");
 });
}

$(checkedLabelColor);
