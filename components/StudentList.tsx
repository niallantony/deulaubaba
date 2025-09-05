// @ts-ignore
import noStudent from '@/assets/images/personSearch.png'
import { StudentIdAvatar } from "@/types/student"
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native"
import { StudentAvatar } from "./StudentAvatar"
import { IconLink } from "./ThemedButton"
import { useEffect, useState } from "react"
import { useStudents } from "@/hooks/useStudents"
import { useStudentStore } from '@/store/currentStudent'
import { useRouter } from 'expo-router'
import { theme } from '@/themes/global'

export const StudentList = () => {
  const [rows, setRows] = useState<StudentIdAvatar[]>();
  const { data: studentsData } = useStudents();
  const selectedStudent = useStudentStore((s) => s.student);
  const router = useRouter();

  useEffect(() => {
    const addStudentIndicator: StudentIdAvatar = {
      name: "",
      studentId: "add",
    }
    const clonedData = studentsData?.students ? [...studentsData.students, addStudentIndicator] : [addStudentIndicator]
    setRows(clonedData);
  }, [studentsData?.students]);

  const onChange = () => {
    router.push("/student");
  }


  return (
    <>
      <FlatList
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: theme.colors.background,
          paddingHorizontal: 24,

        }}
        data={rows}
        keyExtractor={(item) => {
          return item.studentId
        }}
        renderItem={({ item }) => {

          if (item.studentId === "add") {
            return (
              <Pressable style={styles.row}>
                <IconLink
                  text={"학생 추가"}
                  href={'/addstudent'}
                  size="md"
                  imageSource={noStudent}
                  imageOptions={{ width: 42, height: 42 }}
                />
              </Pressable>

            )
          } else {
            return (<StudentRow student={item} selected={item.studentId === selectedStudent?.studentId} onChange={onChange} />)
          }
        }
        }
      />

    </>
  )
}

const StudentRow = ({ student, selected, onChange }: { student: StudentIdAvatar; selected: boolean; onChange: () => void }) => {
  const selectStudent = useStudentStore((s) => s.setStudent)

  return (
    <Pressable style={[
      styles.frame,
      selected ? styles.selected : styles.unselected,
    ]}
      onPress={() => {
        selectStudent(student)
        onChange();
      }}
    >
      <StudentAvatar
        url={student.imagesrc}
        height={42}
        width={42}
        style="full"
      />
      <View style={styles.info}>
        <Text
          style={[
            styles.name,
            selected ? styles.selected : styles.unselected,
            { fontSize: 24 }
          ]}
        >
          {student.name}
        </Text>

      </View>
    </Pressable >
  )
}


const styles = StyleSheet.create({
  row: {
    paddingBottom: 4,
    marginHorizontal: 4,
  },
  frame: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderBottomColor: theme.colors.light,
    borderBottomWidth: 1,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    paddingHorizontal: 12,
  },
  unselected: {
    backgroundColor: theme.colors.inputs,
    color: theme.colors.text,
  },
  selected: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.lightText,
  }
})

