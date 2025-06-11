import { Tabs } from "expo-router";
import { StudentProvider } from "@/context/StudentContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Root() {
  return (
    <StudentProvider>
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#15673D" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
          }}
        />
        <Tabs.Screen
          name="student"
          options={{
            title: 'Student',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle" color={color} />
          }}
        />
        <Tabs.Screen
          name="dictionary"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />
          }}
        />
        <Tabs.Screen
          name="student/add"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </StudentProvider>
  )
}
