import { Login } from "@/features/auth/Login"
import { renderWithProviders } from "@/test-utils/renderWithProvider"
import { fireEvent } from "@testing-library/react-native"

const dummyLogin = (_user: string, _pw: string) => { }


describe('Rendering', () => {
  it("renders correctly", () => {
    renderWithProviders(<Login onLogin={dummyLogin} />)
  })

  it("renders text boxes and buttons", () => {
    const { getByLabelText, getByText } = renderWithProviders(<Login onLogin={dummyLogin} />)
    expect(getByLabelText("아이디")).toBeTruthy()
    expect(getByLabelText("비밀번호")).toBeTruthy()
    expect(getByText("로그인")).toBeTruthy()
  })

  it("updates username and passwords on change", () => {
    const { getByLabelText } = renderWithProviders(<Login onLogin={dummyLogin} />)

    const userName = getByLabelText("아이디")
    const password = getByLabelText("비밀번호")

    fireEvent.changeText(userName, "username")
    fireEvent.changeText(password, "password")

    expect(userName.props.value).toBe("username")
    expect(password.props.value).toBe("password")
  })

  it("calls function on button press", () => {
    const mockLogin = jest.fn()
    const { getByText } = renderWithProviders(<Login onLogin={mockLogin} />)
    const button = getByText("로그인")

    fireEvent.press(button);

    expect(mockLogin).toHaveBeenCalled()
  })

  it("calls function with correct inputs", () => {
    const mockLogin = jest.fn()
    const { getByText, getByLabelText } = renderWithProviders(<Login onLogin={mockLogin} />)

    const button = getByText("로그인")
    const userName = getByLabelText("아이디")
    const password = getByLabelText("비밀번호")

    fireEvent.changeText(userName, "username")
    fireEvent.changeText(password, "password")
    fireEvent.press(button);

    expect(mockLogin).toHaveBeenCalledWith("username", "password")
  })
})


