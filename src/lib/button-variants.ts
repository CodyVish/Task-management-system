import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC28AF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-[#CC28AF]",
  {
    variants: {
      variant: {
        default: "bg-[#FF3132] text-white hover:bg-[#FE005F] dark:bg-[#FF3132] dark:text-white dark:hover:bg-[#FE005F]",
        destructive:
          "bg-[#FE005F] text-white hover:bg-[#EE0089] dark:bg-[#FE005F] dark:text-white dark:hover:bg-[#EE0089]",
        outline:
          "border border-[#CC28AF] bg-white text-[#CC28AF] hover:bg-[#CC28AF] hover:text-white dark:border-[#CC28AF] dark:bg-white dark:text-[#CC28AF] dark:hover:bg-[#CC28AF] dark:hover:text-white",
        secondary:
          "bg-[#9948CB] text-white hover:bg-[#CC28AF] dark:bg-[#9948CB] dark:text-white dark:hover:bg-[#CC28AF]",
        ghost: "hover:bg-[#F5F7FA] hover:text-[#465CDA] dark:hover:bg-[#F5F7FA] dark:hover:text-[#465CDA]",
        link: "text-[#465CDA] underline-offset-4 hover:underline dark:text-[#465CDA]",
        gradient: "bg-gradient-to-r from-[#EE0089] to-[#465CDA] text-white shadow-lg hover:from-[#FF3132] hover:to-[#9948CB] hover:shadow-2xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
) 