// Metro resolves image imports to an asset reference that <Image source={...}> accepts.
// Expo used to ship these declarations; SDK 54 no longer does.
declare module "*.png" {
  const source: import("react-native").ImageSourcePropType;
  export default source;
}

declare module "*.jpg" {
  const source: import("react-native").ImageSourcePropType;
  export default source;
}
