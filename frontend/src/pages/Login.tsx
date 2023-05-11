import React, { useState } from "react";
import logo from "../assets/logo.png"
import loginIcon from "../assets/login-icon.jpg"
import useLogin from "../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Login: React.FC = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const { login, error, isLoading } = useLogin()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        await login(formData.email, formData.password)

        if (user) {
            navigate("/")
        } else {
            navigate("/login")
        }
    }

    return (
        <div className="bg-signup-bg h-screen bg-cover bg-no-repeat bg-center flex items-center">
            <div className="w-[80%] h-[80%] mx-auto flex rounded-tl-lg rounded-bl-lg shadow-lg">
                <div className="lg:bg-blue-500 lg:w-[50%] lg:rounded-tl-lg lg:rounded-bl-lg lg:flex lg:flex-col items-center justify-evenly hidden">
                    <img src={loginIcon} alt="signup-icon" className="w-[50%]" />
                    <div className="px-48 text-center">
                        <h1 className="text-white font-extrabold text-2xl">Mini Inventory System</h1>
                        <p className="text-gray-200 font-Rubik text-sm pt-3">"Get ahead of the game, keep track of your name - manage your inventory with ease!"</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between lg:w-[50%] w-full bg-white p-8 lg:rounded-tr-lg lg:rounded-br-lg rounded-lg lg:px-28">
                    <div className="flex flex-col items-center">
                        <img src={logo} alt="logo" className="w-14 p-2 bg-gray-100 rounded-full" />
                        <h1 className="font-Rubik text-2xl font-bold pt-4 text-gray-700">Welcome!</h1>
                        <p className="text-center font-Rubik text-sm pt-1 text-gray-500">Warm greetings! It's been a pleasure having you. Login your account and make your inventory today.</p>
                    </div>
                    <div>
                    <form onSubmit={handleSubmit} className="flex flex-col -mt-20">
                        <label htmlFor="email" className="font-Rubik">Name:</label>
                        <input
                            type="text"
                            placeholder="Enter your email..."
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-blue-500 outline-blue-700 rounded-md pl-2 py-1"
                        />
                        <label htmlFor="password" className="mt-4 font-Rubik">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password..."
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-blue-500 outline-blue-700 rounded-md pl-2 py-1"
                        />
                        <button disabled={isLoading ? true : undefined} className="bg-blue-500 rounded-md py-1 text-white font-Rubik mt-6">Login</button>
                        {error && <p className="text-red-500 font-Rubik font-bold">{error}</p>}
                    </form>
                    </div>
                    <div>
                    <p className="font-Rubik">Don't have an account?<span className="pl-2 underline text-blue-800"><Link to="/signup">Signup</Link></span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
