import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputData, setInputData] = useState({
    pH: '',
    temperature: '',
    taste: '',
    odor: '',
    fat: '',
    turbidity: '',
    colour: ''
    // Add more features here based on your dataset
  });
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePredict = async () => {
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data.predicted_grade);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch prediction. Please try again.');
      }
    } catch (error) {
      setError('Failed to process data. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Milk Quality Predictor</h1>
      <div className="input-field">
        <label>pH:</label>
        <input type="number" name="pH" value={inputData.pH} onChange={handleInputChange} />
      </div>
      <div className="input-field">
        <label>Temperature:</label>
        <input type="number" name="temperature" value={inputData.temperature} onChange={handleInputChange} />
      </div>
      <div className="input-field">
        <label>Taste:</label>
        <select name="taste" value={inputData.taste} onChange={handleInputChange}>
          <option value="">Select taste</option>
          <option value="1">Good</option>
          <option value="0">Bad</option>
        </select>
      </div>
      <div className="input-field">
        <label>Odor:</label>
        <select name="odor" value={inputData.odor} onChange={handleInputChange}>
          <option value="">Select odor</option>
          <option value="1">Good</option>
          <option value="0">Bad</option>
        </select>
      </div>
      <div className="input-field">
        <label>Fat:</label>
        <select name="fat" value={inputData.fat} onChange={handleInputChange}>
          <option value="">Select fat content</option>
          <option value="1">High</option>
          <option value="0">Low</option>
        </select>
      </div>
      <div className="input-field">
        <label>Turbidity:</label>
        <select name="turbidity" value={inputData.turbidity} onChange={handleInputChange}>
          <option value="">Select turbidity</option>
          <option value="1">High</option>
          <option value="0">Low</option>
        </select>
      </div>
      <div className="input-field">
        <label>Colour:</label>
        <input type="number" name="colour" value={inputData.colour} onChange={handleInputChange} />
      </div>
      {/* Add more input fields for additional features */}
      <button className="predict-button" onClick={handlePredict}>Predict</button>
      {prediction && <div className="prediction">Predicted Grade: {prediction}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
