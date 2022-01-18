import React, { useState } from "react";
import Answer from "./Answer";
import { useNavigate } from "react-router-dom";

function Add() {
  let home = useNavigate();

  const [questionText, setQuestionText] = useState("");

  const [questionAnswers, setQuestionAnswers] = useState(["", ""]);

  const [correctAnswer, setCorrectAnswer] = useState(-1);

  //Save question

  //Add answer
  const addAnswer = () => {
    setQuestionAnswers([...questionAnswers, ""]);
  };

  // Delete answer
  const deleteAnswer = (id) => {
    setQuestionAnswers(questionAnswers.filter((answer, index) => index !== id));
  };

  //handle Change
  const onQuestionTextChange = (questionText) => {
    setQuestionText(questionText);
  };

  const onAnswerChange = (answer, index) => {
    const temp = questionAnswers.slice(0);
    temp[index] = answer;
    setQuestionAnswers(temp);
  };

  const onCorrectAnswerChange = (e) => {
    setCorrectAnswer(parseInt(e.target.value));
  };

  //save question
  const onSubmit = (e) => {
    e.preventDefault();
    const question = {
      text: questionText,
      answers: questionAnswers,
      correctAnswer: correctAnswer,
    };

    fetch("http://localhost:3001/questions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(question),
    }).then((res) => {
      if (res.status == 201) {
        home("/");
      }
    });
  };

  return (
    <main>
      <div className="container" onSubmit={onSubmit}>
        <h1>New question</h1>
        <form id="frm-create">
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              name="text"
              value={questionText}
              placeholder="enter your question"
              onChange={(e) => onQuestionTextChange(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Answers: </label>
            {questionAnswers.map((answer, index) => (
              <Answer
                answer={answer}
                index={index}
                onDelete={deleteAnswer}
                onAnswerChange={onAnswerChange}
                correctAnswer={parseInt(correctAnswer)}
                onCorrectAnswerChange={onCorrectAnswerChange}
              />
            ))}

            <div className="text-right">
              <button
                type="button"
                className="btn btn-blue"
                onClick={addAnswer}
              >
                <i className="fas fa-plus"></i> Add
              </button>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-blue btn-large">
              <i className="fas fa-save"></i> Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Add;
