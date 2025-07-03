import { useAuth } from '../../context/Auth';
import { useState, useRef, useEffect } from 'react';

export function Header({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Ambil user dari localStorage sebagai fallback
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const displayName = user?.nama || storedUser?.nama;
  const displayEmail = user?.uid || storedUser?.uid;
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>

        {/* User Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 group focus:outline-none"
          >
            <div className="w-10 h-10 bg-[#173E72] rounded-full flex items-center justify-center text-white">
              <i className="fas fa-user"></i>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 group-hover:text-[#173E72]">
                {displayName}
              </div>
              <div className="text-xs text-gray-500">
                {displayEmail}
              </div>
            </div>
            <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <i className="fas fa-sign-out-alt w-5"></i>
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
