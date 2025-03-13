'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();


  useEffect(() => {
    const userRole = localStorage.getItem("role"); // Assuming role is stored
    if (userRole === "admin") {
      router.push("/Admin/signup"); // Redirect admins to sign-in
    } else {
      router.push("/signup"); // Normal users go to signup
    }
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Page;
