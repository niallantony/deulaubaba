import { Image, PressableProps, View, type TextInputProps } from "react-native";
import { LightText } from "./ThemedText";
import { styled } from "styled-components/native";
// @ts-ignore
import addPhoto from "@/assets/images/addPhotoDark.png"
import { ImageBackground } from "react-native";

export type ThemedTextInputProps = {
  label: string;
  value: string;
  onChange: (text: string) => void;
} & Omit<TextInputProps, 'onChange' | 'value'>;

export type ThemedTextAreaProps = {
  label: string;
  value: string;
  onChange: (text: string) => void;
  $height?: string;
} & Omit<TextInputProps, 'onChange' | 'value'>;

export type ThemedTwinInputProps = {
  position: "left" | "right";
} & ThemedTextInputProps

const StyledInput = styled.TextInput`
  background-color: ${props => props.theme.colors.inputs};
  font-size: ${props => props.theme.sizes.md};
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.radii.md};
  box-shadow: 0 7px 6px rgba(0,0,0,0.03);
`
const StyledTextArea = styled.TextInput<{ $height?: string }>`
  background-color: ${props => props.theme.colors.inputs};
  font-size: ${props => props.theme.sizes.md};
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.radii.md};
  box-shadow: 0 7px 6px rgba(0,0,0,0.03);
  height: ${props => props.$height ? props.$height : "150px"};
  width: 100%;
`
export const FormLabel = styled(LightText)`
  margin-bottom: ${props => props.theme.spacing.small}
`

const StyledField = styled.View`
  margin-top: ${props => props.theme.spacing.small};
  margin-bottom: ${props => props.theme.spacing.small};
`

const StyledTwinField = styled.View<{ $position: "left" | "right" }>`
  margin-top: ${props => props.theme.spacing.small};
  margin-bottom: ${props => props.theme.spacing.small};
  margin-right: ${props => props.$position === "left" ? props.theme.spacing.small : 0};
  flex: 1;
`

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


export const ThemedTextInput = ({ label, value, onChange, ...rest }: ThemedTextInputProps) => {
  return (
    <StyledField>
      <FormLabel>{label}</FormLabel>
      <StyledInput
        accessibilityLabel={label}
        textAlignVertical={"center"}
        value={value}
        onChangeText={onChange}
        {...rest}
      />
    </StyledField>
  )

}

export const ThemedTextArea = ({ label, value, onChange, $height, ...rest }: ThemedTextAreaProps) => {
  return (
    <StyledField>
      <FormLabel>{label}</FormLabel>
      <StyledTextArea
        $height={$height}
        accessibilityLabel={label}
        textAlignVertical={"top"}
        value={value}
        onChangeText={onChange}
        {...rest}
      />
    </StyledField>
  )

}

export const ThemedTwinInput = ({ position, label, value, onChange, ...rest }: ThemedTwinInputProps) => {
  return (
    <StyledTwinField $position={position}>
      <FormLabel>{label}</FormLabel>
      <StyledInput
        accessibilityLabel={label}
        textAlignVertical={"center"}
        value={value}
        onChangeText={onChange}
        {...rest}
      />
    </StyledTwinField>
  )

}

export const UploadImage = ({ onPress, image, preImage, ...rest }: { preImage?: string, image: string | null } & PressableProps) => {
  const api = process.env.EXPO_PUBLIC_API_ADDRESS;

  return (
    <StyledImageUpload accessibilityLabel="이미지" onPress={onPress} {...rest}>
      <ImageBackground
        source={preImage ? { uri: `${api}/uploads/${preImage}` } : undefined}
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

