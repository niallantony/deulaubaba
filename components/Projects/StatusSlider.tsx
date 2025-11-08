import { theme } from "@/themes/global"
import { useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"

export const StatusSlider = () => {

  const sliderAnim = useRef(new Animated.Value(0)).current;
  const [current, setCurrent] = useState<"LEFT" | "CENTER" | "RIGHT">("LEFT");

  const offset = current === "LEFT" ? 0 : current === "CENTER" ? 91 : 182;

  useEffect(() => {
    Animated.timing(sliderAnim, {
      toValue: offset,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [sliderAnim, offset])

  return (
    <View style={styles.back}>
      <TouchableWithoutFeedback onPress={() => setCurrent("LEFT")}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>진행 예정</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setCurrent("CENTER")}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>진행 중</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setCurrent("RIGHT")}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>완료</Text>
        </View>
      </TouchableWithoutFeedback>

      <Animated.View style={[
        styles.slider,
        {
          transform: [
            { translateX: sliderAnim }
          ],
          left: 4,
        }

      ]} />
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: theme.colors.subtle,
    width: 280,
    height: 48,
    borderRadius: 16,
    margin: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  label: {
    fontSize: 18,
    marginBottom: 3,
    color: theme.colors.light,
    zIndex: 7,
  },
  labelContainer: {
    zIndex: 7,
    width: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    elevation: 3,
  },
  slider: {
    position: "absolute",
    height: 40,
    width: 90,
    backgroundColor: theme.colors.inputs,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  }
})
