import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../helper/api';


export default function Dashboard() {

  const [racData, setRacData] = useState(null);
  const [topAssetData, setTopAssetData] = useState([]);
  const [topNPLData, setTopNPLData] = useState([]);
  const [bprTotalData, setBprTotalData] = useState(null);
  const [bprSehatData, setBprSehatData] = useState(null);
  const [bprTidakSehatData, setBprTidakSehatData] = useState(null);
  const [totalProvinsi, setTotalProvinsi] = useState(null);
  const [fetchHistory, setFetchHistory] = useState([]);


useEffect(() => {
  async function fetchRac() {
    try {
      const response = await api.get('/rac/getData');

      setRacData(response.data); 
      console.log(response.data);
      
    } catch (error) {
      console.error('Gagal fetch RAC:', error);
    }
  }
  async function fetchTopAsset() {
    try {
      const response = await api.get('/bpr_scrapping/top-asset');

      if (response.data.status === 'success') {
        setTopAssetData(response.data.data);
      }
    } catch (error) {
      console.error('Gagal fetch top asset BPR:', error);
    }
  }
  async function fetchTopNPL() {
    try {
      const response = await api.get('/bpr_scrapping/top-npl');
      if (response.data.status === 'success') {
        setTopNPLData(response.data.data);
      }
    } catch (error) {
      console.error('Gagal fetch top npl BPR:', error);
    }
  }
  async function fetchTotalBPR() {
    try {
      const response = await api.get('/bpr_scrapping/count_total_bpr');
      if (response.data.status === 'success') {
        setBprTotalData(response.data);
      }
    } catch (error) {
      console.error('Gagal fetch total BPR:', error);
    }
  }
  async function fetchBPRSehat() {
    try {
      const response = await api.get('/bpr_scrapping/count_bpr_sehat');
      if (response.data.status === 'success') {
        setBprSehatData(response.data);
      }
    } catch (error) {
      console.error('Gagal fetch BPR Sehat :', error);
    }
  }
  async function fetchBPRTidakSehat() {
    try {
      const response = await api.get('/bpr_scrapping/count_bpr_tidak_sehat');
      if (response.data.status === 'success') {
        setBprTidakSehatData(response.data);
      }
    } catch (error) {
      console.error('Gagal fetch BPR Tidak Sehat :', error);
    }
  }
  async function fetchTotalProvinsi() {
    try {
      const response = await api.get('/bpr_lainnya/count_total_provinsi');
      if (response.data.status === 'success') {
        setTotalProvinsi(response.data);
      }
    } catch (error) {
      console.error('Gagal fetch total provinsi:', error);
    }
  }
  async function fetchHistoryData() {
    try {
      const response = await api.get('/bpr_scrapping/fetch_history_all');
      setFetchHistory(response.data);
    } catch (error) {
      console.error('Gagal fetch riwayat:', error);
    }
  }

  fetchTotalBPR();
  fetchTotalProvinsi();
  fetchBPRSehat();
  fetchBPRTidakSehat();
  fetchTopAsset();
  fetchTopNPL();
  fetchRac();
  fetchHistoryData();
}, []);


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#173E72]">Dashboard Monitoring BPR Bank bjb</h1>
      
      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 flex justify-between items-center border border-[#D1D9E6]">
          <div>
            <p className="text-xs text-[#4B4B4B] mb-1">Total BPR</p>
            <p className="font-bold text-lg text-[#1E1E1E]">
              {bprTotalData ? bprTotalData.total_bpr : 'Loading...'}
            </p>
          </div>
          <div className="bg-[#E3E0FF] rounded-lg p-3 flex items-center justify-center w-12 h-12">
            <i className="fas fa-users text-[#8B8BFF] text-xl"></i>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 flex justify-between items-center border border-[#D1D9E6]">
          <div>
            <p className="text-xs text-[#4B4B4B] mb-1">Total Provinsi</p>
            <p className="font-bold text-lg text-[#1E1E1E]">
              {totalProvinsi ? totalProvinsi.total_provinsi : 'Loading...'}
            </p>
          </div>
          <div className="bg-[#C9E9FF] rounded-lg p-3 flex items-center justify-center w-12 h-12">
            <i className="fas fa-home text-[#4FC3F7] text-xl"></i>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 flex justify-between items-center border border-[#D1D9E6]">
          <div>
            <p className="text-xs text-[#4B4B4B] mb-1">Total BPR Sehat</p>
            <p className="font-bold text-lg text-[#1E1E1E]">
              {bprSehatData ? bprSehatData.total_bpr_sehat : 'Loading...'}
            </p>
          </div>
          <div className="bg-[#DFF7D9] rounded-lg p-3 flex items-center justify-center w-12 h-12">
            <i className="fas fa-cube text-[#7ED957] text-xl"></i>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 flex justify-between items-center border border-[#D1D9E6]">
          <div>
            <p className="text-xs text-[#4B4B4B] mb-1">Total BPR tidak sehat</p>
            <p className="font-bold text-lg text-[#1E1E1E]">
              {bprTidakSehatData ? bprTidakSehatData.total_bpr_tidak_sehat : 'Loading...'}
            </p>
          </div>
          <div className="bg-[#FFDBD0] rounded-lg p-3 flex items-center justify-center w-12 h-12">
            <i className="fas fa-history text-[#FF7F5A] text-xl"></i>
          </div>
        </div>
      </section>

      {/* Tables container */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Left table */}
        <div className="bg-white rounded-lg p-4 border border-[#D1D9E6] overflow-x-auto">
          <h2 className="font-semibold text-sm text-[#1E1E1E] mb-3">5 Data Aset BPR Tertinggi</h2>
          <table className="w-full text-xs text-[#1E1E1E]">
            <thead>
              <tr className="border-b border-[#D1D9E6]">
                <th className="py-3 text-left font-semibold pr-4 w-8">No</th>
                <th className="py-3 text-left font-semibold pr-4">Nama BPR</th>
                <th className="py-3 text-right font-semibold pr-4 w-36">Aset</th>
                <th className="py-3 text-left font-semibold">Kota/Kabupaten</th>
              </tr>
            </thead>
           <tbody>
              {topAssetData.length > 0 ? (
                topAssetData.map((item, index) => (
                  <tr key={index} className="border-b border-[#D1D9E6]">
                    <td className="py-3 pr-4 font-semibold">{index + 1}</td>
                    <td className="py-3 pr-4 max-w-[9rem]">{item.nama_bpr}</td>
                    <td className="py-3 pr-4 text-right font-semibold">
                      {Number(item.asset_saat_ini).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3">{item.kota_kabupaten}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-center" colSpan={4}>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right table */}
        <div className="bg-white rounded-lg p-4 border border-[#D1D9E6] overflow-x-auto">
          <h2 className="font-semibold text-sm text-[#1E1E1E] mb-3">5 Data NPL BPR Terendah</h2>
          <table className="w-full text-xs text-[#1E1E1E]">
            <thead>
              <tr className="border-b border-[#D1D9E6]">
                <th className="py-3 text-left font-semibold pr-4 w-8">No</th>
                <th className="py-3 text-left font-semibold pr-4">Nama BPR</th>
                <th className="py-3 text-right font-semibold pr-4 w-20">NPL</th>
                <th className="py-3 text-left font-semibold">Kota/Kabupaten</th>
              </tr>
            </thead>
           <tbody>
              {topNPLData.length > 0 ? (
                topNPLData.map((item, index) => (
                  <tr key={index} className="border-b border-[#D1D9E6]">
                    <td className="py-3 pr-4 font-semibold">{index + 1}</td>
                    <td className="py-3 pr-4 max-w-[9rem]">{item.nama_bpr}</td>
                    <td className="py-3 pr-4 text-right font-semibold">
                      {Number(item.npl).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3">{item.kota_kabupaten}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-center" colSpan={4}>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Risk Acceptance Criteria BPR */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#173E72]">Risk Acceptance Criteria BPR</h1>
          <Link to="/ubah-rac" className="bg-[#1E3A70] text-white text-sm font-semibold rounded-md px-5 py-2 hover:bg-[#16325a] transition-colors">
            Ubah RAC
          </Link>
        </div>
        <div className="bg-white rounded-lg p-4 border border-[#D1D9E6] overflow-x-auto">
          <table className="w-full text-xs text-[#1E1E1E]">
            <thead>
              <tr className="border-b border-[#D1D9E6]">
                <th className="py-3 text-left font-semibold pr-4 w-28">Aset</th>
                <th className="py-3 text-left font-semibold pr-4 w-20">Laba Tahun Sebelumnya {">="}</th>
                <th className="py-3 text-left font-semibold pr-4 w-28">Laba Saat Ini {">="}</th>
                <th className="py-3 text-left font-semibold pr-4 w-20">NPL Nett {"<="}</th>
                <th className="py-3 text-left font-semibold pr-4 w-24">KPMM/CAR {">="}</th>
                <th className="py-3 text-left font-semibold pr-4 w-20">ROA {">="}</th>
                <th className="py-3 text-left font-semibold pr-4 w-20">KAP {"<"}</th>
                <th className="py-3 text-left font-semibold pr-4 w-20">BOPO {"<"}</th>
              </tr>
            </thead>
            <tbody>
              {racData ? (
                <tr>
                  <td className="py-3 pr-4 font-normal">{Number(racData.asset).toLocaleString('id-ID')}</td>
                  <td className="py-3 pr-4 font-normal">{Number(racData.laba_sebelum).toLocaleString('id-ID')}</td>
                  <td className="py-3 pr-4 font-normal">{Number(racData.laba_sekarang).toLocaleString('id-ID')}</td>
                  <td className="py-3 pr-4 font-normal">{racData.npl_net?.toFixed(2)}%</td>
                  <td className="py-3 pr-4 font-normal">{racData.kpmm?.toFixed(2)}%</td>
                  <td className="py-3 pr-4 font-normal">{racData.roa?.toFixed(2)}%</td>
                  <td className="py-3 pr-4 font-normal">{racData.kap?.toFixed(2)}%</td>
                  <td className="py-3 pr-4 font-normal">{racData.bopo?.toFixed(2)}%</td>
                </tr>
              ) : (
                <tr>
                  <td className="py-3 pr-4 text-center" colSpan={8}>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fetch Data BPR */}
      <section className="mb-10 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#173E72]">Fetch Data BPR</h1>
          <button className="bg-[#1E3A70] text-white text-sm font-semibold rounded-md px-5 py-2">
            Fetch Data
          </button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-[#D1D9E6] overflow-auto w-full">
          <table className="table-fixed w-full text-xs text-[#1E1E1E]">
            <thead>
              <tr className="border-b border-[#D1D9E6]">
                <th className="w-[5%] py-3 text-left font-semibold">No</th>
                <th className="w-[20%] py-3 text-left font-semibold">Start</th>
                <th className="w-[25%] py-3 text-left font-semibold">End</th>
                <th className="w-[25%] py-3 text-left font-semibold">Periode Laporan</th>
                <th className="w-[15%] py-3 text-left font-semibold">Status</th>
                <th className="w-[10%] py-3 text-left font-semibold">User</th>
              </tr>
            </thead>
            <tbody>
              {fetchHistory.length > 0 ? (
                fetchHistory.map((item, index) => (
                  <tr key={index} className="border-b border-[#D1D9E6]">
                    <td className="py-3 pr-4 font-semibold">{item.No}</td>
                    <td className="py-3 pr-4">
                      {new Date(item.start).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      {item.start.slice(17, 22)} WIB
                    </td>
                    <td className="py-3 pr-4">
                      {item.end ? (
                        <>
                          {new Date(item.end).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}{' '}
                          {item.end.slice(17, 22)} WIB
                        </>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 pr-4">{item['Periode Laporan']}</td>
                    <td className="py-3 pr-4">{item.Status}</td>
                    <td className="py-3 pr-4">{item.User}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-center" colSpan={6}>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination */}
      {/* <nav aria-label="Pagination" className="flex justify-center items-center space-x-2 py-4 bg-[#E9EDF5] rounded-md">
        <span className="text-xs text-[#4B4B4B]">Previous</span>
        <button aria-current="page" className="bg-[#1E3A70] text-white text-xs font-semibold rounded-md w-7 h-7 flex items-center justify-center">
          1
        </button>
        <button className="bg-[#D9D9D9] text-[#4B4B4B] text-xs font-semibold rounded-md w-7 h-7 flex items-center justify-center">
          2
        </button>
        <button className="bg-[#D9D9D9] text-[#4B4B4B] text-xs font-semibold rounded-md w-7 h-7 flex items-center justify-center">
          3
        </button>
        <button className="bg-[#D9D9D9] text-[#4B4B4B] text-xs font-semibold rounded-md w-7 h-7 flex items-center justify-center">
          4
        </button>
        <button className="bg-[#D9D9D9] text-[#4B4B4B] text-xs font-semibold rounded-md w-7 h-7 flex items-center justify-center">
          5
        </button>
        <span className="text-xs text-[#4B4B4B]">Next</span>
      </nav> */}
    </div>
  );
}
