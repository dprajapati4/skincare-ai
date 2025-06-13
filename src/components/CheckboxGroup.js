const CheckboxGroup = ({ legend, options, selected, onToggle }) => {
  return (
    <fieldset aria-labelledby="concerns-label">
      <legend id="concerns-label">{legend}</legend>
      {options.map((opt) => (
        <label key={opt} className="block">
          <input
            type="checkbox"
            value={opt}
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className="mx-2"
          />
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </label>
      ))}
    </fieldset>
  );
};

export default CheckboxGroup