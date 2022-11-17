export default function Izdavac(props) {
    return (
        <div className="row">
            <p>{props.num}</p>
            <p>{props.name}</p>
            <p>{props.pib}</p>
            <p>{props.phone}</p>
            <p>{props.mail}</p>
            <p>{props.site != null ? props.site : <span style={{color: "red"}}>Nema</span>}</p>
        </div>);
}