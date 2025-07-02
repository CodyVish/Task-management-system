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
            <nav className='bg-transparent backdrop-blur-md py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 sticky flex items-center shadow-2xl' style={{boxShadow: '0 4px 24px 0 rgba(70,92,218,0.15)'}}>
                {/* Left section with back button and heading */}
                <div className='flex items-center gap-x-3 sm:gap-x-4 flex-shrink-0'>
                    <Link 
                      to={"/boards"} 
                      className='group relative p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-out hover:scale-125 hover:-translate-x-1 hover:shadow-lg dark:hover:shadow-blue-500/20'
                      title="Back to Boards"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-lg' />
                    </Link>
                    
                    <span className='text-sm sm:text-base md:text-lg lg:text-xl font-extrabold whitespace-nowrap'>
                        <span className='text-black dark:text-white font-bold' style={{fontFamily: 'Playfair Display, serif'}}>Task </span>
                        <span className='bg-gradient-to-r from-[#EE0089] to-[#465CDA] bg-clip-text text-transparent drop-shadow-[0_0_10px_#465CDA,0_0_20px_#465CDA]'>Manager</span>
                    </span>
                </div>
                
                {/* Center section with search */}
                <div className='flex-1 flex justify-center px-4 sm:px-6 md:px-8'>
                    <Input 
                      className='w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] bg-[#f3f4f6] dark:bg-[#2a2a2a] shadow-md border border-black/20 dark:border-gray-600 focus:border-black/60 dark:focus:border-blue-400 focus:ring-0 transition-all duration-200 hover:scale-105 focus:scale-105 text-xs sm:text-sm' 
                      placeholder='🔍 Search tasks...' 
                      onChange={(e) => setSearchText(e.target.value)} 
                    />
                </div>
                
                {/* Right section with controls */}
                <div className='flex items-center gap-x-3 sm:gap-x-4 flex-shrink-0'>
                    {/* Add Category Button - Hidden on mobile, visible on larger screens */}
                    <Button 
                      className='hidden lg:flex h-9 px-4 py-2 text-sm transition-transform duration-200 hover:scale-105' 
                      variant="gradient" 
                      onClick={() => openModal("category", "", null)}
                    >
                      Add Category
                    </Button>
                    
                    <button 
                      onClick={toggleTheme} 
                      className='group relative p-2 sm:p-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#232323] transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg dark:hover:shadow-blue-500/25 hover:border-blue-400 dark:hover:border-blue-500' 
                      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      {theme === 'light' ? (
                        <Moon className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-700 group-hover:text-blue-600 transition-colors duration-300' />
                      ) : (
                        <Sun className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300' />
                      )}
                    </button>
                    
                    <button 
                      className='group relative p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110' 
                      onClick={() => logout()} 
                      title="Logout"
                    >
                      <LogOut className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500 group-hover:text-red-600 transition-colors duration-200' />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar;