import { FeedCommentBox } from "@/components/Feed/FeedCommentBox";
import { FeedScrollBox } from "@/components/Feed/FeedScrollView";
import { NoSelectedStudent } from "./student/NoSelectedStudent";
import { View } from "react-native";
import { StudentFeedEmotionName } from "@/types/feed";
import { useStudentFeed } from "@/hooks/useStudentFeed";
import { StudentIdAvatar } from "@/types/student";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useModal } from "@/hooks/useModal";

export const Feed = ({ student }: { student: StudentIdAvatar | null }) => {

  const [comment, setComment] = useState("");
  const [emojis, setEmojis] = useState<StudentFeedEmotionName[]>([])
  const { data: user } = useCurrentUser();

  const { data, fetchNextPage, isFetchingNextPage, create, deleteItem } = useStudentFeed();
  const { show, hide } = useModal();


  const onCommentChange = (value: string) => {
    setComment(value);
  }

  const handleDelete = (id: number) => {
    show("confirm", {
      text: "댓글 삭제하겠습니까?",
      confirmText: "삭제",
      onConfirm: () => {
        deleteItem.mutate(id.toString())
        hide();
      }
    })
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
        onDelete={handleDelete}
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
