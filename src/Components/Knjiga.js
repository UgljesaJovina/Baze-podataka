export default function Knjiga(props) {
    let names = [];

    for (let i = 0; i < props.anames.split(", ").length; i++){
        names.push(props.anames.split(", ")[i] + " " + props.asurnames.split(", ")[i]);
    }

    async function del(){
        const prom = await fetch(`http://localhost:5000/knjige/${props.id}`, {method: "DELETE"});
        if (prom.status === 406){
            alert("Problem pri brisanju iz baze");
        }

        const list = await fetch("http://localhost:5000/knjige");
        props.setList(await list.json());
    }

    return (
        <>
            <div className="row">
                <p>{props.num}</p>
                <p>{props.name}</p>
                <p>{props.price}</p>
                <p>{names.join(", ")}</p>
                <p>{props.seller}</p>
                <p>{props.year.split("-").reverse().join(".")}.</p>
                <img src="./can.jpg" alt="kanta" onClick={del}/>
            </div>
        </>
    );
}