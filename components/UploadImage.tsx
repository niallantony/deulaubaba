import { API_BASE_URL } from "@/api/api";
import { ImageBackground } from "expo-image";
import { PressableProps, View, Image, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker"
// @ts-ignore
import addPhoto from "@/assets/images/addPhotoDark.png"
import { theme } from "@/themes/global";

const styles = StyleSheet.create({
  pressable: {
    width: 140,
    height: 150,
    backgroundColor: theme.colors.inputs,
    borderRadius: 16,
    marginRight: 12,
    marginTop: 24,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    width: 32,
    height: 32
  }
})

export const UploadImage = ({ setImage, image, preImage, ...rest }: { setImage: (s: string) => void, preImage?: string, image: string | null } & PressableProps) => {

  const resolveAvatarUrl = (avatar: string): string => {
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
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
    <Pressable
      style={styles.pressable}
      accessibilityRole="button"
      accessibilityLabel="프로필 이미지 업로드"
      onPress={pickImage}
      {...rest}
    >
      {image ? (
        <Image testID="user-image" source={{ uri: image }} style={styles.imageBox} />
      ) : preImage ? (
        <ImageBackground
          source={preImage ? { uri: resolveAvatarUrl(preImage) } : undefined}
          style={styles.imageBox}
        >
          <View style={styles.overlay} testID="overlay">
            <Image testID="add-photo-icon" source={addPhoto} style={styles.addIcon} />
          </View>
        </ImageBackground>
      ) : (
        <Image testID="add-photo-icon" source={addPhoto} style={styles.addIcon} />
      )}
    </Pressable>
  );
};

