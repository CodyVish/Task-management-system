import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useModal } from '@/store/modal';
import { useTheme } from '@/store/theme-context';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
      const { logout } = useAuthStore();
      const { openModal } = useModal();
      const { theme, toggleTheme } = useTheme();
      return (
            <>
                  <nav className='bg-transparent backdrop-blur-md py-5 px-6 sticky flex justify-between items-center shadow-2xl' style={{boxShadow: '0 4px 24px 0 rgba(70,92,218,0.15)'}}>
                        <div className='text-3xl lg:text-5xl font-extrabold text-white drop-shadow-[0_0_10px_#465CDA,0_0_20px_#465CDA]'>
                              <span className='text-xl lg:text-[2.5rem] font-extrabold'>
                                    <span className='text-black dark:text-white'>Task </span>
                                    <span className='bg-gradient-to-r from-[#EE0089] to-[#465CDA] bg-clip-text text-transparent drop-shadow-[0_0_10px_#465CDA,0_0_20px_#465CDA]'>Manager</span>
                              </span>
                        </div>
                        <div className='flex items-center space-x-5'>
                              <Button className='h-9 px-3 md:h-10 md:px-4 md:py-2 transition-transform duration-200 hover:scale-105' variant="gradient" onClick={() => openModal("board", "", null)}>Create Board</Button>
                              <button onClick={toggleTheme} className='p-2 rounded-full border border-gray-300 bg-white dark:bg-[#232323] dark:border-gray-700 transition-colors mx-2' title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
                                {theme === 'light' ? <Moon className='w-5 h-5 text-gray-700' /> : <Sun className='w-5 h-5 text-yellow-400' />}
                              </button>
                              <button className='transition-transform duration-200 hover:scale-125' onClick={() => logout()} title="Logout">
                                    <LogOut className='w-7 h-7 text-red-500' />
                              </button>
                        </div>
                  </nav>
            </>
      )
}

export default Navbar;