import { useEffect, useState } from "react"
import Autor from "./Autor";
import "./Table.css"
import AutorCreation from "./AutorCreation"

export default function Autori() {

    const [autori, setAutori] = useState([]);
    let modal;

    async function getData() {
        let prom = await fetch("http://localhost:5000/autori");
        setAutori(await prom.json());
    }

    useEffect(() => {
        getData();
    }, []);
    
    autori.forEach((el) => {
        Object.keys(el).forEach((key) => {
            if (!el[key]) {
                el[key] = <span style={{color: "red"}}>Nema</span>
            }
        })
    });

    function OpenModal() {
        modal.classList.add("show");
    }

    function CloseModal() {
        modal.classList.remove("show");
    }

    return (
        <div style={{display: "flex", flexDirection: "column", paddingTop: "3%"}}>

            <div className="create-item" ref={el => (modal = el)}>
                <div className="shade" onClick={CloseModal}></div>
                <AutorCreation getData={getData} />
            </div>

            <button onClick={OpenModal} className="create-button">Dodaj Autora</button>

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
                    return <Autor key={el.id} id={el.id} num={i+1} name={el.ime} surname={el.prezime} middleName={el.srednjeIme} 
                        birthDate={el.datumRodjenja.split("T")[0]} adress={el.adresa} setList={setAutori}/>
                })}
            </div>
        </div>)
}