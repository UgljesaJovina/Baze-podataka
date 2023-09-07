export default function Knjiga(props) {

    async function del(){
        if (window.confirm(`Da li ste sigurni da zelite da obrisete knjigu '${props.name}'`)){
            const prom = await fetch(`http://localhost:5000/knjige/${props.id}`, {method: "DELETE"});
            if (prom.status === 406){
                alert("Problem pri brisanju iz baze");
                return;
            }
    
            const list = await fetch("http://localhost:5000/knjige");
            props.setList(await list.json());
        }
    }

    return (
        <>
            <div className="row">
                <p>{props.num}</p>
                <p>{props.name}</p>
                <p>{props.price}</p>
                <p>{props.aname}</p>
                <p>{props.seller}</p>
                <p>{props.year}</p>
                <img src="./can.jpg" alt="kanta" onClick={del}/>
            </div>
        </>
    );
}