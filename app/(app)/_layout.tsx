import { Tabs } from "expo-router";
import { Image } from "react-native";
import { StudentProvider } from "@/context/StudentContext";
import home from "@/assets/images/home.png"
import profile from "@/assets/images/profile.png"


export default function Root() {
  return (
    <StudentProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: () => <Image source={home} style={{ height: 30, resizeMode: "contain", width: 30 }} />
          }}
        />
        <Tabs.Screen
          name="student/index"
          options={{
            title: 'Student',
            tabBarIcon: () => <Image source={profile} style={{ height: 30, resizeMode: "contain", width: 30 }} />
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
