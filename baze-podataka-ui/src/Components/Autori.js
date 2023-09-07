import { useEffect, useState } from "react"
import Autor from "./Autor";
import AutorCreation from "./AutorCreation"

export default function Autori() {

    const [autori, setAutori] = useState([]);
    const [display, setDisplay] = useState([]);
    const [asc, setAsc] = useState(false);
    const [sortObj, setSortObj] = useState();
    let modal;

    async function getData() {
        let prom = await fetch("http://localhost:5000/autori");
        let data = await prom.json();
        for (let i = 0; i < data.length; i++) {
            data[i].datumRodjenja = new Date(data[i].datumRodjenja)
                .toLocaleDateString("sr", { year: "numeric", month: "2-digit", day: "2-digit" });
        }
        setAutori(data);
        setDisplay(data);
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

    function Sort(el, sorter) {
        sortObj?.classList.remove("current-sort");
        sortObj?.classList.remove("asc");
        sortObj?.classList.remove("desc");
        setSortObj(el);
        el.classList.add("current-sort");

        const sorted = [...autori].sort((a, b) => {
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
                <AutorCreation getData={getData} />
            </div>

            <button onClick={OpenModal} className="create-button">Dodaj Autora</button>

            <div className="table">
                <div className="row initial">
                    <p>br</p>
                    <p onClick={e => Sort(e.target, "ime")}>Ime</p>
                    <p onClick={e => Sort(e.target, "prezime")}>Prezime</p>
                    <p onClick={e => Sort(e.target, "srednjeIme")}>Srednje ime</p>
                    <p onClick={e => Sort(e.target, "datumRodjenja")}>Datum Rodjenja</p>
                    <p>Adresa</p>
                </div>
                
                {display.map((el, i) => {
                    return <Autor key={el.id} id={el.id} num={i+1} name={el.ime} surname={el.prezime} middleName={el.srednjeIme} 
                        birthDate={el.datumRodjenja} adress={el.adresa} setList={setDisplay}/>
                })}
            </div>
        </div>)
}