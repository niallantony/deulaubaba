import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
// @ts-ignore
import hamburger from "@/assets/images/hamburger.png"
import { useModal } from "@/hooks/useModal"
import { useRouter } from "expo-router";

export const SettingsMenuProject = ({ id }: { id: number }) => {

  const { show, hide } = useModal();
  const router = useRouter();

  const handlePress = () => {
    show("projectSettings", {
      onDelete: () => { },
      onAddUser: () => { },
      onEdit: handleEdit,

    })
  }

  const handleEdit = () => {
    console.log("Edit pressed")
    router.push(`/(app)/projects/view/${id}/edit`);
    hide();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={hamburger} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
})
