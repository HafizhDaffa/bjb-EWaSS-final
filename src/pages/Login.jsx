import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import ewassLogo from '../assets/ewass-logo.png'; 
import backgroundLogin from '../assets/login-bg.png'; 


export default function Login() {
  const [formData, setFormData] = useState({
    uid: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.uid) {
      newErrors.uid = 'Email wajib diisi';
    }
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.uid, formData.password);
      navigate('/');
    } catch (err) {
      setErrors({
        submit: 'Login gagal. UID atau password salah.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Hero */}
      <div className="hidden md:flex md:w-1/2 relative bg-[#123567]">
        <img 
          alt="View looking up at tall modern skyscraper buildings with glass facades under a blue sky" 
          className="absolute inset-0 w-full h-full object-cover opacity-70" 
          src={backgroundLogin}
        />
        <div className="relative z-10 flex flex-col justify-center px-10 py-16 w-full">
          {/* Small Logo */}
          <div className="text-white text-sm font-bold mb-10">
            {/* bjb
            <span className="text-yellow-400">EWaSS</span> */}
          </div>

          {/* Hero Content */}
          <div className="flex items-center space-x-6">
            <img 
              alt="Logo EWaSS" 
              className="w-100 h-auto mx-auto drop-shadow-2xl"
              src={ewassLogo}
            />
            <div>
              {/* <h1 className="text-white font-extrabold text-5xl leading-tight mb-2">
                bjb
                <span className="text-yellow-400">EWaSS</span>
              </h1>
              <p className="text-white font-semibold text-sm leading-tight">
                Early Warning &amp; Scoring System
              </p> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section - Login Form */}
      <div className="flex flex-1 justify-center items-center px-6 sm:px-12 md:px-20 lg:px-32">
        <form 
          className="w-full max-w-md" 
          onSubmit={handleSubmit}
        >
          {/* Form Header */}
          <h2 className="text-3xl font-extrabold mb-2">
            Masuk
          </h2>
          <p className="text-gray-500 mb-8">
            Masukkan uid dan password yang telah terdaftar!
          </p>
          
          {/* Error Message */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-6">
            <label 
              className="block mb-1 text-sm font-normal text-gray-900" 
              htmlFor="uid"
            >
              UID
            </label>
            <input 
              className={`w-full px-4 py-3 border rounded-md text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#123567] ${
                errors.uid ? 'border-red-500' : 'border-gray-400'
              }`}
              id="uid" 
              name="uid" 
              placeholder="Masukkan UID" 
              type="text"
              value={formData.uid}
              onChange={handleChange}
              autoComplete="username"
            />
            {errors.uid && (
              <p className="mt-1 text-sm text-red-500">{errors.uid}</p>
            )}
          </div>
          
          {/* Password Field */}
          <div className="mb-8">
            <label 
              className="block mb-1 text-sm font-normal text-gray-900" 
              htmlFor="password"
            >
              Password
            </label>
            <input 
              className={`w-full px-4 py-3 border rounded-md text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#123567] ${
                errors.password ? 'border-red-500' : 'border-gray-400'
              }`}
              id="password" 
              name="password" 
              placeholder="Masukkan Password" 
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <button 
            className="w-full bg-[#123567] text-white py-3 rounded-md font-semibold hover:bg-[#0f2e5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
          
          {/* Sign Up Link */}
          {/* <p className="mt-6 text-center text-gray-600 text-sm">
            Belum mempunyai akun?{' '}
            <Link to="/register" className="font-bold text-[#123567] hover:underline">
              Buat Akun
            </Link>
          </p> */}
        </form>
      </div>
    </div>
  );
}
