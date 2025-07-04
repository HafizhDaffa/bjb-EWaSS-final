import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helper/api';
import { toast } from 'react-toastify';

export default function UbahRACPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    npl: '',
    labaTahun: '',
    labaBulan: '',
    kap: '',
    kpmmCar: '',
    aset: '',
    roa: '',
    bopo: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRAC = async () => {
      try {
        const response = await api.get('/rac/getData');
        const data = response.data;

        setFormData({
          npl: data.npl_net.toString(),
          labaTahun: data.laba_sebelum.toString(),
          labaBulan: data.laba_sekarang.toString(),
          kap: data.kap.toString(),
          kpmmCar: data.kpmm.toString(),
          aset: data.asset.toString(),
          roa: data.roa.toString(),
          bopo: data.bopo.toString()
        });
      } catch (error) {
        console.error('Gagal memuat data RAC:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRAC();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Hanya angka dan titik
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      npl_net: parseFloat(formData.npl),
      kap: parseFloat(formData.kap),
      kpmm: parseFloat(formData.kpmmCar),
      roa: parseFloat(formData.roa),
      bopo: parseFloat(formData.bopo),
      laba_sebelum: parseFloat(formData.labaTahun),
      laba_sekarang: parseFloat(formData.labaBulan),
      asset: parseFloat(formData.aset)
    };

    try {
      await api.put('/rac/update_rac', payload);
      toast.success('Data RAC berhasil diperbarui!', {position: "top-center"});
      navigate('/');
    } catch (error) {
      console.error('Gagal update RAC:', error);
      toast.error('Gagal memperbarui data RAC.', {position: "top-center"});
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) return <div className="p-4">Memuat data RAC...</div>;

  const renderInput = (id, label, isPercent = false) => (
    <div className="grid grid-cols-3 gap-4 items-center">
      <label className="text-sm font-semibold text-gray-900" htmlFor={id}>
        {label}
      </label>
      <div className="col-span-2 relative">
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A66] pr-8"
          id={id}
          name={id}
          type="text"
          value={formData[id]}
          onChange={handleInputChange}
        />
        {isPercent && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">%</span>
        )}
      </div>
    </div>
  );

  return (
    <section className="flex-1 p-4 flex items-start justify-start bg-gray-50 pt-2 pl-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Ubah Data RAC</h1>
        <form
          autoComplete="off"
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-4"
          noValidate
          onSubmit={handleSubmit}
        >
          {renderInput('npl', 'NPL Nett', true)}
          {renderInput('labaTahun', 'Laba Tahun')}
          {renderInput('labaBulan', 'Laba Bulan Berjalan')}
          {renderInput('kap', 'KAP', true)}
          {renderInput('kpmmCar', 'KPMM/CAR', true)}
          {renderInput('aset', 'Aset')}
          {renderInput('roa', 'ROA', true)}
          {renderInput('bopo', 'BOPO', true)}

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
