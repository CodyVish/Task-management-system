import { useState } from 'react'
import { Task, useCategoryStore } from '@/store/board';
import { useModal } from '@/store/modal';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { Draggable } from "react-beautiful-dnd";
import { toast } from "../ui/use-toast";

interface TaskCardProps extends Task {
    id: number;
}
const TaskCard = ({ title, desc, due_date, labels, task_id, cat_id, board_id, id }: TaskCardProps) => {
    const task = {
        task_id,
        title,
        desc,
        due_date,
        labels,
        cat_id,
        board_id
    }
    const { openModal } = useModal();
    const { deleteTask } = useCategoryStore();
    
    const handleDeleteTask = () => {
        deleteTask(task_id, cat_id);
        toast({
            title: "Task deleted",
            variant: "destructive"
        })
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    }

    return (
        <Draggable draggableId={task_id} index={id}>
            {(provided) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='bg-white dark:bg-[#232323] border-[#ddd] dark:border-[#333] border-2 shadow-sm rounded-lg p-4 transition-transform transition-shadow duration-200 hover:shadow-2xl hover:-translate-y-2'>
                <div className='flex items-start justify-between'>
                    <div className='flex-1 min-w-0 mr-2'>
                        <p className='font-semibold text-lg break-words overflow-hidden text-black dark:text-white'>{title}</p>
                        <p className='text-[#5a5a65] dark:text-gray-300 text-sm mt-[-5px] break-words overflow-hidden'>{desc}</p>
                    </div>
                    <div className='flex items-center gap-x-2 flex-shrink-0'>
                        <Pencil className='cursor-pointer' size={16} onClick={() => openModal("edit-task", "", task)} />
                        <Trash2 className='cursor-pointer' size={16} onClick={handleDeleteTask} />
                    </div>
                </div>
                <div className='flex flex-col gap-y-1 mt-3'>
                    {due_date && (
                        <div className='flex items-center gap-x-2'>
                            <Calendar size={14} className='text-[#5a5a65]' />
                            <p className='text-[#5a5a65] text-sm font-medium'>
                                Due: {formatDate(due_date)}
                            </p>
                        </div>
                    )}
                    <div className='flex flex-wrap gap-x-1 mt-3'>
                        {labels?.map((label,i) => (
                            <div key={i} className='rounded-md px-2 py-1' style={{ backgroundColor: label.color }}>
                                <p className='text-sm font-medium'>{label.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
        </Draggable>
    )
}

export default TaskCard;