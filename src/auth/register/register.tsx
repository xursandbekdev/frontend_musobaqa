import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ImageLogin from "../../assets/background-image-login.svg";
import axios from 'axios';

const schema = z.object({
    name: z.string().min(6, { message: "Invalid name address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    username: z.string().min(6, { message: "Username must be at least 6 characters" }),
    rememberMe: z.boolean().optional(),
});


type FormData = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const passwordValue = watch("password");

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://nt-shopping-list.onrender.com/api/users/",
                {
                    name: data.username,
                    username: data.username,
                    password: data.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const token = response.data.token;
            if (token) {
                localStorage.setItem("x-auth-token", token);
                toast.success("Registration successful!");
                console.log("Token:", token);
            } else {
                toast.success("Registered, but token not received.");
            }
        } catch (error: any) {
            const message =
                error.response?.data?.error ||
                "Registration failed. Please check your input.";
            toast.error(message);
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            <div className="hidden md:flex md:w-1/2 bg-blue-500 text-white p-6 md:p-8 flex-col">
                <div className="flex items-center mb-12 md:mb-16">
                    <div className="bg-white p-2 rounded-lg mr-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 6L8 12L14 18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 6L2 12L8 18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-xl md:text-2xl font-semibold">Woorkroom</span>
                </div>

                <div className="flex flex-col justify-center flex-grow text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Your place to work</h1>
                    <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-16">Plan. Create. Control.</h2>

                    <div className="relative w-full px-4 md:px-0 md:w-4/5 mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                            <img
                                src={ImageLogin}
                                alt="Kanban board illustration"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-8 text-center">Sign In to Woorkroom</h2>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="name"
                                {...register("name")}
                                aria-invalid={!!errors.name}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="yourname"
                                required
                            />

                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    aria-invalid={!!errors.password}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                                {passwordValue && (
                                    <div className='absolute top- right-0 ' >
                                        <p className="  text-sm mt-1 text-gray-500">
                                            {passwordValue.length < 6
                                                ? "Weak password"
                                                : passwordValue.length < 10
                                                    ? "Moderate password"
                                                    : "Strong password"}
                                        </p>
                                    </div>
                                )}
                                <button

                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                {...register("username")}
                                aria-invalid={!!errors.username}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.username ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-500"
                                    }`}
                                placeholder="Enter your username"
                                required
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    {...register("rememberMe")}
                                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center transition-colors ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                                } text-white`}
                        >
                            {loading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                            ) : (
                                <>
                                    <span className="mr-2">Sign In</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                    </form>

                    <div className="text-center mt-6">
                        <a href="/auth/login" className="text-blue-500 hover:underline">
                            Don't have an account?
                        </a>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default RegisterPage;
