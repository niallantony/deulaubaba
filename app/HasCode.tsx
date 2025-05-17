import { FullScreenView } from "@/components/FullScreenView"
import { ThemedText } from "@/components/ThemedText"
import {Pressable, Text, View} from "react-native";

export const HasCode = ({inputCode, makeCode}) => {
    return (
        <FullScreenView  className="w-screen flex-1 px-10 py-16">
            <ThemedText type={"title"}>
                학생 코드가 있나요?
            </ThemedText>
            <View className={"flex-1 h-full justify-center gap-16"}>
                <Pressable
                    className={`p-16 m-4 bg-accent rounded-2xl`}
                    onPress={makeCode}
                    >
                    <View>
                        <ThemedText type="subtitle" className={`text-center text-white`}>있다면</ThemedText>
                    </View>
                    <View>
                        <ThemedText type="subtitle" className={`text-center text-white`}>학생 코드 만들기</ThemedText>
                    </View>
                </Pressable>
                <Pressable
                    className={`p-16 m-4 bg-accent rounded-2xl`}
                    onPress={inputCode}
                >
                    <View>
                        <ThemedText type="subtitle" className={`text-center text-white`}>없다면</ThemedText>
                    </View>
                    <View>
                        <ThemedText type="subtitle" className={`text-center text-white`}>학생 코드 입력하기</ThemedText>
                    </View>
                </Pressable>
            </View>
        </FullScreenView>
    )
}