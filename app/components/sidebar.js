import Link from "next/link";
import { useState } from "react";
import { FiUsers, FiFileText, FiMenu, FiX } from "react-icons/fi";
import Button from "../ui/butons";
import { useRouter } from "next/navigation";

const Sidebar = ({ setActiveTab }) => {
    const [isOpen, setIsOpen] = useState(true);
      const router = useRouter();
  const handleLogout = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
  }
  
);
if(response){
  router.push("/signup");
}}
       catch (error) {
        console.error("Error logging out:", error);
        toast.error("Error logging out");
      }
    };
    return (
      <div className="flex">
        <div className={`bg-white text-black w-64 min-h-screen p-4 transition-all ${isOpen ? "block" : "hidden"} md:block`}>
          <div className="flex justify-between items-center mb-6">
           <Link href="/Admin"> <h2 className="text-xl font-bold">Admin Panel</h2></Link>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <FiX size={24} />
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <Link href="../Admin/user_manager">
                <span
                  className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
                  onClick={() => setActiveTab("users")} // ✅ Active Tab Update
                >
                  <FiUsers size={20} /> <span>User Management</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="../Admin/pray-guidance-admin">
                <span
                  className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
                  onClick={() => setActiveTab("prayer_guidance")} // ✅ Active Tab Update
                >
                  <FiFileText size={20} /> <span>Prayer Guidance</span>
                </span>
              </Link>
              
            </li>
            <li>
              <Button 
               text="Logout"
               variant="primary"
               className="shadow-lg w-full"
               onClick={handleLogout}/>
            </li>
          </ul>
        </div>
  
        {/* Mobile Menu Button */}
        <button className="md:hidden p-4 text-gray-900" onClick={() => setIsOpen(true)}>
        <FiMenu size={24} color="white" />

        </button>
      </div>
    );
  };
  
  export default Sidebar;
