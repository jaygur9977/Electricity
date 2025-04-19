import { useState } from "react";

export default function WhatsAppSender() {
  const [form, setForm] = useState({
    phone: "",
    name: "",
    totalUsage: "",
    topDevice: "",
    topDeviceUsage: "",
    estimatedCost: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setResponse("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Send Energy Report on WhatsApp</h2>
      <form onSubmit={sendMessage} className="space-y-4">
        {[
          ["phone", "Phone number (without +91)"],
          ["name", "Name"],
          ["totalUsage", "Total Usage (kWh)"],
          ["topDevice", "Top Device"],
          ["topDeviceUsage", "Top Device Usage (kWh)"],
          ["estimatedCost", "Estimated Cost (₹)"],
        ].map(([key, label]) => (
          <input
            key={key}
            name={key}
            placeholder={label}
            value={form[key]}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Send Report"}
        </button>
      </form>
      {response && <p className="mt-4 text-center text-green-600">{response}</p>}
    </div>
  );
}