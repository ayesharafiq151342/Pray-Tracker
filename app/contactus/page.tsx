'use client';
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/navbar";


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="bg-darkGreen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center mt-20 lg:mt-0 p-6">
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-5xl">
          {/* Left Section - Contact Info */}
          <div className="bg-gradient-to-r from-darkGreen to-HoverGreen text-white p-8 md:w-1/3 flex flex-col justify-center rounded-l-lg">
            <h2 className="text-2xl font-bold mb-4">Lets get in touch</h2>
            <p className="text-sm mb-6">Were open for any suggestion or just to have a chat.</p>
            <ul className="space-y-4 text-sm">
              <li>📍 <strong>Address:</strong>              6th floor Legacy tower city  Faisalabad, Pakistan</li>
              <li>📞 <strong>Phone:</strong> 03299751475</li>
              <li>📧 <strong>Email:</strong> bc210416395aye@vu.edu.pk</li>
              
            </ul>
          </div>

          {/* Right Section - Form */}
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-3 border rounded-lg"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full p-3 border rounded-lg h-32"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default ContactPage;
