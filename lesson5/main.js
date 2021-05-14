const res = confirm("Тест завезли, хочешь пройти?)");
const asr = +prompt("Сколько вам лет?", "18?");

const body = document.body;

if (res) {
const option1 = document.querySelector('.option1'), /* Вариант ответа 1 */
      option2 = document.querySelector('.option2'), /* Вариант ответа 2 */
      option3 = document.querySelector('.option3'), /* Вариант ответа 3 */
      option4 = document.querySelector('.option4'), /* Вариант ответа 4 */
      question = document.getElementById('question'), /* Вопрос */
      numberOfQuestion = document.getElementById('number-of-question'), /* Номер текущего вопроса */
      numberOfAllQuestions = document.getElementById('number-of-all-questions'), /* Количество всех вопросов */
      answersTracker = document.getElementById('answers-tracker'), /* трекер вопросов */
      btnNext = document.getElementById('btn-next'), /* Кнопка "Далее" */
      btnNextMain = document.querySelector('.button'),
      textQuizOver = document.getElementById('quiz-over-modal-text'),
      correctAnswer = document.getElementById('correct-answer'), /* Количество правильных ответов */
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), /* Количество всех вопросов, но в модальном окне */
      btnTryAgain = document.getElementById('btn-try-again'), /* Кнопка "Попробывать снова" */
      questions = [ /* Вопросы и варианты ответов */
        {
          question: 'Простой вопрос: как будете делать резервные копии документов, с которыми вы сейчас работаете? Проект краткосрочный, плюс-минус два месяца',
          options: [
            'Буду делать резервную копию папки проекта на рабочем столе',
            'Куплю под проект сетевое хранилище с двойным резервированием и буду всё на него сгружать каждый день',
            'Достаточно держать файлы в папке, которая автоматически синхронизируется с облаком',
            'Резервные копии для слабаков. Меня хранят вышки 5G'
            ],
          rightAnswer: 2
          },
        {
          question: 'Вы работаете над проектом в программе, которая склонна «ломать» сложные файлы при сохранении. Ваш файл становится всё более сложным. Что будете делать?',
          options: [
            'Вместо «Сохранить» — «Сохранить как». Каждое сохранение — новый файл',
            'Распечатывать исходники каждый день',
            'Буду переписывать файл на флешку раз в день',
            'Перепешу! Не гордый!'
            ],
          rightAnswer: 0
        },
        {
          question: 'Вы решили уйти из «Вконтакте», но там ваш фотоархив за университетские годы. Как его аккуратно оттуда выгрузить?',
          options: [
            'Ручками всё сохраню',
            'Открою каждую и сделаю фото монитора',
            'В Яндекс-диске есть такая тема, импорт фотографий из «Вконтакте»',
            'С помощью веб-краулера скачать весь «Вконтакте» и выбрать там мои фотки'
            ],
          rightAnswer: 2
        }
      ];

let optionElements = document.querySelectorAll('.option');/* Все варианты ответа (массив) */

let indexOfQuestion, /* Индекс вопроса */
    indexOfPage = 0, /* Индекс текущей страницы */
    score = 0; /* Итоговый счёт */

numberOfAllQuestions.innerHTML = questions.length; /* Выводим количество вопросов */

const Random = () => {
  let rand = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;
  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (comptitedAnswers.length > 0) {
      comptitedAnswers.forEach(item => {
          if (item == rand) {
            hitDuplicate = true;
          }
      });
      if(hitDuplicate) {
        Random();
      } else {
        indexOfQuestion = rand;
        load();
      }
    }
    if (comptitedAnswers.length == 0) {
      indexOfQuestion = rand;
      load();
    }
  }
  comptitedAnswers.push(indexOfQuestion);
};

let comptitedAnswers = [];

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

const checkAnswer = el => {
  if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add('correct');
    score++;
    updateAnswerTracker('correct');
  } else {
    el.target.classList.add('wrong');
    updateAnswerTracker('wrong');
  }
  btnNextMain.classList.add('active');
  disabledOptions();
};

for(option of optionElements) {
  option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
  console.log('1');
  optionElements.forEach(item => {
      item.classList.add('disabled');
      console.log('2');
      if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
        console.log('3');
        item.classList.add('correct');
      }
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = status => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if(!optionElements[0].classList.contains('disabled')) {
    alert('Вам нужно выбрать один из вариантов ответа!');
  } else {
    btnNextMain.classList.remove('active');
    Random();
    enableOptions();
  }
};

btnNext.addEventListener('click', () => {
  validate();
});

const enableOptions = () => {
  optionElements.forEach(item => {
    item.classList.remove('disabled', 'correct', 'wrong', 'correct');
  });

};

const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
  if (score == 0) {
    textQuizOver.innerHTML = 'Неплохой результат!';
  }
  if (score == 1) {
    textQuizOver.innerHTML = 'Хороший результат!';
  }
  if (score == 2) {
    textQuizOver.innerHTML = 'Отличный результат!';
  }
  if (score == 3) {
    textQuizOver.innerHTML = 'Молодец!';
  }
  console.log('The End Game...');
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
  Random();
  answerTracker();
});
} else {
  body.classList.add('disabled');
}