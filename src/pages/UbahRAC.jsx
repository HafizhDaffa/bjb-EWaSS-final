import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UbahRACPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    npl: '3%',
    labaTahun: '5',
    labaBulan: '5',
    kap: '9,35%',
    kpmmCar: '14,00%',
    aset: '20.000.000.000',
    roa: '0,15%',
    bopo: '0,15%'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add API call here to save the data
    alert('Data RAC berhasil disimpan!');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <section className="flex-1 p-4 flex items-start justify-start bg-gray-50 pt-2 pl-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Ubah Data RAC
        </h1>
        <form 
          autoComplete="off" 
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-4" 
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-semibold text-gray-900" htmlFor="npl">
              NPL Nett
            </label>
            <input 
              className="col-span-2 border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A66]" 
              id="npl" 
              name="npl" 
              type="text" 
              value={formData.npl}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-semibold text-gray-900" htmlFor="labaTahun">
              Laba Tahun
            </label>
            <input 
              className="col-span-2 border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A66]" 
              id="labaTahun" 
              name="labaTahun" 
              type="text" 
              value={formData.labaTahun}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-semibold text-gray-900" htmlFor="labaBulan">
              Laba Bulan Berjalan
            </label>
            <input 
              className="col-span-2 border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A66]" 
              id="labaBulan" 
              name="labaBulan" 
              type="text" 
              value={formData.labaBulan}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-semibold text-gray-900" htmlFor="kap">
              KAP
            </label>
            <input 
              className="col-span-2 border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A66]" 
              id="kap" 
              name="kap" 
              type="text" 
              value={formData.kap}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-semibold text-gray-900" htmlFor="kpmmCar">
              KPMM/CAR
            </label>
            <input 
              className="col-span-2 border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A66]" 
              id="kpmmCar" 
              name="kpmmCar" 
              type="text" 
              value={formData.kpmmCar}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-semibold text-gray-900" htmlFor="aset">
              Aset
            </label>
            <input 
              className="col-span-2 border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A66]" 
              id="aset" 
              name="aset" 
              type="text" 
              value={formData.aset}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-semibold text-gray-900" htmlFor="roa">
              ROA
            </label>
            <input 
              className="col-span-2 border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A66]" 
              id="roa" 
              name="roa" 
              type="text" 
              value={formData.roa}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-semibold text-gray-900" htmlFor="bopo">
              BOPO
            </label>
            <input 
              className="col-span-2 border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A66]" 
              id="bopo" 
              name="bopo" 
              type="text" 
              value={formData.bopo}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <button 
              className="border border-[#1E3A66] text-[#1E3A66] font-semibold rounded-md px-6 py-2 hover:bg-[#1E3A66] hover:text-white transition-colors" 
              type="button"
              onClick={handleCancel}
            >
              Batal
            </button>
            <button 
              className="bg-[#1E3A66] text-white font-semibold rounded-md px-6 py-2 hover:bg-[#16325a] transition-colors" 
              type="submit"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
