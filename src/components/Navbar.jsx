import { Link } from "react-router"

function NavBar() {
    return (
        <div className="navbar">
            <span>
                <Link to="/">
                    <p>🟢 Playlist</p>
                </Link>
            </span>
        </div>
    )
}

export default NavBar