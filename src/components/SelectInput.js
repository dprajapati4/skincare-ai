const SelectInput = ({ label, value, onChange, options }) => {
  return (
    <>
      <label className="text-ink">{label}</label>
      <select
        value={value}
        onChange={onChange}
        required
        className="w-full p-2 border border-gray-300 bg-white rounded"
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectInput;
