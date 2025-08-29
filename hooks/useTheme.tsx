import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#FFF8F3", 
  surface: "#FFFFFF", 
  text: "#4A3428", 
  textMuted: "#9A8478", 
  border: "#E5D3B7", 
  primary: "#8B593E", 
  success: "#2ECC71", 
  warning: "#F4A261", 
  danger: "#E74C3C", 
  shadow: "#000000", 

  gradients: {
    background: ["#FFF8F3", "#F3E5D3"], 
    surface: ["#FFFFFF", "#FDF6F0"], 
    primary: ["#8B593E", "#6F4E37"], 
    success: ["#2ECC71", "#27AE60"], 
    warning: ["#F4A261", "#E76F51"], 
    danger: ["#E74C3C", "#C0392B"], 
    muted: ["#CBB8A9", "#A89F91"], 
    empty: ["#F3EDE7", "#E8DCCC"], 
  },

  backgrounds: {
    input: "#FFFFFF", 
    editInput: "#FFF5EC" 
  },

  statusBarStyle: "dark-content" as const,
};


const darkColors: ColorScheme = {
  bg: "#1C1B19",
  surface: "#2A2420",
  text: "#F5EDE6",
  textMuted: "#B89F91",
  border: "#3D322C",
  primary: "#A47148",
  success: "#27AE60",
  warning: "#E9A178",
  danger: "#E76F51",
  shadow: "rgba(0,0,0,0.6)", 

  gradients: {
    background: ["#1C1B19", "#2A2420"], 
    surface: ["#2A2420", "#3B322C"], 
    primary: ["#A47148", "#8B5E3C"], 
    success: ["#2ECC71", "#27AE60"], 
    warning: ["#E9A178", "#D98E5F"],  
    danger: ["#E76F51", "#C44536"], 
    muted: ["#6B5B52", "#4A3F38"], 
    empty: ["#2E2622", "#3B322C"], 
  },

  backgrounds: {
    input: "#2A2420",
    editInput: "#1C1B19",
  },

  statusBarStyle: "light-content" as const,
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
	// get the user choices reminder.
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};