export default function Izdavac(props) {

    async function del(){
        const knjige = (await (await fetch("http://localhost:5000/knjige")).json())
            .filter(el => el.nazivIzdavaca === props.name).map(el => el.nazivKnjige);

        console.log(knjige);

        if (window.confirm(`Da li ste sigurni da zelite da obrisete izdavaca ${props.name}
\nOvo ce da utice na knjige '${knjige.join("', '")}'`)){

            const prom = await fetch(`http://localhost:5000/izdavaci/${props.id}`, {method: "DELETE"});
            if (prom.status === 406){
                alert("Problem pri brisanju iz baze");
                return;
            }
    
            const list = await fetch("http://localhost:5000/izdavaci");
            props.setList(await list.json());
        }
    }

    return (
        <div className="row">
            <p>{props.num}</p>
            <p>{props.name}</p>
            <p>{props.pib}</p>
            <p>{props.phone}</p>
            <p>{props.mail}</p>
            <p>{props.site}</p>
            <img src="./can.jpg" alt="kanta" onClick={del}/>
        </div>);
}