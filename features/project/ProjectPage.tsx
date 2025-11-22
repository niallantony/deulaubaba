import { ProjectDetails } from "@/components/Projects/ProjectDetails"
import { theme } from "@/themes/global"
import { Project } from "@/types/project"
import { ScrollView } from "react-native"
import { ProjectComments } from "./ProjectComments"
import { ProjectCommentButton } from "@/components/Projects/ProjectCommentButton"
import { useState } from "react"
import { ProjectCommentWindow } from "@/components/Projects/ProjectCommentWindow"
import { useProjectFeed } from "@/hooks/useProjectFeed"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useModal } from "@/hooks/useModal"

export const ProjectPage = ({
  project,
  onStatusChange,
}: {
  project: Project,
  onStatusChange: () => void,
}) => {
  const [showComment, setShowComment] = useState(false)
  const { data } = useCurrentUser();
  const { show, hide } = useModal();

  const { comment, deleteComment } = useProjectFeed(project.id.toString());

  const handleSubmit = (body: string) => {
    comment.mutate(body)
    setShowComment(false)
  }

  const handleDelete = (id: number) => {
    show("confirm", {
      text: "댓글 삭제하겠습니까?",
      confirmText: "삭제",
      onConfirm: () => {
        deleteComment.mutate(id.toString())
        hide();
      }
    })
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <ProjectDetails project={project} onStatusChange={onStatusChange} />
        <ProjectComments
          id={project.id}
          username={data?.user?.username}
          onDelete={handleDelete}
        />

      </ScrollView>
      {showComment ?
        (<ProjectCommentWindow onSubmit={handleSubmit} />) :
        (<ProjectCommentButton onPress={() => setShowComment(true)} />)
      }
    </>
  )
}
