
"use client"
import Link from "next/link"
import React from "react"

export default function Login(){
    const  [userlogin , setUserLogin ] = React.useState({
        Email :"",
        password :""


    })
    return(<>
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-2xl font-bold mb-4">Hi, Login</h1>
    
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <label htmlFor="userLogin" className="block text-sm font-medium text-gray-700 mb-2">
            User Login
        </label>
        <input
            placeholder="Enter your email"
            id="emailuser"
            type="text"
            value={userlogin.Email}
            onChange={(e) => setUserLogin({ ...userlogin, Email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            User Password
        </label>
        <input
            placeholder="Enter your password"
            id="password"
            type="password"
            value={userlogin.password}
            onChange={(e) => setUserLogin({ ...userlogin, password: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
<Link href="/signup">
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
              home
         
        </button></Link>
    </div>
</div>

        </>)
}