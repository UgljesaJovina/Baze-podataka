import { Outlet, Link } from "react-router-dom"
import "./Header.css"

export default function Header(){
    return (
    <>
        <div className="NavBar">
            <Link to={"/"} className="link">Knjige</Link>
            <Link to={"/autori"} className="link">Autori</Link>
            <Link to={"/izdavaci"} className="link">Izdavaci</Link>
            <p style={{marginLeft: "15%", fontSize: "3rem", marginTop: "0", marginBottom: "5px"}}>BIBLIOTEKA</p>
            <p style={{marginLeft: "auto", marginRight: "3%", fontSize: "x-large", marginTop: "0", marginBottom: "3px"}}>Ugljesa Starcevic</p>
        </div>
        <Outlet />
    </>
    );
}