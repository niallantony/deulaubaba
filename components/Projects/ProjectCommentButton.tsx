import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
//@ts-ignore
import comment from "@/assets/images/comment.png"
import { theme } from "@/themes/global"

export const ProjectCommentButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress} >
        <Image source={comment} width={24} height={24} style={styles.image} />

      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: theme.colors.accent,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
    right: 12
  },
  container: {
    borderRadius: 48
  },
  image: {
    width: 24,
    height: 24
  }
})
