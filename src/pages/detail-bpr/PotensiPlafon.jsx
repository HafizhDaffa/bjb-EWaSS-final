import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../helper/api'

export default function PotensiPlafonPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchPlafon = async () => {
      try {
        const response = await api.get(`/bpr_lainnya/plafon/${params.id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching plafon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlafon();
  }, [params.id]);

  const formatRupiah = (num) => {
    const parsed = Number(num);
    if (isNaN(parsed)) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(parsed);
  };

  if (loading || !data) {
    return <div className="px-4 py-8">Memuat data...</div>;
  }

  const formItems = [
    {
      label: "Kebutuhan Dana",
      description: "*laporan keuangan BPR di OJK",
      id: "kebutuhanDana",
      value: formatRupiah(data.kebutuhan_dana),
    },
    {
      label: "Total Dana Tersedia",
      description: "*laporan keuangan BPR di OJK",
      id: "danaTersedia",
      value: formatRupiah(data.dana_tersedia),
    },
  ];

  return (
    <div className="px-4 py-8 bg-[#fff]">
      <form className="space-y-6 max-w-4xl mb-10">
        {formItems.map((item) => (
          <div
            className="grid grid-cols-[minmax(240px,_320px)_1fr] gap-4 items-start"
            key={item.id}
          >
            <div>
              <label
                className="font-semibold text-sm block mb-1"
                htmlFor={item.id}
              >
                {item.label}
              </label>
              <span className="text-xs text-gray-600">{item.description}</span>
            </div>
            <input
              className="bg-[#F0F0F5] w-full rounded-md border border-gray-300 px-4 py-3 font-semibold text-base"
              id={item.id}
              readOnly
              type="text"
              value={item.value}
            />
          </div>
        ))}
      </form>

      {/* Penjelasan */}
      <p className="max-w-4xl mb-10 text-sm text-gray-700 leading-relaxed">
        Berdasarkan hasil perhitungan <strong>Potensi Pembiayaan Kredit,</strong> penyaluran 
        kredit kepada BPR dengan mempertimbangkan <strong>laporan keuangan</strong> masing-masing 
        BPR serta <strong>asumsi LDR ideal sebesar 92%.</strong> Perhitungan ini menghasilkan <strong>estimasi plafon kredit </strong>
        berdasarkan <strong>selisih</strong> antara <strong>kebutuhan dana dan total dana tersedia </strong> 
        dengan total potensi pembiayaan yang dapat diberikan sebesar :
      </p>

      {/* Box Estimasi Plafon */}
      <div className="max-w-md mb-14 mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 mb-1">Potensi Perkiraan Plafon</div>
            <div className="font-extrabold text-2xl text-gray-900">
              {formatRupiah(data.plafon)}
            </div>
          </div>
          <div className="bg-[#FFF7E6] text-[#FDC450] rounded-full p-4">
            <i className="fas fa-lock text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
