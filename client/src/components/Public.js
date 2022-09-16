import { Link } from "react-router-dom"

const Public = () => {

    const content = (
        <div className="ms-3">
            <header>
                <h1>Welcome to React Redux Gigs</h1>
            </header>
            <main>
                <p>A web application made with Redux Toolkits and queries</p>
                <p>&nbsp;</p>
                <address>
                    Created by<br />
                    Stefano Dolci <br />
 
                </address>
            </main>
            <footer>
                <Link to="/login">Try it!</Link>
            </footer>
        </div>

    )
    return content
}
export default Public