import { ThemedTextInput } from "@/components/ThemedInput";
import { useState } from "react";
import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { FormView } from "@/components/ThemedView";
import { ErrorText } from "@/components/ThemedText";

export type LoginProps = {
  onLogin: (u: string, p: string) => void;
  error?: string;
}

export function Login({ onLogin, error }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin?.(username, password)
  }

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
      {error && (<ErrorText>{error}</ErrorText>)}
      <ButtonContainer>
        <ThemedButton text={"로그인"} type={"green"} onPress={handleLogin} />
      </ButtonContainer>
    </FormView>
  )
}
