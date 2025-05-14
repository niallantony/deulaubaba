import { View, Text } from "react-native";
import {ThemedText} from "@/components/ThemedText";
import { Login } from "./Login";

export default function Index() {
  return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <Login />
            <Text>
                <ThemedText type="light">아이디가 없나요? </ThemedText>
                <ThemedText type="link">가입하기</ThemedText>
            </Text>
      </View>
  );
}
