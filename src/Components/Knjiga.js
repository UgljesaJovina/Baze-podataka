export default function Knjiga(props) {
    let names = [];
    let str;

    if (typeof props.anames === "string"){
        for (let i = 0; i < props.anames.split(", ").length; i++){
            names.push(props.anames.split(", ")[i] + " " + props.asurnames.split(", ")[i]);
            str = names.join(", ");
        }
    }
    else {
        str = props.anames;
    }

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
                <p>{str}</p>
                <p>{props.seller}</p>
                <p>{props.year}</p>
                <img src="./can.jpg" alt="kanta" onClick={del}/>
            </div>
        </>
    );
}