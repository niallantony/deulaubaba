import {TextInput, View, type TextInputProps } from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedTextInputProps = {
    label: string;
    value: string;
    onChange: (text: string) => void;
} & Omit<TextInputProps, 'onChange' | 'value'>;
export const ThemedTextInput = ({label, value, onChange, className, ...rest} : ThemedTextInputProps) => {
    return (
        <View>
            <ThemedText className={"py-4"} type={"light"}>{label}</ThemedText>
            <TextInput
                className={`bg-white text-lg/6 p-4 rounded-xl shadow-[0_7px_6px_rgba(0,0,0,0.03)] ${className}`}
                textAlignVertical={"center"}
              value={value}
              onChangeText={onChange}
              {...rest}
            />
        </View>
    )

}