import { useState, useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { styled } from 'styled-components/native';

import { devImages } from "@/constants/DevImages";

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

const Avatar = styled.Image<AvatarStyleProps>`
  border-radius: ${props => props.theme.radii.md};
  border-radius: ${props => props.$style === "full" ? props.theme.radii.md : props.theme.radii.full};
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
`


const NoAvatar = styled.View<AvatarStyleProps>`
  justify-content: center;
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.$style === "full" ? props.theme.radii.md : props.theme.radii.full};
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
`



export const StudentAvatar = ({ url, width, height, style = "full" }: AvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!url) {
      setLoaded(false);
      return;
    }

    let isMounted = true;

    Image.prefetch(url)
      .then(() => {
        if (isMounted) setLoaded(true);
      })
      .catch(() => {
        if (isMounted) setLoaded(false);
      })
    return () => {
      isMounted = false
    }
  }, [url]);

  if (url && Object.keys(devImages).includes(url)) {
    return <Avatar source={devImages[url]} $style={style} $width={width} $height={height} />
  }


  if (!url) {
    return <NoAvatar $width={width} $style={style} $height={height} />
  }

  return loaded ? (
    <Avatar source={{ uri: url }} $width={width} $style={style} $height={height} />
  ) : (
    <NoAvatar $width={width} $style={style} $height={height}>
      <ActivityIndicator />
    </NoAvatar>
  )
}
