import { theme } from "@/themes/global";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image, ActivityIndicator, useWindowDimensions } from "react-native";

export const calculateDimensions = (
  image: { width: number, height: number },
  window: { width: number, height: number },
  padding: number
) => {
  const maxWidth = window.width - padding * 2
  const maxHeight = window.height - padding * 2

  const widthRatio = maxWidth / image.width
  const heightRatio = maxHeight / image.height

  const ratio = Math.min(widthRatio, heightRatio, 1) // Never scale up

  return {
    width: image.width * ratio,
    height: image.height * ratio
  }
}

export const FullSizeImageModal = ({ uri, onClose, ...rest }: { uri: string, onClose: () => void }) => {
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();


  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      const { width: realWidth, height: realHeight } = calculateDimensions(
        { width, height },
        { width: windowWidth, height: windowHeight },
        24
      )
      setWidth(realWidth)
      setHeight(realHeight)
    })
  }, [uri, windowWidth, windowHeight])


  return (
    <View
      testID='container'
      style={[
        styles.dialogBox
      ]}
    >
      <Image
        {...rest}
        testID="image"
        source={{ uri: uri }}
        width={width}
        style={{ width, height }}
        resizeMode="contain"
        onLoad={() => {
          setLoaded(true)
        }}
        // TODO: Show error
        onError={(err) => {
          setLoaded(false)
          console.error(err)
        }}
      />
      {!loaded && (
        <View style={[StyleSheet.absoluteFillObject, styles.empty]} >
          <ActivityIndicator testID="loader" />
        </View>
      )}


    </View>
  )

}

const styles = StyleSheet.create({
  dialogBox: {
    backgroundColor: theme.colors.inputs,
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
    justifyContent: 'center',
  },
  empty: {
    justifyContent: 'center',
    backgroundColor: theme.colors.light,
  },
});
