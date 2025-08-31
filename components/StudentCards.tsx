// @ts-ignore
import noStudent from '@/assets/images/personSearch.png'
import { StudentIdAvatar } from "@/types/student"
import { FlatList } from "react-native"
import { styled } from "styled-components/native"
import { StudentAvatar } from "./StudentAvatar"
import { IconLink } from "./ThemedLink"
import { useEffect, useState } from "react"
import { useStudents } from "@/hooks/useStudents"
import { useStudentStore } from '@/store/currentStudent'

const ListHolder = styled.FlatList`
  flex: 1;
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.sides};
` as typeof FlatList;

export const StudentList = () => {
  const [rows, setRows] = useState<StudentIdAvatar[]>();
  const { data: studentsData } = useStudents();
  const selectedStudent = useStudentStore((s) => s.student);

  useEffect(() => {
    const addStudentIndicator: StudentIdAvatar = {
      name: "",
      studentId: "add",
    }
    const clonedData = studentsData?.students ? [...studentsData.students, addStudentIndicator] : [addStudentIndicator]
    setRows(clonedData);
  }, [studentsData?.students]);

  return (
    <>
      <ListHolder
        data={rows}
        keyExtractor={(item) => {
          return item.studentId
        }}
        renderItem={({ item }) => {

          if (item.studentId === "add") {
            return (
              <AddStudentRow>
                <IconLink
                  text={"학생 추가"}
                  href={'/addstudent'}
                  size="md"
                  imageSource={noStudent}
                  imageOptions={{ width: 42, height: 42 }}
                  margin={"0"}
                />
              </AddStudentRow>

            )
          } else {
            return (<StudentRow student={item} selected={item.studentId === selectedStudent?.studentId} />)
          }
        }
        }
      />

    </>
  )
}

const AddStudentRow = styled.Pressable`
  padding-bottom: ${props => props.theme.spacing.mini};
  margin: 0 ${props => props.theme.spacing.mini};
`

const RowFrame = styled.Pressable<{ $selected: boolean }>`
  flex-direction:row;
  background-color: ${props => props.$selected ? props.theme.colors.accent : props.theme.colors.inputs};
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.default};
  border-radius: ${props => props.theme.radii.md};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.light};
`

const InfoPanel = styled.View`
flex: 1;
justify-content: center;
`

const NameText = styled.Text<{ $size: "md" | "lg"; $selected: boolean }>`
  font-size: ${props => props.theme.sizes[props.$size]};
  padding: 0 ${props => props.theme.spacing.small};
  color: ${props => props.$selected ? props.theme.colors.lightText : props.theme.colors.text}
`

const StudentRow = ({ student, selected }: { student: StudentIdAvatar; selected: boolean; }) => {
  const selectStudent = useStudentStore((s) => s.setStudent)

  return (
    <RowFrame $selected={selected} onPress={() => selectStudent(student)}>
      <StudentAvatar
        url={student.imagesrc}
        height={42}
        width={42}
        style="full"
      />
      <InfoPanel>
        <NameText $size={"lg"} $selected={selected}>{student.name}</NameText>
      </InfoPanel>
    </RowFrame>
  )
}
