import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { optional, z } from "zod"

import { nanoid } from 'nanoid'
import { useModal } from "@/store/modal";
import { useBoardStore, useCategoryStore } from "@/store/board";
import { useAuthStore } from "@/store/auth";

const formSchema = z.object({
    title: z.string().min(6, {
        message: "Title must be at least 6 characters.",
    }),
    description: optional(z.string()),
})

const palette = ["#FF3132", "#FE005F", "#EE0089", "#CC28AF", "#9948CB", "#465CDA"];
function getRandomPaletteColor() {
    return palette[Math.floor(Math.random() * palette.length)];
}

const CreateBoard = () => {
    const { isOpen, closeModal } = useModal();
    const { email } = useAuthStore();
    const { addBoard } = useBoardStore();
    const { addCategory } = useCategoryStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        const board = {
            board_id: nanoid(),
            email_id: email as string,
            title: values.title,
            desc: values.description,
            color: getRandomPaletteColor()
        }
        addBoard(board);

        const todo = {
            cat_id: nanoid(),
            board_id: board.board_id,
            name: 'ToDo',
            color: "#FF3132", // Red
            tasks:[]
        }
        const inProgress = {
            cat_id: nanoid(),
            board_id: board.board_id,
            name: 'In Progress',
            color: "#f0e7f6",
            tasks:[]
        }
        const done = {
            cat_id: nanoid(),
            board_id: board.board_id,
            name: 'Done',
            color: "#cbdfd8",
            tasks:[]
        }
        addCategory(todo);
        addCategory(inProgress);
        addCategory(done);

        form.reset();
        closeModal();
        toast({
            title:"Board Created",
            variant:"success"
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => closeModal()}>
            <DialogContent className="sm:max-w-md w-[95%] max-w-[400px] mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl text-center font-bold text-black dark:text-white">Create Board</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm sm:text-base text-black dark:text-white">Title</FormLabel>
                                    <FormControl>
                                        <Input className='shadow-lg text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 text-sm sm:text-base' placeholder="Enter title of the board" {...field} type='text' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm sm:text-base text-black dark:text-white">Description</FormLabel>
                                    <FormControl>
                                        <Input className='shadow-lg text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 text-sm sm:text-base' placeholder="Enter the board description" {...field} type='text' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full h-10 sm:h-11 text-sm sm:text-base" type="submit" variant="default">
                            Create
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBoard;