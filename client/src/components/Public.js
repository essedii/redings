import { Link } from "react-router-dom"

const Public = () => {

    const content = (
        <section className="public">
            <header>
                <h1>Welcome to React Redux Gisg</h1>
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
        </section>

    )
    return content
}
export default Public