// app/about/page.tsx
// pages/index.tsx
import React from "react";
import Login_comp from "../components/Login_comp";


export default function loginPage() {
  return (
    <div className="bg-base-200">
    <div className="flex flex-col min-h-screen">
      <Login_comp></Login_comp>
    </div>
    </div>
  );
}
