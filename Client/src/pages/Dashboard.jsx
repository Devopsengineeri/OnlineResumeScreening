const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Candidates
          </h2>
          <p className="text-3xl mt-2 text-blue-600 font-bold">128</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700">Shortlisted</h2>
          <p className="text-3xl mt-2 text-green-600 font-bold">54</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-500">
          <h2 className="text-lg font-semibold text-gray-700">
            Interviews Scheduled
          </h2>
          <p className="text-3xl mt-2 text-yellow-600 font-bold">21</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
        <p className="text-gray-700">
          Welcome to your dashboard! Here you can track the number of
          candidates, their current status, and plan next steps. Use the sidebar
          (if you have one) to navigate to uploads, screening, and interviews.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
