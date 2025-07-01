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
                    <Link to={"/boards"}><ArrowLeft className='lg:h-10 h-5 mt-[2px] text-gray-500' /></Link>
                    <span className='text-xl lg:text-3xl font-extrabold'>
                        <span className='text-black dark:text-white'>Task </span>
                        <span className='bg-gradient-to-r from-[#EE0089] to-[#465CDA] bg-clip-text text-transparent drop-shadow-[0_0_10px_#465CDA,0_0_20px_#465CDA] animate-pulse'>Manager</span>
                    </span>
                </div>
                <Input className='w-[24%] lg:w-1/3 bg-[#f3f4f6] shadow-md border border-black/30 focus:border-black/60 focus:ring-0 transition-transform duration-200 hover:scale-105 focus:scale-105' placeholder={`🔍 Search for tasks using its name or labels`} onChange={(e) => setSearchText(e.target.value)} />
                <div className='flex items-center space-x-2'>
                    <Button className='hidden lg:block transition-transform duration-200 hover:scale-105' variant="gradient" onClick={() => openModal("category", "", null)}>Add Category</Button>
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