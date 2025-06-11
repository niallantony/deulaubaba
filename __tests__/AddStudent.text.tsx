import { AddStudent } from "@/features/auth/AddStudent"
import { renderWithProviders } from "@/test-utils/renderWithProvider"
import { Student } from "@/types/student"
import { fireEvent } from "@testing-library/react-native"

const dummyStudent = (_student: Student) => { }
const dummyProp = () => { }

const mockStudent: Student = {
  name: "name",
  school: "school",
  age: 9,
  grade: 3,
  setting: "setting",
  disability: "disability",
}


describe('Rendering', () => {
  it("renders correctly", () => {
    renderWithProviders(<AddStudent onUploadImage={dummyProp} onSubmit={dummyStudent} onSelectInput={dummyProp} />)
  })

  it("renders text boxes and buttons", () => {
    const { getByLabelText, getByText } = renderWithProviders(<AddStudent onUploadImage={dummyProp} onSubmit={dummyStudent} onSelectInput={dummyProp} />)
    expect(getByLabelText("학생 이름")).toBeTruthy()
    expect(getByLabelText("소속 학교명")).toBeTruthy()
    expect(getByLabelText("나이")).toBeTruthy()
    expect(getByLabelText("학년")).toBeTruthy()
    expect(getByLabelText("배치유형")).toBeTruthy()
    expect(getByLabelText("장애유형")).toBeTruthy()
    expect(getByLabelText("이미지")).toBeTruthy()
    expect(getByText("학생 코드 만들기")).toBeTruthy()
    expect(getByText("학생 코드 입력하기")).toBeTruthy()
  })

  it("updates username and passwords on change", () => {
    const { getByLabelText } = renderWithProviders(<AddStudent onUploadImage={dummyProp} onSubmit={dummyStudent} onSelectInput={dummyProp} />)

    const name = getByLabelText("학생 이름")
    const school = getByLabelText("소속 학교명")
    const age = getByLabelText("나이")
    const grade = getByLabelText("학년")
    const setting = getByLabelText("배치유형")
    const disability = getByLabelText("장애유형")

    fireEvent.changeText(name, "name")
    fireEvent.changeText(school, "school")
    fireEvent.changeText(age, "9")
    fireEvent.changeText(grade, "3")
    fireEvent.changeText(setting, "setting")
    fireEvent.changeText(disability, "disability")

    expect(name.props.value).toBe("name")
    expect(school.props.value).toBe("school")
    expect(age.props.value).toBe("9")
    expect(grade.props.value).toBe("3")
    expect(setting.props.value).toBe("setting")
    expect(disability.props.value).toBe("disability")
  })

  it("calls submit function on button press", () => {
    const mockSubmit = jest.fn()
    const { getByText } = renderWithProviders(<AddStudent onUploadImage={dummyProp} onSubmit={mockSubmit} onSelectInput={dummyProp} />)
    const button = getByText("학생 코드 만들기")

    fireEvent.press(button);

    expect(mockSubmit).toHaveBeenCalled()
  })

  it("calls input function on button press", () => {
    const mockInput = jest.fn()
    const { getByText } = renderWithProviders(<AddStudent onUploadImage={dummyProp} onSubmit={dummyStudent} onSelectInput={mockInput} />)
    const button = getByText("학생 코드 입력하기")

    fireEvent.press(button);

    expect(mockInput).toHaveBeenCalled()
  })

  it("calls upload image function on button press", () => {
    const mockInput = jest.fn()
    const { getByLabelText } = renderWithProviders(<AddStudent onUploadImage={mockInput} onSubmit={dummyStudent} onSelectInput={dummyProp} />)
    const button = getByLabelText("이미지")

    fireEvent.press(button);

    expect(mockInput).toHaveBeenCalled()
  })

  it("calls function with correct inputs", () => {
    const mockSubmit = jest.fn()
    const { getByText, getByLabelText } = renderWithProviders(<AddStudent onUploadImage={dummyProp} onSubmit={mockSubmit} onSelectInput={dummyProp} />)
    const button = getByText("학생 코드 만들기")

    const name = getByLabelText("학생 이름")
    const school = getByLabelText("소속 학교명")
    const age = getByLabelText("나이")
    const grade = getByLabelText("학년")
    const setting = getByLabelText("배치유형")
    const disability = getByLabelText("장애유형")

    fireEvent.changeText(name, "name")
    fireEvent.changeText(school, "school")
    fireEvent.changeText(age, "9")
    fireEvent.changeText(grade, "3")
    fireEvent.changeText(setting, "setting")
    fireEvent.changeText(disability, "disability")
    fireEvent.press(button);

    expect(mockSubmit).toHaveBeenCalledWith(mockStudent)
  })

  it("non integer values send NaN", () => {
    const mockSubmit = jest.fn()
    const { getByText, getByLabelText } = renderWithProviders(<AddStudent onUploadImage={dummyProp} onSubmit={mockSubmit} onSelectInput={dummyProp} />)
    const button = getByText("학생 코드 만들기")

    const age = getByLabelText("나이")
    const grade = getByLabelText("학년")

    fireEvent.changeText(age, "nine")
    fireEvent.changeText(grade, "three")
    fireEvent.press(button);

    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      age: NaN,
      grade: NaN,
    }))
  })

  it("calls function with empty object", () => {
    const mockSubmit = jest.fn()
    const { getByText, getByLabelText } = renderWithProviders(<AddStudent onUploadImage={dummyProp} onSubmit={mockSubmit} onSelectInput={dummyProp} />)
    const button = getByText("학생 코드 만들기")

    fireEvent.press(button);

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "",
      school: "",
      age: NaN,
      grade: NaN,
      setting: "",
      disability: "",
    })
  })
})
