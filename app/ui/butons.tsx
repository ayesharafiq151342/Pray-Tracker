'use client';
import React from "react";

type ButtonProps = {
  text: string;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline"; // ✅ Specific allowed values
};

const Button: React.FC<ButtonProps> = ({
  text,
  className = "",
  onClick,
  variant = "primary",
}) => {
  const baseStyle = "px-4 py-2 rounded font-semibold";
  const variants: Record<"primary" | "secondary" | "outline", string> = {
    primary: "bg-lightGreen text-white hover:bg-HoverGreen", 
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline:
      "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant as "primary" | "secondary" | "outline"]} ${className}`.trim()}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
