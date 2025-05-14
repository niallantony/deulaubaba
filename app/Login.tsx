import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useState } from "react";
import { View } from "react-native";
import {ButtonContainer} from "@/components/ButtonContainer";
import {ThemedButton} from "@/components/ThemedButton";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View className="w-screen px-10">
            <ThemedTextInput
                label={"아이디"}
                value={username}
                onChange={setUsername}
                autoComplete={"username"}
                />
            <ThemedTextInput
                secureTextEntry
                label={"비밀번호"}
                value={password}
                onChange={setPassword}
                autoComplete={"password"}
            />
            <ButtonContainer className={"my-10"}>
                <ThemedButton text={"로그인"} type={"green"} onPress={() => console.log("login")} />
            </ButtonContainer>
        </View>
    )
}