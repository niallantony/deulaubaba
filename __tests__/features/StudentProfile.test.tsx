import { UserRibbon } from "@/components/UserRibbon";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useModal } from "@/hooks/useModal";
import { Student } from "@/types/student";
import { getByTestId } from "@testing-library/react";
import { fireEvent, render } from "@testing-library/react-native";
import { Pressable, Text } from "react-native";

jest.mock('@/hooks/useModal', () => ({
  __esModule: true,
  useModal: jest.fn(),
}))

jest.mock("@/components/UserRibbon", () => ({
  __esModule: true,
  UserRibbon: jest.fn(),
}));


describe('StudentProfile', () => {
  const mockShow = jest.fn();
  (useModal as jest.Mock).mockReturnValue({ show: mockShow });
  (UserRibbon as jest.Mock).mockImplementation(({ onPressShowStudentCode }: any) => {
    return (
      <Pressable onPress={onPressShowStudentCode} testID="user-ribbon">
        <Text>Show Code</Text>
      </Pressable>
    )
  });


  const mockStudent: Student = {
    studentId: "123",
    name: "John",
    age: 10,
    school: "School",
    grade: 3,
    setting: "normal",
    disability: "intellectual",
    communicationDetails: "Communication",
    challengesDetails: "Challenges",
    imagesrc: "http://example.com/avatar.png"
  }

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("render student info correctly", () => {
    const { getByText } = render(
      <StudentProfile
        data={mockStudent}
        onCommunicationPress={jest.fn()}
        onChallengesPress={jest.fn()}
      />
    )

    expect(getByText("John")).toBeTruthy();
    expect(getByText("(10세)")).toBeTruthy();
    expect(getByText("School 3학년")).toBeTruthy();
    expect(getByText("normal")).toBeTruthy();
    expect(getByText("intellectual")).toBeTruthy();
  })

  it("calls communicationPress when communication pane is pressed", () => {
    const onCommunicationPress = jest.fn();
    const { getByTestId } = render(
      <StudentProfile
        data={mockStudent}
        onCommunicationPress={onCommunicationPress}
        onChallengesPress={jest.fn()}
      />
    );

    fireEvent.press(getByTestId("communication-pane"));
    expect(onCommunicationPress).toHaveBeenCalled();
  })

  it("calls challengesPress when challenge pane is pressed", () => {
    const onChallengesPress = jest.fn();
    const { getByTestId } = render(
      <StudentProfile
        data={mockStudent}
        onCommunicationPress={jest.fn()}
        onChallengesPress={onChallengesPress}
      />
    );

    fireEvent.press(getByTestId("challenge-pane"));
    expect(onChallengesPress).toHaveBeenCalled();
  })

  it("triggers modal show with correct payload when student code is requested", () => {
    const { getByText } = render(
      <StudentProfile
        data={mockStudent}
        onCommunicationPress={jest.fn()}
        onChallengesPress={jest.fn()}
      />
    )

    fireEvent.press(getByText("Show Code"))
    expect(mockShow).toHaveBeenCalledWith("studentCode", {
      student: {
        studentId: "123",
        imagesrc: "http://example.com/avatar.png",
        name: "John"
      }
    })
  })

})

