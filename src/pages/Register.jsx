import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/Auth';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak sama';
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
      await register(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setErrors({
        submit: 'Registrasi gagal. Silakan coba lagi.'
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
          src="https://storage.googleapis.com/a1aa/image/665794c7-904a-4b5a-ea5f-80f9246e2b82.jpg"
        />
        <div className="relative z-10 flex flex-col justify-center px-10 py-16 w-full">
          {/* Small Logo */}
          <div className="text-white text-sm font-bold mb-10">
            bjb
            <span className="text-yellow-400">EWaSS</span>
          </div>

          {/* Hero Content */}
          <div className="flex items-center space-x-6">
            <img 
              alt="Blue shield with yellow border containing white chart bars and upward arrow icon" 
              className="w-28 h-32 flex-shrink-0"
              src="https://storage.googleapis.com/a1aa/image/1b378857-baac-4c69-1c00-179eb829be49.jpg"
            />
            <div>
              <h1 className="text-white font-extrabold text-5xl leading-tight mb-2">
                bjb
                <span className="text-yellow-400">EWaSS</span>
              </h1>
              <p className="text-white font-semibold text-sm leading-tight">
                Early Warning &amp; Scoring System
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section - Register Form */}
      <div className="flex flex-1 justify-center items-center px-6 sm:px-12 md:px-20 lg:px-32">
        <form 
          className="w-full max-w-md" 
          onSubmit={handleSubmit}
        >
          {/* Form Header */}
          <h2 className="text-3xl font-extrabold mb-2">
            Buat Akun
          </h2>
          <p className="text-gray-500 mb-8">
            Daftar untuk membuat akun baru!
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
              htmlFor="email"
            >
              Email
            </label>
            <input 
              className={`w-full px-4 py-3 border rounded-md text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#123567] ${
                errors.email ? 'border-red-500' : 'border-gray-400'
              }`}
              id="email" 
              name="email" 
              placeholder="Masukkan email" 
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          
          {/* Password Field */}
          <div className="mb-6">
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
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-8">
            <label 
              className="block mb-1 text-sm font-normal text-gray-900" 
              htmlFor="confirmPassword"
            >
              Konfirmasi Password
            </label>
            <input 
              className={`w-full px-4 py-3 border rounded-md text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#123567] ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-400'
              }`}
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Konfirmasi Password" 
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <button 
            className="w-full bg-[#123567] text-white py-3 rounded-md font-semibold hover:bg-[#0f2e5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Daftar'}
          </button>
          
          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Sudah mempunyai akun?{' '}
            <Link to="/login" className="font-bold text-[#123567] hover:underline">
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
