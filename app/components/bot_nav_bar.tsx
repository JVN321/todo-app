
'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { useEditingContext } from "../context/EditingContext";

export default function Bot_nav_bar()  {
  const { setIsEditing } = useEditingContext();
  const router = useRouter();
  const onHomeClick = () => {
    router.push('/login');
  };
  return (
    <div className="navbar bg-base-100 fixed bottom-0 w-full flex justify-around">
      <button className="btn btn-ghost text-xl border border-red-500 hover:bg-red-500 transition duration-300" onClick={() => onHomeClick()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <button className="btn btn-ghost text-xl border border-blue-500 hover:bg-blue-500 transition duration-300" onClick={() => setIsEditing(true)}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3C13 2.44772 12.5523 2 12 2Z" />
        </svg>
      </button>
    </div>
  );
}
