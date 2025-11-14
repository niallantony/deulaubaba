import { useStudentStore } from "@/store/currentStudent"
import API from "@/api/project"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useProject = () => {
  const student = useStudentStore((s) => s.student)
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: API.postProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects', student] }),
  })

  const allProjects = useQuery({
    queryKey: ['projects', student],
    queryFn: () => {
      if (!student) throw new Error("No student selected");
      return API.getProjectsOfStudent(student?.studentId)
    },
    enabled: !!student,
  })


  return {
    allProjects,
    create,
  }
}

export const useCurrentProject = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => API.getProject(id)
  })

}
