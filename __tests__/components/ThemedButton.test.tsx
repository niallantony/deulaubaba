import { Text } from 'react-native'
import { render, fireEvent } from "@testing-library/react-native";
import { ThemedButton, LinkButton, BackButton, AddButton, IconLink, SubtleButton, BigButton } from "@/components/ThemedButton";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("ThemedButton components", () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });
    jest.clearAllMocks();
  });

  it("renders ThemedButton with text", () => {
    const { getByText } = render(<ThemedButton text="Click me" />);
    expect(getByText("Click me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByRole } = render(<ThemedButton text="Press" onPress={onPress} />);
    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalled();
  });

  it("applies correct style for type=outline", () => {
    const { getByText } = render(<ThemedButton text="Outline" type="outline" />);
    const buttonText = getByText("Outline");
    expect(buttonText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: expect.any(String) })])
    );
  });

  it("navigates with LinkButton", () => {
    const { getByText } = render(<LinkButton text="Go" href="/next" />);
    fireEvent.press(getByText("Go"));
    expect(mockPush).toHaveBeenCalledWith("/next");
  });

  it("calls router.back with BackButton", () => {
    const { getByText } = render(<BackButton />);
    fireEvent.press(getByText("<  이전"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("navigates with AddButton", () => {
    const { getByText } = render(<AddButton href="/add" />);
    fireEvent.press(getByText("+ 추가하기"));
    expect(mockPush).toHaveBeenCalledWith("/add");
  });

  it("navigates with IconLink", () => {
    const { getByText } = render(
      <IconLink
        text="Profile"
        href="/profile"
        size="md"
        imageSource={{ uri: "test.png" }}
        imageOptions={{ width: 10, height: 10 }}
      />
    );
    fireEvent.press(getByText("Profile"));
    expect(mockPush).toHaveBeenCalledWith("/profile");
  });

  it("renders SubtleButton children", () => {
    const { getByText } = render(<SubtleButton><Text>Child</Text></SubtleButton>);
    expect(getByText("Child")).toBeTruthy();
  });

  it("renders BigButton children", () => {
    const { getByText } = render(<BigButton><Text>Big!</Text></BigButton>);
    expect(getByText("Big!")).toBeTruthy();
  });

  it("has accessibilityRole=button on ThemedButton", () => {
    const { getByRole } = render(<ThemedButton text="A11y" />);
    expect(getByRole("button")).toBeTruthy();
  });
});
