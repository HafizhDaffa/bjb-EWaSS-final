import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailBPRPage() {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    // Redirect to informasi-umum as default page
    navigate(`/detail-bpr/${params.id}/informasi-umum`, { replace: true });
  }, [navigate, params.id]);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Memuat detail BPR...</p>
      </div>
    </div>
  );
}
