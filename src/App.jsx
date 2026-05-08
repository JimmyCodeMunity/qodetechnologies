import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ProjectsPage from './pages/ProjectsPage'
import ServiceRequestPage from './pages/ServiceRequestPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import LoadingScreen from './components/ui/LoadingScreen'
import UserProtectedRoute from './components/UserProtectedRoute'

import AdminLayout from './admin/components/AdminLayout'
import AdminLoginPage from './admin/pages/AdminLoginPage'
import AdminDashboardPage from './admin/pages/AdminDashboardPage'
import AdminProjectsPage from './admin/pages/AdminProjectsPage'
import AdminUsersPage from './admin/pages/AdminUsersPage'
import AdminLeadsPage from './admin/pages/AdminLeadsPage'
import AdminRequestsPage from './admin/pages/AdminRequestsPage'
import AdminSubscriptionsPage from './admin/pages/AdminSubscriptionsPage'
import AdminContactPage from './admin/pages/AdminContactPage'
import AdminProfilePage from './admin/pages/AdminProfilePage'
import AdminResetPasswordPage from './admin/pages/AdminResetPasswordPage'
import ProtectedRoute from './admin/components/ProtectedRoute'

function App() {
  return (
    <>
      <LoadingScreen />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/service-request" element={<ServiceRequestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<UserProtectedRoute><DashboardPage /></UserProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboardPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminLayout><AdminProjectsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminLayout><AdminUsersPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/requests" element={<ProtectedRoute><AdminLayout><AdminRequestsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/leads" element={<ProtectedRoute><AdminLayout><AdminLeadsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/subscriptions" element={<ProtectedRoute><AdminLayout><AdminSubscriptionsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/contact" element={<ProtectedRoute><AdminLayout><AdminContactPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute><AdminLayout><AdminProfilePage /></AdminLayout></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
