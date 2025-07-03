import { Link, useLocation } from 'react-router-dom';
import ewassLogo from '../../assets/ewass-logo.png'; 

export function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`h-screen w-64 bg-[#173E72] text-white flex flex-col ${isOpen ? '' : '-ml-64'} transition-all duration-300`}>
      {/* Header Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            {/* <div className="text-2xl font-bold text-white">bjb EWaSS</div>
            <div className="text-sm text-gray-300 mt-1">Early Warning & Scoring System</div> */}
            <img 
              alt="Logo EWaSS" 
              className="w-40 h-auto mx-auto drop-shadow-2xl"
              src={ewassLogo}
            />
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-yellow-400 lg:hidden"
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          <Link 
            to="/"
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive('/')
                ? 'bg-[#4173B6] text-white border-l-4 border-white'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="mr-3">
              <i className="fas fa-gauge w-5 h-5"></i>
            </span>
            Dashboard
          </Link>

          <Link 
            to="/profiling-bpr"
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive('/profiling-bpr')
                ? 'bg-[#4173B6] text-white border-l-4 border-white'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="mr-3">
              <i className="fas fa-list w-5 h-5"></i>
            </span>
            Profiling BPR
          </Link>

          {/* <Link 
            to="/logout"
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive('/logout')
                ? 'bg-white/10 text-white border-l-4 border-white'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="mr-3">
              <i className="fas fa-power-off w-5 h-5"></i>
            </span>
            Logout
          </Link> */}

        </nav>
      </div>
    </div>
  );
}
