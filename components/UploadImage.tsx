import { API_BASE_URL } from "@/api/api";
import { ImageBackground } from "expo-image";
import { PressableProps, View, Image } from "react-native";
import { styled } from "styled-components/native";
import * as ImagePicker from "expo-image-picker"
// @ts-ignore
import addPhoto from "@/assets/images/addPhotoDark.png"

const StyledImageUpload = styled.Pressable`
  width: 140px;
  height: 140px;
  background-color: ${props => props.theme.colors.inputs};
  border-radius: ${props => props.theme.radii.xl};
  margin-right: ${props => props.theme.spacing.small};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const UploadImage = ({ setImage, image, preImage, ...rest }: { setImage: (s: string) => void, preImage?: string, image: string | null } & PressableProps) => {

  const resolveAvatarUrl = (avatar: string): string => {
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar; // already absolute
    }
    return `${API_BASE_URL}/uploads/${avatar}`;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }


  return (
    <StyledImageUpload onPress={pickImage} accessibilityLabel="이미지" {...rest}>
      <ImageBackground
        source={preImage ? { uri: resolveAvatarUrl(preImage) } : undefined}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 150, height: 150 }}
      >
        {preImage && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255,255,255, 0.5)',
            }}
          />
        )}

        {image ? (
          <Image source={{ uri: image }} style={{ flex: 1, width: 150, height: 150 }} />
        ) : (
          <Image source={addPhoto} style={{ width: 32, height: 32 }} />
        )}
      </ImageBackground>
    </StyledImageUpload>
  );
};

