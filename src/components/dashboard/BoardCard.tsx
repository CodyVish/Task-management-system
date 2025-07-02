import { Board, useBoardStore } from '@/store/board';
import { SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const BoardCard = ({ title, desc, board_id, color }: Board) => {
    const navigate = useNavigate();
    const { deleteBoard } = useBoardStore();
    const handleDeleteBoard = () => {
        deleteBoard(board_id);
        toast({
            title: "Board deleted",
            variant: "destructive"
        })
    }
    return (
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-md p-3 sm:p-4 md:p-5 shadow-md transition-all duration-200 hover:shadow-2xl hover:-translate-y-2 gap-3 sm:gap-4' style={{background: color || '#fff'}}>
            <div className='break-all overflow-wrap flex-1 min-w-0'>
                <p className='font-semibold text-sm sm:text-base md:text-lg lg:text-xl !text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.7)] mb-1'>{title}</p>
                <p className='font-light text-xs sm:text-sm md:text-base !text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.7)] line-clamp-2'>{desc}</p>
            </div>
            <div className='flex gap-x-2 sm:gap-x-3 self-end sm:self-center flex-shrink-0'>
                <div title="Open Board">
                    <SquareArrowOutUpRight 
                      className='cursor-pointer w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white hover:text-gray-200 transition-colors duration-200 hover:scale-110' 
                      onClick={() => navigate(`/board/${board_id}`)} 
                    />
                </div>
                <div title="Delete Board">
                    <Trash2 
                      className='cursor-pointer w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white hover:text-red-200 transition-colors duration-200 hover:scale-110' 
                      onClick={handleDeleteBoard}
                    />
                </div>
            </div>
        </div>
    )
}

export default BoardCard;