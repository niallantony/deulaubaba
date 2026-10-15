import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { Platform } from "react-native";

const compressImage = async (uri: string) => {
  const imageContext = ImageManipulator.manipulate(uri);
  const manipulated = await imageContext
    .resize({ width: 1000 })
    .renderAsync()

  return await manipulated.saveAsync({ compress: 0.7, format: SaveFormat.JPEG })
};

/**
 * Builds the multipart body the server expects: a JSON "data" part, plus an
 * optional compressed "image" part.
 */
export const buildFormData = async (data: object, image?: { uri: string, name: string }) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));

  if (image) {
    const compressed = await compressImage(image.uri);
    const filename = `${image.name}.jpg`;
    if (Platform.OS === "web") {
      // Browsers need a real Blob; the { uri } object below is React Native only.
      const blob = await (await fetch(compressed.uri)).blob();
      formData.append("image", blob, filename);
    } else {
      formData.append("image", { uri: compressed.uri, name: filename, type: "image/jpeg" } as any);
    }
  }

  return formData;
}
