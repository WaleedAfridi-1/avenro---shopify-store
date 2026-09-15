"use client"
import { createContext, useContext, useState, ReactNode } from 'react'

type NavTheme = "light" | "dark" // "light" = white text (dark image), "dark" = dark text (light bg)

const NavThemeContext = createContext<{
  theme: NavTheme
  setTheme: (t: NavTheme) => void
}>({ theme: "light", setTheme: () => {} })

export const NavThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<NavTheme>("light")
  return (
    <NavThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </NavThemeContext.Provider>
  )
}

export const useNavTheme = () => useContext(NavThemeContext)