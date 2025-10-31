import { FeedCommentBox } from "@/components/Feed/FeedCommentBox";
import { FeedScrollBox } from "@/components/Feed/FeedScrollView";
import { StudentBorder } from "@/components/StudentBorder";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useModal } from "@/hooks/useModal";
import { useStudentFeed } from "@/hooks/useStudentFeed";
import { useStudentStore } from "@/store/currentStudent";
import { StudentFeedEmotionName } from "@/types/feed";
import { useState } from "react";
import { View } from "react-native";

export default function Root() {
  const { data, fetchNextPage, isFetchingNextPage, create } = useStudentFeed();
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

  const handleNextPage = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }


  return (
    <StudentBorder
      title={"Good Morning :)"}
      subtitle={`${student?.name} 아침은 어떤가요?`}
      student={student}
      showModal={show}
    >
      <View style={{ flex: 1, paddingHorizontal: 16 }}>

        <FeedCommentBox
          value={comment}
          onChange={onCommentChange}
          onSubmit={commentSubmit}
          emojis={emojis}
          onEmojiPress={handleEmojiPress}
        />

        <FeedScrollBox
          data={data?.pages}
          username={user!.user?.username}
          handleNextPage={handleNextPage}
        />

      </View>
    </StudentBorder>
  )
}
