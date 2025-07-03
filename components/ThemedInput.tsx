import { Image, PressableProps, type TextInputProps } from "react-native";
import { LightText } from "./ThemedText";
import { styled } from "styled-components/native";
import addPhoto from "@/assets/images/addPhoto.png"

export type ThemedTextInputProps = {
  label: string;
  value: string;
  onChange: (text: string) => void;
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
const FormLabel = styled(LightText)`
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
  width: 49%;
  background-color: ${props => props.theme.colors.inputs};
  border-radius: ${props => props.theme.radii.xl};
  margin-right: ${props => props.theme.spacing.small};
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing.small};
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

export const UploadImage = ({ onPress, ...rest }: PressableProps) => {
  return (
    <StyledImageUpload accessibilityLabel="이미지" onPress={onPress} {...rest}>
      <Image source={addPhoto} style={{ width: 32, height: 32 }} />
    </StyledImageUpload>
  )

}

