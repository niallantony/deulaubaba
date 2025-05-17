import {ThemedTextInput} from "@/components/ThemedTextInput";
import {ButtonContainer} from "@/components/ButtonContainer";
import {ThemedButton} from "@/components/ThemedButton";
import {ScrollView, View} from "react-native";
import { useState } from "react";
import { FullScreenView } from "@/components/FullScreenView";
import { User } from "@/types/user";

export type UserDetailsProps = {
    onSubmit: (user: User) => void;
}

export const UserDetails = ({onSubmit} :UserDetailsProps) => {
    const [userType, setUserType] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = () => {
       const user: User = {
           userType,
           username,
           name,
           password
       }
       onSubmit(user)
    }
    return (
        <FullScreenView className="w-screen flex-1 px-10">
            <ThemedTextInput
                label={"회원유형"}
                value={userType}
                onChange={setUserType}
                autoComplete={"off"}
            />
            <ThemedTextInput
                label={"성함"}
                value={name}
                onChange={setName}
                autoComplete={"name"}
            />
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
            <ThemedTextInput
                secureTextEntry
                label={"비밀번호"}
                value={confirmPassword}
                onChange={setConfirmPassword}
            />
            <ButtonContainer className={"my-10"}>
                <ThemedButton text={"가입하기"} type={"green"} onPress={handleSubmit} />
            </ButtonContainer>
        </FullScreenView>
    )
}