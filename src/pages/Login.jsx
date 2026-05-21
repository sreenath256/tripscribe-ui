import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogoBlue } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, getUserDataFirst } from '../redux/actions/userActions.jsx';

const Login = () => {
    const dispatch = useDispatch();
    const { loading: isReduxLoading, error: reduxError, user } = useSelector(state => state.user);
    
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [localLoading, setLocalLoading] = useState(false);
    const [loginMessage, setLoginMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginMessage(null);

        if (!validateForm()) return;

        setLocalLoading(true);

        try {
            // Dispatch the Redux action instead of standard axios call
            const resultAction = await dispatch(loginUser(formData));
            
            if (loginUser.fulfilled.match(resultAction)) {
                // Success! The Redux 'user' state will populate, 
                // App.jsx will automatically swap the router to 'adminRouter', 
                // and the user will instantly be routed to /dashboard
            } else {
                if (resultAction.payload) {
                    setLoginMessage({ type: 'error', text: resultAction.payload.error || "Login Failed" });
                } else {
                    setLoginMessage({ type: 'error', text: "Invalid credentials." });
                }
            }
        } catch (error) {
            console.log(error);
            setLoginMessage({ type: 'error', text: "An unexpected error occurred." });
        } finally {
            setLocalLoading(false);
        }
    };

    const isLoading = isReduxLoading || localLoading;

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo Area */}
                <div className="flex justify-center flex-col items-center">
                    <img src={LogoBlue} alt="" className='w-1/2' />

                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please sign in to your account
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[440px]">
                <div className="bg-white py-10 px-6 sm:rounded-3xl sm:px-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-4 py-3.5 border ${errors.username
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/30'
                                        : 'border-gray-200 focus:ring-primary focus:border-primary bg-gray-50/50'
                                        } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:bg-white text-[15px] font-medium transition-all duration-200`}
                                />
                            </div>
                            {errors.username && <p className="mt-2 text-[13px] font-medium text-red-600 px-1">{errors.username}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-4 py-3.5 border ${errors.password
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/30'
                                        : 'border-gray-200 focus:ring-primary focus:border-primary bg-gray-50/50'
                                        } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:bg-white text-[15px] font-medium transition-all duration-200`}
                                />
                            </div>
                            {errors.password && <p className="mt-2 text-[13px] font-medium text-red-600 px-1">{errors.password}</p>}
                        </div>



                        {loginMessage && (
                            <div className={`p-4 rounded-xl text-[14px] font-semibold flex items-center gap-2 ${loginMessage.type === 'success'
                                ? 'bg-[#E7F8F0] text-[#008A38] border border-[#BCE8D1]'
                                : 'bg-[#FEF0F0] text-[#C81E1E] border border-[#FAD2D2]'
                                }`}>
                                {loginMessage.text}
                            </div>
                        )}

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-full font-bold tracking-[0.15em] uppercase text-xs transition-all duration-300 overflow-hidden ${isLoading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                                    : 'bg-primary text-white hover:bg-white hover:text-black border-primary hover:border-[1.5px] shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;