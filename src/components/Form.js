"use client";
import { useState } from "react";
import { SKIN_TYPE_OPTIONS, SKIN_CONCERNS, PREFERENCES } from "../constants";
import Routine from "./Routine";
import SelectInput from "./SelectInput";
import CheckboxGroup from "./CheckboxGroup";
import BudgetInput from "./BudgetInput";
import Skeleton from "./Skeleton";

//TODO: Update for an option to add products people already have and an option for allergies/products and materials to avoid
export default function Form() {
  const [skinType, setSkinType] = useState("");
  const [concerns, setConcerns] = useState([]);
  const [budget, setBudget] = useState("");
  const [prefs, setPrefs] = useState([]);
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleCheckbox = (value, setter, state) => {
    setter(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
  };

  const validateFormData = () => {
    if (!skinType) return "Please select a skin type";
    if (concerns.length === 0) return "Please select at least one skin concern";
    if (!budget) return "Please include a budget";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRoutine(null);
    setLoading(true);

    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skinType,
          concerns,
          preferences: prefs,
          budget,
        }),
      });

      const data = await res.json();
      setRoutine(data.routine);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-sand p-6 rounded-xl shadow-md min-w-md mx-auto"
    >
      <SelectInput
        label="Choose Skin Type"
        value={skinType}
        onChange={(e) => setSkinType(e.target.value)}
        options={SKIN_TYPE_OPTIONS}
      />

      <CheckboxGroup
        legend="Select Skin Concerns"
        options={SKIN_CONCERNS}
        selected={concerns}
        onToggle={(val) => toggleCheckbox(val, setConcerns, concerns)}
      />
      <BudgetInput value={budget} onChange={(e) => setBudget(e.target.value)} />
      <CheckboxGroup
        legend="Select Skincare Preferences"
        options={PREFERENCES}
        selected={prefs}
        onToggle={(val) => toggleCheckbox(val, setPrefs, prefs)}
      />
      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="mt-4 bg-gold text-ink font-semibold px-4 py-2 rounded hover:bg-mauve transition"
      >
        Generate Routine
      </button>
      {loading ? (
        <div className="mt-4 p-4 border border-gray-300 rounded space-y-6">
          <Skeleton />
        </div>
      ) : (
        routine && <Routine routine={routine} />
      )}
    </form>
  );
}
