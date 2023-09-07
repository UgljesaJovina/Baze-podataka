import { useState } from "react";
import { Outlet, Link } from "react-router-dom"

export default function Header(){
    const [current, changeCurrent] = useState(1);
    return (
    <>
        <div className="NavBar">
            <Link to={"/"} className={`link ${current === 1 ? "activeLink" : ""}`} onClick={() => changeCurrent(1)}>Knjige</Link>
            <Link to={"/autori"} className={`link ${current === 2 ? "activeLink" : ""}`} onClick={() => changeCurrent(2)}>Autori</Link>
            <Link to={"/izdavaci"} className={`link ${current === 3 ? "activeLink" : ""}`} onClick={() => changeCurrent(3)}>Izdavaci</Link>
            <p style={{marginLeft: "15%", fontSize: "3rem", marginTop: "0", 
                marginBottom: "5px", color:"wheat"}}>BIBLIOTEKA</p>
            <p style={{marginLeft: "auto", marginRight: "3%", fontSize: "x-large", 
                marginTop: "0", marginBottom: "3px", color:"white", fontWeight:"350"}}>Ugljesa Starcevic</p>
        </div>
        <Outlet />
    </>
    );
}