import { useState, useEffect } from "react";
import HomeQuestion from "./HomeQuestion";
import { useNavigate } from "react-router-dom";

const ShowAllQuestions = () => {
  let home = useNavigate();
  const [searchQuestions, setSearchQuestions] = useState("");
  const [listQuestions, setListQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((res) => setListQuestions(res.questions));
  }, []);

  //Delete Question
  const onDelete = (id) => {
    if (window.confirm("Are you sure ?")) {
      fetch(`http://localhost:3001/questions/${id}`, {
        method: "DELETE",
      }).then(
        setListQuestions(
          listQuestions.filter((question) => question._id !== id)
        )
      );
    }
  };

  return (
    <>
      <main>
        <div className="container">
          <h1>All questions</h1>

          <div id="search">
            <input
              type="text"
              placeholder="Search..."
              onChange={(event) => {
                setSearchQuestions(event.target.value);
              }}
            />
          </div>

          <table>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer</th>
              <th width="210">Actions</th>
            </tr>

            {listQuestions
              .filter((question) => {
                if (searchQuestions === "") {
                  return question;
                } else if (
                  question.text
                    .toLowerCase()
                    .includes(searchQuestions.toLowerCase())
                ) {
                  return question;
                }
              })
              .map((question, index) => (
                <HomeQuestion
                  key={index}
                  index={index}
                  question={question}
                  onDelete={onDelete}
                />
              ))}
          </table>
        </div>
      </main>
    </>
  );
};

export default ShowAllQuestions;
