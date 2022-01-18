import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Answer from "./Answer";
import { useNavigate } from "react-router-dom";

function Edit() {
  let home = useNavigate();
  let params = useParams();

  let id = params.id;
  const [questionText, setQuestionText] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/questions/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setQuestionText(res.question[0].text);
        return res;
      })
      .then((res) => {
        setQuestionAnswers(res.question[0].answers);
        return res;
      })
      .then((res) => setCorrectAnswer(res.question[0].correctAnswer));
  }, [id]);

  //Add answer
  const addAnswer = () => {
    setQuestionAnswers([...questionAnswers, "New"]);
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
    const temp = [...questionAnswers];
    temp[index] = answer;
    setQuestionAnswers(temp);
  };

  const onCorrectAnswerChange = (e) => {
    setCorrectAnswer(parseInt(e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const question = {
      text: questionText,
      answers: questionAnswers,
      correctAnswer: correctAnswer,
    };
    fetch(`http://localhost:3001/questions/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(question),
    }).then((res) => {
      if (res.status == 200) {
        home("/");
      }
    });
  };

  return (
    <>
      <main>
        {/* {console.log(question)} */}
        <div className="container">
          <h1>Edit question</h1>
          <form id="frm-create" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="text">Text</label>
              <input
                type="text"
                name="text"
                value={questionText}
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
    </>
  );
}

export default Edit;
