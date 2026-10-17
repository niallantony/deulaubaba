import { render, fireEvent } from "@testing-library/react-native";
import { StudentBorder } from "@/components/StudentBorder";
import { Text } from 'react-native'

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush })
}));

describe("StudentBorder", () => {
  const mockStudent = { imagesrc: "avatar.png", studentId: "123", name: "student" };

  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders header and StudentAvatar when student is provided", () => {
    const { getByText, getByTestId } = render(
      <StudentBorder student={mockStudent} title="Hello" subtitle="World">
        <></>
      </StudentBorder>
    );

    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("World")).toBeTruthy();
    expect(getByTestId("image")).toBeTruthy();
  });

  it("does not render header when student is null", () => {
    const { queryByText } = render(
      <StudentBorder student={null} title="Hello" subtitle="World">
        <></>
      </StudentBorder>
    );

    expect(queryByText("Hello")).toBeNull();
    expect(queryByText("World")).toBeNull();
  });

  it("renders children regardless of student", () => {
    const { getByText } = render(
      <StudentBorder student={null} title="T" subtitle="S">
        <Text>Child content</Text>
      </StudentBorder>
    );
    expect(getByText("Child content")).toBeTruthy();
  });

  it("navigates to home when avatar pressed", () => {
    const { getByTestId } = render(
      <StudentBorder student={mockStudent} title="T" subtitle="S">
        <></>
      </StudentBorder>
    );

    fireEvent.press(getByTestId("avatar-pressable"));

    expect(mockPush).toHaveBeenCalledWith("/home");
  });
});
