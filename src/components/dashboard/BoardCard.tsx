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
        <div className='flex items-center justify-between rounded-md p-5 shadow-md transition-transform transition-shadow duration-200 hover:shadow-2xl hover:-translate-y-2' style={{background: color || '#fff'}}>
            <div className='break-all overflow-wrap'>
                <p className='font-semibold text-lg lg:text-xl !text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.7)]'>{title}</p>
                <p className='font-light text-sm !text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.7)]'>{desc}</p>
            </div>
            <div className='flex gap-x-1'>
                <SquareArrowOutUpRight className='cursor-pointer' onClick={() => navigate(`/board/${board_id}`)} />
                <Trash2 className='cursor-pointer' onClick={handleDeleteBoard} />
            </div>
        </div>
    )
}

export default BoardCard;