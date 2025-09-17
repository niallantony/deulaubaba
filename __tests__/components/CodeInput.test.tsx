import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { InputCode } from "@/components/CodeInput"
import { TextInput, StyleSheet } from "react-native";

describe("InputCode", () => {

  beforeAll(() => {
    // mock focus method for testing only
    jest.spyOn(TextInput.prototype, "focus").mockImplementation(() => { });
  });

  it("renders the correct number of boxes", () => {
    render(<InputCode code="" setCode={jest.fn()} length={4} />);
    const boxes = screen.getAllByTestId("code-box");
    expect(boxes).toHaveLength(4);
  });

  it("displays characters of the code in the right boxes", () => {
    render(<InputCode code="12" setCode={jest.fn()} length={4} />);
    expect(screen.getByTestId("code-box-0").props.children).toContain("1");
    expect(screen.getByTestId("code-box-1").props.children).toContain("2");
    expect(screen.getByTestId("code-box-2").props.children).toEqual("");
    expect(screen.getByTestId("code-box-3").props.children).toEqual("");
  });

  it("calls setCode when typing new input", () => {
    const setCode = jest.fn();
    render(<InputCode code="" setCode={setCode} length={4} />);
    const input = screen.getByTestId("hidden-input");

    fireEvent.changeText(input, "123");
    expect(setCode).toHaveBeenCalledWith("123");
  });

  it("renders in error style when error present", () => {
    const { getAllByTestId, getByTestId } = render(
      <InputCode code="" setCode={jest.fn()} length={6} error={true} />
    )
    const boxStyle = StyleSheet.flatten(getAllByTestId("code-box")[0].props.style)
    const charStyle = StyleSheet.flatten(getByTestId("code-box-0").props.style)

    expect(boxStyle.borderColor).toBe('#FF4141')
    expect(charStyle.color).toBe('#FF4141')
  })

  it("does not allow input longer than length", () => {
    const setCode = jest.fn();
    render(<InputCode code="1234" setCode={setCode} length={4} />);
    const input = screen.getByTestId("hidden-input");

    fireEvent.changeText(input, "12345");
    expect(setCode).toHaveBeenCalledWith("1234");
  });

  it("focuses the input when pressed", () => {
    const { getByTestId } = render(
      <InputCode code="" setCode={jest.fn()} length={4} />
    );
    const pressable = getByTestId("overlay-pressable");
    fireEvent.press(pressable)

    fireEvent.press(pressable);
    expect(TextInput.prototype.focus).toHaveBeenCalled();
  });
});
