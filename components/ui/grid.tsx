import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const gridVariants = cva(
  "grid gap-6 grid-cols-2",
  {
    variants: {
      variant: {
        default:
          "md:grid-cols-4",
        1:
          "md:grid-cols-1",
        2:
          "md:grid-cols-2",
        3:
          "md:grid-cols-3",
        4:
          "md:grid-cols-4",
        5:
          "md:grid-cols-5",
        6:
          "md:grid-cols-6",
        7:
          "md:grid-cols-7",
        8:
          "md:grid-cols-8",
        9:
          "md:grid-cols-9",
        10:
          "md:grid-cols-10",
        11:
          "md:grid-cols-11",
        12:
          "md:grid-cols-12",
        13:
          "md:grid-cols-13",
        14:
          "md:grid-cols-14",
        15:
          "md:grid-cols-15",
        16:
          "md:grid-cols-16",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof gridVariants> { }

function Grid({ className, variant, ...props }: GridProps) {
  return (
    <div className={cn(gridVariants({ variant }), className)} {...props} />
  )
}

export { Grid, gridVariants }
