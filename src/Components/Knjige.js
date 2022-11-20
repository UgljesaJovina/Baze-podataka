import { useEffect, useState } from "react"
import Knjiga from "./Knjiga";
import KnjigaCreation from "./KnjigaCreation";


export default function Knjige() {
    
    const [knjige, setKnjige] = useState([]);
    let modal;

    async function getData() {
        let prom = await fetch("http://localhost:5000/knjige");
        let data = await prom.json();
        for (let i = 0; i < data.length; i++) {
            data[i].godinaIzdavanja = new Date(data[i].godinaIzdavanja)
                .toLocaleDateString("sr", { year: "numeric", month: "2-digit", day: "2-digit" });
        }
        setKnjige(data);
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
                <p>Naziv Knjige</p>
                <p>Cena</p>
                <p>Autori</p>
                <p>Izdavac</p>
                <p>Godina Izdavanja</p>
            </div>
            
            {knjige.map((el, i) => {
                return <Knjiga key={el.idKnjige} id={el.idKnjige} num={i+1} name={el.nazivKnjige} price={el.cena} anames={el.imenaAutora} 
                asurnames={el.prezimenaAutora} seller={el.nazivIzdavaca} setList={setKnjige} year={el.godinaIzdavanja}/>
            })}

        </div>
        
    </div>);
}