"use client"

import Navbar from "@/components/Allnavbar";

import Main from "@/components/Main";

import React from "react";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-wrap">
       <Main/>
      
      </div>

   
    </div>
  );
};

export default page;
