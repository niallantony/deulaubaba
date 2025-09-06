import { Animated, Dimensions, Pressable, StyleSheet } from "react-native";
import { PropsWithChildren, useEffect, useRef } from "react";


const { width: SCREEN_WIDTH } = Dimensions.get("window")

export const SlideIn = ({ children, side = "right", amount }: {
  side?: "right" | "left",
  amount: number,
} & PropsWithChildren) => {
  const translate = useRef(new Animated.Value(side === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [side, translate]);

  return (
    <Animated.View
      style={[
        styles.panel,
        { width: SCREEN_WIDTH * amount },
        { transform: [{ translateX: translate }] },
        side === "right" ? { right: 0 } : { left: 0 }
      ]}
    >
      <Pressable
        onPress={(e) => e.stopPropagation()}
        accessibilityViewIsModal
        style={[
          styles.inner,
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  )
}


const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  inner: {
    flex: 1,
    padding: 24

  },
})
