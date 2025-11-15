import { useStudentStore } from "@/store/currentStudent"
import API from "@/api/project"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ProjectDetails } from "@/types/project"

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
  const student = useStudentStore((s) => s.student)
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
        queryClient.invalidateQueries({ queryKey: ['projects', student] }),
      ])
    },
    onError: (error, v, ctx) => {
      console.log(error)

    }

  })

  const updateDetails = useMutation({
    mutationFn: (projectDetails: ProjectDetails) => {
      if (!student?.studentId) throw new Error("No Student")
      return API.updateProjectDetails({ id, projectDetails, studentId: student?.studentId })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['project', id] }),
        queryClient.invalidateQueries({ queryKey: ['projects', student] }),
      ])
    },
    onError: (error, v, ctx) => {
      console.log(error)

    }
  })


  return {
    query,
    updateStatus,
    updateDetails
  }

}
