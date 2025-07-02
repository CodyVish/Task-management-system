import React, { useCallback, useMemo } from 'react';
import { Task, useCategoryStore } from '@/store/board';
import { useModal } from '@/store/modal';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { Draggable } from "react-beautiful-dnd";
import { toast } from "../ui/use-toast";

interface TaskCardProps extends Task {
    id: number;
}

// Draggable task card with optimized re-renders using React.memo and callbacks
const TaskCard = React.memo(({ title, desc, due_date, labels, task_id, cat_id, board_id, id }: TaskCardProps) => {
    // Memoized task object to prevent unnecessary re-renders
    const task = useMemo(() => ({
        task_id,
        title,
        desc,
        due_date,
        labels,
        cat_id,
        board_id
    }), [task_id, title, desc, due_date, labels, cat_id, board_id]);

    const { openModal } = useModal();
    const { deleteTask } = useCategoryStore((state) => ({ 
        deleteTask: state.deleteTask 
    }));
    
    // Optimized callbacks to prevent re-renders of child components
    const handleDeleteTask = useCallback(() => {
        deleteTask(task_id, cat_id);
        toast({
            title: "Task deleted",
            variant: "destructive"
        })
    }, [deleteTask, task_id, cat_id]);

    const handleEditTask = useCallback(() => {
        openModal("edit-task", "", task);
    }, [openModal, task]);

    const formattedDate = useMemo(() => {
        if (!due_date) return null;
        const date = new Date(due_date);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    }, [due_date]);

    return (
        // Draggable wrapper for react-beautiful-dnd integration
        <Draggable draggableId={task_id} index={id}>
            {(provided) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='bg-white dark:bg-[#232323] border-[#ddd] dark:border-[#333] border-2 shadow-sm rounded-lg p-3 sm:p-4 transition-all duration-200 hover:shadow-2xl hover:-translate-y-2 cursor-grab active:cursor-grabbing'>
                <div className='flex items-start justify-between gap-2'>
                    <div className='flex-1 min-w-0'>
                        <p className='font-semibold text-sm sm:text-base md:text-lg break-words text-black dark:text-white leading-tight'>{title}</p>
                        <p className='text-[#5a5a65] dark:text-gray-300 text-xs sm:text-sm mt-1 break-words line-clamp-3'>{desc}</p>
                    </div>
                    <div className='flex items-center gap-x-1 sm:gap-x-2 flex-shrink-0'>
                        <div 
                          className='p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer'
                          onClick={handleEditTask}
                          title="Edit Task"
                        >
                          <Pencil className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400' />
                        </div>
                        <div 
                          className='p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer'
                          onClick={handleDeleteTask}
                          title="Delete Task"
                        >
                          <Trash2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2 sm:gap-y-3 mt-2 sm:mt-3'>
                    {due_date && (
                        <div className='flex items-center gap-x-2'>
                            <Calendar size={12} className='text-[#5a5a65] dark:text-gray-400 flex-shrink-0' />
                            <p className='text-[#5a5a65] dark:text-gray-400 text-xs sm:text-sm font-medium'>
                                Due: {formattedDate}
                            </p>
                        </div>
                    )}
                    {labels && labels.length > 0 && (
                        <div className='flex flex-wrap gap-1 sm:gap-1.5'>
                            {labels.map((label,i) => (
                                <div key={i} className='rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1' style={{ backgroundColor: label.color }}>
                                    <p className='text-xs sm:text-sm font-medium text-white'>{label.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>}
        </Draggable>
    )
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;