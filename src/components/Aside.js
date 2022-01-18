import { Link } from "react-router-dom"

const Aside = () => {
    return (
        <aside>
            <h3>WPR</h3>
            <header>
                <h2>HTML Quiz</h2>
            </header>
            
            <ul>
                <li><Link className="active" to="/"><i className="far fa-question-circle"></i> All questions</Link></li>
                <li><Link to="/add"><i className="far fa-plus"></i> New question</Link></li>
            </ul>
        </aside>
    )
}

export default Aside
