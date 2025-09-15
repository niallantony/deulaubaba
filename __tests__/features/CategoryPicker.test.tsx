import { CategoryPicker } from "@/features/dictionary/CategoryPicker"
import { categoryKeys, getCategoryTitle } from "@/types/dictionary"
import { fireEvent, render } from "@testing-library/react-native"

describe('CategoryPicker', () => {
  it("renders all category buttons", () => {
    const { getByText } = render(
      <CategoryPicker category={[]} setCategory={jest.fn()} onClose={jest.fn()} />
    )
    categoryKeys.forEach((cat) => {
      const title = getCategoryTitle(cat);
      expect(getByText(title)).toBeTruthy();
    })
  })

  it("toggles a category on press", () => {
    const mockSetCategory = jest.fn();
    const { getByText } = render(
      <CategoryPicker category={[]} setCategory={mockSetCategory} onClose={jest.fn()} />
    )

    const firstKey = categoryKeys[0]

    const chip = getByText(getCategoryTitle(firstKey))

    fireEvent.press(chip);
    expect(mockSetCategory).toHaveBeenCalledWith([firstKey])

    fireEvent.press(chip);
    expect(mockSetCategory).toHaveBeenCalledWith([])
  })

  it("starts with an initial active category and adds another when pressed", () => {
    const initial = [categoryKeys[1]]
    const mockSetCategory = jest.fn();
    const { getByText } = render(
      <CategoryPicker category={initial} setCategory={mockSetCategory} onClose={jest.fn()} />
    )

    const toAdd = categoryKeys[0];
    fireEvent.press(getByText(getCategoryTitle(toAdd)))

    expect(mockSetCategory).toHaveBeenCalledWith([...initial, toAdd])
  })

})

