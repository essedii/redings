import { useNavigate } from "react-router-dom"

const Public = () => {
    const navigate = useNavigate();

    const content = (
        <div className="ms-3 mt-5">
            <header>
                <h1>Welcome to REDINGS</h1>
            </header>
            <main>
                <h3>Just a regular POSTS APP but with Redux Toolkit and RTK Query</h3>
            </main>
            <button className="btn btn-outline-primary me-2 mt-5" onClick={ () => navigate('/register')}>Try it!</button>
            
        </div>

    )
    return content
}
export default Public