import ModalSelector from 'react-native-modal-selector'
import { LightText } from "./ThemedText";
import { View } from 'react-native';
import { styled } from 'styled-components/native';

export type DropDownOption = {
  label: string;
  key: string;
}

export type DropDownType = {
  items: DropDownOption[];
  label: string;
  selectedValue: string;
  placeholder: string;
  onValueChange: (value: string) => void;
}

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

export const DropDownSelect = ({ items, label, selectedValue, onValueChange, placeholder = "" }: DropDownType) => {

  const selectedLabel = items.find((i) => i.key === selectedValue)?.label || "";
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <ModalSelector
        data={items}
        initValue={placeholder}
        onChange={(option) => onValueChange(option.key)}
        optionTextStyle={{ fontSize: 16, padding: 12 }}
        initValueTextStyle={{ color: "#CCC" }}
        cancelText='취소'
      >
        <StyledInput
          editable={false}
          value={selectedLabel}
        />
      </ModalSelector>
    </View>
  )

}
