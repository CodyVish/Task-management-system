import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useModal } from '@/store/modal';
import ThemeToggle from '@/components/ui/theme-toggle';

const Navbar = () => {
      const { logout } = useAuthStore();
      const { openModal } = useModal();
      return (
            <>
                  <nav className='bg-transparent backdrop-blur-md py-3 sm:py-4 md:py-5 px-3 sm:px-4 md:px-6 sticky flex justify-between items-center shadow-2xl' style={{boxShadow: '0 4px 24px 0 rgba(70,92,218,0.15)'}}>
                        <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-extrabold text-white drop-shadow-[0_0_10px_#465CDA,0_0_20px_#465CDA] flex-shrink-0'>
                              <span className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-[2.5rem] font-extrabold'>
                                    <span className='text-black dark:text-white font-bold' style={{fontFamily: 'Playfair Display, serif'}}>Task </span>
                                    <span className='bg-gradient-to-r from-[#EE0089] to-[#465CDA] bg-clip-text text-transparent drop-shadow-[0_0_10px_#465CDA,0_0_20px_#465CDA]'>Manager</span>
                              </span>
                        </div>
                        <div className='flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-8'>
                              <Button 
                                className='h-8 px-2 py-1 text-xs sm:h-9 sm:px-3 sm:text-sm md:h-10 md:px-4 md:py-2 md:text-base transition-transform duration-200 hover:scale-105 whitespace-nowrap' 
                                variant="gradient" 
                                onClick={() => openModal("board", "", null)}
                              >
                                <span className='hidden sm:inline'>Create Board</span>
                                <span className='sm:hidden'>Create</span>
                              </Button>
                              <ThemeToggle />
                              <button className='transition-transform duration-200 hover:scale-125 flex-shrink-0' onClick={() => logout()} title="Logout">
                                    <LogOut className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-500' />
                              </button>
                        </div>
                  </nav>
            </>
      )
}

export default Navbar;