import { useEffect, useState } from "react";

export default function IzdavacCreation(props){

    let ime, pib, maticniBroj, adresa, telefon, mail, sajt;

    //maticni broj je 8-ocifreni broj
    //pib ima 10 cifara

    function CreateIzdavaca() {
        if (ime.value === "" || pib.value.length !== 9 || maticniBroj.value.length !== 13 || telefon.value === "" 
            || mail.value === ""){
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
                pib: pib.value,
                maticniBroj: maticniBroj.value,
                adresa: adresa.value,
                telefon: telefon.value,
                mail: mail.value,
                sajt: sajt.value
            })
        };

        fetch("http://localhost:5000/izdavaci", options)
        .then (res => {
            if (res.status === 406){
                alert("Problem pri upisivanju");
            }else {
                ime.value = "";
                pib.value = "";
                maticniBroj.value = "";
                adresa.value = "";
                telefon.value = "";
                mail.value = "";
                sajt.value = "";
                props.getData();
            }
        });
    }

    return (
        <div className="modal">
            <p style={{fontSize: "xx-large", marginTop: "0", borderBottomStyle: "solid", 
                borderBottomWidth: "1px", borderBottomColor: "black", paddingBottom: "1%", textAlign: "center"}}>Dodajte Izdavaca</p>
            <div>
                <label htmlFor="imeIzdavaca">Ime Izdavaca*:</label>
                <input type={"text"} name="imeIzdavaca" id="imeIzdavaca" ref={el => (ime = el)}/>
            </div>
            <div>
                <label htmlFor="pibIzdavaca">PIB Izdavaca*:</label>
                <input type={"number"} name="pibIzdavaca" id="pibIzdavaca" ref={el => (pib = el)}/>
            </div>
            <div>
                <label htmlFor="maticniBroj">Maticni broj*:</label>
                <input type={"number"} name="maticniBroj" id="maticniBroj" ref={el => (maticniBroj = el)}/>
            </div>
            <div>
                <label htmlFor="adresaIzdavaca">Adresa:</label>
                <input type={"text"} name="adresaIzdavaca" id="adresaIzdavaca" ref={el => (adresa = el)}/>
            </div>
            <div>
                <label htmlFor="telefonIzdavaca">Telefon*:</label>
                <input type={"number"} name="telefonIzdavaca" id="telefonIzdavaca" ref={el => (telefon = el)}/>
            </div>
            <div>
                <label htmlFor="mailIzdavaca">Mail*:</label>
                <input type={"email"} name="mailIzdavaca" id="mailIzdavaca" ref={el => (mail = el)}/>
            </div>
            <div>
                <label htmlFor="sajtIzdavaca">Sajt:</label>
                <input type={"text"} name="sajtIzdavaca" id="sajtIzdavaca" ref={el => (sajt = el)}/>
            </div>
            <button onClick={CreateIzdavaca}>Dodaj izdavaca</button>
        </div>
    );
}