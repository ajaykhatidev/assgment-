

"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link href="/all">
                    <button  className="hover:text-gray-400">E-Shop</button>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/product">
                    <button  className="hover:text-gray-400">Products</button>
                    </Link>
                    <Link href="/cart">
                    <button  className="hover:text-gray-400">Cart</button>
                    </Link>
                    <Link href="/about">
                    <button className="hover:text-gray-400">About</button>
                    </Link>
                    <Link href="/">
                    <button className="block px-4 py-2 hover:bg-gray-600">Admin</button>
                    </Link>
                </div>

                {/* Search Bar */}
              

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-700">
                    <Link href="/product">
                        <button className="block px-4 py-2 hover:bg-gray-600">Products</button>
                    </Link>
                    <Link href="/about">
                    <button className="block px-4 py-2 hover:bg-gray-600">About</button>
                    </Link>
                    <Link href="/">
                    <button className="block px-4 py-2 hover:bg-gray-600">Admin</button>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
