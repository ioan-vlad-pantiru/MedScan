import axios from './axios'

let question = "What symptoms do you have? "
let dialogue = ""
const WEIGHTS = [20000, 4000, 800, 160, 80]
const causesWeights = {}
let sumOfWeights = 0

function addWeights(healthData) {
  healthData.potentialCauses.forEach(cause => {
    cause = cause.toLowerCase();

    if (!causesWeights[cause]) {
      causesWeights[cause] = WEIGHTS[place];
    } else {
      causesWeights[cause] += WEIGHTS[place];
    }

    sumOfWeights += WEIGHTS[place];
  })}

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
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  

async function makeApiCall() {
  const answer = prompt(question); // !!!

  dialogue += question + answer + ' ';

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
    const response = await axios.request(options);
    const healthData = response.data;

    console.log(healthData)

    // if (!healthData.followupQuestions) {
    //   healthData.followupQuestions = ["Do you have other symptoms? "]
    // }

    // question = healthData.followupQuestions[0] + ' ';

    // addWeights(healthData);
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
  }
}

function computeProbabilities(top_req) {
  const sortedCausesWeights = Object.entries(causesWeights).sort((a, b) => b[1] - a[1]).slice(0, top_req);

  const probabilites = [];

  for (const [cause, weight] of sortedCausesWeights) {
    const percentage = (weight / sumOfWeights * 100).toFixed(2);
    probabilites.push(`You have a ${percentage}% chance of suffering from ${cause.charAt(0).toUpperCase() + cause.slice(1)}.`);
  }

  return probabilites
}
