import { ThemedTextInput } from "@/components/ThemedInput";
import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { useState } from "react";
import { FullScreenView } from "@/components/FullScreenView";
import { User } from "@/types/user";
import { FormView } from "@/components/ThemedView";
import { DropDownSelect } from "@/components/DropDownSelect";
import { ErrorText } from "@/components/ThemedText";
import { RegistrationErrorType } from "@/types/registrationErrors";
import { ThemedLink } from "@/components/ThemedLink";

export type UserDetailsProps = {
  onSubmit: (user: User, confirm: string) => void;
  errors?: RegistrationErrorType
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

export const UserDetails = ({ onSubmit, errors }: UserDetailsProps) => {
  const [userType, setUserType] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmError, setConfirmError] = useState("")

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setConfirmError("Passwords must match")
      return
    }
    onSubmit({
      userType,
      username,
      name,
      email,
      password
    }, confirmPassword);
  }

  return (
    <FullScreenView>
      <FormView>
        <DropDownSelect
          label={"회원유형"}
          items={UserTypeList}
          selectedValue={userType}
          placeholder="선택하세요"
          onValueChange={setUserType}
        />
        {errors?.userType && (<ErrorText>{errors.userType}</ErrorText>)}
        <ThemedTextInput
          label={"성함"}
          value={name}
          onChange={setName}
          autoComplete={"name"}
        />
        {errors?.name && (<ErrorText>{errors.name}</ErrorText>)}
        <ThemedTextInput
          label={"아이디"}
          value={username}
          onChange={setUsername}
          autoComplete={"username"}
        />
        {errors?.username && (<ErrorText>{errors.username}</ErrorText>)}
        <ThemedTextInput
          label={"이메일"}
          value={email}
          onChange={setEmail}
          autoComplete={"email"}
        />
        {errors?.email && (<ErrorText>{errors.email}</ErrorText>)}
        <ThemedTextInput
          secureTextEntry
          label={"비밀번호"}
          value={password}
          onChange={setPassword}
          autoComplete={"password"}
        />
        {errors?.password && (<ErrorText>{errors.password}</ErrorText>)}
        <ThemedTextInput
          secureTextEntry
          label={"비밀번호확인"}
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        {errors?.confirm && (<ErrorText>{errors.confirm}</ErrorText>)}
        {confirmError && (<ErrorText>{confirmError}</ErrorText>)}
        <ButtonContainer>
          <ThemedButton text={"가입하기"} type={"green"} onPress={handleSubmit} />
          <ThemedLink size={"md"} text={"로그인"} href={'/sign-in'} margin={"24px 0"} />
        </ButtonContainer>
      </FormView>
    </FullScreenView>
  )
}
