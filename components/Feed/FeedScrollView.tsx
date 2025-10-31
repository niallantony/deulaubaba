import { ScrollView, View } from "react-native"
import { GetFeedResponse } from "@/api/feed";
import { FeedItem } from "@/types/feed";
import { DateMarker, FeedComment } from "./FeedComment";
import { transform } from "@babel/core";

type DatedFeed = {
  [key: string]: FeedItem[]
}


export const FeedScrollBox = ({
  data,
  handleNextPage,
  username,
}: {
  data: GetFeedResponse[] | undefined;
  handleNextPage: () => void;
  username: string | undefined;
}) => {
  if (!data) return

  const datedFeed: DatedFeed = {}
  const today = new Date(Date.now())
  const fToday = Array.from([today.getFullYear(), today.getMonth() + 1, today.getDate()]).join("-")

  data.forEach(page => {
    page.feed?.forEach(item => {
      const date = item.createdAt.toString().split("T")[0];
      const fDate = date === fToday ? "오늘" : date;

      if (!Object.keys(datedFeed).includes(fDate)) {
        datedFeed[fDate] = [item]
      } else {
        datedFeed[fDate].push(item);
      }
    })
  })


  return (
    <ScrollView style={{ flex: 1, transform: [{ scaleY: -1 }] }} onScrollEndDrag={handleNextPage}>
      {Object.keys(datedFeed).map(date => {
        return (
          <View key={date} style={{ transform: [{ scaleY: -1 }] }}>
            <DateMarker date={date} key={date} />
            {datedFeed[date].reverse().map(item => (
              <FeedComment
                key={item.id}
                feedItem={item}
                own={username === item.user.username}
              />

            ))}
          </View>
        )
      })}

    </ScrollView>
  )
}
