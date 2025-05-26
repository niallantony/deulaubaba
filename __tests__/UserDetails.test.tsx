import { UserDetails } from "@/features/auth/UserDetails"
import { renderWithProviders } from "@/test-utils/renderWithProvider"
import { ErrorType } from "@/types/registrationErrors"
import { User } from "@/types/user"
import { fireEvent, waitFor } from "@testing-library/react-native"

const dummyFunction = (_user: User, _confirm: string) => { }

const mockUser: User = {
  userType: "7",
  username: "username",
  name: "name",
  email: "email",
  password: "password",
}

const mockErrors: ErrorType = {
  userType: "ErrorMessage",
  username: "ErrorMessage",
  name: "ErrorMessage",
  email: "ErrorMessage",
  password: "ErrorMessage",
  confirm: "ErrorMessage",
}


describe('Rendering', () => {
  it("renders correctly", () => {
    renderWithProviders(<UserDetails onSubmit={dummyFunction} />)
  })

  it("renders text boxes and buttons", () => {
    const { getByLabelText, getByText } = renderWithProviders(<UserDetails onSubmit={dummyFunction} />)
    expect(getByLabelText("회원유형")).toBeTruthy()
    expect(getByLabelText("성함")).toBeTruthy()
    expect(getByLabelText("아이디")).toBeTruthy()
    expect(getByLabelText("이메일")).toBeTruthy()
    expect(getByLabelText("비밀번호")).toBeTruthy()
    expect(getByLabelText("비밀번호확인")).toBeTruthy()
    expect(getByText("가입하기")).toBeTruthy()
  })

  it("updates values on change", () => {
    const { getByLabelText } = renderWithProviders(<UserDetails onSubmit={dummyFunction} />)

    const name = getByLabelText("성함")
    const username = getByLabelText("아이디")
    const email = getByLabelText("이메일")
    const password = getByLabelText("비밀번호")
    const confirmPassword = getByLabelText("비밀번호확인")

    fireEvent.changeText(name, "name")
    fireEvent.changeText(username, "username")
    fireEvent.changeText(email, "email")
    fireEvent.changeText(password, "password")
    fireEvent.changeText(confirmPassword, "password")

    expect(name.props.value).toBe("name")
    expect(username.props.value).toBe("username")
    expect(email.props.value).toBe("email")
    expect(password.props.value).toBe("password")
    expect(confirmPassword.props.value).toBe("password")
  })

  it("displays all options in dropdown", async () => {
    const { getByLabelText, getByText } = renderWithProviders(<UserDetails onSubmit={dummyFunction} />)

    const userType = getByLabelText("회원유형")

    fireEvent.press(userType)

    await waitFor(() => {
      expect(getByText("기타")).toBeTruthy()
    })

    expect(getByText("특수교사")).toBeTruthy()
    expect(getByText("통합교사")).toBeTruthy()
    expect(getByText("교사")).toBeTruthy()
    expect(getByText("치료사")).toBeTruthy()
    expect(getByText("사회복지사")).toBeTruthy()
    expect(getByText("부모")).toBeTruthy()
    expect(getByText("가족")).toBeTruthy()
  })

  it("updates dropdown on change", async () => {
    const { getByLabelText, getByText } = renderWithProviders(<UserDetails onSubmit={dummyFunction} />)

    const userType = getByLabelText("회원유형")

    fireEvent.press(userType)

    await waitFor(() => {
      expect(getByText("기타")).toBeTruthy()
    })

    fireEvent.press(getByText("기타"))


    expect(userType.props.value).toBe("기타")

  })

  it("calls submit function on button press", () => {
    const mockSubmit = jest.fn()
    const { getByText } = renderWithProviders(<UserDetails onSubmit={mockSubmit} />)
    const button = getByText("가입하기")

    fireEvent.press(button);

    expect(mockSubmit).toHaveBeenCalled()
  })


  it("calls function with correct inputs", async () => {
    const mockSubmit = jest.fn()
    const { getByText, getByLabelText } = renderWithProviders(<UserDetails onSubmit={mockSubmit} />)

    const name = getByLabelText("성함")
    const username = getByLabelText("아이디")
    const email = getByLabelText("이메일")
    const password = getByLabelText("비밀번호")
    const confirmPassword = getByLabelText("비밀번호확인")
    const button = getByText("가입하기")

    const userType = getByLabelText("회원유형")

    fireEvent.press(userType)

    await waitFor(() => {
      expect(getByText("기타")).toBeTruthy()
    })

    fireEvent.press(getByText("기타"))
    fireEvent.changeText(name, "name")
    fireEvent.changeText(username, "username")
    fireEvent.changeText(email, "email")
    fireEvent.changeText(password, "password")
    fireEvent.changeText(confirmPassword, "password")
    fireEvent.press(button);

    expect(mockSubmit).toHaveBeenCalledWith(mockUser, "password")
  })


  it("calls function with empty object", () => {
    const mockSubmit = jest.fn()
    const { getByText } = renderWithProviders(<UserDetails onSubmit={mockSubmit} />)
    const button = getByText("가입하기")

    fireEvent.press(button);

    expect(mockSubmit).toHaveBeenCalledWith({
      userType: "",
      username: "",
      name: "",
      email: "",
      password: "",

    }, "")
  })

  it("different passwords fires client-side validation", () => {
    const mockSubmit = jest.fn()
    const { getByText, getByLabelText } = renderWithProviders(<UserDetails onSubmit={mockSubmit} />)

    const password = getByLabelText("비밀번호")
    const confirmPassword = getByLabelText("비밀번호확인")
    const button = getByText("가입하기")


    fireEvent.changeText(password, "password")
    fireEvent.changeText(confirmPassword, "notthesame")
    fireEvent.press(button);

    expect(mockSubmit).not.toHaveBeenCalled()
    expect(getByText("Passwords must match")).toBeTruthy();
  })

  it("error messages are shown", () => {
    const { getAllByText } = renderWithProviders(<UserDetails onSubmit={dummyFunction} errors={mockErrors} />)

    const errors = getAllByText("ErrorMessage");

    expect(errors.length).toBe(6);
  })
})
