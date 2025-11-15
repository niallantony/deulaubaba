import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
// @ts-ignore
import hamburger from "@/assets/images/hamburger.png"
import { useModal } from "@/hooks/useModal"
import { useRouter } from "expo-router";
import { useProject } from "@/hooks/useProject";

export const SettingsMenuProject = ({ id }: { id: number }) => {

  const { show, hide } = useModal();
  const { deleteProject } = useProject();
  const router = useRouter();

  const handlePress = () => {
    show("projectSettings", {
      onDelete: handleDelete,
      onAddUser: handleAddUser,
      onEdit: handleEdit,

    })
  }

  const handleEdit = () => {
    router.push(`/(app)/projects/view/${id}/edit`);
    hide();
  }

  const handleAddUser = () => {
    router.push(`/(app)/projects/view/${id}/addUser`);
    hide();
  }

  const handleDelete = () => {
    deleteProject.mutate(id.toString())
    router.dismissAll();
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
