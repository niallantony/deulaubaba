import { UploadImage } from "@/components/UploadImage";
import { UserDetails } from "@/features/auth/UserDetails"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import { Pressable } from "react-native";
import { useAuth0 } from "react-native-auth0"

jest.mock("react-native-auth0", () => ({
  __esModule: true,
  useAuth0: jest.fn(),
}))


jest.mock("@/components/UploadImage", () => ({
  __esModule: true,
  UploadImage: jest.fn(),
}));

describe('UserDetails', () => {
  const mockOnSubmit = jest.fn()
  const mockUser = { email: "jane@example.com", picture: "/auth0pic.png" }

  beforeEach(() => {
    (UploadImage as jest.Mock).mockImplementation(({ setImage }) => (
      <Pressable testID="upload-image" onPress={() => setImage("/uploaded.png")}
      />
    ));

    (useAuth0 as jest.Mock).mockReturnValue({ user: mockUser });
    mockOnSubmit.mockClear()

  })


  it('renders all form fields', () => {
    const { queryByText, getByTestId } = render(<UserDetails onSubmit={mockOnSubmit} />)

    expect(queryByText("회원유형")).toBeTruthy();
    expect(queryByText("성함")).toBeTruthy();
    expect(queryByText("아이디")).toBeTruthy();
    expect(getByTestId("upload-image")).toBeTruthy();
    expect(queryByText("가입하기")).toBeTruthy();
  })

  it("shows validation errors when submitting empty", () => {
    const { getByText, queryByText } = render(<UserDetails onSubmit={mockOnSubmit} />);
    fireEvent.press(getByText("가입하기"));

    expect(queryByText("이름 입력해주세요")).toBeTruthy();
    expect(queryByText("아이디 입력해주세요")).toBeTruthy();
    expect(queryByText("희원유형을 선택해주세요")).toBeTruthy();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows validation errors when just name present", () => {
    const { getByText, getByLabelText, queryByText } = render(<UserDetails onSubmit={mockOnSubmit} />);
    fireEvent.press(getByText("가입하기"));

    fireEvent.changeText(getByLabelText("성함"), "Jane Doe");

    expect(queryByText("아이디 입력해주세요")).toBeTruthy();
    expect(queryByText("희원유형을 선택해주세요")).toBeTruthy();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("validation errors disappear after filling value", () => {
    const { getByText, getByLabelText, queryByText } = render(<UserDetails onSubmit={mockOnSubmit} />);
    fireEvent.press(getByText("가입하기"));
    expect(queryByText("이름 입력해주세요")).toBeTruthy();

    fireEvent.changeText(getByLabelText("성함"), "Jane Doe");
    expect(queryByText("이름 입력해주세요")).toBeNull();

  });

  it("submits correctly when fields are filled", async () => {
    const { getByText, getByLabelText } = render(
      <UserDetails onSubmit={mockOnSubmit} />
    );

    fireEvent.press(getByLabelText("회원유형"));
    fireEvent.press(getByText("부모"));

    fireEvent.changeText(getByLabelText("성함"), "Jane Doe");
    fireEvent.changeText(getByLabelText("아이디"), "jane123");

    fireEvent.press(getByText("가입하기"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        userType: "부모",
        username: "jane123",
        name: "Jane Doe",
        imagesrc: "/auth0pic.png",
        email: "jane@example.com",
      });
    });
  });

  it("submits with uploaded image instead of auth0 picture", async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <UserDetails onSubmit={mockOnSubmit} />
    );

    fireEvent.press(getByTestId("upload-image"))

    fireEvent.press(getByLabelText("회원유형"));
    fireEvent.press(getByText("부모"));

    fireEvent.changeText(getByLabelText("성함"), "Jane Doe");
    fireEvent.changeText(getByLabelText("아이디"), "jane123");

    fireEvent.press(getByText("가입하기"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        userType: "부모",
        username: "jane123",
        name: "Jane Doe",
        imagesrc: "/uploaded.png",
        email: "jane@example.com",
      });
    });
  });


  it("submits correctly when fields are filled", async () => {
    (useAuth0 as jest.Mock).mockReturnValue({ user: { email: "jane@example.com" } });
    const { getByText, getByLabelText } = render(
      <UserDetails onSubmit={mockOnSubmit} />
    );

    fireEvent.press(getByLabelText("회원유형"));
    fireEvent.press(getByText("부모"));

    fireEvent.changeText(getByLabelText("성함"), "Jane Doe");
    fireEvent.changeText(getByLabelText("아이디"), "jane123");

    fireEvent.press(getByText("가입하기"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        userType: "부모",
        username: "jane123",
        name: "Jane Doe",
        imagesrc: undefined,
        email: "jane@example.com",
      });
    });
  });


})
