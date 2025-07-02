import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useModal } from '@/store/modal';
import { Input } from '@/components/ui/input';
import { useSearchText } from '@/store/board';
import { Link } from 'react-router-dom';
import { useTheme } from '@/store/theme-context';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const { logout } = useAuthStore();
    const { openModal } = useModal();
    const { setSearchText } = useSearchText();
    const { theme, toggleTheme } = useTheme();
    return (
        <>
            <nav className='bg-transparent backdrop-blur-md py-5 px-6 sticky flex justify-between items-center shadow-2xl' style={{boxShadow: '0 4px 24px 0 rgba(70,92,218,0.15)'}}>
                <div className='flex items-center gap-x-1 text-white'>
                    <Link 
                      to={"/boards"} 
                      className='group relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-out hover:scale-125 hover:-translate-x-1 hover:shadow-lg dark:hover:shadow-blue-500/20'
                      title="Back to Boards"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <ArrowLeft className='lg:h-10 h-5 mt-[2px] text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-lg' />
                    </Link>
                    <span className='text-xl lg:text-3xl font-extrabold'>
                        <span className='text-black dark:text-white font-bold' style={{fontFamily: 'Playfair Display, serif'}}>Task </span>
                        <span className='bg-gradient-to-r from-[#EE0089] to-[#465CDA] bg-clip-text text-transparent drop-shadow-[0_0_10px_#465CDA,0_0_20px_#465CDA] animate-pulse'>Manager</span>
                    </span>
                </div>
                <Input className='w-[24%] lg:w-1/3 bg-[#f3f4f6] shadow-md border border-black/30 focus:border-black/60 focus:ring-0 transition-transform duration-200 hover:scale-105 focus:scale-105' placeholder={`🔍 Search for tasks using its name or labels`} onChange={(e) => setSearchText(e.target.value)} />
                <div className='flex items-center space-x-6'>
                    <Button className='hidden lg:block transition-transform duration-200 hover:scale-105' variant="gradient" onClick={() => openModal("category", "", null)}>Add Category</Button>
                    <button 
                      onClick={toggleTheme} 
                      className='group relative p-3 rounded-full border border-gray-300 bg-white dark:bg-[#232323] dark:border-gray-700 transition-all duration-300 ease-out hover:scale-125 hover:rotate-12 hover:shadow-2xl dark:hover:shadow-blue-500/25 hover:border-blue-400 dark:hover:border-blue-500 mx-2 hover:-translate-y-1' 
                      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                      style={{
                        boxShadow: theme === 'dark' 
                          ? '0 0 20px rgba(59, 130, 246, 0.3)' 
                          : '0 4px 15px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      {theme === 'light' ? (
                        <Moon className='w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors duration-300 drop-shadow-lg' />
                      ) : (
                        <Sun className='w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-lg animate-pulse' />
                      )}
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