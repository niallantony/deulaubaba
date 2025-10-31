import { FeedItem, getFeedEmotionEmoji, StudentFeedEmotionName } from "@/types/feed"
import { View, Text, StyleSheet } from "react-native"
import { UserAvatarButton } from "../UserRibbon"
import { theme } from "@/themes/global"

export const FeedComment = ({ feedItem, own }: { feedItem: FeedItem, own: boolean }) => {
  return (
    <View style={[
      own ? styles.containerOwn : styles.containerOther,
    ]}>
      <View style={styles.avatarColumn}>
        <UserAvatarButton user={feedItem.user} />
      </View>
      <View style={{ maxWidth: "70%" }}>
        <View style={[
          styles.comment,
          own ? styles.commentOwn : styles.commentOther
        ]}>
          <Text
            style={own ? styles.textOwn : styles.textOther}
          >{feedItem.body}</Text>

        </View>
        <View style={[{ flexDirection: own ? "row" : "row-reverse" }, styles.under]}>
          <EmojiGroup emotions={feedItem.emotions} />
          <CommentDate date={new Date(feedItem.createdAt)} />
        </View>
      </View>
      <View style={styles.emptyColumn}>
      </View>
    </View>
  )
}

export const DateMarker = ({ date }: { date: string }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
      <View style={styles.dateMarker}>
        <Text>{date}</Text>
      </View>
    </View>
  )
}

const CommentDate = ({ date }: { date: Date }) => {
  const isAfternoon = date.getHours() > 12;
  return (
    <Text style={styles.date}>
      {date.getFullYear()}년 {date.getMonth()}월 {date.getDay()}일 {isAfternoon ? "오후" : "오전"} {date.getHours() % 12}:{String(date.getMinutes()).padStart(2, 0)}
    </Text>
  )
}

const EmojiGroup = ({ emotions }: { emotions: StudentFeedEmotionName[] | null }) => {
  if (emotions?.length) {
    return (
      <View style={styles.commentEmotions}>
        {emotions.map(emotion => (
          <Text key={emotion} style={styles.emoji}>{String.fromCodePoint(getFeedEmotionEmoji(emotion))}</Text>
        ))}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  dateMarker: {
    backgroundColor: theme.colors.subtle,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    textAlign: 'center',
    marginVertical: 10,
  },
  under: {
    marginTop: -15,
  },
  containerOther: {
    flexDirection: "row"
  },
  containerOwn: {
    flexDirection: "row-reverse"
  },
  emoji: {
    marginHorizontal: 4,
    fontSize: 14,
  },
  commentEmotions: {
    flexWrap: "wrap",
    maxWidth: 131,
    backgroundColor: theme.colors.inputs,
    borderRadius: 12,
    padding: 2,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
    flexDirection: "row"
  },
  date: {
    marginTop: 6,
    fontSize: 12,
    marginHorizontal: 6,
  },
  comment: {
    marginVertical: 8,
    padding: 18,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  commentOwn: {
    backgroundColor: theme.colors.accent,
    borderTopLeftRadius: 24,
  },
  commentOther: {
    backgroundColor: theme.colors.subtle,
    borderTopRightRadius: 24,
  },
  textOwn: {
    color: theme.colors.inputs
  },
  textOther: {
    color: theme.colors.light
  },
  emptyColumn: {
    width: 64
  },
  avatarColumn: {
    width: 64

  }
})
