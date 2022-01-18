import { Link } from "react-router-dom"


const HomeQuestion = ({index, question, onDelete, onEdit}) => {
    return (
        <>
            <tr key={question.id}>
                <td key={index}>{index+1}</td>
                <td key={question.text}>{question.text}</td>
                <td key={question.answers[question.correctAnswer]}>{question.answers[question.correctAnswer]}</td>
                <td key={Date.now()}>
                    <Link to= {`/questions/${question._id}`} className="btn btn-blue"><i className="far fa-edit"></i> Edit</Link>
                    
                    <button  className="btn btn-orange" onClick={() => onDelete(question._id)}><i className="far fa-trash-alt"></i> Delete</button>
                    
                </td>
            </tr>
        </>
    )
}

export default HomeQuestion
