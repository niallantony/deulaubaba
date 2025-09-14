import { ReactNode, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { API_BASE_URL } from "@/api/api";
import { theme } from "@/themes/global";
import { useModal } from "@/hooks/useModal";

type AvatarProps = {
  url?: string;
  width: number;
  height: number;
  pressable?: boolean;
  style?: "full" | "round";
}

type AvatarStyleProps = {
  width: number;
  height: number;
  style: "full" | "round";
}


const NoAvatar = ({ height, width, style, children }: { children?: ReactNode } & AvatarStyleProps) => {
  return (
    <View
      testID="no-image"
      style={[
        styles.empty,
        { borderRadius: style === "full" ? 8 : 128, width: width, height: height, }
      ]}>
      {children}
    </View>
  )
}

export const StudentAvatar = ({ url, width, height, style = "full", pressable = false, ...rest }: AvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  const imageurl = `${API_BASE_URL}/uploads/${url}`

  const { show } = useModal();

  if (!url) {
    return <NoAvatar width={width} height={height} style={style} />;
  }

  return (
    <Pressable
      testID='container'
      style={[
        { width, height, borderRadius: style === "full" ? 8 : 128 },
        styles.container
      ]}
      onPress={() => show("fullSizeImage", { uri: url })}
      disabled={!pressable}
    >
      <Image
        {...rest}
        testID="image"
        source={{ uri: imageurl }}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => setLoaded(false)}
        style={{ width, height }}
      />
      {!loaded && (
        <View style={[StyleSheet.absoluteFillObject, styles.empty]} >
          <ActivityIndicator testID="loader" />
        </View>
      )}

    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    justifyContent: 'center',
    backgroundColor: theme.colors.light,
  }
})
