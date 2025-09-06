import { ReactNode } from "react";
import { TitleText } from "./ThemedText";
import { StyleSheet, View, ViewProps, Text, Pressable, ScrollView, PressableProps } from "react-native";
import { theme } from "@/themes/global";

export type PageTitleViewProps = {
  title: string;
  children: ReactNode;
} & ViewProps;



const styles = StyleSheet.create({
  infoPane: {
    backgroundColor: theme.colors.inputs,
    padding: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarPane: {
    backgroundColor: theme.colors.inputs,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    alignSelf: "flex-start",
    padding: 4,
  },
  pressableAvatarPane: {
    backgroundColor: theme.colors.inputs,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    padding: 4,
  },
  fullView: {
    backgroundColor: theme.colors.background,
    paddingBottom: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    paddingHorizontal: 12,
  },
  fullViewWhite: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: theme.colors.inputs,
  },
  profileAvatarPane: {
    margin: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenHeading: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.accent,
    textAlign: "center",
    color: theme.colors.lightText,
    fontWeight: "800",
    borderRadius: 12,
    marginVertical: 24,
  },
  formView: {
    width: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  twinInputs: {
    width: "100%",
    flexDirection: "row",
  },
  rowText: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  uploadImageFrame: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitleContainer: {
    flex: 1,
    width: "100%",
    padding: 24,
  },
  pageTitleContent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  scrollablePageTitleContent: {
    flex: 1,
    width: "100%",
  },
  imageFrame: {
    flexDirection: "row",
  },
  themedScrollableView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
    backgroundColor: theme.colors.background,
  },
  scrollViewContent: {
    justifyContent: 'center',
    flexGrow: 1
  }

});

export const InfoPane = ({ children }: ViewProps) => {

  return (
    <View style={styles.infoPane}>
      {children}
    </View>
  )
}
export const PressableInfoPane = ({ children, ...rest }: PressableProps) => {

  return (
    <Pressable {...rest} style={styles.infoPane}>
      {children}
    </Pressable>
  )
}

export const AvatarPane = ({ children }: ViewProps) => {

  return (
    <View style={styles.avatarPane}>
      {children}
    </View>
  )
}

export const PressableAvatarPane = ({ children, size, ...rest }: { size: number } & PressableProps) => {

  return (
    <Pressable style={[
      styles.avatarPane,
      { width: size, height: size }
    ]} {...rest} >
      {children}
    </Pressable>
  )
}

export const FullView = ({ children }: ViewProps) => {

  return (
    <View style={styles.fullView}>
      {children}
    </View>
  )
}
export const FullViewWhite = ({ children }: ViewProps) => {

  return (
    <View style={styles.fullViewWhite}>
      {children}
    </View>
  )
}
export const ProfileAvatarPane = ({ children }: ViewProps) => {

  return (
    <View style={styles.profileAvatarPane}>
      {children}
    </View>
  )
}
export const GreenHeading = ({ children }: ViewProps) => {

  return (
    <Text style={styles.greenHeading}>
      {children}
    </Text>
  )
}

export const FormView = ({ children }: ViewProps) => {

  return (
    <View style={styles.formView}>
      {children}
    </View>
  )
}


export const TwinInputs = ({ children }: ViewProps) => {

  return (
    <View style={styles.twinInputs}>
      {children}
    </View>
  )
}

export const RowText = ({ children }: ViewProps) => {

  return (
    <View style={styles.rowText}>
      {children}
    </View>
  )
}
export const UploadImageFrame = ({ children }: ViewProps) => {

  return (
    <View style={styles.uploadImageFrame}>
      {children}
    </View>
  )
}

const PageTitleContainer = ({ children }: ViewProps) => {

  return (
    <View style={styles.pageTitleContainer}>
      {children}
    </View>
  )
}
const PageTitleContent = ({ children }: ViewProps) => {

  return (
    <View style={styles.pageTitleContent}>
      {children}
    </View>
  )
}
const ScrollablePageTitleContent = ({ children }: ViewProps) => {

  return (
    <ScrollView style={styles.scrollablePageTitleContent}>
      {children}
    </ScrollView>
  )
}

export const ImageFrame = ({ children }: ViewProps) => {

  return (
    <View style={styles.imageFrame}>
      {children}
    </View>
  )
}
export const ThemedScrollableView = ({ children }: ViewProps) => {

  return (
    <ScrollView
      style={styles.themedScrollableView}
    >
      {children}
    </ScrollView >
  )
}

export const PageTitleView = ({ title, children, ...rest }: PageTitleViewProps) => {
  return (
    <PageTitleContainer>
      <TitleText>{title}</TitleText>
      <PageTitleContent {...rest}>
        {children}
      </PageTitleContent>
    </PageTitleContainer>
  )
}

export const PageTitleScrollableView = ({ title, children, ...rest }: PageTitleViewProps) => {
  return (
    <PageTitleContainer>
      <TitleText>{title}</TitleText>
      <ScrollablePageTitleContent {...rest}>
        {children}
      </ScrollablePageTitleContent>
    </PageTitleContainer>
  )
}


