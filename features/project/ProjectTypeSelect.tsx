import { BigButton } from "@/components/ThemedButton";
import { ButtonTextWhite, LightText } from "@/components/ThemedText";
import { theme } from "@/themes/global";
import { ProjectType } from "@/types/project";
import { View, Text, StyleSheet } from "react-native";

export const ProjectTypeSelect = ({ onSelect }: { onSelect: (s: ProjectType) => void }) => {
  return (
    <View style={styles.container}>
      <BigButton accessibilityLabel="의사소통 중재 프로젝트" onPress={() => onSelect("COMMUNICATION")}>
        <ButtonTextWhite>새로운</ButtonTextWhite>
        <ButtonTextWhite>의사소통 중재</ButtonTextWhite>
        <ButtonTextWhite>프로젝트</ButtonTextWhite>
      </BigButton>
      <BigButton accessibilityLabel="도전행동 중재 프로젝트" onPress={() => onSelect("CHALLENGE")}>
        <ButtonTextWhite>새로운</ButtonTextWhite>
        <ButtonTextWhite>도전행종 중재</ButtonTextWhite>
        <ButtonTextWhite>프로젝트</ButtonTextWhite>
      </BigButton>
      <View style={styles.bottomText}>
        <LightText>두 유형에 모두 포함된다면</LightText>
        <View style={styles.line}><LightText>'</LightText><Text style={styles.bold}>의사소통 중재 프로젝트</Text><LightText>'를</LightText></View>
        <LightText>선택해주세요</LightText>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 42,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.inputs,
  },
  bold: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.colors.light,
  },
  line: {
    flexDirection: "row",
  },
  bottomText: {
    alignItems: "center"
  }

})
