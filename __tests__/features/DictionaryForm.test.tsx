import { DictionaryForm } from "@/features/dictionary/DictionaryForm";
import { useModal } from "@/hooks/useModal";
import { useStudentStore } from "@/store/currentStudent";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@/hooks/useModal", () => ({
  __esModule: true,
  useModal: jest.fn(),
}))

describe('DictionaryForm', () => {
  const mockShow = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    useStudentStore.setState({ student: { studentId: '123', name: 'Jane' } })
    jest.clearAllMocks();
    (useModal as jest.Mock).mockReturnValue({ show: mockShow });
  })

  it("renders with empty defaults", () => {
    const { getByLabelText, getByText } = render(<DictionaryForm type={'BODY'} onSubmit={mockOnSubmit} />)
    expect(getByLabelText("의사소통 내용")).toBeTruthy();
    expect(getByText("의사소통 기능")).toBeTruthy();
    expect(getByLabelText("추가설명(선택)")).toBeTruthy();
  })

  it("shows error when submitting with empty fields", async () => {
    const { getByText } = render(<DictionaryForm type={'BODY'} onSubmit={mockOnSubmit} />)
    fireEvent.press(getByText("등록하기"));

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(getByText("의사소통 기능을 선택해 주세요")).toBeTruthy();
    expect(getByText("의사소통 내용을 입력해주세요")).toBeTruthy();

  })

  it("opens category modal when pressing InputLikeButton", () => {
    const { getByTestId } = render(<DictionaryForm type="BODY" onSubmit={mockOnSubmit} />);
    fireEvent.press(getByTestId("input-like-button"))

    expect(mockShow).toHaveBeenCalledWith("category", expect.any(Object))
  })

  it("submits when valid", () => {
    const { getByText, getByLabelText } = render(
      <DictionaryForm
        type="BODY"
        onSubmit={mockOnSubmit}
        entry={{ id: 1, title: "Title", type: "BODY", category: ["HELP"] }}
      />
    );
    fireEvent.changeText(getByLabelText("의사소통 내용"), "Hello")
    fireEvent.changeText(getByLabelText("추가설명(선택)"), "Descriptions")
    fireEvent.press(getByText("등록하기"))

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        studentId: "123",
        title: "Hello",
        category: ["HELP"],
        type: "BODY",
        description: "Descriptions",
      })
    )

  })

  it("does not submit without student", () => {
    useStudentStore.setState({ student: null });
    const { getByText } = render(
      <DictionaryForm
        type="BODY"
        onSubmit={mockOnSubmit}
        entry={{ id: 1, title: "Title", type: "BODY", category: ["HELP"] }}
      />
    )
    fireEvent.press(getByText("등록하기"));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  })


})



