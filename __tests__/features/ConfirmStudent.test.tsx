import { render, screen, fireEvent } from "@testing-library/react-native";
import { ConfirmStudent } from "@/features/student/ConfirmStudent";

describe("ConfirmStudent", () => {
  const mockStudent = {
    studentId: "123",
    name: "John Doe",
    imagesrc: "http://example.com/avatar.jpg",
  };

  it("renders student info when student is provided", () => {
    render(<ConfirmStudent student={mockStudent} onConfirm={jest.fn()} />);

    expect(screen.getByText(`${mockStudent.name} 학생을 추가하시겠습니까?`)).toBeTruthy();
    expect(screen.getByRole("button", { name: "확인" })).toBeTruthy();
  });

  it("calls onConfirm when confirm button is pressed", () => {
    const onConfirm = jest.fn();
    render(<ConfirmStudent student={mockStudent} onConfirm={onConfirm} />);

    fireEvent.press(screen.getByText("확인"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("renders error text when student is null", () => {
    const { getByText } = render(<ConfirmStudent student={null} onConfirm={jest.fn()} />);

    expect(getByText("오류: 학생을 찾을 수 없습니다")).toBeTruthy();
  });
});
