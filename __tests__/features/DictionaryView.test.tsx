import { DictionaryView } from "@/features/dictionary/DictionaryView";
import { DictionaryListing, getCategoryTitle } from "@/types/dictionary";
import { fireEvent, render } from "@testing-library/react-native";

const mockEntry: DictionaryListing = {
  id: 1,
  title: "Hello",
  description: "Test",
  category: ["REQUEST", "ATTENTION"],
  imgsrc: "http://example.com/image.png",
  type: "BODY"
}

describe('DictionaryView', () => {
  const mockEditPress = jest.fn();
  const mockDeleteRequest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("renders entry content", () => {
    const { getByText } = render(
      <DictionaryView
        entry={mockEntry}
        onEditPress={mockEditPress}
        onDeleteRequest={mockDeleteRequest}
      />
    )

    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("Test")).toBeTruthy();
    expect(getByText("의사소통내용")).toBeTruthy();
    expect(getByText("의사소통기능")).toBeTruthy();
    expect(getByText("추가설명")).toBeTruthy();
    expect(getByText(getCategoryTitle("REQUEST"))).toBeTruthy();
    expect(getByText(getCategoryTitle("ATTENTION"))).toBeTruthy();
  })

  it("calls onEditPress when 수정하기 button is pressed", () => {
    const { getByText } = render(
      <DictionaryView
        entry={mockEntry}
        onEditPress={mockEditPress}
        onDeleteRequest={mockDeleteRequest}
      />
    );

    fireEvent.press(getByText("수정하기"));
    expect(mockEditPress).toHaveBeenCalledTimes(1);
  });

  it("calls onRequestDelete when 삭제하기 button is pressed", () => {
    const { getByText } = render(
      <DictionaryView
        entry={mockEntry}
        onEditPress={mockEditPress}
        onDeleteRequest={mockDeleteRequest}
      />
    );

    fireEvent.press(getByText("삭제하기"));
    expect(mockDeleteRequest).toHaveBeenCalledTimes(1);
  });
})
