import React, { useState } from "react";
import './index.css'

function countVowelsAndConsonants(str) {
  let vowArray = []
  let consArray = []
  let vowelCount = 0;
  let consonantCount = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (/[a-zA-Z]/.test(char)) {
      if (/[aeiouAEIOU]/.test(char)) {
        vowelCount++;
        vowArray.push(i);
      } else {
        consonantCount++;
        consArray.push(i);
      }
    }
  }
  return [[vowelCount, vowArray.join(', ')], [consonantCount, consArray.join(', ')]];
}

function App() {
  const [numStrings, setNumStrings] = useState('');
  const [strings, setStrings] = useState([]);
  const [comparisonType, setComparisonType] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState([]);


  function handleNumStringsChange(event) {
    try {
      const num = parseInt(event.target.value);
      if (num < 2 || num > 5) {
        setNumStrings("");
        setError("Please provide a number between (2 - 5)")
        return false;
      }

      if (num >= 2 && num <= 5) {
        setNumStrings(num);
        setStrings(Array(num).fill(""));
        return true;
      } else {
        setNumStrings("");
        return false;
      }
    } catch (e) {
      setError("Please enter a number")
      setNumStrings("");
      return false;
    }
  }

  function handleStringChange(index, event) {
    const newStrings = [...strings];
    newStrings[index] = event.target.value;
    setStrings(newStrings);
  }

  function handleComparisonTypeChange(event) {
    const type = event.target.value;
    if (type === "vowels" || type === "consonants") {
      setComparisonType(type);
    } else {
      setComparisonType("");
    }
  }

  function showResult(type, errors) {
    for (let i = 0; i < strings.length; i++) {
      const str = strings[i];
      if (!/^[a-zA-Z]+$/.test(str)) {
        errors.push("Error: String " + (i + 1) + " contains non-letter characters");
        return;
      }
      const result = countVowelsAndConsonants(str);
      if (type === "vowels")
        errors.push(`String ${str}: contains ${result[0][0]} vowels and their positions ${result[0][1]}`);
      else
        errors.push(`String ${str}: contains ${result[1][0]} vowels and their positions ${result[1][1]}`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = []
    if (comparisonType === "vowels" || comparisonType === "consonants") {
      showResult(comparisonType, errors)
    } else {
      errors.push("Error: Invalid comparison type")
    }
    setResult(errors);
  }

  if (numStrings === "") {
    return (
      <div className="final">
        <div className="d-flex justify-content-center">
          <p>Please enter the number of strings to compare (2-5):</p>
        </div>
        <div className="d-flex justify-content-center">
          <input type="text" onChange={handleNumStringsChange} value={numStrings} />
        </div>
        <div className="d-flex justify-content-center">
          <div>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="final">
      <form onSubmit={handleSubmit}>
        {strings.map((str, i) => (
          <div key={i} className="d-flex d-flex-row justify-content-center">
            <p>Please enter string {i + 1}:</p>
            <div className="p-2">
              <input type="text" value={str} onChange={event => handleStringChange(i, event)} />
            </div>
          </div>
        ))}
        <div className="d-flex d-flex-row justify-content-center">
          <p>Please select comparison type:</p>
          <div className="p-2">
            <select value={comparisonType} onChange={handleComparisonTypeChange}>
              <option value="">-- Select Type --</option>
              <option value="vowels">Vowels</option>
              <option value="consonants">Consonants</option>
            </select>
          </div>
          <br />
          <br></br>
        </div>
        <div className="d-flex d-flex-row justify-content-center">
          <button type="submit">Compare</button>
        </div>
        <div className="d-flex d-flex-row justify-content-center">
          <div>{result.map(res => <p>{res}</p>)}</div>
        </div>
      </form>
    </div>
  );
}

export default App;
