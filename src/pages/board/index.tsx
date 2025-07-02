import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';
import { Task, useBoardStore, useCategoryStore, useSearchText } from "@/store/board";
import { useModal } from "@/store/modal";
import TaskCard from "@/components/board/TaskCard";
import Droppable from "@/components/board/StrictModeDroppable";
import { Button } from "@/components/ui/button";
import { DragDropContext, DroppableProvided, DropResult } from "react-beautiful-dnd";

const BoardPage = () => {
    const { boardID } = useParams();
    const navigate = useNavigate();
    const { boards } = useBoardStore();
    const { categories, deleteCategory, setTasks } = useCategoryStore();
    const { openModal } = useModal();
    const { searchText } = useSearchText();

    // Redirect to boards page if current board doesn't exist
    useEffect(() => {
        console.log(boards[boardID as string]);
        if (boardID === undefined || !boards[boardID]) navigate("/boards");
    }, [boardID, navigate, boards]);

    const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);

    // Get categories for current board
    const cats = useMemo(() => {
        return Object.values(categories).filter(cat => cat.board_id === boardID);
    }, [boardID, categories]);

    // Get all tasks for current board
    const boardTasks = useMemo(() => {
        const tasksArray = Object.values(categories)
            .flatMap((category) => category?.tasks)
            .filter((task) => task?.board_id === boardID);
        return tasksArray;
    }, [boardID, categories]);

    // Filter tasks based on search text (title or labels)
    useEffect(() => {
        const filteredArr = boardTasks.filter((task) =>
            task.title.toLowerCase().includes(searchText.toLowerCase()) ||
            task.labels?.some((label) => label.name.toLowerCase().includes(searchText.toLowerCase()))
        );
        setSearchedTasks(filteredArr);
    }, [searchText, boardTasks]);

    // Handle drag and drop between categories
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;
        // No change if dropped in same position
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceCatID = source.droppableId;
        const destCatID = destination.droppableId;

        // Update task category and move between lists
        const draggedTask = categories[sourceCatID].tasks[source.index];
        draggedTask.cat_id = destCatID;

        // Remove from source category
        categories[sourceCatID].tasks.splice(source.index, 1);
        setTasks(categories[sourceCatID].tasks, sourceCatID);

        // Add to destination category
        categories[destCatID].tasks.splice(destination.index, 0, draggedTask);
        setTasks(categories[destCatID].tasks, destCatID);
    }

    // Conditional content based on task availability
    let content = null;
    if (boardTasks.length === 0) {
        content = <div className="text-center mt-7"><p className="font-semibold text-lg">No tasks found</p> <p>Create tasks by clicking on the plus button next to each category!</p> </div>
    } else if (searchedTasks.length === 0) {
        content = <div className="text-center mt-7"><p className="font-semibold text-lg">No tasks found</p> <p>Try searching for something else!</p> </div>
    }

    return (
        <div className="h-full px-3 sm:px-4 md:px-5 pt-4 sm:pt-6 md:pt-7 bg-transparent dark:bg-transparent text-black dark:text-white transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="break-all overflow-wrap flex-1 min-w-0">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-black dark:text-white">{boards[boardID as string].title}</p>
                    <p className="mt-1 text-sm sm:text-base text-black dark:text-white line-clamp-2">{boards[boardID as string].desc}</p>
                </div>
                <Button 
                  className='block lg:hidden flex-shrink-0 h-9 px-3 text-sm' 
                  size={"sm"} 
                  variant="outline" 
                  onClick={() => openModal("category", "", null)}
                >
                  Add Category
                </Button>
            </div>
            <div className="bg-white dark:bg-[#232323] rounded-xl p-3 sm:p-4 md:p-5 mt-4 sm:mt-6 md:mt-7 transition-colors">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-7">
                        {cats.map((cat) => {
                            return (
                                <Droppable key={cat.cat_id} droppableId={cat.cat_id}>
                                    {(provided: DroppableProvided) => <div {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        {/* Category header with predefined colors and actions */}
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl sm:rounded-3xl px-2 sm:px-3 py-1 sm:py-[2px] text-center w-fit shadow-md transition-colors"
                                            style={{
                                                backgroundColor:
                                                    cat.name === 'ToDo' ? '#E85A4F' :
                                                    cat.name === 'In Progress' ? '#FFD166' :
                                                    cat.name === 'Done' ? '#8ABEB7' :
                                                    cat.color || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#232323' : '#e0e0e0')
                                            }}>
                                            <p className="font-semibold text-[#434445] text-xs sm:text-sm">
                                              {cat.name} 
                                              <span className='ml-1 text-[10px] sm:text-xs font-bold'>
                                                ({searchedTasks.filter((task) => task.cat_id === cat.cat_id).length})
                                              </span>
                                            </p>
                                            <div className="flex items-center gap-x-1 sm:gap-x-2">
                                              <CirclePlus 
                                                size={14} 
                                                onClick={() => openModal("create-task", cat.cat_id, null)} 
                                                className="cursor-pointer hover:scale-110 transition-transform" 
                                              />
                                              <Pencil 
                                                size={14} 
                                                onClick={() => openModal("edit-category", cat.cat_id, null)} 
                                                className="cursor-pointer hover:scale-110 transition-transform" 
                                              />
                                              <Trash2 
                                                size={14} 
                                                onClick={() => deleteCategory(cat.cat_id)} 
                                                className="cursor-pointer hover:scale-110 transition-transform text-red-600" 
                                              />
                                            </div>
                                        </div>
                                        {/* Render filtered tasks for this category */}
                                        <div className="flex flex-col gap-y-2 sm:gap-y-3 mt-3 sm:mt-4">
                                            {
                                                searchedTasks.filter((task) => task.cat_id === cat.cat_id).map((task, index) => (
                                                    <TaskCard id={index} key={task.task_id} {...task} />
                                                ))
                                            }
                                        </div>
                                        {provided.placeholder}
                                    </div>}
                                </Droppable>
                            )
                        })}
                    </div>
                </DragDropContext>
                {content && (
                  <div className="text-center mt-4 sm:mt-6 md:mt-7 px-4">
                    <p className="font-semibold text-base sm:text-lg text-gray-700 dark:text-gray-300">
                      {boardTasks.length === 0 ? "No tasks found" : "No tasks found"}
                    </p> 
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                      {boardTasks.length === 0 
                        ? "Create tasks by clicking on the plus button next to each category!" 
                        : "Try searching for something else!"
                      }
                    </p> 
                  </div>
                )}
            </div>
        </div>
    )
}

export default BoardPage;