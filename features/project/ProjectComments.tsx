import { FeedComment } from "@/components/Feed/FeedComment";
import { NewUserComment } from "@/components/Projects/NewUserComment";
import { ProjectEvent } from "@/components/Projects/ProjectEvent";
import { useProjectFeed } from "@/hooks/useProjectFeed"
import { theme } from "@/themes/global";
import { ScrollView, StyleSheet } from "react-native"

export const ProjectComments = ({
  id,
  username,
  onDelete,
}: {
  id: number,
  username: string | undefined,
  onDelete: (id: number) => void,
}) => {

  const { getFeed } = useProjectFeed(id.toString());
  const feed = getFeed.data?.feed;

  // "2025-01-31T09:05:12.123" -> "2025-01-31  09:05:12"
  const formatDate = (date: string) => {
    return date.split("T").join("  ").split(".")[0]
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {feed && feed.map(item => {
        if (item.type === "NEW_USER") {
          return (<NewUserComment key={item.id} user={item.user} date={formatDate(item.createdAt)} />)
        }
        if (item.type === "COMMENT") {
          return (
            <FeedComment
              key={item.id}
              feedItem={item}
              own={username === item.user.username}
              onDelete={() => onDelete(item.id)}
            />)
        }
        if (item.type === "EVENT") {
          return (<ProjectEvent key={item.id} body={item.body} date={formatDate(item.createdAt)} />)
        }
      })}


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingVertical: 8,
    marginVertical: 8,
    flex: 1,
    gap: 8


  }
})
