"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios"; // Import AxiosError
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) { // Specify the type of error using type assertion
            console.log("Login failed", (error as AxiosError).message);
            toast.error((error as AxiosError).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">{loading ? "Processing" : "Login"}</h1>
            <hr className="w-1/2 mb-4" />
            <label htmlFor="email" className="text-lg mb-2">
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
            <label htmlFor="password" className="text-lg mb-2">
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
                onClick={onLogin}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
                    buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600 hover:text-white"
                }`}
                disabled={buttonDisabled}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
            <Link href="/signup" className="text-blue-600">
                Visit Signup page
            </Link>
        </div>
    );
}
