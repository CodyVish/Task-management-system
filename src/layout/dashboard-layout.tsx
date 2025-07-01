import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '@/components/dashboard/Navbar';
import CreateBoard from '@/components/dashboard/CreateBoard';
import { useAuthStore } from '@/store/auth';
import { useModal } from '@/store/modal';

const DashboardLayout = () => {
      const navigate = useNavigate();
      const { email } = useAuthStore();
      const { isOpen, type } = useModal();
      useEffect(() => {
            if (!email) navigate("/");
      }, [email, navigate])
      return (
            <div className='min-h-screen bg-[#e3f0ff] dark:bg-[#18181b] transition-colors text-black dark:text-white'>
                  <Navbar />
                  {isOpen && type==="board" && <CreateBoard />}
                  <Outlet />
            </div>
      )
}

export default DashboardLayout;