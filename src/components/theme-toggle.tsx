
import { Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme } = useTheme()

  return (
    <Button variant="ghost" size="icon" disabled>
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
      <span className="sr-only">Dark mode enabled</span>
    </Button>
  )
}
