import { Fragment } from "react"
import { Link } from "react-router-dom"; 
export default function Linksofcomp() {
    return (
        <Fragment>
            <Link to="/" style={{ textDecoration: "none" }}>Home</Link>
            <Link to="/about" style={{ textDecoration: "none" }}>About</Link>
            <Link to="/links" style={{ textDecoration: "none" }}>Links</Link>
            <Link to="/contact" style={{ textDecoration: "none" }}>Contact</Link>
        </Fragment>
    )
}