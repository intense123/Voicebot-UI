"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error) {
            console.error("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">{loading ? "Processing" : "Signup"}</h1>
            <hr className="w-full mb-4" />
            <label htmlFor="username" className="text-lg">
                Username
            </label>
            <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-96"
                placeholder="Username"
            />
            <label htmlFor="email" className="text-lg">
                Email
            </label>
            <input
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-96"
                placeholder="Email"
            />
            <label htmlFor="password" className="text-lg">
                Password
            </label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-96"
                placeholder="Password"
            />
            <button
                onClick={onSignup}
                disabled={buttonDisabled}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
                    buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600 hover:text-white"
                }`}
            >
                {loading ? "Signing up..." : "Signup"}
            </button>
            <Link href="/login" className="text-blue-600">
                Visit login page
            </Link>
        </div>
    );
}
