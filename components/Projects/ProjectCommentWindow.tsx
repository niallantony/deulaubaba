import { Animated, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import send from "@/assets/images/send.png"
import { useEffect, useRef, useState } from "react";
import { theme } from "@/themes/global";

export const ProjectCommentWindow = ({ onSubmit }: { onSubmit: (v: string) => void }) => {
  const [value, setValue] = useState("")
  const commentAnim = useRef(new Animated.Value(0)).current
  const inputRange = [0, 100]
  const outputRange = ["0%", "100%"]
  const animatedWidth = commentAnim.interpolate({ inputRange, outputRange })


  useEffect(() => {
    Animated.timing(commentAnim, {
      toValue: 100,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [commentAnim])


  const handleSubmit = () => {
    onSubmit(value);
  }





  return (
    <View style={styles.frame}>

      <Animated.View style={[styles.inputFrame, { width: animatedWidth }]} >
        <TextInput
          accessibilityLabel="comment"
          textAlignVertical="top"
          value={value}
          onChangeText={setValue}
          multiline={true}
          style={[styles.input]}
        />
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Image source={send} style={styles.image} />
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  frame: {
    padding: 12,
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputFrame: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexShrink: 1,
  },
  input: {
    backgroundColor: theme.colors.inputs,
    fontSize: 14,
    padding: 16,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.accent,
    padding: 12,
    borderRadius: 32,
    marginLeft: 8,
    height: 48
  },
  image: {
    width: 24,
    height: 24,
  }
})
