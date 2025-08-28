import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api"
import { ColorScheme, useTheme } from "@/hooks/useTheme"
import { useMutation, useQuery } from "convex/react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpinner from "@/components/LoadingSpinner";


export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const isLoading = todos === undefined

  if(isLoading) return <LoadingSpinner />

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
       <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        {todos?.map((todo) => <Text key={todo._id}>{todo.text}</Text>)}
       </SafeAreaView>
    </LinearGradient>
  );
}
