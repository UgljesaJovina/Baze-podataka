export default function Knjiga(props) {
    let names = [];

    for (let i = 0; i < props.anames.split(", ").length; i++){
        names.push(props.anames.split(", ")[i] + " " + props.asurnames.split(", ")[i]);
    }

    return (
    <div className="row">
        <p>{props.num}</p>
        <p>{props.name}</p>
        <p>{props.price}</p>
        <p>{names.join(", ")}</p>
        <p>{props.seller}</p>
        <p>{props.year.split("-").reverse().join(".")}.</p>
    </div>);
}