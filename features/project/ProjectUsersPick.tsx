import { DividerWithTitle } from "@/components/Divider";
import { StudentAvatar } from "@/components/StudentAvatar";
import { ThemedButton } from "@/components/ThemedButton";
import { LightText } from "@/components/ThemedText";
import { theme } from "@/themes/global";
import { UserAvatar } from "@/types/user";
import { ScrollView, StyleSheet, Switch, View } from "react-native";

export const ProjectUsersPick = ({ users, selected, setSelected, onBack, onSubmit }: {
  users: UserAvatar[] | null,
  selected: string[],
  setSelected: (s: string) => void,
  onBack: () => void,
  onSubmit: () => void,
}) => {
  return (
    <View style={styles.container}>
      <DividerWithTitle title={"해당하는 구성원 선택해주세요"} />
      <ScrollView style={styles.userList}>
        {users && users.map(user => {
          const isEnabled = selected.includes(user.username);

          return (
            <View key={user.username} style={styles.row}>
              <View style={styles.avatar}>
                <StudentAvatar url={user.imagesrc} width={56} height={56} style="round" />
              </View>
              <LightText> {user.userType} </LightText>
              <Switch
                thumbColor={isEnabled ? theme.colors.accent : theme.colors.text}
                value={isEnabled}
                onValueChange={() => setSelected(user.username)}
              />
            </View>
          )
        })}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginTop: 18 }} >
        <ThemedButton text={"  뒤로  "} type={"green"} onPress={onBack} />
        <ThemedButton text={"  등록  "} type={"green"} onPress={onSubmit} />
      </View>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  row: {
    width: "80%",
    flexDirection: "row",
    marginVertical: 12,
    marginHorizontal: 32,
    alignItems: "center",
    justifyContent: 'space-between',
  },
  avatar: {

  },
  userList: {
    marginVertical: 24,
  }
})
