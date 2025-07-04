import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../helper/api'

export default function DetailBPRLayout({ children }) {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/bpr_lainnya/get_detail/${params.id}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Gagal fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);
  
  const getCurrentTab = () => {
    if (location.pathname.includes('data-historis')) return 'data-historis';
    if (location.pathname.includes('potensi-plafon')) return 'potensi-plafon';
    return 'informasi-umum';
  };

  const handleTabChange = (tab) => {
    navigate(`/detail-bpr/${params.id}/${tab}`);
  };

  return (
    <section className="flex-1 p-8">
      <button 
        className="mb-6 px-6 py-3 border border-[#1B3A6F] text-[#1B3A6F] rounded-md font-semibold text-sm hover:bg-[#1B3A6F] hover:text-white transition-colors" 
        type="button"
        onClick={() => navigate('/profiling-bpr')}
      >
        Kembali
      </button>
      
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        {loading ? 'Memuat data BPR...' : data?.nama_bpr ? data.nama_bpr.slice(7).trim() : 'Detail BPR'}
      </h1>
      
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="flex border-b border-[#1B3A6F]">
          <button 
            aria-current={getCurrentTab() === 'informasi-umum'} 
            className={`flex items-center space-x-2 px-6 py-3 font-semibold text-sm rounded-tl-lg ${
              getCurrentTab() === 'informasi-umum' 
                ? 'bg-[#1B3A6F] text-white' 
                : 'text-[#1B3A6F] border-[#1B3A6F]'
            }`}
            onClick={() => handleTabChange('informasi-umum')}
          >
            <i className="fas fa-info-circle"></i>
            <span>Informasi Umum BPR</span>
          </button>
          
          <button 
            aria-current={getCurrentTab() === 'data-historis'}
            className={`flex items-center space-x-2 px-6 py-3 font-semibold text-sm border-l border-[#1B3A6F] ${
              getCurrentTab() === 'data-historis' 
                ? 'bg-[#1B3A6F] text-white' 
                : 'text-[#1B3A6F]'
            }`}
            onClick={() => handleTabChange('data-historis')}
          >
            <i className="fas fa-chart-bar"></i>
            <span>Data Historis BPR</span>
          </button>
          
          <button 
            aria-current={getCurrentTab() === 'potensi-plafon'}
            className={`flex items-center space-x-2 px-6 py-3 font-semibold text-sm border-l border-[#1B3A6F] rounded-tr-lg ${
              getCurrentTab() === 'potensi-plafon' 
                ? 'bg-[#1B3A6F] text-white' 
                : 'text-[#1B3A6F]'
            }`}
            onClick={() => handleTabChange('potensi-plafon')}
          >
            <i className="fas fa-chart-pie"></i>
            <span>Potensi Pembiayaan Kredit</span>
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </section>
  );
}
