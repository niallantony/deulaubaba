import { theme } from "@/themes/global";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker, { DateType, useDefaultStyles } from "react-native-ui-datepicker"

export const DatePickerModal = ({
  date,
  onSelect,
}: {
  date: number,
  onSelect: (s: number) => void,
}) => {
  const [selected, setSelected] = useState<number>(date);
  const defaultStyles = useDefaultStyles();

  const handleChange = (tDate: string) => {
    setSelected(Date.parse(tDate));
    onSelect(Date.parse(tDate))
  }

  return (
    <View style={styles.container}>
      <DateTimePicker
        mode="single"
        date={selected}
        onChange={({ date }) => handleChange(date ? date?.toString() : "")}
        styles={{
          ...defaultStyles,
          selected: { backgroundColor: theme.colors.accent }
        }}
        locale="ko"
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.inputs,
    padding: 10,
    borderRadius: 8,
    margin: 8
  }
})
