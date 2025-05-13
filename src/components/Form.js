"use client";
import { useState, ErrorBoundary } from "react";

const skinTypeOptions = ["normal", "dry", "oily", "sensitive", "combination"];
const skinConcerns = [
  "acne",
  "eczema",
  "psoriasis",
  "skin aging",
  "wrinkles",
  "dark spots",
];
const preferences = [
  "fragrance-free",
  "vegan",
  "affordable",
  "dermatologist-tested",
  " cruelty-free",
  "sustainable packaging",
  "safe for sensitive skin",
];

const Form = () => {
  const [skinType, setSkinType] = useState("");
  const [concerns, setConcerns] = useState([]);
  const [budget, setBudget] = useState("");
  const [prefs, setPrefs] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = {
      skinType,
      concerns,
      budget,
      preferences: prefs,
    };
    console.log("Submitted form data", formData);
  };

  const toggleCheckbox = (value, setter, state) => {
    if (state.includes(value)) {
      setter(state.filter((v) => v !== value));
    } else {
      setter([...state, value]);
    }
  };
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <form onSubmit={submitForm} className="flex flex-col gap-4 max-w-md mx-auto">
      <label htmlFor="skinType">Choose Skin Type </label>
      <select
        id="skinType"
        name="skinType"
        value={skinType}
        onChange={(e) => setSkinType(e.target.value)}
        required
      >
        <option value="">-- Select --</option>
        {skinTypeOptions.map((option) => (
          <option key={option} value={option}>
            {capitalize(option)}
          </option>
        ))}
      </select>

      <fieldset>
        <legend>Select Skin Concerns</legend>
        {skinConcerns.map((concern) => (
          <label key={concern} className="block">
            {capitalize(concern)}
            <input
              type="checkbox"
              value={concern}
              checked={concerns.includes(concern)}
              onChange={() => toggleCheckbox(concern, setConcerns, concerns)}
            />
            {capitalize(concern)}
          </label>
        ))}
      </fieldset>

      <label htmlFor="budget">
        Budget ($)
        <input
          type="number"
          id="budget"
          name="budget"
          value={budget}
          required
          min="1"
          onChange={(e) => setBudget(e.target.value)}
        />
      </label>

      <fieldset>
        <legend>Select skincare preferences </legend>
        {preferences.map((pref) => (
          <label key={pref.trim()} className="block">
            <input
              type="checkbox"
              value={pref.trim()}
              checked={prefs.includes(pref.trim())}
              onChange={() => toggleCheckbox(pref.trim(), setPrefs, prefs)}
            />
            {capitalize(pref.trim())}
          </label>
        ))}
      </fieldset>

      <button type="submit"  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" >
        Generate Routine
      </button>
    </form>
  );
};

export default Form;
