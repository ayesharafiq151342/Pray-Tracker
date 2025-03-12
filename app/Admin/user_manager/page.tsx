"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/app/components/sidebar"


interface User {
  _id: string;
  name: string;
  email: string;
  status: boolean;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users/data", {
        withCredentials: true,
      });
      console.log("API Response:", response.data);
      if (response.data.success) {
        setUsers(response.data.users || []);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/users/update-status",
        { userId, status: !currentStatus },
        { withCredentials: true }
      );

      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: !currentStatus } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading users...</p>;

  return (
    <div className="flex min-h-screen bg-darkGreen">
      <div className="w-64 fixed h-full p-4">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="bg-darkGreen p-6 mt-6 rounded-lg shadow">
  <h2 className="text-lg font-semibold mb-2">Current Tab: {activeTab}</h2>
  {activeTab === "users" && <p>Showing Users Section...</p>}
  {activeTab === "prayer_guidance" && <p>Showing Prayer Guidance Section...</p>}
</div>

      </div>
      <div className="flex-1 p-6 ml-64 bg-darkGreen overflow-x-auto">
        <h1 className="text-2xl font-bold mb-4 text-white">Prayer Tracker Overview</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {user.status ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className={`px-3 py-1 text-white rounded ${
                      user.status
                        ? "bg-red-500 hover:bg-red-700"
                        : "bg-green-500 hover:bg-green-700"
                    }`}
                    onClick={() => toggleStatus(user._id, user.status)}
                  >
                    {user.status ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>









  );
};

export default UserManagement;
