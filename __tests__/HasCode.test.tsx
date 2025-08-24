import { HasCode } from "@/features/student/HasCode"
import { renderWithProviders } from "@/test-utils/renderWithProvider"
import { fireEvent } from "@testing-library/react-native"

const dummyEvent = () => { }


describe('Rendering', () => {
  it("renders correctly", () => {
    renderWithProviders(<HasCode inputCode={dummyEvent} makeCode={dummyEvent} />)
  })

  it("renders text boxes and buttons", () => {
    const { getByText, getByLabelText } = renderWithProviders(<HasCode inputCode={dummyEvent} makeCode={dummyEvent} />)

    expect(getByText("학생 코드가 있나요?")).toBeTruthy()
    expect(getByLabelText("학생 코드 만들기")).toBeTruthy()
    expect(getByLabelText("학생 코드 입력하기")).toBeTruthy()
  })


  it("calls make function on button press", () => {
    const mockMakeCode = jest.fn()
    const { getByLabelText } = renderWithProviders(<HasCode inputCode={dummyEvent} makeCode={mockMakeCode} />)

    const button = getByLabelText("학생 코드 만들기")
    fireEvent.press(button);

    expect(mockMakeCode).toHaveBeenCalled()
  })

  it("calls make function on button press", () => {
    const mockInputCode = jest.fn()
    const { getByLabelText } = renderWithProviders(<HasCode inputCode={mockInputCode} makeCode={dummyEvent} />)

    const button = getByLabelText("학생 코드 입력하기")
    fireEvent.press(button);

    expect(mockInputCode).toHaveBeenCalled()
  })
})


