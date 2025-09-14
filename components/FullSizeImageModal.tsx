import { API_BASE_URL } from "@/api/api";
import { theme } from "@/themes/global";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image, ActivityIndicator, useWindowDimensions } from "react-native";

export const calculateDimensions = (
  image: { width: number, height: number },
  window: { width: number, height: number },
  padding: number
): { width: number, height: number } => {
  const landscape = image.height < image.width
  const aspect = image.width / image.height
  if (landscape) {
    const realWidth = image.width > window.width ? window.width : image.width
    return { width: realWidth - padding, height: (realWidth / aspect) - padding }
  } else {
    const realHeight = image.height > window.height ? window.height : image.height
    return { width: (realHeight * aspect) - padding, height: realHeight - padding }
  }
}

export const FullSizeImageModal = ({ uri, onClose, ...rest }: { uri: string, onClose: () => void }) => {
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const imageurl = `${API_BASE_URL}/uploads/${uri}`

  useEffect(() => {
    Image.getSize(imageurl, (width, height) => {
      const { width: realWidth, height: realHeight } = calculateDimensions(
        { width, height },
        { width: windowWidth, height: windowHeight },
        24
      )
      setWidth(realWidth)
      setHeight(realHeight)
    })
  }, [imageurl, windowWidth, windowHeight])


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
        source={{ uri: imageurl }}
        width={width - 12}
        resizeMode="contain"
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => setLoaded(false)}
        style={[
          styles.image,
          { height: height - 12 }
        ]}
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
  image: {
  }
});
