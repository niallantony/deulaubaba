import { useStudentStore } from "@/store/currentStudent"
import API from "@/api/project"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ProjectDetails, ProjectPostDTO } from "@/types/project"

export const useProject = () => {
  const studentId = useStudentStore((s) => s.studentId)
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (project: ProjectPostDTO) => API.postProject(project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects', studentId] }),
  })

  const deleteProject = useMutation({
    mutationFn: (id: number) => API.deleteProject(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects', studentId] }),
  })

  const allProjects = useQuery({
    queryKey: ['projects', studentId],
    queryFn: () => {
      if (!studentId) throw new Error("No student selected");
      return API.getProjectsOfStudent(studentId)
    },
    enabled: !!studentId,
  })



  return {
    allProjects,
    create,
    deleteProject
  }
}

export const useCurrentProject = ({ id }: { id: string }) => {
  const studentId = useStudentStore((s) => s.studentId)
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['project', id],
    queryFn: () => API.getProject(id)
  })

  const updateStatus = useMutation({
    mutationFn: (value: boolean) => {
      return API.updateProjectStatus({ id: id, value: value })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['project', id] }),
        queryClient.invalidateQueries({ queryKey: ['projects', studentId] }),
      ])
    }

  })

  const updateDetails = useMutation({
    mutationFn: (projectDetails: ProjectDetails) => {
      if (!studentId) throw new Error("No Student")
      return API.updateProjectDetails({ id, projectDetails, studentId: studentId })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['project', id] }),
        queryClient.invalidateQueries({ queryKey: ['projects', studentId] }),
      ])
    }
  })

  const addUsers = useMutation({
    mutationFn: (toAdd: string[]) => {
      if (!studentId) throw new Error("No Student");
      return API.addUserToProject({ id, toAdd })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['project', id] }),
        queryClient.invalidateQueries({ queryKey: ['projects', studentId] }),
      ])
    }
  })


  return {
    query,
    updateStatus,
    updateDetails,
    addUsers,
  }

}
