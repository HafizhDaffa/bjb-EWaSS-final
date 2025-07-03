import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    id: 1,
    sandi: '600001',
    nama: 'PT BPR Jawa Timur',
    aset: '2.904.036.421.000',
    labaDesember: '18.710.493.000',
    labaJuni: '11.132.072.000',
    npl: '3,39%',
    kpmm: '40,61%',
    roa: '0,87%',
    kap: '5,05%',
    bopo: '90,42%',
    result: 'Sehat',
    resultColor: 'text-green-600',
    indicatorColor: 'bg-green-600'
  },
  {
    id: 2,
    sandi: '600002',
    nama: 'PT BPR Shinta Putra Pengasih',
    aset: '14.257.999.000',
    labaDesember: '1.871.182.000',
    labaJuni: '710.372.000',
    npl: '30,91%',
    kpmm: '28,04%',
    roa: '-7,47%',
    kap: '26,22%',
    bopo: '141,89%',
    result: 'Sehat',
    resultColor: 'text-green-600',
    indicatorColor: 'bg-green-600'
  },
  {
    id: 3,
    sandi: '600003',
    nama: 'PT BPR Nusantara Bona Pasogit 24',
    aset: '14.257.999.000',
    labaDesember: '1.871.182.000',
    labaJuni: '710.372.000',
    npl: '30,91%',
    kpmm: '28,04%',
    roa: '-7,47%',
    kap: '26,22%',
    bopo: '141,89%',
    result: 'Tidak Sehat',
    resultColor: 'text-red-600',
    indicatorColor: 'bg-red-600'
  },
  {
    id: 4,
    sandi: '600004',
    nama: 'PT. BPR Citra Ladon Rahardja',
    aset: '14.257.999.000',
    labaDesember: '1.477.350.000',
    labaJuni: '710.372.000',
    npl: '30,91%',
    kpmm: '28,04%',
    roa: '1,64%',
    kap: '26,22%',
    bopo: '141,89%',
    result: 'Tidak Sehat',
    resultColor: 'text-red-600',
    indicatorColor: 'bg-red-600'
  },
  {
    id: 5,
    sandi: '600005',
    nama: 'PT BPR Shinta Putra Pengasih',
    aset: '14.257.999.000',
    labaDesember: '1.871.182.000',
    labaJuni: '710.372.000',
    npl: '30,91%',
    kpmm: '28,04%',
    roa: '-7,47%',
    kap: '26,22%',
    bopo: '141,89%',
    result: 'Sehat',
    resultColor: 'text-green-600',
    indicatorColor: 'bg-green-600'
  },
  {
    id: 6,
    sandi: '600006',
    nama: 'PT BPR Nusantara Bona Pasogit 24',
    aset: '14.257.999.000',
    labaDesember: '1.871.182.000',
    labaJuni: '710.372.000',
    npl: '30,91%',
    kpmm: '28,04%',
    roa: '-7,47%',
    kap: '26,22%',
    bopo: '141,89%',
    result: 'Tidak Sehat',
    resultColor: 'text-red-600',
    indicatorColor: 'bg-red-600'
  },
  {
    id: 7,
    sandi: '600007',
    nama: 'PT. BPR Citra Ladon Rahardja',
    aset: '14.257.999.000',
    labaDesember: '1.477.350.000',
    labaJuni: '710.372.000',
    npl: '30,91%',
    kpmm: '28,04%',
    roa: '1,64%',
    kap: '26,22%',
    bopo: '141,89%',
    result: 'Sehat',
    resultColor: 'text-green-600',
    indicatorColor: 'bg-green-600'
  },
  {
    id: 8,
    sandi: '600008',
    nama: 'PT BPR Shinta Putra Pengasih',
    aset: '14.257.999.000',
    labaDesember: '1.871.182.000',
    labaJuni: '710.372.000',
    npl: '30,91%',
    kpmm: '28,04%',
    roa: '-7,47%',
    kap: '26,22%',
    bopo: '141,89%',
    result: 'Tidak Sehat',
    resultColor: 'text-red-600',
    indicatorColor: 'bg-red-600'
  },
  {
    id: 9,
    sandi: '600009',
    nama: 'PT BPR Nusantara Bona Pasogit 24',
    aset: '14.257.999.000',
    labaDesember: '1.871.182.000',
    labaJuni: '710.372.000',
    npl: '30,91%',
    kpmm: '28,04%',
    roa: '-7,47%',
    kap: '26,22%',
    bopo: '141,89%',
    result: 'Tidak Sehat',
    resultColor: 'text-red-600',
    indicatorColor: 'bg-red-600'
  },
  {
    id: 10,
    sandi: '600010',
    nama: 'PT. BPR Citra Ladon Rahardja',
    aset: '14.257.999.000',
    labaDesember: '1.477.350.000',
    labaJuni: '710.372.000',
    npl: '30,91%',
    kpmm: '28,04%',
    roa: '1,64%',
    kap: '26,22%',
    bopo: '141,89%',
    result: 'Sehat',
    resultColor: 'text-green-600',
    indicatorColor: 'bg-green-600'
  }
];

export default function ProfilingBPRPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const BASE_URL = 'https://d299-210-210-144-170.ngrok-free.app';
  const [provinsiList, setProvinsiList] = useState([]);
  const [kotaKabupatenList, setKotaKabupatenList] = useState([]);

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kota, setKota] = useState('');
  const [bprData, setBprData] = useState([]);
  const [onlyHealthy, setOnlyHealthy] = useState(false);
  const [onlyUnHealthy, setOnlyUnHealthy] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [paginationWindowStart, setPaginationWindowStart] = useState(1);


  useEffect(() => {
    async function fetchProvinsi() {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${BASE_URL}/bpr_lainnya/get_all_provinsi`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'ngrok-skip-browser-warning': '6024'
          },
          withCredentials: false,
        });
        if (response.data && response.data.provinsi) {
          setProvinsiList(response.data.provinsi);
        }
      } catch (error) {
        console.error("Gagal memuat data provinsi:", error);
      }
    }

    fetchProvinsi();
  }, []);

  useEffect(() => {
  async function fetchKotaByProvinsi() {
    if (!provinsi) {
      setKotaKabupatenList([]);
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${BASE_URL}/bpr_lainnya/get_all_kota?provinsi=${encodeURIComponent(provinsi)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'ngrok-skip-browser-warning': '6024'
        },
        withCredentials: false,
      });

      if (response.data && response.data.kota_kabupaten) {
        setKotaKabupatenList(response.data.kota_kabupaten);
      }
    } catch (error) {
      console.error("Gagal memuat data kota/kabupaten:", error);
    }
  }

  fetchKotaByProvinsi();
}, [provinsi]);

//   useEffect(() => {
//   fetchBprData(1); // ambil ulang data saat checkbox berubah
// }, [onlyHealthy]);


  const fetchBprData = async (page = 1) => {
    try {
      const token = localStorage.getItem('access_token');
      const params = new URLSearchParams();

      if (year) params.append('tahun', year);
      if (month) params.append('bulan', month);
      if (provinsi) params.append('nama_provinsi', provinsi);
      if (kota) params.append('nama_kota', kota);
      if (onlyHealthy) params.append('status', 'SEHAT');
      if (onlyUnHealthy) params.append('status', 'TIDAK SEHAT');

      params.append('page', page);
      params.append('per_page', 10);

      const response = await axios.get(`${BASE_URL}/bpr_scrapping/get_all_bpr?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'ngrok-skip-browser-warning': '6024'
        },
        withCredentials: false,
      });

      if (response.data && response.data.data) {
        setBprData(response.data.data);
        setCurrentPage(response.data.page);
        setTotalPages(Math.ceil(response.data.total / response.data.per_page));
      }
    } catch (error) {
      console.error('Gagal mengambil data BPR:', error);
    }
  };


  const handleDetailClick = (sandi) => {
    navigate(`/detail-bpr/${sandi}`);
  };

  return (
    <section className="px-8 py-8 flex flex-col gap-6">
      <h1 className="font-extrabold text-xl text-[#1E1E2D]">
        Profiling BPR
      </h1>
      
      <form onSubmit={(e) => { e.preventDefault(); fetchBprData(1); }} className="bg-white rounded-lg p-6 grid grid-cols-1 md:grid-cols-[auto_auto_auto_1fr] gap-y-4 gap-x-4 items-center">
        <label className="text-[13px] font-normal text-[#1E1E2D] col-span-1 md:col-span-1" htmlFor="periode">
          Periode Pelaporan
        </label>
        <select className="border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-1" id="month" name="month" value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Semua Bulan</option>
          <option>Maret</option>
          <option>Juni</option>
          <option>September</option>
          <option>Desember</option>
        </select>
        <select className="border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-1" id="year" name="year" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Semua Tahun</option>
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
        </select>
        <div></div>
        
        <label className="text-[13px] font-normal text-[#1E1E2D] col-span-1 md:col-span-1" htmlFor="provinsi">
          Provinsi
        </label>
        <select className="border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-3" id="provinsi" name="provinsi" value={provinsi} onChange={(e) => setProvinsi(e.target.value)}>
          <option value="">Semua Provinsi</option>
          {provinsiList.map((prov, index) => (
            <option key={index} value={prov}>{prov}</option>
          ))}
        </select>
        
        <label className="text-[13px] font-normal text-[#1E1E2D] col-span-1 md:col-span-1" htmlFor="kota">
          Kota/Kabupaten
        </label>
        <select className="border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-3" id="kota" name="kota" value={kota} onChange={(e) => setKota(e.target.value)}>
          <option value="">Semua Kota</option>
          {kotaKabupatenList.map((kotaItem, index) => (
            <option key={index} value={kotaItem}>{kotaItem}</option>
          ))}
        </select>
        <label className="text-[13px] font-normal text-[#1E1E2D] col-span-1 md:col-span-1" htmlFor="kota">
          Status BPR
        </label>
        <div
          className="flex flex-col rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-3"
          id="status"
          name="status"
        >
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="onlyHealthy"
              checked={onlyHealthy}
              onChange={(e) => {
                const checked = e.target.checked;
                setOnlyHealthy(checked);
                setOnlyUnHealthy(false); // uncheck yang lain
                fetchBprData(1);
              }}
              className="w-4 h-4"
            />
            <label className="ml-2" htmlFor="onlyHealthy">Tampilkan data BPR yang Sehat</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="onlyUnHealthy"
              checked={onlyUnHealthy}
              onChange={(e) => {
                const checked = e.target.checked;
                setOnlyUnHealthy(checked);
                setOnlyHealthy(false); // uncheck yang lain
                fetchBprData(1);
              }}
              className="w-4 h-4"
            />
            <label className="ml-2" htmlFor="onlyUnHealthy">Tampilkan data BPR yang Tidak Sehat</label>
          </div>
        </div>

        {/* <label className="text-[13px] font-normal text-[#1E1E2D] col-span-1 md:col-span-1" htmlFor="bank">
          Bank BPR
        </label>
        <select className="border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-3" id="bank" name="bank">
          <option>Semua BPR</option>
        </select> */}
        
        <button className="bg-[#1E3A70] text-white rounded-md py-3 px-6 justify-self-end col-span-1 md:col-span-1 mt-2 md:mt-0" type="submit">
          Tampilkan
        </button>
      </form>
      
      <section className="bg-[#F3F5F9] rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-[13px] text-[#1E1E2D]">
            {/* <span>Show</span>
            <select className="bg-[#1E3A70] text-white rounded-md py-1 px-3 text-[13px] font-semibold">
              <option>10</option>
            </select>
            <span>entries</span> */}

          </div>
          <div className="w-full md:w-72">
            <input 
              className="w-full border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D]" 
              placeholder="Cari..." 
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-lg border border-[#D1D5DB] bg-white">
          <table className="w-full text-[11px] text-[#1E1E2D] border-collapse">
            <thead className="bg-[#F9FAFB] text-[11px] font-semibold text-[#6B7280]">
              <tr>
                <th className="border-b border-[#E6E8EC] text-left py-2 px-3 w-[30px]">No</th>
                <th className="border-b border-[#E6E8EC] text-left py-2 px-3 w-[70px]">Sandi</th>
                <th className="border-b border-[#E6E8EC] text-left py-2 px-3 min-w-[140px]">Nama BPR</th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[110px] cursor-pointer select-none">
                  Aset
                  {/* <i className="fas fa-sort-up ml-1 text-[#9CA3AF]"></i> */}
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[90px] cursor-pointer select-none">
                  Laba Desember 21
                  {/* <i className="fas fa-sort-up ml-1 text-[#9CA3AF]"></i> */}
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[100px] cursor-pointer select-none">
                  Laba Juni 2022
                  {/* <i className="fas fa-sort-up ml-1 text-[#9CA3AF]"></i> */}
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  NPL Nett
                  {/* <i className="fas fa-sort-up ml-1 text-[#9CA3AF]"></i> */}
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  KPMM
                  {/* <i className="fas fa-sort-up ml-1 text-[#9CA3AF]"></i> */}
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  ROA
                  {/* <i className="fas fa-sort-up ml-1 text-[#9CA3AF]"></i> */}
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  KAP
                  {/* <i className="fas fa-sort-up ml-1 text-[#9CA3AF]"></i> */}
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  BOPO
                  {/* <i className="fas fa-sort-up ml-1 text-[#9CA3AF]"></i> */}
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  Result
                  {/* <i className="fas fa-sort-up ml-1 text-[#9CA3AF]"></i> */}
                </th>
                <th className="border-b border-[#E6E8EC] text-left py-2 px-3 w-[90px] min-w-[90px]">
                  Data Lainnya
                </th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-normal text-[#1E1E2D]">
              {bprData.map((item, index) => {
                const formatCurrency = (num) => new Intl.NumberFormat('id-ID').format(num);
                const resultColor = item.status === 'SEHAT' ? 'text-green-600' : 'text-red-600';
                const indicatorColor = item.status === 'SEHAT' ? 'bg-green-600' : 'bg-red-600';

                return (
                  <tr key={`${item.sandi}-${index}`} className="border-t border-[#E6E8EC]">
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="py-2 px-3 font-semibold">{item.sandi}</td>
                    <td className="py-2 px-3 max-w-[140px]">{item.nama_bpr}</td>
                    <td className="py-2 px-3 text-right">{formatCurrency(item.asset)}</td>
                    <td className={`py-2 px-3 text-right ${item.laba_desember_tahun_sebelum < 0 ? 'text-[#D14343]' : ''}`}>
                      {formatCurrency(item.laba_desember_tahun_sebelum)}
                    </td>
                    <td className={`py-2 px-3 text-right ${item.laba_saat_ini < 0 ? 'text-[#D14343]' : ''}`}>
                      {formatCurrency(item.laba_saat_ini)}
                    </td>
                    <td className="py-2 px-3 text-right">{item.npl_net}%</td>
                    <td className="py-2 px-3 text-right">{item.kpmm}%</td>
                    <td className={`py-2 px-3 text-right ${item.roa < 0 ? 'text-[#D14343]' : ''}`}>{item.roa}%</td>
                    <td className="py-2 px-3 text-right">{item.kap}%</td>
                    <td className="py-2 px-3 text-right">{item.bopo}%</td>
                    <td className={`py-2 px-3 ${resultColor} flex items-center gap-1`}>
                      <span className={`result-indicator ${indicatorColor} w-2 h-2 rounded-full`}></span>
                      {item.status}
                    </td>
                    <td className="py-2 px-3">
                      <button 
                        className="bg-[#1E3A70] text-white text-[11px] font-semibold rounded px-3 py-1 hover:bg-[#16325a] transition-colors"
                        onClick={() => handleDetailClick(item.sandi)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
        
        <nav aria-label="Pagination" className="flex justify-center items-center gap-2 mt-6 text-[11px] text-[#6B7280]">
          <button
            className="px-2 py-1 disabled:opacity-50"
            onClick={() => {
              const prevPage = Math.max(currentPage - 1, 1);
              setCurrentPage(prevPage);
              fetchBprData(prevPage);
            }}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Logic pagination */}
          {(() => {
            const pages = [];
            const maxPageButtons = 10;

            if (totalPages <= maxPageButtons) {
              // Total halaman sedikit, tampilkan semua
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              const showLeftEllipsis = currentPage > 5;
              const showRightEllipsis = currentPage < totalPages - 4;

              const startPage = Math.max(2, currentPage - 2);
              const endPage = Math.min(totalPages - 1, currentPage + 2);

              pages.push(1); // Halaman pertama selalu ditampilkan

              if (showLeftEllipsis && startPage > 2) {
                pages.push('left-ellipsis');
              }

              for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
              }

              if (showRightEllipsis && endPage < totalPages - 1) {
                pages.push('right-ellipsis');
              }

              pages.push(totalPages); // Halaman terakhir
            }

            return pages.map((page, index) => {
              if (page === 'left-ellipsis' || page === 'right-ellipsis') {
                return <span key={index} className="px-1">...</span>;
              }

              return (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    fetchBprData(page);
                  }}
                  className={`px-3 py-1 rounded ${currentPage === page ? 'bg-[#1E3A70] text-white' : 'bg-[#F3F5F9] hover:bg-[#E6E8EC]'}`}
                >
                  {page}
                </button>
              );
            });
          })()}

          <button
            className="px-2 py-1 disabled:opacity-50"
            onClick={() => {
              const nextPage = Math.min(currentPage + 1, totalPages);
              setCurrentPage(nextPage);
              fetchBprData(nextPage);
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </section>
    </section>
  );
}
