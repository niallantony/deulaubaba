import ModalSelector from 'react-native-modal-selector'
import { LightText } from "./ThemedText";
import { StyleSheet, TextInput, View } from 'react-native';
import { theme } from '@/themes/global';

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


export const DropDownSelect = ({ items, label, selectedValue, onValueChange, placeholder = "" }: DropDownType) => {

  const selectedLabel = items.find((i) => i.key === selectedValue)?.label || "";
  return (
    <View>
      <LightText style={{ marginBottom: 12 }}>{label}</LightText>
      <ModalSelector
        accessibilityLabel={label}
        testID="modal-select"
        data={items}
        initValue={placeholder}
        onChange={(option) => onValueChange(option.key)}
        optionTextStyle={{ fontSize: 16, padding: 12 }}
        initValueTextStyle={{ color: "#CCC" }}
        cancelText='취소'
      >
        <TextInput
          style={styles.input}
          accessibilityLabel={label}
          editable={false}
          value={selectedLabel}
        />
      </ModalSelector>
    </View>
  )

}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.inputs,
    fontSize: 18,
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  }
})

