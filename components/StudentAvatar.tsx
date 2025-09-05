import { ReactNode, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Image } from "expo-image";
import { API_BASE_URL } from "@/api/api";
import { theme } from "@/themes/global";

type AvatarProps = {
  url?: string;
  width: number;
  height: number;
  style?: "full" | "round";
}

type AvatarStyleProps = {
  width: number;
  height: number;
  style: "full" | "round";
}


const NoAvatar = ({ height, width, style, children }: { children?: ReactNode } & AvatarStyleProps) => {
  return (
    <View style={{
      justifyContent: 'center',
      backgroundColor: theme.colors.light,
      borderRadius: style === "full" ? 128 : 8,
      width: width,
      height: height,
    }}>
      {children}
    </View>
  )
}

export const StudentAvatar = ({ url, width, height, style = "full" }: AvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  const imageurl = `${API_BASE_URL}/uploads/${url}`

  if (!url) {
    return <NoAvatar width={width} height={height} style={style} />;
  }

  return (
    <>
      {!loaded && (
        <NoAvatar width={width} height={height} style={style}>
          <ActivityIndicator />
        </NoAvatar>
      )}
      <Image
        source={{ uri: imageurl }}
        onLoadEnd={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        style={{
          width,
          height,
          borderRadius: style === "full" ? 8 : 128,
        }}
      />
    </>
  );
};
