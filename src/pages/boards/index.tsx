import { useMemo } from 'react';
import NoBoard from '@/components/dashboard/NoBoard';
import BoardCard from '@/components/dashboard/BoardCard';
import { useAuthStore } from '@/store/auth';
import { useBoardStore } from '@/store/board';

const Dashboard = () => {
      const { boards } = useBoardStore();
      const { email } = useAuthStore();
      const userBoards = useMemo(() => Object.values(boards).filter((board) => board.email_id === email), [boards, email]);
      return (
            <div className="h-full px-3 sm:px-4 md:px-6 lg:px-8 pt-6 sm:pt-8 pb-6">
                  {userBoards.length === 0 ? (
                        <NoBoard />
                  ) : (
                        <div className='grid gap-3 sm:gap-4 md:gap-x-4 md:gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                              {userBoards.map(board => <BoardCard key={board.board_id} {...board} />)}
                        </div>
                  )}
            </div>
      )
}

export default Dashboard