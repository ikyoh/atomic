import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const flexVariants = cva(
  "flex gap-3",
  {
    variants: {
      orientation: {
        default: "flex-row",
        vertical: "flex-col",
        horozontal: "flex-row",
      },
      justifyContent: {
        default: 'justify-start items-center',
        center: 'justify-center items-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      flexWrap: {
        default: "flex-nowrap",
        nowrap: "flex-wrap",
      }
    },
    defaultVariants: {
      orientation: "default",
      justifyContent: "default",
    },
  }
)

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof flexVariants> { }

function Flex({ className, orientation, justifyContent, flexWrap, ...props }: FlexProps) {
  return (
    <div className={cn(flexVariants({ orientation, justifyContent, flexWrap }), className)} {...props} />
  )
}

export { Flex, flexVariants }
