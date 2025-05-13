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
    <form
      onSubmit={submitForm}
      className="flex flex-col gap-4 bg-sand p-6 rounded-xl shadow-md min-w-md mx-auto "
    >
      <label className="black text-ink" htmlFor="skinType">Choose Skin Type </label>
      <select
        id="skinType"
        name="skinType"
        value={skinType}
        onChange={(e) => setSkinType(e.target.value)}
        required
        // className="flex items-center rounded-md bg-white p-1 outline-1 -outline-offset-1 outline-gray-300"
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
        // className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        className=" mt-4 bg-gold text-ink font-semibold px-4 py-2 rounded hover:bg-mauve transition"

      >
        Generate Routine
      </button>
    </form>
  );
};

export default Form;
