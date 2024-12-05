"use client"

import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ServerSwitcher } from "@/components/server-switcher"
import { Toaster } from "@/components/ui/toaster"
import { BarChart, Users, MessageCircle, Settings, Globe, Palette, Hash } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AdminLogin } from "@/components/admin-login"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

const menuItems = [
  {
    title: { en: "Overview", ru: "Обзор", de: "Übersicht" },
    href: "/",
    icon: BarChart,
  },
  {
    title: { en: "Users", ru: "Пользователи", de: "Benutzer" },
    href: "/users",
    icon: Users,
  },
  {
    title: { en: "Messages", ru: "Сообщения", de: "Nachrichten" },
    href: "/messages",
    icon: MessageCircle,
  },
  {
    title: { en: "Channels", ru: "Каналы", de: "Kanäle" },
    href: "/channels",
    icon: Hash,
  },
  {
    title: { en: "Settings", ru: "Настройки", de: "Einstellungen" },
    href: "/settings",
    icon: Settings,
  },
]

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'de', name: 'Deutsch' },
]

const themes = [
  { name: 'standard', label: { en: 'Standard', ru: 'Стандартный', de: 'Standard' } },
  { name: 'modern', label: { en: 'Modern', ru: 'Модерн', de: 'Modern' } },
  { name: 'minimalist', label: { en: 'Minimalist', ru: 'Минимализм', de: 'Minimalistisch' } },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('standard')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en'
    const savedTheme = localStorage.getItem('theme') || 'standard'
    setLanguage(savedLanguage)
    setTheme(savedTheme)
    document.documentElement.className = savedTheme
  }, [])

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.className = newTheme
  }

  const handleAdminLogin = () => {
    setIsAdmin(true)
  }

  return (
    <html lang={language} suppressHydrationWarning className={theme}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="bg-background border-b">
              <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ServerSwitcher />
                  <h1 className="text-xl font-bold">Discord Stats</h1>
                </div>
                <nav className="hidden md:flex space-x-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === item.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title[language]}
                    </Link>
                  ))}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Globe className="h-[1.2rem] w-[1.2rem]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {languages.map((lang) => (
                        <DropdownMenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
                          {lang.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Palette className="h-[1.2rem] w-[1.2rem]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {themes.map((t) => (
                        <DropdownMenuItem key={t.name} onClick={() => changeTheme(t.name)}>
                          {t.label[language]}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {!isAdmin && <AdminLogin onLogin={handleAdminLogin} />}
                </nav>
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </header>
            <div className="flex-grow">
              <div className="container mx-auto px-4 py-8">
                {pathname && (
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {children}
                  </motion.div>
                )}
              </div>
            </div>
            {isMenuOpen && (
              <div className="md:hidden">
                <nav className="bg-background border-t">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-3 ${
                        pathname === item.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title[language]}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

