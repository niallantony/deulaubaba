import { ProjectPage } from "@/features/project/ProjectPage";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useModal } from "@/hooks/useModal";
import { useCurrentProject } from "@/hooks/useProject";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function Root() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const { query, updateStatus } = useCurrentProject({ id })
  const { show, hide } = useModal();
  const { data: userQuery } = useCurrentUser();

  // Error handling?
  const handleStatusChange = () => {
    if (!query.data) return;
    const user = userQuery?.user?.username
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

  if (query.isFetching) return (<ActivityIndicator />);
  if (query.data) {
    return (<ProjectPage project={query.data} onStatusChange={handleStatusChange} />)
  }

}
