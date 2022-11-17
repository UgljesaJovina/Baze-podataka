export default function Autor(props) {
    return (
        <div className="row">
            <p>{props.num}</p>
            <p>{props.name}</p>
            <p>{props.surname}</p>
            <p>{props.middleName}</p>
            <p>{props.birthDate.split("-").reverse().join(".")}.</p>
            <p>{props.adress}</p>
        </div>);
}