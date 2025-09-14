import { StudentCodeModal } from "@/features/student/StudentCodeDialog"
import { ModalProvider, useModal } from "@/hooks/useModal";
import { modalMap, ModalNames, ModalProps } from "@/types/modal";
import { render, fireEvent } from "@testing-library/react-native"
import { Pressable, Text } from "react-native";

jest.mock("@/features/student/StudentCodeDialog", () => ({
  StudentCodeModal: jest.fn(() => null)
}))

describe("ModalProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();

  })

  const TestComponent = () => {
    const { show, hide } = useModal();

    return (
      <>
        <Pressable onPress={() => show("studentCode", { student: { studentId: "123", name: "Jane", imagesrc: "/img" } })}>
          <Text>Show</Text>
        </Pressable>
        <Pressable onPress={hide}>
          <Text>Hide</Text>
        </Pressable>
      </>
    )
  }
  it("renders nothing when no modal", () => {
    const { queryByTestId } = render(
      <ModalProvider>
        <Text>Nothing Here</Text>
      </ModalProvider>
    );
    expect(queryByTestId("modal-container")).toBeNull();
  })

  it("renders a modal when show is called", () => {
    const { getByText, getByTestId } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    fireEvent.press(getByText("Show"))
    expect(StudentCodeModal).toHaveBeenCalled();
    expect(getByTestId("modal-container")).toBeTruthy();
  })

  it("hides the modal when hide is called", () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    fireEvent.press(getByText("Show"))
    expect(getByTestId("modal-container")).toBeTruthy();
    expect(StudentCodeModal).toHaveBeenCalled();
    fireEvent.press(getByText("Hide"))
    expect(queryByTestId("modal-container")).toBeNull();

  })
})



describe('ModalProvider - param tests', () => {
  beforeAll(() => {
    Object.keys(modalMap).forEach((key) => {
      const name = key as ModalNames;
      modalMap[name] = jest.fn(() => null)
    })

  })
  const TestComponent = ({ modalName }: { modalName: ModalNames }) => {
    const { show } = useModal();
    return (
      <Pressable onPress={() => show(modalName, {} as ModalProps[typeof modalName])}>
        <Text>Show</Text>
      </Pressable>
    );
  };

  test.each(Object.keys(modalMap))("renders %s modal when show is called", (modalName) => {
    const { getByText } = render(
      <ModalProvider>
        <TestComponent modalName={modalName as ModalNames} />
      </ModalProvider>
    )
    fireEvent.press(getByText("Show"))
    expect(modalMap[modalName as ModalNames]).toHaveBeenCalled()
  })
})

