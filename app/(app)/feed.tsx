import { FeedComment } from "@/components/Feed/FeedComment";
import { FeedCommentBox } from "@/components/Feed/FeedCommentBox";
import { StudentBorder } from "@/components/StudentBorder";
import { ErrorText } from "@/components/ThemedText";
import { useModal } from "@/hooks/useModal";
import { useStudentFeed } from "@/hooks/useStudentFeed";
import { useStudentStore } from "@/store/currentStudent";
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";

export default function Root() {
  const { data, nextPage } = useStudentFeed();
  const [comment, setComment] = useState("");
  const student = useStudentStore((s) => s.student)
  const { show } = useModal()

  const onCommentChange = (value: string) => {
    setComment(value);
  }
  return (
    <StudentBorder
      title={"Good Morning :)"}
      subtitle={`${student?.name} 아침은 어떤가요?`}
      student={student}
      showModal={show}
    >
      <View>

        <FeedCommentBox
          value={comment}
          onChange={onCommentChange}
          onSubmit={() => { }}
        />

        <ScrollView onScrollEndDrag={nextPage}>
          {data?.message && (
            <ErrorText>{data.message}</ErrorText>
          )}
          {data?.body?.feed ?
            data.body.feed.map(item => (
              <FeedComment key={item.id} feedItem={item} />
            )) :
            <Text>댓글 없습니다!</Text>
          }
        </ScrollView>
      </View>
    </StudentBorder>
  )
}
