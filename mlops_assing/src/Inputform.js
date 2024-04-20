import React, { useState } from 'react';

function InputForm({ onPredictionSubmit }) {
  const [formData, setFormData] = useState({
    pH: 7.0,
    temperature: 25,
    taste: 'Tasteless',
    odor: 'No Odor',
    fat: 'Low Fat',
    turbidity: 'Clear',
    colour: 128
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredictionSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <label>pH:</label>
      <input type="range" min="0" max="14" step="0.1" name="pH" value={formData.pH} onChange={handleChange} />

      <label>Temperature (°C):</label>
      <input type="range" min="0" max="100" name="temperature" value={formData.temperature} onChange={handleChange} />

      <label>Taste:</label>
      <select name="taste" value={formData.taste} onChange={handleChange}>
        <option value="Tasteless">Tasteless</option>
        <option value="Tasty">Tasty</option>
      </select>

      <label>Odor:</label>
      <select name="odor" value={formData.odor} onChange={handleChange}>
        <option value="No Odor">No Odor</option>
        <option value="Odor Present">Odor Present</option>
      </select>

      <label>Fat Content:</label>
      <select name="fat" value={formData.fat} onChange={handleChange}>
        <option value="Low Fat">Low Fat</option>
        <option value="High Fat">High Fat</option>
      </select>

      <label>Turbidity:</label>
      <select name="turbidity" value={formData.turbidity} onChange={handleChange}>
        <option value="Clear">Clear</option>
        <option value="Turbid">Turbid</option>
      </select>

      <label>Colour (RGB):</label>
      <input type="range" min="0" max="255" name="colour" value={formData.colour} onChange={handleChange} />

      <button type="submit">Predict</button>
    </form>
  );
}

export default InputForm;
