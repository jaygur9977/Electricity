import React from "react";

const historyData = [
  { id: 1, title: "Login", date: "2025-04-18", desc: "Logged in using Google" },
  { id: 2, title: "Viewed Profile", date: "2025-04-17", desc: "Checked profile info" },
  { id: 3, title: "Logged Out", date: "2025-04-16", desc: "User signed out" },
  { id: 4, title: "Updated Settings", date: "2025-04-15", desc: "Changed theme color" },
];

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">User History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {historyData.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white shadow-md p-5 rounded-2xl transition-transform transform hover:scale-105 cursor-pointer overflow-hidden"
          >
            <h3 className="text-xl font-semibold text-green-800">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.date}</p>

            {/* Hover details */}
            <div className="absolute inset-0 bg-green-100 bg-opacity-90 flex flex-col justify-center items-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-lg font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
