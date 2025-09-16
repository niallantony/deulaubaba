import { render, fireEvent } from "@testing-library/react-native";
import { EntryCard } from "@/features/dictionary/EntryCard";
import { DictionaryListing } from "@/types/dictionary";

const mockEntry: DictionaryListing = {
  id: 123,
  title: "Test Title",
  description: "This is a test description",
  category: ["HELP"],
  imgsrc: "http://example.com/avatar.png",
  type: "BODY",
};

describe("EntryCard", () => {
  it("renders title and description", () => {
    const { getByText } = render(
      <EntryCard entry={mockEntry} onClick={jest.fn()} />
    );
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("This is a test description")).toBeTruthy();
  });

  it("renders category markers", () => {
    const { getAllByTestId } = render(
      <EntryCard entry={mockEntry} onClick={jest.fn()} />
    );
    expect(getAllByTestId("category-marker")).toHaveLength(
      mockEntry.category.length
    );
  });

  it("fires onClick when pressed", () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <EntryCard entry={mockEntry} onClick={mockOnClick} />
    );
    fireEvent.press(getByTestId("entry-button"));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
