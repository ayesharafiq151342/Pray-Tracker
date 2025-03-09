// import { ToastContainer } from 'react-toastify';
// import Button from './ui/butons';
// import Link from 'next/link';

// export default function Home() {
//   return (
   
//     <> <ToastContainer />
// <Link href="/destination" passHref>
    
//         <Button text="Primary" variant="primary" className="shadow-lg" />
     
//     </Link>
// <Button text="Secondary" variant="secondary" className="text-lg" />
// <Button text="Outline" variant="outline" className="uppercase tracking-wider" />
// </>
//   );
// }
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup"); // Use "/Home" if your folder is capitalized
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Page;
