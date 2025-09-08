import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PositionedDialog } from "@/components/PositionedDialog";
import { Text } from "react-native";

describe("PositionedDialog", () => {
  const position = { x: 50, y: 100, width: 200 };
  const dialogWidth = 150;

  it("renders children", () => {
    const { getByText } = render(
      <PositionedDialog position={position} width={dialogWidth} onClose={jest.fn()}>
        <Text>Dialog content</Text>
      </PositionedDialog>
    );

    expect(getByText("Dialog content")).toBeTruthy();
  });

  it("applies correct computed style", () => {
    const { getByTestId } = render(
      <PositionedDialog position={position} width={dialogWidth} onClose={jest.fn()}>
        <Text>Dialog content</Text>
      </PositionedDialog>
    );

    const pressable = getByTestId("pressable");
    const style = pressable.props.style.flat();

    expect(style[1].top).toBe(position.y);
    expect(style[1].left).toBe(position.x + position.width - dialogWidth);
    expect(style[1].width).toBe(dialogWidth);
  });

  it("stops propagation on press", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <PositionedDialog position={position} width={dialogWidth} onClose={onClose}>
        <Text>Dialog content</Text>
      </PositionedDialog>
    );

    const pressable = getByTestId("pressable");
    const fakeEvent = { stopPropagation: jest.fn() };
    fireEvent.press(pressable, fakeEvent);

    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
  });
});
