
function Answer({answer, index, correctAnswer, onDelete, onAnswerChange, onCorrectAnswerChange}) {
    return (
        <>
            <div className="answer" key={index}>
                <input type="text" name="answers" value={answer} onChange={(e) => onAnswerChange(e.target.value, index)} placeholder="enter your answer"/>
                <div>
                    <input 
                    className="correctAnswer" 
                    type="radio" 
                    value={index} 
                    id={index}   
                    checked={correctAnswer === index}
                    onChange={onCorrectAnswerChange}
                    /> 
                    <label htmlFor={index} >correct</label>
                </div>
                <button type="button" className="btn btn-orange" onClick={() => onDelete(index)}><i className="fas fa-times"></i> Remove</button>
            </div>
        </>
    )
}

export default Answer
