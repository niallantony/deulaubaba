import { ProjectPage } from "@/features/project/ProjectPage";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useModal } from "@/hooks/useModal";
import { useCurrentProject } from "@/hooks/useProject";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { ErrorText } from "@/components/ThemedText";
import { isApiError } from "@/api/errors";

export default function Root() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const { query, updateStatus } = useCurrentProject({ id })
  const { show, hide } = useModal();
  const { data: userQuery } = useCurrentUser();

  const handleStatusChange = () => {
    if (!query.data) return;
    const user = userQuery?.username
    if (!user) return;
    const userStatus = query.data.userStatuses.filter(userStatus => userStatus.user.username === user).pop();
    if (!userStatus) return;


    show("changeStatus", {
      isCompleted: userStatus.completed,
      onChange: () => {
        updateStatus.mutate(!userStatus.completed)
        hide()
      },
      onClose: hide,

    })


  }

  if (query.isPending) return (<ActivityIndicator />);
  if (query.isError) {
    return (
      <ErrorText>
        {isApiError(query.error, 404) ? "프로젝트를 찾을 수 없습니다" : "프로젝트를 불러올 수 없습니다"}
      </ErrorText>
    )
  }
  return (<ProjectPage project={query.data} onStatusChange={handleStatusChange} />)

}
