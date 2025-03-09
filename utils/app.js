const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Store token in localStorage
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};
