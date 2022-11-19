export default function Autor(props) {

    async function del(){
        const prom = await fetch(`http://localhost:5000/autori/${props.id}`, {method: "DELETE"});
        if (prom.status === 406){
            alert("Problem pri brisanju iz baze");
        }

        const list = await fetch("http://localhost:5000/autori");
        props.setList(await list.json());
    }

    return (
        <div className="row">
            <p>{props.num}</p>
            <p>{props.name}</p>
            <p>{props.surname}</p>
            <p>{props.middleName}</p>
            <p>{props.birthDate.split("-").reverse().join(".")}.</p>
            <p>{props.adress}</p>
            <img src="./can.jpg" alt="kanta" onClick={del}/>
        </div>);
}