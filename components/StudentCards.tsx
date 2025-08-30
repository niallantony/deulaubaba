import { useStudent } from "@/context/StudentContext"
// @ts-ignore
import noStudent from '@/assets/images/personSearch.png'
import { StudentIdAvatar } from "@/types/student"
import { FlatList } from "react-native"
import { styled } from "styled-components/native"
import { StudentAvatar } from "./StudentAvatar"
import { IconLink } from "./ThemedLink"
import { useEffect, useState } from "react"


const StudentCardStyle = styled.View<{ $selected: boolean }>`
flex: 1;
  flex-direction: row;
  height: 128px;
  border-radius: ${props => props.theme.radii.xl};
  background-color: ${props => props.$selected ?
    props.theme.colors.accent :
    props.theme.colors.inputs
  };
  box-shadow: 0 7px 6px rgba(0,0,0,0.03);
  padding: ${props => props.theme.spacing.small};
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.$selected ?
    props.theme.colors.lightText :
    props.theme.colors.accent
  };
  margin: ${props => props.theme.spacing.small};
`

const CardHolder = styled.FlatList`
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.sides};
` as typeof FlatList;

const CardAvatarHolder = styled.View`
  margin-right: ${props => props.theme.spacing.small};
  height:100%;
`
const AddStudentCard = styled.Pressable`
  flex: 1;
  height: 128px;
  border-radius: ${props => props.theme.radii.xl};
  background-color: ${props => props.theme.colors.inputs};
  padding: ${props => props.theme.spacing.small};
  margin: ${props => props.theme.spacing.small};
  border: 1px solid ${props => props.theme.colors.accent};
  box-shadow: 0 7px 6px rgba(0,0,0,0.03);
`

const StudentName = styled.Text<{ $selected: boolean }>`
  color: ${props => props.$selected ?
    props.theme.colors.lightText :
    props.theme.colors.accent
  };
  font-size: ${props => props.theme.sizes.lg};
  margin-top: ${props => props.theme.spacing.small};
`

const DummyStudent = styled.View`
flex: 1;
  margin: ${props => props.theme.spacing.small};
  padding: ${props => props.theme.spacing.small};
`

const StudentInfoPanel = styled.View`
  justify-content: flex-start;
  height: 100%;

`

export const StudentCards = () => {
  const { students, student } = useStudent()
  const [cards, setCards] = useState<StudentIdAvatar[]>();

  useEffect(() => {
    const addStudentIndicator: StudentIdAvatar = {
      name: "",
      studentId: "add",
    }
    const clonedData = students ? [...students, addStudentIndicator] : [addStudentIndicator]
    const numberOfFullRows = Math.floor(clonedData.length / 2);

    let numberOfElementsLastRow = clonedData.length - (numberOfFullRows * 2);
    while (
      numberOfElementsLastRow !== 2 &&
      numberOfElementsLastRow !== 0
    ) {
      const dummyStudent: StudentIdAvatar = {
        name: "",
        studentId: "dummy",
        empty: true,
      }
      clonedData.push(dummyStudent);
      numberOfElementsLastRow++;
    }
    setCards(clonedData);

  }, [students, student]);

  return (
    <CardHolder
      numColumns={2}
      data={cards}
      keyExtractor={(item) => {
        return item.studentId
      }}
      renderItem={({ item }) => {
        if (item.studentId === "add") {
          return (
            <AddStudentCard>
              <IconLink
                text={"학생 추가"}
                href={'/student/add'}
                size="md"
                imageSource={noStudent}
                imageOptions={{ width: 64, height: 64 }}
                margin={"0"}
              />
            </AddStudentCard>)
        }
        if (item.empty) {
          return (<DummyStudent />)
        }
        return (
          <StudentCard selected={item.studentId === student?.studentId} student={item} />
        )
      }}
    />
  )

}

type StudentCardProps = {
  student: StudentIdAvatar;
  selected?: boolean;
}

const StudentCard = ({ student, selected = false }: StudentCardProps) => {
  return (

    <StudentCardStyle $selected={selected}>
      <CardAvatarHolder>
        <StudentAvatar
          url={student.imagesrc}
          height={42}
          width={42}
          style="round"
        />
      </CardAvatarHolder>
      <StudentInfoPanel>

        <StudentName $selected={selected}>{student.name}</StudentName>
      </StudentInfoPanel>
    </StudentCardStyle>
  )
}

const ListHolder = styled.FlatList`
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.sides};
` as typeof FlatList;

export const StudentList = () => {
  const { students, student } = useStudent()
  const [rows, setRows] = useState<StudentIdAvatar[]>();

  useEffect(() => {
    const addStudentIndicator: StudentIdAvatar = {
      name: "",
      studentId: "add",
    }
    const clonedData = students ? [...students, addStudentIndicator] : [addStudentIndicator]
    setRows(clonedData);

  }, [students]);

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
            return (<StudentRow student={item} selected={item.studentId === student?.studentId} />)
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
  flex: 1;
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
  const { selectStudent } = useStudent();

  return (
    <RowFrame $selected={selected} onPress={() => selectStudent(student.studentId)}>
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
