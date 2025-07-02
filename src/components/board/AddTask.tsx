import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { optional, z } from "zod"

import { useModal } from "@/store/modal";
import { useCategoryStore } from "@/store/board";
import { nanoid } from 'nanoid'
import { labelColorsArr } from "@/constant";
import { X } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    description: optional(z.string()),
    dueDate: z.string().optional(),
    label: z.string().optional(),
    labelColor: z.string().optional(),
})

const AddTask = () => {
    const { boardID } = useParams();

    const [labels, setLabels] = useState<string[]>([]);
    const [labelColors, setLabelColors] = useState<string[]>([]);

    const { isOpen, closeModal, cat_id } = useModal();
    const { addTask } = useCategoryStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: "",
            label: "",
            labelColor: "",
        },
    })

    const handleAddLabel = () => {
        setLabels([...labels, form.getValues('label') ?? '']);
        setLabelColors([...labelColors, form.getValues('labelColor') ?? '']);
        form.setValue('label', '');
        form.setValue('labelColor', '');
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const task = {
            task_id: nanoid(),
            cat_id: cat_id as string,
            board_id: boardID as string,
            title: values.title,
            desc: values.description,
            due_date: values.dueDate,
            labels: labels?.map((label, index) => ({ name: label, color: labelColors[index] }))
        }
        console.log(task);
        addTask(task);

        form.reset();
        closeModal();
        toast({
            title:"Task Added",
            variant:"success"
        });
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => closeModal()}>
            <DialogContent className="sm:max-w-md overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold text-black dark:text-white">Add Task</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black dark:text-white">Title</FormLabel>
                                    <FormControl>
                                        <Input className='shadow-lg text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300' placeholder="Enter the title of the task" {...field} type='text' />
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
                                    <FormLabel className="text-black dark:text-white">Description</FormLabel>
                                    <FormControl>
                                        <Input className='shadow-lg text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300' placeholder="Enter the task description" {...field} type='text' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black dark:text-white">Due Date</FormLabel>
                                    <FormControl>
                                        <Input className='shadow-lg text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300' placeholder="dd-mm-yyyy" {...field} type='date' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="font-semibold text-sm">Priority Level</p>
                        <div className="flex gap-x-2 !mt-[2px]">
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className='shadow-lg text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300' placeholder="Enter the Priority" {...field} type='text' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="labelColor"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className='shadow-lg'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a priority color" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {labelColorsArr.map((obj) => (
                                                    <SelectItem value={obj.hex}>{obj.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button variant="outline" className="text-[#635fc7]" onClick={handleAddLabel} type="button">
                                Add Priority
                            </Button>
                        </div>
                        {labels.length>0 && <div className="flex flex-wrap items-center gap-x-1">
                            <p className="font-semibold text-sm">Labels:</p>
                            {labels?.map((label, index) => (
                                <div key={index} className="flex gap-x-1 items-center rounded-md px-2 py-1" style={{ backgroundColor: labelColors[index] }}>
                                    <p className="text-sm font-medium">{label}</p>
                                    <X className="cursor-pointer mt-[2px]" size={14} onClick={() => {
                                        setLabels(labels.filter((_, i) => i !== index));
                                        setLabelColors(labelColors.filter((_, i) => i !== index));
                                    }}/>
                                </div>
                            ))}
                        </div>}
                        <Button className="w-full" type="submit" variant="default">
                            Add
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTask;