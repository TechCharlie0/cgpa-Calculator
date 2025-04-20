import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [sgpas, setSgpas] = useState(Array(8).fill('')); // 8 semesters SGPA input values
  const [cgpa, setCgpa] = useState(null); // Calculated CGPA
  const [error, setError] = useState(''); // Error message state

  const semesterCredits = [16, 17, 17, 16, 18, 17, 18, 18]; // Credits for each semester

  // Handle input change for SGPA
  const handleInputChange = (e, index) => {
    const newSgpas = [...sgpas];
    newSgpas[index] = e.target.value;
    setSgpas(newSgpas);
  };

  // Calculate CGPA
  const calculateCGPA = () => {
    setError(''); // Reset any previous error message

    // Validate input
    for (let i = 0; i < 8; i++) {
      if (!sgpas[i] || isNaN(sgpas[i]) || parseFloat(sgpas[i]) < 0 || parseFloat(sgpas[i]) > 10) {
        setError('Please enter valid SGPA values for all semesters.');
        return;
      }
    }

    // Calculate CGPA
    const totalCredits = semesterCredits.reduce((acc, credit) => acc + credit, 0);
    const totalScore = sgpas.reduce((acc, sgpa, index) => acc + (parseFloat(sgpa) || 0) * semesterCredits[index], 0);
    setCgpa(cgpaResult);
  };

  return (
    <div className="app-container">
      <h1 className="app-header">CGPA Calculator</h1>
      <div className="form-container">
        <div className="grid-container">
          {sgpas.map((sgpa, index) => (
            <div key={index} className="semester-input">
              <label>{`${index + 1}th Semester:`}</label>
              <input
                type="number"
                value={sgpa}
                onChange={(e) => handleInputChange(e, index)}
                min="0"
                max="10"
                step="0.01"
                className="input-field"
                placeholder={` Semester ${index + 1}`}
              />
            </div>
          ))}
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="calculate-button" onClick={calculateCGPA}>Calculate CGPA</button>
        {cgpa && <div className="result">Your CGPA is: {cgpa}</div>}
      </div>
    </div>
  );
}

export default App;
