import { type TextInputProps } from "react-native";
import { LightText } from "./ThemedText";
import { styled } from "styled-components/native";

export type ThemedTextInputProps = {
  label: string;
  value: string;
  onChange: (text: string) => void;
} & Omit<TextInputProps, 'onChange' | 'value'>;

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
export const ThemedTextInput = ({ label, value, onChange, ...rest }: ThemedTextInputProps) => {
  return (
    <StyledField>
      <FormLabel>{label}</FormLabel>
      <StyledInput
        textAlignVertical={"center"}
        value={value}
        onChangeText={onChange}
        {...rest}
      />
    </StyledField>
  )

}
