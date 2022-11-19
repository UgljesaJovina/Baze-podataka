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

    function CreateBook(){
        //make form apear and set values
        //add create items
    }
    
    return (
    <div style={{display: "flex", flexDirection: "column", paddingTop: "3%"}}>
        <div className="createItem" id="createBook">
            
        </div>
        <button onClick={CreateBook} className="create-button">Dodaj Knjigu</button>
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
                return <Knjiga key={el.idKnjige} id={el.idKnjige} num={i+1} name={el.nazivKnjige} price={el.cena} anames={el.imenaAutora} 
                asurnames={el.prezimenaAutora} seller={el.nazivIzdavaca} setList={setKnjige} year={el.godinaIzdavanja.split("T")[0]}/>
            })}
        </div>
    </div>);
}