const BudgetInput = ({ value, onChange }) => {
  return (
    <>
      <label htmlFor="budget">Budget</label>
      <div className="flex items-center bg-white rounded-md p-2 border border-gray-300">
        <span className="text-gray-500 mr-1">$</span>
        <input
          type="number"
          id="budget"
          value={value}
          onChange={onChange}
          min="1"
          required
          className="w-full focus:outline-none"
          placeholder="0.00"
        />
      </div>
    </>
  );
};

export default BudgetInput;
