import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { useState } from "react";
import { FullScreenView } from "@/components/FullScreenView";
import { User } from "@/types/user";
import { FormView } from "@/components/ThemedView";
import { DropDownSelect } from "@/components/DropDownSelect";
import { ErrorText } from "@/components/ThemedText";

export type UserDetailsProps = {
  onSubmit: (user: User) => void;
}

const UserTypeList = [
  { label: "특수교사", key: "0" },
  { label: "통합교사", key: "1" },
  { label: "교사", key: "2" },
  { label: "치료사", key: "3" },
  { label: "사회복지사", key: "4" },
  { label: "부모", key: "5" },
  { label: "가족", key: "6" },
  { label: "기타", key: "7" },
]

type ErrorType = {
  userType?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

export const UserDetails = ({ onSubmit }: UserDetailsProps) => {
  const [userType, setUserType] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<ErrorType>({})

  const handleSubmit = () => {
    const user: User = {
      userType,
      username,
      name,
      password
    }
    if (password !== confirmPassword) {
      setErrors({
        confirm: "Passwords do not match",
      })
    } else {
      onSubmit(user)
    }
  }
  return (
    <FullScreenView >
      <FormView>
        <DropDownSelect
          label={"회원유형"}
          items={UserTypeList}
          selectedValue={userType}
          placeholder="선택하세요"
          onValueChange={setUserType}
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
          label={"이메일"}
          value={email}
          onChange={setEmail}
          autoComplete={"email"}
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
          label={"비밀번호확인"}
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        {errors?.confirm && (<ErrorText>Passwords must match</ErrorText>)}
        <ButtonContainer>
          <ThemedButton text={"가입하기"} type={"green"} onPress={handleSubmit} />
        </ButtonContainer>
      </FormView>
    </FullScreenView>
  )
}
