import { Platform } from "react-native";

const getApiBaseUrl = () => {
  if (Platform.OS === "ios") {
    return process.env.EXPO_PUBLIC_IOS_API_URL
  } else if (Platform.OS === "android") {
    return process.env.EXPO_PUBLIC_ANDROID_API_URL
  } else {
    return process.env.EXPO_PUBLIC_PHYSICAL_API_URL
  }
};

export const API_BASE_URL = getApiBaseUrl();
