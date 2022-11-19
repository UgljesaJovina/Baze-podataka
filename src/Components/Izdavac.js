export default function Izdavac(props) {

    async function del(){
        const prom = await fetch(`http://localhost:5000/izdavaci/${props.id}`, {method: "DELETE"});
        if (prom.status === 406){
            alert("Problem pri brisanju iz baze");
        }

        const list = await fetch("http://localhost:5000/izdavaci");
        props.setList(await list.json());
    }

    return (
        <div className="row">
            <p>{props.num}</p>
            <p>{props.name}</p>
            <p>{props.pib}</p>
            <p>{props.phone}</p>
            <p>{props.mail}</p>
            <p>{props.site != null ? props.site : <span style={{color: "red"}}>Nema</span>}</p>
            <img src="./can.jpg" alt="kanta" onClick={del}/>
        </div>);
}