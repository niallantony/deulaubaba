import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  type ViewProps
} from "react-native"

export type FullScreenViewProps = {

} & ViewProps;

export const FullScreenView = ({ children }: FullScreenViewProps) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={64}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingVertical: 32,
            paddingHorizontal: 24,
          }}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {children}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
