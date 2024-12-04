import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarNav } from "@/components/sidebar-nav"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ServerSwitcher } from "@/components/server-switcher"
import { Toaster } from "@/components/ui/toaster"
import { BarChart, Users, MessageCircle, Settings } from 'lucide-react'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Discord Server Stats",
  description: "Track your Discord server statistics",
}

const sidebarNavItems = [
  {
    title: "Обзор",
    href: "/",
    icon: BarChart,
  },
  {
    title: "Пользователи",
    href: "/users",
    icon: Users,
  },
  {
    title: "Сообщения",
    href: "/messages",
    icon: MessageCircle,
  },
  {
    title: "Настройки",
    href: "/settings",
    icon: Settings,
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} standard`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <aside className="hidden w-64 md:flex">
              <ScrollArea className="h-full py-4 border-r">
                <div className="flex flex-col items-start px-4 w-full">
                  <h1 className="text-xl font-bold mb-4">Discord Stats</h1>
                  <div className="mb-4 w-full">
                    <ServerSwitcher />
                  </div>
                  <SidebarNav items={sidebarNavItems} className="w-full" />
                </div>
              </ScrollArea>
            </aside>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

// Функция для изменения стиля дизайна
function changeDesign(design: string) {
  document.body.className = `${inter.className} ${design}`;
}

// Функция для изменения языка
function changeLanguage(lang: string) {
  // Здесь бы мы реализовали логику смены языка
  console.log(`Язык изменен на ${lang}`);
}

// Функция для входа в Discord
async function loginToDiscord() {
  // Здесь бы мы реализовали логику входа через Discord OAuth
  console.log('Попытка входа в Discord...');
  // Имитация асинхронного процесса
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('Вход выполнен успешно!');
}

// Эти функции можно было бы вызывать из соответствующих компонентов
// Например, в обработчиках событий кнопок или при изменении значений в селектах

export {
  changeDesign,
  changeLanguage,
  loginToDiscord
};

