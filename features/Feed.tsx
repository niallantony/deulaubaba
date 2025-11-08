import { FeedCommentBox } from "@/components/Feed/FeedCommentBox";
import { FeedScrollBox } from "@/components/Feed/FeedScrollView";
import { NoSelectedStudent } from "./student/NoSelectedStudent";
import { View } from "react-native";
import { StudentFeedEmotionName } from "@/types/feed";
import { useStudentFeed } from "@/hooks/useStudentFeed";
import { StudentIdAvatar } from "@/types/student";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const Feed = ({ student }: { student: StudentIdAvatar | null }) => {

  const [comment, setComment] = useState("");
  const [emojis, setEmojis] = useState<StudentFeedEmotionName[]>([])
  const { data: user } = useCurrentUser();

  const { data, fetchNextPage, isFetchingNextPage, create } = useStudentFeed();


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
      create.mutate(request)
      setComment("")
      setEmojis([])
    }
  }

  const handleNextPage = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }

  if (!student) return (<NoSelectedStudent />)

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>


      <FeedScrollBox
        data={data?.pages}
        username={user!.user?.username}
        handleNextPage={handleNextPage}
      />

      <FeedCommentBox
        value={comment}
        onChange={onCommentChange}
        onSubmit={commentSubmit}
        emojis={emojis}
        onEmojiPress={handleEmojiPress}
      />

    </View>

  )
}
