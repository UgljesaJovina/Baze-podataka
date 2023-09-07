import { useEffect, useState } from "react";
import Izdavac from "./Izdavac";
import IzdavacCreation from "./IzdavacCreation";

export default function Izdavaci() {
    const [izdavaci, setIzdavaci] = useState([]);
    const [display, setDisplay] = useState([]);
    const [asc, setAsc] = useState(false);
    const [sortObj, setSortObj] = useState();
    let modal;

    async function getData() {
        let prom = await fetch("http://localhost:5000/izdavaci");
        let data = await prom.json();
        setDisplay(data);
        setIzdavaci(data);
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

    function Sort(el, sorter) {
        sortObj?.classList.remove("current-sort");
        sortObj?.classList.remove("asc");
        sortObj?.classList.remove("desc");
        setSortObj(el);
        el.classList.add("current-sort");

        const sorted = [...izdavaci].sort((a, b) => {
            if (typeof(a[sorter]) === "object"){
                return -1;
            }
            
            if (a[sorter].toLowerCase() > b[sorter].toLowerCase()) {
                return 1;
            } else if (a[sorter].toLowerCase() < b[sorter].toLowerCase()) {
                return -1;
            }
            return 0;
        });

        if (asc) {
            setDisplay(sorted);
            el.classList.add("asc");
            el.classList.remove("desc");
        } else {
            setDisplay([...sorted].reverse());
            el.classList.remove("asc");
            el.classList.add("desc");
        }

        setAsc(current => !current);
    }
    
    return (
        <div style={{display: "flex", flexDirection: "column", paddingTop: "3%"}}>

            <div className="create-item" ref={el => (modal = el)}>
                <div className="shade" onClick={CloseModal}></div>
                <IzdavacCreation getData={getData} />
            </div>

            <button onClick={OpenModal} className="create-button">Dodaj Izdavaca</button>

            <div className="table">
                <div className="row initial">
                    <p>br</p>
                    <p onClick={e => Sort(e.target, "naziv")}>Naziv Izdavaca</p>
                    <p onClick={e => Sort(e.target, "pib")}>PIB</p>
                    <p>Telefon</p>
                    <p>Mail</p>
                    <p>Web-Sajt</p>
                </div>
                
                {display.map((el, i) => {
                    return <Izdavac key={el.id} id={el.id} num={i+1} name={el.naziv} pib={el.pib} phone={el.telefon} 
                        mail={el.mail}  site={el.sajt} setList={setDisplay}/>
                })}
            </div>
        </div>
    );
}