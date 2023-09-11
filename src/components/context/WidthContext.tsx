import { useState, createContext, useEffect } from "react"

interface WidthContextType {
  width: number
}

interface WidthContextProp {
  children: React.ReactNode
}

const Width = createContext({} as WidthContextType)

const WidthContext = ({ children }: WidthContextProp) => {
  const [width, setWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const getInnerWidth = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", getInnerWidth)

    return () => {
      window.removeEventListener("resize", getInnerWidth)
    }
  }, [])

  return (
    <Width.Provider value={{ width }}>{children}</Width.Provider>
  )
}

export { WidthContext, Width }
