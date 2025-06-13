"use client";
import { useState, ErrorBoundary } from "react";
import Routine from "./Routine";

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
  const [routine, setRoutine] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRoutine("");

    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      return;
    }
    const formData = {
      skinType,
      concerns,
      budget,
      preferences: prefs,
    };

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skinType, concerns, preferences, budget }),
      });

      const data = await res.json();
      setRoutine(data.routine);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

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

  const validateFormData = () => {
    if (!skinType) return "Please select a skin type";
    if (concerns.length === 0) return "Please select at least one skin concern";
    if (!budget) return "Please include a budget";
    return null;
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-sand p-6 rounded-xl shadow-md min-w-md mx-auto "
    >
      <label className="black text-ink" htmlFor="skinType">
        Choose Skin Type{" "}
      </label>
      <select
        id="skinType"
        name="skinType"
        value={skinType}
        onChange={(e) => setSkinType(e.target.value)}
        required
        className="w-full p-2 border border-gray-300  bg-white rounded"
      >
        <option className="text-center text-gray-400  sm:text-sm/6" value="">
          -- Select --
        </option>
        {skinTypeOptions.map((option) => (
          <option className="text-center" key={option} value={option}>
            {capitalize(option)}
          </option>
        ))}
      </select>

      <fieldset>
        <legend>Select Skin Concerns</legend>

        {skinConcerns.map((concern) => (
          <label key={concern} className="block">
            <input
              className="mx-2"
              type="checkbox"
              value={concern}
              checked={concerns.includes(concern)}
              onChange={() => toggleCheckbox(concern, setConcerns, concerns)}
            />
            {capitalize(concern)}
          </label>
        ))}
      </fieldset>

      <label htmlFor="budget">Budget</label>
      <div className="mt-1">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
            $
          </div>
          <input
            type="number"
            id="budget"
            name="budget"
            value={budget}
            required
            min="1"
            onChange={(e) => setBudget(e.target.value)}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            placeholder="0.00"
          />
        </div>
      </div>

      <fieldset>
        <legend>Select skincare preferences </legend>
        {preferences.map((pref) => (
          <label key={pref.trim()} className="block">
            <input
              className="mx-2 "
              type="checkbox"
              value={pref.trim()}
              checked={prefs.includes(pref.trim())}
              onChange={() => toggleCheckbox(pref.trim(), setPrefs, prefs)}
            />
            {capitalize(pref.trim())}
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        className=" mt-4 bg-gold text-ink font-semibold px-4 py-2 rounded hover:bg-mauve transition"
      >
        Generate Routine
      </button>
      {routine && <Routine routine={routine} />}
    </form>
  );
};

export default Form;
