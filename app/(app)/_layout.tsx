import { Tabs, useNavigationContainerRef } from "expo-router";
import { StudentProvider } from "@/context/StudentContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native";

export default function Root() {
  const navRef = useNavigationContainerRef();
  return (
    <StudentProvider>
      <Tabs ref={navRef} screenOptions={{ headerShown: false, tabBarActiveTintColor: "#15673D" }}>
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
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle" color={color} />,
            popToTopOnBlur: true,
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
          name="addstudent/index"
          options={{
            href: null,
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
    </StudentProvider>
  )
}
