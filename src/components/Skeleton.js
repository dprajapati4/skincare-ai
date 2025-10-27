const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-6 p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
      <div className="h-4 bg-gray-300 rounded w-2/3" />
      <ul className="space-y-3">
        <li className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </li>
        <li className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </li>
        <li className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </li>
      </ul>
    </div>
  );
};

export default Skeleton;
