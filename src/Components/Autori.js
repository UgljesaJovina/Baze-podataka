import { useEffect, useState } from "react"
import Autor from "./Autor";
import "./Table.css"

export default function Autori() {
    const [autori, setAutori] = useState([]);

    useEffect(() => {
        async function getData() {
            let prom = await fetch("http://localhost:5000/autori");
            setAutori(await prom.json());
        }
        getData();
    }, []);
    
    autori.forEach((el) => {
        console.log(el);
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
            <p>Ime</p>
            <p>Prezime</p>
            <p>Srednje ime</p>
            <p>Datum Rodjenja</p>
            <p>Adresa</p>
        </div>
        
        {autori.map((el, i) => {
            return <Autor key={el.id} num={i+1} name={el.ime} surname={el.prezime} middleName={el.srednjeIme} 
                birthDate={el.datumRodjenja.split("T")[0]} adress={el.adresa}/>
        })}
    </div>)
}