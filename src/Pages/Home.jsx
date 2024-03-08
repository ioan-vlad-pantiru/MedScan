import { useEffect, useState } from "react"
import "./Home.css"
import Card from "../Components/Card"
import PatientLine from "../Components/PatientLine"
import patients from "../Data/patients"
import axios from "axios"
import Button from "../Components/Button"
import InputField from "../Components/InputField"
import Diagnosis from "../Components/Diagnosis"

var dialogue = ""
const WEIGHTS = [20000, 4000, 800, 160, 80]
const causesWeights = {}

function Home() {
  const [step, setStep] = useState(0)
  const [contor, setContor] = useState(0)
  const [question, setQuestion] = useState("What symptoms do you have? ")
  const [answer, setAnswer] = useState("")
  const [patientId, setPatientId] = useState()
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState("")
  const [smoker, setSmoker] = useState("")
  const [physical_activity, setPhysical_activity] = useState("")
  const [chronic_conditions, setChronic_Conditions] = useState("")
  const [allergy, setAllergy] = useState("")
  const [diseases, setDiseases] = useState([])

  function setData() {
    if (patientId != null) {
      setHeight(patients[patientId].height)
      setWeight(patients[patientId].weight)
      setAge(patients[patientId].age)
      setSmoker(patients[patientId].smoker)
      setPhysical_activity(patients[patientId].physical_activity)
      setChronic_Conditions(patients[patientId].chronic_condition)
      setAllergy(patients[patientId].allergy)
    }
  }

  useEffect(() => {
    setData()
  }, [])

  function computeProbabilities(top_req) {
    let sumOfWeights = 0

    for (const [_, weight] of Object.entries(causesWeights)) {
      sumOfWeights += Number(weight)
    }

    console.log(sumOfWeights)

    const sortedCausesWeights = Object.entries(causesWeights).sort((a, b) => b[1] - a[1]).slice(0, top_req);

    const probabilites = []

    for (const [cause, weight] of sortedCausesWeights) {
      const percentage = (weight / sumOfWeights * 100).toFixed(2);
      probabilites.push([cause.charAt(0).toUpperCase() + cause.slice(1), percentage])
      // probabilites.push(`You have a ${percentage}% chance of suffering from ${cause.charAt(0).toUpperCase() + cause.slice(1)}.`);
    }

    setDiseases(probabilites)
    setStep(3)
  }

  function add_condition(person_description, person_object, condition) {
    if (person_object[condition] == 'None')
      return person_description

    person_description += 'I am suffering from a ' + person_object[condition]

    if (condition == 'allergy')
      person_description += ' allergy '

    person_description += '. '

    return person_description
  }

  function add_person_data(person_object) {
    let person_description = 'I am a ' + String(person_object['age']) + ' years old ' + String(person_object['gender']).toLowerCase() + '. '
    person_description += 'I am ' + String(person_object['height']) + 'cm tall and I weigh ' + String(person_object['weight']) + 'kg. '
    person_description += 'My blood type is ' + person_object['blood_type'] + '. '

    if (person_object['smoker'] == true)
      person_description += 'I am smoking. '
    else
      person_description += 'I am not smoking. '

    person_description += 'I am a physically ' + String(person_object['physical_activity']) + ' person. '

    person_description = add_condition(person_description, person_object, 'chronic_conditions')
    person_description = add_condition(person_description, person_object, 'allergy')

    dialogue = person_description
  }

  function addWeights(healthData) {
    healthData.potentialCauses.forEach((cause, place) => {
      cause = cause.toLowerCase();

      if (place < 5) {
        if (cause in causesWeights) {
          causesWeights[cause] += WEIGHTS[place];
        } else {
          causesWeights[cause] = WEIGHTS[place];
        }
      }
    })
  }

  async function makeApiCall() {
    if (dialogue == '') {
      add_person_data(patients[patientId])
    }

    if (question != 'What symptoms do you have? ')
      dialogue += question + ' ' + answer.charAt(0).toUpperCase() + answer.slice(1) + ' '
    else
      dialogue += 'I am experiencing symptoms like: ' + answer + '. '

    const options = {
      method: 'POST',
      url: 'https://symptom-checker4.p.rapidapi.com/analyze',
      params: {
        symptoms: dialogue
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'd16122fcedmsh3c213cc6fa8a8c8p101b2ajsn585cdeff1fa8',
        'X-RapidAPI-Host': 'symptom-checker4.p.rapidapi.com'
      },
      data: {
        symptoms: dialogue
      }
    };

    try {
      console.log(dialogue)
      const response = await axios.request(options)
      const healthData = response.data
      setContor(contor + 1)

      console.log(healthData)
      console.log(dialogue)

      if (!('followupQuestions' in healthData) || healthData.followupQuestions.length < 2) {
        healthData.followupQuestions = ["Do you have other symptoms? ", "Do you have other symptoms? "]
      }

      addWeights(healthData)

      setQuestion(healthData.followupQuestions[1] + ' ')
      setAnswer("")

      if (contor == 4) {
        const probs = computeProbabilities(5);
        console.log(probs)
      }
    } catch (error) {
      console.error("Error analyzing symptoms:", error)
    }
  }

  return (
    <div className="main-content">
      <Card>
        {
          step == 0 ?
            <div className="step-0">
              <h2 className="c-black size-xl" style={{ paddingBottom: "1rem" }}>Patients <span className="c-secondary">database</span></h2>
              <div className="table">
                {Object.keys(patients[0]).map((property, key) => {
                  return <h3 className="bg-background header_table" key={key} style={{ border: "1px solid var(--black)", padding: "5px" }}>{property}</h3>
                })}
                {
                  patients?.map((patient, key) => {
                    return (
                      <PatientLine patient={patient} key={key} onClick={()=>(setPatientId(patient.id), setStep(1))}></PatientLine>
                    )
                  })}
              </div>
            </div>
            : step == 1 ?
              <div>
                <h2 style={{ paddingBottom: "12px" }}>Patient: <span className="c-secondary">{patients[patientId].name}</span></h2>
                <InputField value={height} setValue={(e) => setHeight(e)} label={"Height: "}></InputField>
                <InputField value={weight} setValue={(e) => setWeight(e)} label={"Weight: "} ></InputField>
                <InputField value={age} setValue={(e) => setAge(e)} label={"Age: "} ></InputField>
                <InputField value={smoker} setValue={(e) => setSmoker(e)} label={"Smoker: "} ></InputField>
                <InputField value={physical_activity} setValue={(e) => setPhysical_activity(e)} label={"Physical Activity: "} ></InputField>
                <InputField value={chronic_conditions} setValue={(e) => setChronic_Conditions(e)} label={"Chronic Conditions: "} ></InputField>
                <InputField value={allergy} setValue={(e) => setAllergy(e)} label={"Allergy: "} ></InputField>
              </div>
              : step == 2 ?
                <div>
                  <div className="row">
                    <InputField label={question} setValue={(e) => (setAnswer(e))}></InputField>
                    <Button className={"ask-button button-variant"} onClick={() => makeApiCall()}>ask</Button>
                  </div>
                </div>
                : <div className="step3">
                   {
                   diseases?.map((tuple, key) => {
                    return (
                      <Diagnosis name={tuple[0]} percentage={tuple[1]}></Diagnosis>
                    )
                  })}
                </div>
        }
        {!patientId || step == 3? 
        
        <></>:
        <div className="page-nav">
          <Button className="button-primary" onClick={() => (step == 0 ? 0 : setStep(step - 1))}>Prev</Button>
          <Button className="button-primary" onClick={() => (step == 3 ? 3 : setStep(step + 1))}>Next</Button>
        </div>}
        
      </Card>
    </div>
  )
}

export default Home
