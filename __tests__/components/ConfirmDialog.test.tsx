import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { ConfirmDialog } from "@/components/ConfirmDialog";

describe("ConfirmDialog", () => {
  const text = "Are you sure?";
  const confirmText = "Yes";

  it("renders the text", () => {
    render(
      <ConfirmDialog
        text={text}
        onConfirm={jest.fn()}
        onClose={jest.fn()}
        confirmText={confirmText}
      />
    );

    expect(screen.getByText(text)).toBeTruthy();
  });

  it("renders buttons with correct text", () => {
    render(
      <ConfirmDialog
        text={text}
        onConfirm={jest.fn()}
        onClose={jest.fn()}
        confirmText={confirmText}
      />
    );

    expect(screen.getByText(confirmText)).toBeTruthy();
    expect(screen.getByText("취소")).toBeTruthy();
  });

  it("calls onConfirm when confirm button is pressed", () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmDialog text={text} onConfirm={onConfirm} onClose={jest.fn()} />
    );
    fireEvent.press(screen.getByText("확인"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("calls onClose when cancel button is pressed", () => {
    const onClose = jest.fn();
    render(
      <ConfirmDialog text={text} onConfirm={jest.fn()} onClose={onClose} />
    );
    fireEvent.press(screen.getByText("취소"));
    expect(onClose).toHaveBeenCalled();
  });
});
