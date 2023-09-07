import { useEffect, useState } from "react"
import Knjiga from "./Knjiga";
import KnjigaCreation from "./KnjigaCreation";


export default function Knjige() {
    
    const [knjige, setKnjige] = useState([]);
    const [display, setDisplay] = useState([]);
    const [asc, setAsc] = useState(false);
    const [sortObj, setSortObj] = useState();
    let modal;

    async function getData() {
        let prom = await fetch("http://localhost:5000/knjige");
        let data = await prom.json();
        for (let i = 0; i < data.length; i++) {
            data[i].godinaIzdavanja = new Date(data[i].godinaIzdavanja)
                .toLocaleDateString("sr", { year: "numeric", month: "2-digit", day: "2-digit" });
        }
        setKnjige(data);
        setDisplay(data);
    }

    useEffect(() => {
        getData();
    }, []);

    knjige.forEach((el) => {
        Object.keys(el).forEach((key) => {
            if (!el[key]) {
                el[key] = <span style={{color: "red"}}>Nema</span>
            }
        })
    })
    
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

        const sorted = [...knjige].sort((a, b) => {
            if (typeof(a[sorter]) === "object"){
                return -1;
            }

            if (typeof(a[sorter]) === "string"){
                if (a[sorter].toLowerCase() > b[sorter].toLowerCase()) {
                    return 1;
                } else if (a[sorter].toLowerCase() < b[sorter].toLowerCase()) {
                    return -1;
                }
            }

            if (typeof(a[sorter]) === "number"){
                if (a[sorter] > b[sorter]) {
                    return 1;
                } else if (a[sorter] < b[sorter]) {
                    return -1;
                }
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
            <KnjigaCreation getData={getData} />
        </div>

        <button onClick={OpenModal} className="create-button">Dodaj Knjigu</button>

        <div className="table">

            <div className="row initial">
                <p>br</p>
                <p onClick={e => Sort(e.target, "nazivKnjige")}>Naziv Knjige</p>
                <p onClick={e => Sort(e.target, "cena")}>Cena</p>
                <p>Autori</p>
                <p>Izdavac</p>
                <p onClick={e => Sort(e.target, "godinaIzdavanja")}>Godina Izdavanja</p>
            </div>
            
            {display.map((el, i) => {
                return <Knjiga key={el.idKnjige} id={el.idKnjige} num={i+1} name={el.nazivKnjige} price={el.cena} 
                    aname={el.imeAutora} seller={el.nazivIzdavaca} year={el.godinaIzdavanja} setList={setDisplay}/>
            })}

        </div>
        
    </div>);
}