import { ReactNode, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import noImage from "@/assets/images/noImage.png"
import { API_BASE_URL } from "@/api/api";
import { theme } from "@/themes/global";

type AvatarProps = {
  url?: string;
  width: number;
  height: number;
  pressable?: boolean;
  style?: "full" | "round";
  deactivated?: boolean
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
      <Image source={noImage} style={styles.noImage} />
      {children}
    </View>
  )
}

export const StudentAvatar = ({ url, width, height, style = "full", deactivated = false, ...rest }: AvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  if (!url) {
    return <NoAvatar width={width} height={height} style={style} />;
  }

  return (
    <View
      testID='container'
      style={[
        { width, height, borderRadius: style === "full" ? 8 : 128 },
        styles.container
      ]}
    >
      <Image
        {...rest}
        testID="image"
        source={{ uri: url }}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => setLoaded(false)}
        style={[{ width, height }, deactivated ? { opacity: 0.5 } : null,]}
      />
      {!loaded && (
        <View style={[StyleSheet.absoluteFillObject, styles.empty]} >
          <ActivityIndicator testID="loader" />
        </View>
      )}

    </View>
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
    alignItems: 'center',
    backgroundColor: theme.colors.subtle,
  },
  noImage: {
    width: 48,
    height: 48
  }

})
