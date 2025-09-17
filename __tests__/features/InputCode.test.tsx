import { InputStudentCode } from "@/features/student/InputCode"
import { fireEvent, render } from "@testing-library/react-native"

describe('InputCode', () => {
  const mockSubmit = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("renders correctly with no error", () => {
    const { getByText, getAllByTestId } = render(
      <InputStudentCode
        onSubmit={jest.fn()}
        onBack={jest.fn()}
        error={null}
      />
    )
    expect(getByText("학생 코드 입력하세요")).toBeTruthy();
    expect(getByText("확인")).toBeTruthy();
    expect(getByText("뒤로")).toBeTruthy();
    expect(getAllByTestId("code-box").length).toBe(6);
  })

  it("shows error on insufficient characters", () => {
    const { getByTestId, getByText } = render(
      <InputStudentCode
        onSubmit={mockSubmit}
        onBack={jest.fn()}
        error={null}
      />
    )

    fireEvent.changeText(getByTestId("hidden-input"), "abcde");
    fireEvent.press(getByTestId("submit-code"))

    expect(getByText("글자 6 자리 입력해 주세요")).toBeTruthy();
    expect(mockSubmit).not.toHaveBeenCalled();
  })

  it("calls submit if 6 characters are present", () => {
    const { getByTestId } = render(
      <InputStudentCode
        onSubmit={mockSubmit}
        onBack={jest.fn()}
        error={null}
      />
    )

    fireEvent.changeText(getByTestId("hidden-input"), "abcde1");
    fireEvent.press(getByTestId("submit-code"))

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith("abcde1");
  })

  it("renders an error", () => {
    const { getByText } = render(
      <InputStudentCode
        onSubmit={jest.fn()}
        onBack={jest.fn()}
        error={"Error Message"}
      />
    )
    expect(getByText("Error Message")).toBeTruthy();
  })

  it("shows local validation errors over server errors", () => {
    const { getByTestId, getByText, queryByText } = render(
      <InputStudentCode
        onSubmit={mockSubmit}
        onBack={jest.fn()}
        error={"Server Error"}
      />
    )
    expect(getByText("Server Error")).toBeTruthy();

    fireEvent.press(getByTestId("submit-code"))

    expect(getByText("글자 6 자리 입력해 주세요")).toBeTruthy();
    expect(queryByText("Server Error")).toBeNull();
    expect(mockSubmit).not.toHaveBeenCalled();
  })

  it("calls back on button press", () => {
    const { getByText } = render(
      <InputStudentCode
        onSubmit={jest.fn()}
        onBack={mockBack}
        error={"Error Message"}
      />
    )
    fireEvent.press(getByText("뒤로"))
    expect(mockBack).toHaveBeenCalled();


  })
})

