import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../helper/api'

export default function InformasiUmumPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  
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

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Memuat data BPR...</div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-10 text-red-600">Gagal memuat data.</div>
    );
  }

  return (
    <div className="p-6 text-sm text-gray-800 space-y-4">
      <div>
        <span className="font-semibold">Sandi</span><br />
        <span>{data.sandi}</span>
      </div>
      <div>
        <span className="font-semibold">Nama BPR</span><br />
        <span>{data.nama_bpr}</span>
      </div>
      <div>
        <span className="font-semibold">Alamat</span><br />
        <span>{data.alamat_bpr}</span>
      </div>
      <div>
        <span className="font-semibold">Daerah Tingkat II</span><br />
        <span>{data.kota_kabupaten}</span>
      </div>
      <div>
        <span className="font-semibold">Nomor Telepon</span><br />
        <span>{data.no_telepon}</span>
      </div>
      <div>
        <span className="font-semibold">Email</span><br />
        <span>{data.email}</span>
      </div>
      <div>
        <span className="font-semibold">Provinsi</span><br />
        <span>{data.provinsi}</span>
      </div>
      <div>
        <span className="font-semibold">Wilayah Kerja</span><br />
        <span>{data.wilayah_kerja_ojk}</span>
      </div>
    </div>
  );
}
