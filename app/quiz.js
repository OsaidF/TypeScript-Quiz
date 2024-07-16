"use client";
import React from "react";
import { useState, useEffect } from "react";
import { TSquestion } from "./questions";
import styles from "./quiz.module.css";
import Image from "next/image";
import arrowDown from '../public/arrowDown.png' 

const Quiz = () => {
  const [correct, setCorrect] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState(TSquestion);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answeredQuestions, setAnsweredQuestion] = useState(0);
  const [showWrong, setShowWrong] = useState(false)
  const [result, setResult] = useState(0);
  //State containing current result

  function resetEverything() {
    setCorrect([]);
    setWrong([]);
    setQuestions(TSquestion);
    setActiveQuestion(0)
    setSelectedAnswer('')
    setSelectedAnswerIndex(null)
    setAnsweredQuestion(0)
    setShowResult(false)
    setResult(0)
  }

  //Runs when next is clicked
  function onNextClick() {
      setSelectedAnswerIndex(null);
      if (selectedAnswer === questions[activeQuestion].correctAnswer) {
        setResult((prev) => prev + 1);
        //Send correct question in correct array
        correct.push(questions[activeQuestion]);
      } else {
        //Send wrong question into wrong array
        wrong.push(questions[activeQuestion]);
      }

      //Set new question
      setAnsweredQuestion((prev) => prev + 1);
      let index = questions[activeQuestion].id;
      const update = questions.filter((a) => a.id !== index);
      setQuestions(update);
      let minus1 = questions.length - 2;
      let random = Math.floor(Math.random() * (minus1 - 0 + 1) + 0);
      setActiveQuestion(random);
     
  }
  
  //Runs when an option is selected
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    setSelectedAnswer(answer);
  };

  function showWrongQuestions(){
    if(showWrong === false)
      {setShowWrong(true)} 
    else 
      {setShowWrong(false)}
  }
  useEffect(() => {
    if (answeredQuestions === 30) {
        setActiveQuestion(0)
        setShowResult(true)
      }
  }, [activeQuestion, answeredQuestions, result, questions]);

  

  return (
    <div className={styles.quiz}>
      {!showResult ? (
        <>
          <div className={styles.container}>
            <h4 className={styles.score}>
              Question:{` ${answeredQuestions + 1}`} out of 30
            </h4>
            <h4 className={styles.score}>
              Score: <b className={styles.yellow}> {`${result}`}</b>
            </h4>
            <h2 className={styles.question}>{questions[activeQuestion].question}</h2>
            <ul>
              {questions[activeQuestion].options.map((answer, index) => {
                return (
                  <li
                    key={answer}
                    onClick={() => onAnswerSelected(answer, index)}
                    className={
                      selectedAnswerIndex === index ? "selected-answer" : 'options'
                    }
                  >
                    {answer}
                  </li>
                );
              })}
            </ul>
            <button
              className={styles.nextButton}
              onClick={onNextClick}
              disabled={selectedAnswerIndex === null}
            >
              {answeredQuestions === 30 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <>
        <div className={styles.result}>
            <h2>Your score: 
              <h1 className={styles.scoreNumber}>{result}</h1>

            </h2>
            <br />
            <h3>Correct answers: {correct.length}</h3>
            <br />
            <div className={styles.wrongAnswersButton}onClick={showWrongQuestions}>
              <h3 >
                Wrong answers: {wrong.length}
              </h3>
              <Image src={arrowDown} width={25} className={showWrong === true ? 'arrowUp'  : 'arrowDown'} />
            </div>
            <div className={showWrong === true ? 'showWrongDiv' : 'hideWrongDiv'}>
              {wrong.map((i) =>
              <>
                  <h5 className={styles.wrongQuestions}>{i.question}</h5>
                  <h6 className={styles.wrongAnswers}>Correct Answer: {i.correctAnswer}</h6>
              </>
              )}
            </div>
            <br />
            <button className={styles.end} onClick={resetEverything}> Take Quiz Again</button>
        </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
