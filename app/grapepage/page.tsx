import Link from "next/link";

export default function MainPageUser() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Hi Grapes</h1>

      {/* Links to product pages */}
      <div className="space-y-4">
        <Link href="/grapepage/1" className="text-lg text-blue-500 hover:underline">
          Go to Product 1
        </Link>
        <Link href="/grapepage/2" className="text-lg text-blue-500 hover:underline">
          Go to Product 2
        </Link>
        <Link href="/grapepage/3" className="text-lg text-blue-500 hover:underline">
          Go to Product 3
        </Link>
      </div>
    </div>
  );
}
