import { FeedItem } from "@/types/feed"
import { View, Text } from "react-native"

export const FeedComment = ({ feedItem }: { feedItem: FeedItem }) => {
  return (
    <View>
      <Text>{feedItem.body}</Text>
    </View>
  )
}
