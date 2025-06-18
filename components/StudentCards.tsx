import { useStudent } from "@/context/StudentContext"
import noStudent from '@/assets/images/personSearch.png'
import { Student, StudentIdAvatar } from "@/types/student"
import { FlatList, Text } from "react-native"
import styled from "styled-components/native"
import { StyledText } from "./ThemedText"
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
  justify-contents: center;
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
  justify-contents: flex-start;
  height: 100%;

`

export const StudentCards = () => {
  const { students, student } = useStudent()
  const [cards, setCards] = useState<StudentIdAvatar[]>();

  useEffect(() => {
    const addStudentIndicator: StudentIdAvatar = {
      name: "",
      id: "add",
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
        id: "dummy",
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
        return item.id
      }}
      renderItem={({ item }) => {
        if (item.id === "add") {
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
          <StudentCard selected={item.id === student?.studentId} student={item} />
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
