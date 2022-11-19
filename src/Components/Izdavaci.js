import { useEffect, useState } from "react";
import Izdavac from "./Izdavac";
import "./Table.css";

export default function Izdavaci() {
    const [izdavaci, setIzdavaci] = useState([]);

    useEffect(() => {
        async function getData() {
            let prom = await fetch("http://localhost:5000/izdavaci");
            setIzdavaci(await prom.json());
        }
        getData();
    }, []);

    izdavaci.forEach((el) => {
        Object.keys(el).forEach((key) => {
            if (el[key] === null) {
                el[key] = <span style={{color: "red"}}>Nema</span>
            }
        })
    })
    
    return (
    <div className="table">
        <div className="row">
            <p>br</p>
            <p>Naziv Izdavaca</p>
            <p>PIB</p>
            <p>Telefon</p>
            <p>Mail</p>
            <p>Web-Sajt</p>
        </div>
        
        {izdavaci.map((el, i) => {
            return <Izdavac key={el.id} id={el.id}num={i+1} name={el.naziv} pib={el.pib} phone={el.telefon} 
                mail={el.mail}  site={el.sajt} setList={setIzdavaci}/>
        })}
    </div>)
}