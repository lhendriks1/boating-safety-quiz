# Boating Safety Quiz

## Summary
The Boating Safety Quiz app prompts quiz takers through a series of quiz questions. After each question the user is provided feedback on their answer and additional information on the quesiton topic. At the end of the quiz users are presented with their final score and an option to restart the quiz. 

## Motivation
My fiancee's new found passion is boating so I had to test his safety knowledge before going boating with him.

## Tech
HTML, CSS, JS, jQuery

## Design Notes
The app was built using a mobile first approach and responsive design for 3 screen sizes (phone, tablet, and larger screens). I initially designed the app to restart the quiz by reloading the window, however after considering the subtle impacts (extra user click required on "start quiz" button, more time to reload, another database call) I decided to manipulate the DOM to flow back to question 1 rather than reload.

## Live Demo
https://lhendriks1.github.io/boating-safety-quiz/
