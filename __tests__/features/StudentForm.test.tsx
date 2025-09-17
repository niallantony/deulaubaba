import { render, fireEvent, screen } from "@testing-library/react-native"
import { StudentForm } from "@/features/student/StudentForm"
import { Student } from "@/types/student"

describe("StudentForm", () => {
  const mockOnSubmit = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders empty form initially", () => {
    render(<StudentForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    expect(screen.getByLabelText("학생 이름")).toBeTruthy()
    expect(screen.getByLabelText("소속 학교명")).toBeTruthy()
    expect(screen.getByText("학생 등록")).toBeTruthy()
    expect(screen.getByText("취소")).toBeTruthy()
  })

  it("renders form with prefilled student", () => {
    const mockStudent: Student = {
      studentId: "1",
      name: "Jane",
      school: "Seoul School",
      age: 12,
      grade: 6,
      setting: "특수",
      disability: "청각",
      communicationDetails: "",
      challengesDetails: ""
    }

    render(<StudentForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} student={mockStudent} />)

    expect(screen.getByDisplayValue("Jane")).toBeTruthy()
    expect(screen.getByDisplayValue("Seoul School")).toBeTruthy()
    expect(screen.getByDisplayValue("12")).toBeTruthy()
    expect(screen.getByDisplayValue("6")).toBeTruthy()
  })

  it("shows errors when submitting empty form", () => {
    render(<StudentForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    fireEvent.press(screen.getByText("학생 등록"))

    expect(screen.getByText("학생 이름 입력해주세요")).toBeTruthy()
    expect(screen.getByText("학생 소속 학교명 입력해주세요")).toBeTruthy()
    expect(screen.getByText("학생 나이 입력해주세요")).toBeTruthy()
    expect(screen.getByText("학생 학년 입력해주세요")).toBeTruthy()
    expect(screen.getByText("배치유형 입력해주세요")).toBeTruthy()
    expect(screen.getByText("장애유형 입력해주세요")).toBeTruthy()
  })

  it("shows numeric errors when age/grade not numbers", () => {
    render(<StudentForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    fireEvent.changeText(screen.getByLabelText("나이"), "abc")
    fireEvent.changeText(screen.getByLabelText("학년"), "xyz")

    fireEvent.press(screen.getByText("학생 등록"))

    expect(screen.getByText("학생 나이 숫자로 입력해주세요")).toBeTruthy()
    expect(screen.getByText("학생 학년 숫자로 입력해주세요")).toBeTruthy()
  })

  it("calls onSubmit with valid student data", () => {
    render(<StudentForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    fireEvent.changeText(screen.getByLabelText("학생 이름"), "Jane")
    fireEvent.changeText(screen.getByLabelText("소속 학교명"), "Seoul School")
    fireEvent.changeText(screen.getByLabelText("나이"), "12")
    fireEvent.changeText(screen.getByLabelText("학년"), "6")
    fireEvent.changeText(screen.getByLabelText("배치유형"), "특수")
    fireEvent.changeText(screen.getByLabelText("장애유형"), "청각")

    fireEvent.press(screen.getByText("학생 등록"))

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "Jane",
      school: "Seoul School",
      age: 12,
      grade: 6,
      setting: "특수",
      disability: "청각",
      imagesrc: undefined,
    })
  })

  it("calls onCancel when cancel button pressed", () => {
    render(<StudentForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    fireEvent.press(screen.getByText("취소"))
    expect(mockOnCancel).toHaveBeenCalled()
  })
})
