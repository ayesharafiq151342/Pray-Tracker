'use client'
import { useState } from "react";
import Sidebar from "@/app/components/sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  const data = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 7000 },
    { month: "Mar", revenue: 9000 },
    { month: "Apr", revenue: 8500 },
    { month: "May", revenue: 9200 },
  ];

  const data2 = [
    { name: "Fajar", value: 400 },
    { name: "dhuhr", value: 200 },
    { name: "Asr", value: 300 },
    { name: "Magrib", value: 100 ,

    },
    { name: "Esha", value: 200 ,
      
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042" ,"#ec4899"];

  const data3 = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 600 },
    { name: "Mar", sales: 800 },
    { name: "Apr", sales: 500 },
    { name: "May", sales: 700 },
  ];

  return (
   <>
    <div className='flex flex-col md:flex-row min-h-screen bg-darkGreen'>
      <Sidebar setActiveTab={setActiveTab}/>
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Admin Dashboard Overview
        </h1>
        <div className="bg-white p-6 mt-6 rounded-lg shadow">
  <h2 className="text-lg font-semibold mb-2">Current Tab: Admin</h2>
  {activeTab === "Admin" && <p>Showing Users Section...</p>}
  {activeTab === "users" && <p>Showing Users Section...</p>}
 

  {activeTab === "prayer_guidance" && <p>Showing Prayer Guidance Section...</p>}
</div>

        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Prayer Goals</h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Completion Ratio</h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data2}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {data2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Prayers Tracked</h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data3}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 mt-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">User Engagement Bar Chart</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data3}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default AdminDashboard;