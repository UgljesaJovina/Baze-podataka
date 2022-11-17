import { useEffect, useState } from "react"
import Knjiga from "./Knjiga";
import "./Table.css"

export default function Knjige() {

    const [knjige, setKnjige] = useState([]);

    useEffect(() => {
        async function getData() {
            let prom = await fetch("http://localhost:5000/knjige");
            setKnjige(await prom.json());
        }
        getData();
    }, []);
    
    return (
    <div className="table">
        <div className="row">
            <p>br</p>
            <p>Naziv Knjige</p>
            <p>Cena</p>
            <p>Autori</p>
            <p>Izdavac</p>
            <p>Godina Izdavanja</p>
        </div>
        
        {knjige.map((el, i) => {
            return <Knjiga key={el.idKnjige} num={i+1} name={el.nazivKnjige} price={el.cena} anames={el.imenaAutora} 
                asurnames={el.prezimenaAutora} seller={el.nazivIzdavaca} year={el.godinaIzdavanja.split("T")[0]}/>
        })}
    </div>)
}