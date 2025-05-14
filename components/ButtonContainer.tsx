import { View, type ViewProps } from "react-native"

export const ButtonContainer = ({children, className} : ViewProps) => {

    return (
        <View className={`flex-row gap-3 justify-center items-center w-full ${className}`} >
            {children}
        </View>
    )
}