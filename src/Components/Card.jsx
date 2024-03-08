import "./Card.css"

function Card({ children, className }) {

    return (
        <div className={className?className:"" + "card shadow"}>
            {children}
        </div>
    )
}

export default Card
