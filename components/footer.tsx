import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">CRYTEAM</h3>
            <p className="text-sm">© 2023 CRYTEAM. All rights reserved.</p>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>Discord Stats - A project for managing Discord server statistics</p>
            <a href="https://github.com/Yaroslavtatar/Dis-stat" className="flex items-center justify-center md:justify-end mt-2 text-primary hover:text-primary-foreground transition-colors">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

