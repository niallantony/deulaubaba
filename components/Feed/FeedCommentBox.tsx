import { theme } from "@/themes/global"
import { feedEmotionKeys, getFeedEmotionEmoji, StudentFeedEmotionName } from "@/types/feed"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

export const FeedCommentBox = ({
  value,
  onChange,
  onSubmit,
  emojis,
  onEmojiPress,
}: {
  value: string,
  onChange: (text: string) => void,
  onSubmit: () => void,
  emojis: StudentFeedEmotionName[],
  onEmojiPress: (p: StudentFeedEmotionName) => void,
}) => {

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        accessibilityLabel="댓글"
        textAlignVertical="top"
        value={value}
        onChangeText={onChange}
        multiline={true}
        placeholder="오늘 어떤가요...?"

      />
      <View style={styles.buttons}>
        {feedEmotionKeys.map(emoji => (
          <EmojiButton
            key={emoji}
            emoji={getFeedEmotionEmoji(emoji)}
            onPress={() => onEmojiPress(emoji)}
            selected={emojis.includes(emoji)}
          />
        ))}
        <Pressable
          onPress={onSubmit}
          style={styles.submitButton}
        >
          <FontAwesome size={28} name="send" color={theme.colors.inputs} />
        </Pressable>
      </View>
    </View>
  )
}

const EmojiButton = ({
  emoji,
  selected,
  onPress
}: {
  emoji: string;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.emojiButton,
        selected ? styles.selected : null,
      ]}
    >

      <Text style={styles.emoji}>{String.fromCodePoint(emoji)}</Text>
    </Pressable>
  )

}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: theme.colors.accent,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 4,
  },
  container: {
    borderRadius: 8,
    margin: 8
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    backgroundColor: theme.colors.inputs,
    borderBottomLeftRadius: 8,
    borderBottomEndRadius: 8,
  },
  input: {
    borderRadius: 8,
    backgroundColor: theme.colors.inputs,
    padding: 8,
    height: 64,
    fontSize: theme.fontSizes.md,
  },
  emojiButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderRadius: 4,
    width: 32,
    height: 32
  },
  emoji: {
    fontSize: 18,
    textAlignVertical: "center",
  },
  selected: {
    backgroundColor: theme.colors.accent,
  }

})
