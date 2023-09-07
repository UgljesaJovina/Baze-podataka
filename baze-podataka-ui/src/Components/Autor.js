export default function Autor(props) {

    async function del(){
        if (window.confirm(`Da li zelite da obrisete autora '${props.name} ${props.surname}'`)){
            const prom = await fetch(`http://localhost:5000/autori/${props.id}`, {method: "DELETE"});
            if (prom.status === 406){
                alert("Problem pri brisanju iz baze");
                return;
            }
    
            const list = await fetch("http://localhost:5000/autori");
            props.setList(await list.json());
        }
    }

    return (
        <div className="row">
            <p>{props.num}</p>
            <p>{props.name}</p>
            <p>{props.surname}</p>
            <p>{props.middleName}</p>
            <p>{props.birthDate}</p>
            <p>{props.adress}</p>
            <img src="./can.jpg" alt="kanta" onClick={del}/>
        </div>);
}