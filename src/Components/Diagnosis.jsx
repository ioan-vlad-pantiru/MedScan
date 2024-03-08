import Card from "./Card"
import "./Diagnosis.css"

function Diagnosis({name, percentage, isMain}){
    return(
        <Card className={" diag-card "}>
            <div className = {isMain ? "diagnosis-main" : "diagnosis-secondary"}>
                <h3 className="diagnosis-name"><span className="c-secondary">Diagnosis:</span> {name}</h3>
                <p className="diagnosis-percentage">Prediction confidence: <span className="c-secondary">{percentage}%</span></p>
            </div>
        </Card>
    )
}

export default Diagnosis