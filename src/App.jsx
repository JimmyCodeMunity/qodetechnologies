import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ProjectsPage from './pages/ProjectsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'
import LoadingScreen from './components/ui/LoadingScreen'

import AdminLayout from './admin/components/AdminLayout'
import AdminLoginPage from './admin/pages/AdminLoginPage'
import AdminDashboardPage from './admin/pages/AdminDashboardPage'
import AdminProjectsPage from './admin/pages/AdminProjectsPage'
import AdminUsersPage from './admin/pages/AdminUsersPage'
import AdminRequestsPage from './admin/pages/AdminRequestsPage'
import AdminCommunicationsPage from './admin/pages/AdminCommunicationsPage'
import AdminSubscriptionsPage from './admin/pages/AdminSubscriptionsPage'
import AdminContactPage from './admin/pages/AdminContactPage'
import AdminProfilePage from './admin/pages/AdminProfilePage'

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboardPage /></AdminLayout>} />
        <Route path="/admin/projects" element={<AdminLayout><AdminProjectsPage /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><AdminUsersPage /></AdminLayout>} />
        <Route path="/admin/requests" element={<AdminLayout><AdminRequestsPage /></AdminLayout>} />
        <Route path="/admin/communications" element={<AdminLayout><AdminCommunicationsPage /></AdminLayout>} />
        <Route path="/admin/subscriptions" element={<AdminLayout><AdminSubscriptionsPage /></AdminLayout>} />
        <Route path="/admin/contact" element={<AdminLayout><AdminContactPage /></AdminLayout>} />
        <Route path="/admin/profile" element={<AdminLayout><AdminProfilePage /></AdminLayout>} />
      </Routes>
    </>
  )
}

export default App
