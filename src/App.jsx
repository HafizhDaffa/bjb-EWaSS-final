import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import Layout from './components/layout/Layout.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UbahRAC from './pages/UbahRAC';
import ProfilingBPR from './pages/ProfilingBPR';
import DetailBPRLayout from './pages/detail-bpr/DetailBPRLayout';
import DetailBPRPage from './pages/detail-bpr';
import InformasiUmum from './pages/detail-bpr/InformasiUmum';
import DataHistoris from './pages/detail-bpr/DataHistoris';
import PotensiPlafon from './pages/detail-bpr/PotensiPlafon';
import PrivateRoute from './components/PrivateRoute';

// ✅ Tambahkan ToastContainer
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/ubah-rac" element={
              <PrivateRoute>
                <Layout>
                  <UbahRAC />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/profiling-bpr" element={
              <PrivateRoute>
                <Layout>
                  <ProfilingBPR />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/detail-bpr/:id" element={
              <PrivateRoute>
                <Layout>
                  <DetailBPRLayout>
                    <DetailBPRPage />
                  </DetailBPRLayout>
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/detail-bpr/:id/informasi-umum" element={
              <PrivateRoute>
                <Layout>
                  <DetailBPRLayout>
                    <InformasiUmum />
                  </DetailBPRLayout>
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/detail-bpr/:id/data-historis" element={
              <PrivateRoute>
                <Layout>
                  <DetailBPRLayout>
                    <DataHistoris />
                  </DetailBPRLayout>
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/detail-bpr/:id/potensi-plafon" element={
              <PrivateRoute>
                <Layout>
                  <DetailBPRLayout>
                    <PotensiPlafon />
                  </DetailBPRLayout>
                </Layout>
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      </Router>
    </AuthProvider>
  );
}
