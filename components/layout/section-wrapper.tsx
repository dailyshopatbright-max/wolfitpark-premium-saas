import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
  bgColor?: string
  id?: string
}

export function SectionWrapper({ children, className, bgColor, id }: Props) {
  return (
    <section
      id={id}
      className={cn("section-pad", className)}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {children}
    </section>
  )
}
