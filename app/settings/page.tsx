"use client"

import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const languages = [
  { value: "en", label: "English" },
  { value: "ru", label: "Русский" },
  { value: "de", label: "Deutsch" },
]

const designs = [
  { value: "standard", label: "Стандартный" },
  { value: "modern", label: "Модерн" },
  { value: "minimalist", label: "Минимализм" },
]

export default function SettingsPage() {
  const [language, setLanguage] = useState("ru")
  const [design, setDesign] = useState("standard")
  const { toast } = useToast()

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    toast({
      title: "Язык изменен",
      description: `Язык интерфейса изменен на ${languages.find(lang => lang.value === value)?.label}`,
    })
  }

  const handleDesignChange = (value: string) => {
    setDesign(value)
    toast({
      title: "Дизайн изменен",
      description: `Стиль дизайна изменен на ${designs.find(d => d.value === value)?.label}`,
    })
    // Здесь бы мы применили новый стиль к приложению
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Настройки</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Тема</h2>
          <p className="text-muted-foreground mb-4">Выберите тему оформления приложения.</p>
          <ThemeToggle />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Язык</h2>
          <p className="text-muted-foreground mb-4">Выберите язык интерфейса.</p>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Выберите язык" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Стиль дизайна</h2>
          <p className="text-muted-foreground mb-4">Выберите стиль оформления приложения.</p>
          <Select value={design} onValueChange={handleDesignChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Выберите стиль" />
            </SelectTrigger>
            <SelectContent>
              {designs.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

