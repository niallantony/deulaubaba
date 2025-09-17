import { StudentMenu } from "@/features/student/StudentMenu"
import { fireEvent, render } from "@testing-library/react-native"

describe('StudentMenu', () => {
  const mockEdit = jest.fn()
  const mockSelect = jest.fn()
  const mockClose = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  })
  it("calls Select Student functions when requested", () => {
    const { getByText } = render(
      <StudentMenu
        onRequestEdit={mockEdit}
        onRequestSelect={mockSelect}
        onClose={mockClose}
      />
    )

    fireEvent.press(getByText("학생 변경"))
    expect(mockSelect).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  })

  it("calls Edit Student functions when requested", () => {
    const { getByText } = render(
      <StudentMenu
        onRequestEdit={mockEdit}
        onRequestSelect={mockSelect}
        onClose={mockClose}
      />
    )

    fireEvent.press(getByText("학생 정보 수정"))
    expect(mockEdit).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  })
})

