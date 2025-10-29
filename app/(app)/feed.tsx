import { FeedComment } from "@/components/Feed/FeedComment";
import { FeedCommentBox } from "@/components/Feed/FeedCommentBox";
import { StudentBorder } from "@/components/StudentBorder";
import { ErrorText } from "@/components/ThemedText";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useModal } from "@/hooks/useModal";
import { useStudentFeed } from "@/hooks/useStudentFeed";
import { useStudentStore } from "@/store/currentStudent";
import { StudentFeedEmotionName } from "@/types/feed";
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";

export default function Root() {
  const { data, nextPage, create } = useStudentFeed();
  const [comment, setComment] = useState("");
  const [emojis, setEmojis] = useState<StudentFeedEmotionName[]>([])
  const student = useStudentStore((s) => s.student)
  const { show } = useModal()
  const { data: user } = useCurrentUser();

  const onCommentChange = (value: string) => {
    setComment(value);
  }

  const handleEmojiPress = (pressed: StudentFeedEmotionName) => {
    if (emojis.includes(pressed)) {
      setEmojis(emojis.filter(item => item !== pressed))
    } else {
      setEmojis([pressed, ...emojis])
    }
  }

  const commentSubmit = () => {
    if (comment && student?.studentId) {
      const body = {
        body: comment,
        emotions: emojis
      }
      const request = {
        id: student.studentId,
        body
      }
      console.log(request)
      create.mutate(request)
      setComment("")
      setEmojis([])
    }
  }

  console.log("In component: ")
  console.log(data)
  return (
    <StudentBorder
      title={"Good Morning :)"}
      subtitle={`${student?.name} 아침은 어떤가요?`}
      student={student}
      showModal={show}
    >
      <View style={{ paddingHorizontal: 16 }}>

        <FeedCommentBox
          value={comment}
          onChange={onCommentChange}
          onSubmit={commentSubmit}
          emojis={emojis}
          onEmojiPress={handleEmojiPress}
        />

        <ScrollView onScrollEndDrag={nextPage}>
          {data?.message && (
            <ErrorText>{data.message}</ErrorText>
          )}
          {data?.feed ?
            data.feed.map(item => (
              <FeedComment key={item.id} feedItem={item} own={item.user.username === user!.user?.username} />
            )) :
            <Text>댓글 없습니다!</Text>
          }
        </ScrollView>
      </View>
    </StudentBorder>
  )
}
