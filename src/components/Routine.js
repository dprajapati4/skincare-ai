const Routine = ({ routine }) => {
  return (
    <div className="mt-4 p-4 border border-gray-300 rounded space-y-6">
      <h3 className="text-xl font-bold mb-2">Your Skincare Routine</h3>

      <section>
        <h4 className="font-semibold text-gray-700">🌞 Morning Routine</h4>
        <ul className="list-disc ml-5 mt-1">
          {routine.morning?.map((step, idx) => (
            <li key={`morning-${idx}`}>{step}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="font-semibold text-gray-700">🌙 Evening Routine</h4>
        <ul className="list-disc ml-5 mt-1">
          {routine.evening?.map((step, idx) => (
            <li key={`evening-${idx}`}>{step}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="font-semibold text-gray-700">🧴 Recommended Products</h4>
        <ul className="space-y-2 mt-1">
          {routine.products?.map((product, idx) => (
            <li
              key={`product-${idx}`}
              className="border p-3 rounded bg-gray-50 shadow-sm"
            >
              <p>
                <strong>{product.name}</strong> – <em>{product.step}</em>
              </p>
              <p className="text-sm text-gray-600">{product.reason}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="font-semibold text-gray-700">💡 Tips</h4>
        <ul className="list-disc ml-5 mt-1">
          {routine.tips?.map((tip, idx) => (
            <li key={`tip-${idx}`}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Routine;
