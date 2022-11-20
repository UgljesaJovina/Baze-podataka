import { useEffect, useState } from "react";

export default function KnjigaCreation(props){

    const [izdavaci, setIzdavaci] = useState([]);

    let ime, isbn, godina, cena, izdavac;

    //isbn je 13-ocifreni broj kojeg prethodi 'ISBN'

    useEffect(() => {
        async function getData() {
            let prom = await fetch("http://localhost:5000/izdavaci-imena");
            setIzdavaci(await prom.json());
        }
        getData();
    }, []);

    function CreateBook() {
        if (ime.value === "" || isbn.value.length !== 13 || godina.value === "" || cena.value === "" || izdavac.value === ""){
            alert("Neke vrednosti nisu unete kako treba!!");
            return;
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                naziv: ime.value,
                isbn: isbn.value,
                godinaIzdavanja: godina.value,
                cena: parseInt(cena.value),
                izdavac: izdavac.value
            })
        };

        fetch("http://localhost:5000/knjige", options)
        .then (res => {
            if (res.status === 406){
                alert("Problem pri upisivanju");
            }else {
                ime.value = "";
                isbn.value = "";
                godina.value = "";
                cena.value = "";
                izdavac.value = "";
                props.getData();
            }
        });
    }

    return (
        <div className="modal">
            <p style={{fontSize: "xx-large", marginTop: "0", borderBottomStyle: "solid", 
                borderBottomWidth: "1px", borderBottomColor: "black", paddingBottom: "1%", textAlign: "center"}}>Dodajte knjigu</p>
            <div>
                <label htmlFor="imeKnjige">Ime Knjige*:</label>
                <input type={"text"} name="imeKnjige" id="imeKnjige" ref={el => (ime = el)}/>
            </div>
            <div>
                <label htmlFor="isbnKnjige">ISBN Knjige*:</label>
                <input type={"number"} name="isbnKnjige" id="isbnKnjige" ref={el => (isbn = el)}/>
            </div>
            <div>
                <label htmlFor="datumIzdavanja">Godina Izdavanja*:</label>
                <input type={"date"} name="datumIzdavanja" id="datumIzdavanja" ref={el => (godina = el)}/>
            </div>
            <div>
                <label htmlFor="cenaKnjige">Cena*:</label>
                <input type={"number"} name="cenaKnjige" id="cenaKnjige" ref={el => (cena = el)}/>
            </div>
            <div>
                <label htmlFor="izdavac">Izdavac*:</label>
                <select style={{padding: "0px 2%"}} defaultValue={""} name="izdavac" id="izdavac" ref={el => (izdavac = el)}>
                    <option value={""} disabled hidden>Izaberite izdavaca</option>
                    {izdavaci.map(el => <option key={el.id} value={el.id}>{el.naziv}</option> )};
                </select>
            </div>
            <div>
                <label>Autori:</label>
            </div>
            <button onClick={CreateBook}>Dodaj knjigu</button>
        </div>
    );
}