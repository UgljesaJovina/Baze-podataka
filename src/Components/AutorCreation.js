export default function KnjigaCreation(props){

    let ime, prezime, srednjeIme, godiste, biografija, adresa, biografijaContent;

    function CreateAuthor() {
        if (ime.value === "" || prezime.value === "" || godiste.value === ""){
            alert("Neke vrednosti nisu unete kako treba!!");
            return;
        }


        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ime: ime.value,
                prezime: prezime.value,
                srednjeIme: srednjeIme.value,
                biografija: biografijaContent,
                datumRodjenja: godiste.value,
                adresa: adresa.value
            })
        };

        fetch("http://localhost:5000/autori", options)
        .then (res => {
            if (res.status === 406){
                alert("Problem pri upisivanju");
            }else {
                ime.value = "";
                prezime.value = "";
                srednjeIme.value = "";
                godiste.value = "";
                biografija.value = "";
                adresa.value = "";
                props.getData();
            }
            return res.json();
        }).then(data => {
            console.log(data);
        });
    }

    return (
        <div className="modal">
            <p style={{fontSize: "xx-large", marginTop: "0", borderBottomStyle: "solid", 
                borderBottomWidth: "1px", borderBottomColor: "black", paddingBottom: "1%", textAlign: "center"}}>Dodajte autora</p>
            <div style={{display: 'inline'}}>
                <label htmlFor="imeAutora">Ime Autora*:</label>
                <input type={"text"} name="imeAutora" id="imeAutora" ref={el => (ime = el)}/>
            </div>
            <div style={{display: "inline"}}>
                <label htmlFor="prezimeAutora">Prezime Autora*:</label>
                <input type={"text"} name="prezimeAutora" id="prezimeAutora" ref={el => (prezime = el)}/>
            </div>
            <div>
                <label htmlFor="srednjeImeAutora">Srednje Ime Autora:</label>
                <input type={"text"} name="srednjeImeAutora" id="srednjeImeAutora" ref={el => (srednjeIme = el)}/>
            </div>
            <div>
                <label htmlFor="datumRodjenjaAutora">Datum Rodjenja*:</label>
                <input type={"date"} name="datumRodjenjaAutora" id="datumRodjenjaAutora" ref={el => (godiste = el)}/>
            </div>
            <div>
                <label htmlFor="biografija">Biografija:</label>
                <input type={"file"} name="biografija" id="biografija" ref={el => (biografija = el)} accept={".txt"}
                    onChange={() => {
                        if (!biografija.files[0]){
                            return;
                        }
                        var reader = new FileReader();
                        reader.readAsText(biografija.files[0], "UTF-8");
                        reader.onload = e => (biografijaContent = e.target.result);
                    }}/>
            </div>
            <div>
                <label htmlFor="adresa">Adresa autora:</label>
                <input type={"text"} name="adresa" id="adresa" ref={el => (adresa = el)}/>
            </div>
            <button onClick={CreateAuthor}>Dodaj autora</button>
        </div>
    );
}

/*
<textarea name="biografija" id="biografija" style={{resize: "none", fontSize: "large"}} 
                    ref={el => (biografija = el)} rows="3" cols="60" >
                </textarea>*/