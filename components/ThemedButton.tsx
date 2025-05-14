import { Text, Pressable} from "react-native";

export type ThemedButtonProps = {
    text: string;
    type: "green" | "outline";
    onPress: () => void;
}

const variantStyles = {
    default: "flex-1 rounded-xl p-4 mx-12",
    bg: {
        green: "bg-accent",
        outline: "bg-white border-accent"
    },
    text: {
        default: "text-center font-semibold text-xl",
        green: "text-white",
        outline: "text-accent",
    },
}
export function ThemedButton({text, type, onPress}: ThemedButtonProps) {
    return (
        <Pressable
            className={`${variantStyles.default} ${variantStyles.bg[type]}`}
            onPress={onPress}
        >
            <Text className={`${variantStyles.text.default} ${variantStyles.text[type]}`}>{text}</Text>
        </Pressable>
    )
}