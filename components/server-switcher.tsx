"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

const authenticateDiscord = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        servers: [
          { value: "personal", label: "Личный сервер" },
          { value: "work", label: "Рабочий сервер" },
        ]
      })
    }, 2000)
  })
}

export function ServerSwitcher() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [servers, setServers] = React.useState([
    { value: "general", label: "Общий сервер" },
    { value: "gaming", label: "Игровой сервер" },
    { value: "development", label: "Сервер разработчиков" },
  ])
  const { toast } = useToast()

  const addDiscordServers = async () => {
    try {
      const result = await authenticateDiscord()
      if (result.success) {
        setServers([...servers, ...result.servers])
        toast({
          title: "Серверы добавлены",
          description: "Ваши серверы Discord успешно добавлены.",
        })
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить серверы Discord.",
        variant: "destructive",
      })
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? servers.find((server) => server.value === value)?.label
            : "Выберите сервер..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Поиск сервера..." />
          <CommandList>
            <CommandEmpty>Сервер не найден.</CommandEmpty>
            <CommandGroup heading="Серверы">
              {servers.map((server) => (
                <CommandItem
                  key={server.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === server.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {server.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem onSelect={addDiscordServers}>
                <Plus className="mr-2 h-4 w-4" />
                Добавить серверы Discord
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

