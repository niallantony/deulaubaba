import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useState } from "react";
import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { FormView } from "@/components/ThemedView";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormView >
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
      <ButtonContainer>
        <ThemedButton text={"로그인"} type={"green"} onPress={() => console.log("login")} />
      </ButtonContainer>
    </FormView>
  )
}
