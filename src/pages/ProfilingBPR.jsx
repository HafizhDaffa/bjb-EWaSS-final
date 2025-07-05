"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../helper/api"

export default function ProfilingBPR() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const [provinsiList, setProvinsiList] = useState([])
  const [kotaKabupatenList, setKotaKabupatenList] = useState([])
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [provinsi, setProvinsi] = useState("")
  const [kota, setKota] = useState("")
  const [bprData, setBprData] = useState([])
  const [onlyHealthy, setOnlyHealthy] = useState(false)
  const [onlyUnHealthy, setOnlyUnHealthy] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem("bprFilters")
    if (savedFilters) {
      try {
        const filters = JSON.parse(savedFilters)
        setSearchTerm(filters.searchTerm || "")
        setMonth(filters.month || "")
        setYear(filters.year || "")
        setProvinsi(filters.provinsi || "")
        setKota(filters.kota || "")
        setOnlyHealthy(filters.onlyHealthy || false)
        setOnlyUnHealthy(filters.onlyUnHealthy || false)
        setCurrentPage(filters.currentPage || 1)
      } catch (error) {
        console.error("Error loading saved filters:", error)
      }
    }
  }, [])

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (!isInitialLoad) {
      const filters = {
        searchTerm,
        month,
        year,
        provinsi,
        kota,
        onlyHealthy,
        onlyUnHealthy,
        currentPage,
      }
      localStorage.setItem("bprFilters", JSON.stringify(filters))
    }
  }, [searchTerm, month, year, provinsi, kota, onlyHealthy, onlyUnHealthy, currentPage, isInitialLoad])

  useEffect(() => {
    async function fetchProvinsi() {
      try {
        const response = await api.get("/bpr_lainnya/get_all_provinsi")
        if (response.data && response.data.provinsi) {
          setProvinsiList(response.data.provinsi)
        }
      } catch (error) {
        console.error("Gagal memuat data provinsi:", error)
      }
    }
    fetchProvinsi()
  }, [])

  useEffect(() => {
    async function fetchKotaByProvinsi() {
      if (!provinsi) {
        setKotaKabupatenList([])
        return
      }
      try {
        const response = await api.get(`/bpr_lainnya/get_all_kota?provinsi=${encodeURIComponent(provinsi)}`)
        if (response.data && response.data.kota_kabupaten) {
          setKotaKabupatenList(response.data.kota_kabupaten)
        }
      } catch (error) {
        console.error("Gagal memuat data kota/kabupaten:", error)
      }
    }
    fetchKotaByProvinsi()
  }, [provinsi])

  // Fetch data on initial load and when filters change
  useEffect(() => {
    if (provinsiList.length > 0) {
      // Wait for provinsi list to load first
      fetchBprData(currentPage)
      setIsInitialLoad(false)
    }
  }, [provinsiList]) // Trigger when provinsi list is loaded

  // Auto-fetch when filters change (except on initial load)
  useEffect(() => {
    if (!isInitialLoad) {
      fetchBprData(1)
      setCurrentPage(1)
    }
  }, [month, year, provinsi, kota, onlyHealthy, onlyUnHealthy])

  const fetchBprData = async (page = 1) => {
    try {
      const params = new URLSearchParams()
      if (year) params.append("tahun", year)
      if (month) params.append("bulan", month)
      if (provinsi) params.append("nama_provinsi", provinsi)
      if (kota) params.append("nama_kota", kota)
      if (onlyHealthy) params.append("status", "SEHAT")
      if (onlyUnHealthy) params.append("status", "TIDAK SEHAT")
      if (searchTerm) params.append("nama_bpr", searchTerm)
      params.append("page", page)
      params.append("per_page", 10)

      const response = await api.get(`/bpr_scrapping/get_all_bpr?${params.toString()}`)
      if (response.data && response.data.data) {
        setBprData(response.data.data)
        setCurrentPage(response.data.page)
        setTotalPages(Math.ceil(response.data.total / response.data.per_page))
      }
    } catch (error) {
      console.error("Gagal mengambil data BPR:", error)
    }
  }

  const handleDetailClick = (sandi) => {
    navigate(`/detail-bpr/${sandi}`)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    fetchBprData(1)
    setCurrentPage(1)
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      fetchBprData(1)
      setCurrentPage(1)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    fetchBprData(page)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setMonth("")
    setYear("")
    setProvinsi("")
    setKota("")
    setOnlyHealthy(false)
    setOnlyUnHealthy(false)
    setCurrentPage(1)
    localStorage.removeItem("bprFilters")
    fetchBprData(1)
  }

  return (
    <section className="px-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#173E72]">Profiling BPR</h1>

      </div>

      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-lg p-6 grid grid-cols-1 md:grid-cols-[auto_auto_auto_1fr] gap-y-4 gap-x-4 items-center"
      >
        <label className="text-[13px] font-normal text-[#1E1E2D] col-span-1 md:col-span-1" htmlFor="periode">
          Periode Pelaporan
        </label>
        <select
          className="border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-1"
          id="month"
          name="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Semua Bulan</option>
          <option>Maret</option>
          <option>Juni</option>
          <option>September</option>
          <option>Desember</option>
        </select>
        <select
          className="border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-1"
          id="year"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
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
        <select
          className="border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-3"
          id="provinsi"
          name="provinsi"
          value={provinsi}
          onChange={(e) => setProvinsi(e.target.value)}
        >
          <option value="">Semua Provinsi</option>
          {provinsiList.map((prov, index) => (
            <option key={index} value={prov}>
              {prov}
            </option>
          ))}
        </select>

        <label className="text-[13px] font-normal text-[#1E1E2D] col-span-1 md:col-span-1" htmlFor="kota">
          Kota/Kabupaten
        </label>
        <select
          className="border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D] col-span-1 md:col-span-3"
          id="kota"
          name="kota"
          value={kota}
          onChange={(e) => setKota(e.target.value)}
        >
          <option value="">Semua Kota</option>
          {kotaKabupatenList.map((kotaItem, index) => (
            <option key={index} value={kotaItem}>
              {kotaItem}
            </option>
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
                const checked = e.target.checked
                setOnlyHealthy(checked)
                setOnlyUnHealthy(false) // uncheck yang lain
              }}
              className="w-4 h-4"
            />
            <label className="ml-2" htmlFor="onlyHealthy">
              Tampilkan data BPR yang Sehat
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="onlyUnHealthy"
              checked={onlyUnHealthy}
              onChange={(e) => {
                const checked = e.target.checked
                setOnlyUnHealthy(checked)
                setOnlyHealthy(false) // uncheck yang lain
              }}
              className="w-4 h-4"
            />
            <label className="ml-2" htmlFor="onlyUnHealthy">
              Tampilkan data BPR yang Tidak Sehat
            </label>
          </div>
        </div>

        <button
          className="bg-[#1E3A70] text-white rounded-md py-3 px-6  hover:bg-[#1e3970d7] transition-colors"
          type="submit"
        >
          Tampilkan
        </button>
                <button
          onClick={clearFilters}
          className="bg-[#1E3A70] text-white rounded-md py-3 px-6  hover:bg-[#1e3970d7] transition-colors"
        >
          Reset Filter
        </button>
      </form>

      <section className="bg-[#F3F5F9] rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
          <div className="w-full md:w-72">
            <input
              className="w-full border border-[#D1D5DB] rounded-md py-2 px-3 text-[13px] text-[#1E1E2D]"
              placeholder="Cari..."
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
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
                <th className="border-b border-[#E6E8EC] text-center py-2 px-3 w-[110px] cursor-pointer select-none">
                  Aset
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[90px] cursor-pointer select-none">
                  Laba Tahun Sebelumnya
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[100px] cursor-pointer select-none">
                  Laba Saat Ini
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  NPL Nett
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  KPMM
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  ROA
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  KAP
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  BOPO
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  Result
                </th>
                <th className="border-b border-[#E6E8EC] text-right py-2 px-3 w-[70px] cursor-pointer select-none">
                  Periode
                </th>
                <th className="border-b border-[#E6E8EC] text-left py-2 px-3 w-[90px] min-w-[90px]">Data Lainnya</th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-normal text-[#1E1E2D]">
              {bprData.length === 0 ? (
                <tr>
                  <td colSpan="14" className="text-center py-4 text-[#6B7280]">
                    Data tidak ditemukan.
                  </td>
                </tr>
              ) : (
                bprData.map((item, index) => {
                  const formatCurrency = (num) => new Intl.NumberFormat("id-ID").format(num)
                  const resultColor = item.status === "SEHAT" ? "text-green-600" : "text-red-600"
                  const indicatorColor = item.status === "SEHAT" ? "bg-green-600" : "bg-red-600"
                  return (
                    <tr key={`${item.sandi}-${index}`} className="border-t border-[#E6E8EC]">
                      <td className="py-2 px-3">{(currentPage - 1) * 10 + index + 1}</td>
                      <td className="py-2 px-3 font-semibold">{item.sandi}</td>
                      <td className="py-2 px-3 max-w-[140px]">{item.nama_bpr}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(item.asset)}</td>
                      <td
                        className={`py-2 px-3 text-right ${item.laba_desember_tahun_sebelum < 0 ? "text-[#D14343]" : ""}`}
                      >
                        {formatCurrency(item.laba_desember_tahun_sebelum)}
                      </td>
                      <td className={`py-2 px-3 text-right ${item.laba_saat_ini < 0 ? "text-[#D14343]" : ""}`}>
                        {formatCurrency(item.laba_saat_ini)}
                      </td>
                      <td className="py-2 px-3 text-right">{item.npl_net}%</td>
                      <td className="py-2 px-3 text-right">{item.kpmm}%</td>
                      <td className={`py-2 px-3 text-right ${item.roa < 0 ? "text-[#D14343]" : ""}`}>{item.roa}%</td>
                      <td className="py-2 px-3 text-right">{item.kap}%</td>
                      <td className="py-2 px-3 text-right">{item.bopo}%</td>
                      <td className={`py-2 px-3 ${resultColor} flex items-center gap-1`}>
                        <span className={`result-indicator ${indicatorColor} w-2 h-2 rounded-full`}></span>
                        {item.status}
                      </td>
                      <td className="py-2 px-3 text-left">{item.periode}</td>
                      <td className="py-2 px-3">
                        <button
                          className="bg-[#1E3A70] text-white text-[11px] font-semibold rounded px-3 py-1 hover:bg-[#16325a] transition-colors"
                          onClick={() => handleDetailClick(item.sandi)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <nav aria-label="Pagination" className="flex justify-center items-center gap-2 mt-6 text-[11px] text-[#6B7280]">
          <button
            className="px-2 py-1 disabled:opacity-50"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {(() => {
            const pages = []
            const maxPageButtons = 10
            if (totalPages <= maxPageButtons) {
              // Total halaman sedikit, tampilkan semua
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
              }
            } else {
              const showLeftEllipsis = currentPage > 5
              const showRightEllipsis = currentPage < totalPages - 4
              const startPage = Math.max(2, currentPage - 2)
              const endPage = Math.min(totalPages - 1, currentPage + 2)
              pages.push(1) // Halaman pertama selalu ditampilkan
              if (showLeftEllipsis && startPage > 2) {
                pages.push("left-ellipsis")
              }
              for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
              }
              if (showRightEllipsis && endPage < totalPages - 1) {
                pages.push("right-ellipsis")
              }
              pages.push(totalPages) // Halaman terakhir
            }
            return pages.map((page, index) => {
              if (page === "left-ellipsis" || page === "right-ellipsis") {
                return (
                  <span key={index} className="px-1">
                    ...
                  </span>
                )
              }
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${currentPage === page ? "bg-[#1E3A70] text-white" : "bg-[#F3F5F9] hover:bg-[#E6E8EC]"}`}
                >
                  {page}
                </button>
              )
            })
          })()}
          <button
            className="px-2 py-1 disabled:opacity-50"
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </section>
    </section>
  )
}
