"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  status: boolean;
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error("Error: users is not an array", response.data.users);
          setUsers([]);
        }
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
        // Check if the toggled user is the currently logged in user
        const currentUserId = localStorage.getItem("userId");
        if (userId === currentUserId && !currentStatus) {
          // If current user's account is deactivated, log them out and redirect
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          toast.info("Your account has been deactivated by the admin. Please sign up to continue.");
          router.push("/signup");
        }
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading users...</p>;

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">User Management</h1>
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
                      {user.status ? "Active" : "Deactivated by Admin"}
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
    </>
  );
};

export default AdminUserManagement;
