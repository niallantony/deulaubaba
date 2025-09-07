import { ThemedTextInput } from "@/components/ThemedInput";
import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { useState } from "react";
import { User } from "@/types/user";
import { FormView } from "@/components/ThemedView";
import { DropDownSelect } from "@/components/DropDownSelect";
import { ErrorText } from "@/components/ThemedText";
import { useAuth0 } from "react-native-auth0";
import { View } from "react-native";
import { UploadImage } from "@/components/UploadImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export type UserDetailsProps = {
  onSubmit: (user: User) => void;
}

type UserErrors = {
  nameError?: string;
  usernameError?: string;
  usertypeError?: string;
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

export const UserDetails = ({ onSubmit }: UserDetailsProps) => {
  const [userType, setUserType] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [imagesrc, setImgsrc] = useState("")
  const [errors, setErrors] = useState<UserErrors>({})
  const { user } = useAuth0();

  const validate = () => {
    const newErrors: UserErrors = {}
    if (!name.trim()) {
      newErrors.nameError = "이름 입력해주세요"
    }
    if (!username.trim()) {
      newErrors.usernameError = "아이디 입력해주세요"
    }
    if (!userType) {
      newErrors.usertypeError = "희원유형을 선택해주세요"
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = () => {
    if (!validate()) {
      return
    }
    onSubmit({
      userType: UserTypeList[parseInt(userType)].label,
      username,
      name,
      imagesrc: imagesrc ? imagesrc : user?.picture,
      email: user?.email ? user.email : "",
    });
  }

  return (
    <KeyboardAwareScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <UploadImage setImage={setImgsrc} image={imagesrc} preImage={user?.picture} />
      </View>
      <FormView>
        <DropDownSelect
          label={"회원유형"}
          items={UserTypeList}
          selectedValue={userType}
          placeholder="선택하세요"
          onValueChange={setUserType}
        />
        {errors?.usertypeError && (<ErrorText>{errors.usertypeError}</ErrorText>)}
        <ThemedTextInput
          label={"성함"}
          value={name}
          onChange={setName}
          autoComplete={"name"}
          error={errors?.nameError}
        />
        <ThemedTextInput
          label={"아이디"}
          value={username}
          onChange={setUsername}
          autoComplete={"username"}
          error={errors?.usernameError}
        />
        <ButtonContainer width={150}>
          <ThemedButton text={"가입하기"} type={"green"} onPress={handleSubmit} />
        </ButtonContainer>
      </FormView>
    </KeyboardAwareScrollView>
  )
}
