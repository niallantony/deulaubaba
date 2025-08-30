import { ThemedTextInput, UploadImage } from "@/components/ThemedInput";
import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { useState } from "react";
import { FullScreenView } from "@/components/FullScreenView";
import { User } from "@/types/user";
import { FormView } from "@/components/ThemedView";
import { DropDownSelect } from "@/components/DropDownSelect";
import { ErrorText } from "@/components/ThemedText";
import { RegistrationErrorType } from "@/types/registrationErrors";
import * as ImagePicker from "expo-image-picker"
import { useAuth0 } from "react-native-auth0";
import { View } from "react-native";

export type UserDetailsProps = {
  onSubmit: (user: User) => void;
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
  const [imagesrc, setImgsrc] = useState("")
  const { user } = useAuth0();

  const handleSubmit = () => {
    onSubmit({
      userType: UserTypeList[parseInt(userType)].label,
      username,
      name,
      imagesrc: imagesrc ? imagesrc : user?.picture,
      email: user?.email ? user.email : "",
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImgsrc(result.assets[0].uri)
    }
  }

  return (
    <FullScreenView>
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <UploadImage onPress={pickImage} image={imagesrc} preImage={user?.picture} />
      </View>
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
        <ButtonContainer>
          <ThemedButton text={"가입하기"} type={"green"} onPress={handleSubmit} />
        </ButtonContainer>
      </FormView>
    </FullScreenView>
  )
}
