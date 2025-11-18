import { Tabs, useNavigationContainerRef } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Root() {
  const navRef = useNavigationContainerRef();

  return (
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
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
          popToTopOnBlur: true,
        }}
      />
      <Tabs.Screen
        name='feed'
        options={{
          title: 'Feed',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="comments" color={color} />

        }}
      />
      <Tabs.Screen
        name='projects'
        options={{
          title: 'Projects',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome name="pencil" size={28} color={color} />,
          popToTopOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="addstudent/index"
        options={{
          href: null,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="selectstudent/index"
        options={{
          href: null,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  )
}
