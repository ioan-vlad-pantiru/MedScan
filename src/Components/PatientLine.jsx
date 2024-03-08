import "./PatientLine.css"

function PatientLine({patient, onClick}) {
  
      return (
        <>
          <p className="cell">{patient.id}</p>
          <p className="cell" onClick={()=>onClick(patient.Id)}>{patient.name}</p>
          <p className="cell">{patient.age}</p>
          <p className="cell">{patient.gender}</p>
          <p className="cell">{patient.blood_type}</p>
          <p className="cell">{patient.smoker?"Yes":"No"}</p>
          <p className="cell">{patient.height}</p>
          <p className="cell">{patient.weight}</p>
          <p className="cell">{patient.physical_activity}</p>
          <p className="cell">{patient.chronic_condition}</p>
          <p className="cell">{patient.allergy}</p>
        </>
      )
    }
    
    export default PatientLine
    