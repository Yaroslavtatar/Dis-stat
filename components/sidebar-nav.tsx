"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, Users, MessageCircle, Settings, LogIn, Menu } from 'lucide-react'
import { useState } from "react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const [isCompact, setIsCompact] = useState(false)

  return (
    <nav className={cn("flex flex-col h-full", className)} {...props}>
      <ScrollArea className="flex-1">
        <div className={cn("flex flex-col space-y-2", isCompact && "items-center")}>
          {items.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "justify-start w-full",
                isCompact && "w-12 h-12 justify-center"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className={cn("mr-2 h-4 w-4", isCompact && "mr-0")} />
                {!isCompact && <span>{item.title}</span>}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className={cn("mt-auto space-y-2", isCompact && "flex flex-col items-center")}>
        <Button
          variant="outline"
          className={cn("w-full", isCompact && "w-12 h-12 p-0")}
          onClick={() => setIsCompact(!isCompact)}
        >
          <Menu className="h-4 w-4" />
          {!isCompact && <span className="ml-2">Компактное меню</span>}
        </Button>
        <Button
          variant="outline"
          className={cn("w-full", isCompact && "w-12 h-12 p-0")}
        >
          <LogIn className="h-4 w-4" />
          {!isCompact && <span className="ml-2">Войти</span>}
        </Button>
      </div>
    </nav>
  )
}

