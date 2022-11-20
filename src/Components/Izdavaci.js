import { useEffect, useState } from "react";
import Izdavac from "./Izdavac";
import IzdavacCreation from "./IzdavacCreation";

export default function Izdavaci() {
    const [izdavaci, setIzdavaci] = useState([]);
    let modal;

    async function getData() {
        let prom = await fetch("http://localhost:5000/izdavaci");
        setIzdavaci(await prom.json());
    }

    useEffect(() => {
        getData();
    }, []);

    izdavaci.forEach((el) => {
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
                <IzdavacCreation getData={getData} />
            </div>

            <button onClick={OpenModal} className="create-button">Dodaj Izdavaca</button>

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
                    return <Izdavac key={el.id} id={el.id} num={i+1} name={el.naziv} pib={el.pib} phone={el.telefon} 
                        mail={el.mail}  site={el.sajt} setList={setIzdavaci}/>
                })}
            </div>
        </div>
    );
}