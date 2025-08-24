import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { styled } from 'styled-components/native';
import { Image } from "expo-image";


const api = process.env.EXPO_PUBLIC_API_ADDRESS;

type AvatarProps = {
  url?: string;
  width: number;
  height: number;
  style?: "full" | "round";
}

type AvatarStyleProps = {
  $width: number;
  $height: number;
  $style: "full" | "round";
}

const NoAvatar = styled.View<AvatarStyleProps>`
  justify-content: center;
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.$style === "full" ? props.theme.radii.md : props.theme.radii.full};
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
`



export const StudentAvatar = ({ url, width, height, style = "full" }: AvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  const imageurl = `${api}/uploads/${url}`

  if (!url) {
    return <NoAvatar $width={width} $height={height} $style={style} />;
  }


  return (
    <>
      {!loaded && (
        <NoAvatar $width={width} $height={height} $style={style}>
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
