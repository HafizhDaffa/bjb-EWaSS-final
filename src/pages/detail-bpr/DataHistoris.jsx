import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../helper/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';



export default function DataHistorisPage() {

  const { id } = useParams();
  const [asetData, setAsetData] = useState([]);
  const [labaData, setLabaData] = useState([]);
  const [rasioData, setRasioData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [racData, setRacData] = useState(null);
  const [nplTerbaru, setNplTerbaru] = useState(null);
  const [kpmmTerbaru, setKpmmTerbaru] = useState(null);
  const [roaTerbaru, setRoaTerbaru] = useState(null);
  const [bopoTerbaru, setBopoTerbaru] = useState(null);
  const [kapTerbaru, setKapTerbaru] = useState(null);

  function getTicksWithFive(data, step = 10) {
    if (!data || data.length === 0) return [];

    const values = data.flatMap(d =>
      Object.values(d).filter(v => typeof v === 'number')
    );

    const min = Math.floor(Math.min(...values) / step) * step;
    const max = Math.ceil(Math.max(...values) / step) * step;

    const ticks = [];
    for (let i = min; i <= max; i += step) {
      ticks.push(i);
    }

    // Tambahkan angka 5 kalau belum ada dan berada dalam rentang
    if (5 > min && 5 < max && !ticks.includes(5)) {
      ticks.push(5);
      ticks.sort((a, b) => a - b);
    }

    return ticks;
  }



  useEffect(() => {
    const fetchAset = async () => {
      try {
        const response = await api.get(`/bpr_scrapping/get_bpr_asset/${id}`);

        const formatted = response.data.data.map((item) => ({
          name: `${item.bulan} ${item.tahun}`,
          value: item.asset_saat_ini // juta rupiah
        }));

        // sort by tahun dan bulan jika perlu
        const monthOrder = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        formatted.sort((a, b) => {
          const [bulanA, tahunA] = a.name.split(' ');
          const [bulanB, tahunB] = b.name.split(' ');
          if (tahunA !== tahunB) return parseInt(tahunA) - parseInt(tahunB);
          return monthOrder.indexOf(bulanA) - monthOrder.indexOf(bulanB);
        });

        setAsetData(formatted);
      } catch (error) {
        console.error('Gagal memuat data aset:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchLaba = async () => {
    try {
      const response = await api.get(`/bpr_scrapping/get_bpr_laba/${id}`);

      const monthOrder = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

      const formatted = response.data.data.map((item) => ({
        name: `${item.bulan} ${item.tahun}`,
        value: item.laba_saat_ini
      }));

      formatted.sort((a, b) => {
        const [bulanA, tahunA] = a.name.split(' ');
        const [bulanB, tahunB] = b.name.split(' ');
        if (tahunA !== tahunB) return parseInt(tahunA) - parseInt(tahunB);
        return monthOrder.indexOf(bulanA) - monthOrder.indexOf(bulanB);
      });

      setLabaData(formatted);
    } catch (error) {
      console.error('Gagal memuat data laba:', error);
    }
    };
    const fetchRasioData = async () => {
    try {
      const response = await api.get(`/bpr_scrapping/get_bpr_rac_lain/${id}`);

      const monthOrder = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

      const formatted = response.data.data.map((item) => ({
        name: `${item.bulan} ${item.tahun}`,
        NPL: item.npl_net,
        KPMM: item.kpmm,
        ROA: item.roa,
        KAP: item.kap,
        BOPO: item.bopo
      }));

      formatted.sort((a, b) => {
        const [bulanA, tahunA] = a.name.split(' ');
        const [bulanB, tahunB] = b.name.split(' ');
        if (tahunA !== tahunB) return parseInt(tahunA) - parseInt(tahunB);
        return monthOrder.indexOf(bulanA) - monthOrder.indexOf(bulanB);
      });

      if (formatted.length > 0) {
        const last = formatted[formatted.length - 1];
        setNplTerbaru(last.NPL);
        setKpmmTerbaru(last.KPMM);
        setRoaTerbaru(last.ROA);
        setBopoTerbaru(last.BOPO);
        setKapTerbaru(last.KAP);
      }

      setRasioData(formatted);
    } catch (error) {
      console.error('Gagal memuat data rasio:', error);
    }
    };
    const fetchRac = async () => {
      try {
        const response = await api.get('/rac/getData');
        setRacData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Gagal fetch RAC:', error);
      }
    };

    fetchRac();
    fetchRasioData();
    fetchAset();
    fetchLaba();
  }, [id]);
  return (
    <div className="space-y-6">
      <div className="p-0 text-xs text-gray-800 leading-relaxed">
        Berdasarkan data historis dan indikator keuangan, hasil menunjukkan
        <strong>
           performa yang kuat dan risiko yang baik
        </strong>
        . Proyeksi ke depan tetap berada dalam batas sehat sesuai standar regulator, data menunjukkan
      </div>
      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">

        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between min-h-[80px]">
          <div className="flex-1 pr-3">
            <div className="font-semibold text-xs leading-snug text-gray-900">
              {nplTerbaru !== null && racData && nplTerbaru > racData.npl_net
                ? 'Risiko kredit meningkat'
                : 'Risiko kredit rendah'
              }
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">
              {nplTerbaru !== null && racData && nplTerbaru > racData.npl_net
                ? 'NPL mengalami kenaikan'
                : 'NPL stabil atau menurun'
              }
            </div>
          </div>
          {nplTerbaru !== null && racData && nplTerbaru > racData.npl_net ? (
            <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-times text-red-600 text-sm"></i>
            </div>
          ) : (
            <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check text-green-600 text-sm"></i>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between min-h-[80px]">
          <div className="flex-1 pr-3">
            <div className="font-semibold text-xs leading-snug text-gray-900">
              {kpmmTerbaru !== null && roaTerbaru !== null && racData &&
                (kpmmTerbaru <= racData.kpmm || roaTerbaru <= racData.roa)
                ? 'Modal dan profitabilitas melemah'
                : 'Modal dan profitabilitas yang kuat'
              }
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">
              {kpmmTerbaru !== null && roaTerbaru !== null && racData &&
                (kpmmTerbaru <= racData.kpmm || roaTerbaru <= racData.roa)
                ? 'KPMM dan ROA tidak sehat'
                : 'KPMM dan ROA baik'
              }
            </div>
          </div>
          {kpmmTerbaru !== null && roaTerbaru !== null && racData &&
            (kpmmTerbaru <= racData.kpmm || roaTerbaru <= racData.roa) ? (
            <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-times text-red-600 text-sm"></i>
            </div>
          ) : (
            <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check text-green-600 text-sm"></i>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between min-h-[80px]">
          <div className="flex-1 pr-3">
            <div className="font-semibold text-xs leading-snug text-gray-900">
              {bopoTerbaru !== null && racData && bopoTerbaru > racData.bopo
                ? 'Efisiensi operasional menurun'
                : 'Efisiensi operasional yang terjaga'
              }
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">
              {bopoTerbaru !== null && racData && bopoTerbaru > racData.bopo
                ? 'BOPO memiliki beban tinggi'
                : 'BOPO terkendali'
              }
            </div>
          </div>
          {bopoTerbaru !== null && racData && bopoTerbaru > racData.bopo ? (
            <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-times text-red-600 text-sm"></i>
            </div>
          ) : (
            <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check text-green-600 text-sm"></i>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between min-h-[80px]">
          <div className="flex-1 pr-3">
            <div className="font-semibold text-xs leading-snug text-gray-900">
              {kapTerbaru !== null && racData && kapTerbaru > racData.kap
                ? 'Kualitas aset perlu ditinjau'
                : 'Kualitas aset yang sehat'
              }
              
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">
              {kapTerbaru !== null && racData && kapTerbaru > racData.kap
                ? 'KAP tinggi memiliki potensi risiko pada aset produktif'
                : 'KAP menunjukkan pengelolaan yang baik'
              }
              
            </div>
          </div>
          {kapTerbaru !== null && racData && kapTerbaru > racData.kap ? (
            <div className="bg-red-200 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-times text-red-600 text-sm"></i>
            </div>
          ) : (
            <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check text-green-600 text-sm"></i>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 text-xs text-gray-900 leading-relaxed">
        BPR ini diprediksi akan tetap
        <strong>
         sehat secara finansial dan layak diberikan kredit
        </strong>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Aset</h2>
        <div className="h-[300px]">
          {loading ? (
            <div className="text-center text-gray-500">Memuat data aset...</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={asetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => value / 1_000_000_000} />
                <Tooltip 
                  formatter={(value) => new Intl.NumberFormat('id-ID').format(value)}
                  labelFormatter={(label) => `Periode: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1e3a8a"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-2">*Dalam milyar Rp.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Laba</h2>
        <div className="h-[300px]">
          {labaData.length === 0 ? (
            <div className="text-center text-gray-500">Memuat data laba...</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={labaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => value / 1_000_000_000} />
                <Tooltip
                  formatter={(value) => new Intl.NumberFormat('id-ID').format(value)}
                  labelFormatter={(label) => `Periode: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0cb45b"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-2">*Dalam Milyar Rp.</p>
      </div>


      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Rasio Keuangan</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rasioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis ticks={getTicksWithFive(rasioData, 10)} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="NPL" stroke="#ff6803" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="KPMM" stroke="#ad2000" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="ROA" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="KAP" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="BOPO" stroke="#4d37a6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">*Dalam bentuk %</p>
      </div>
    </div>
  );
}
