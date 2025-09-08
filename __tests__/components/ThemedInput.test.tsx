import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemedTextInput, ThemedTextArea, ThemedTwinInput } from "@/components/ThemedInput";

describe("ThemedTextInput", () => {
  it("renders a label", () => {
    const { getByText } = render(
      <ThemedTextInput label="Username" value="" onChange={() => { }} />
    );
    expect(getByText("Username")).toBeTruthy();
  });

  it("renders an error when provided", () => {
    const { getByText, getByLabelText } = render(
      <ThemedTextInput
        label="Username"
        value=""
        error="Required"
        onChange={() => { }}
      />
    );

    expect(getByText("Required")).toBeTruthy();
    const input = getByLabelText("Username");
    expect(input.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderColor: "#FF4141" })])
    );
  });

  it("calls onChange when typing", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <ThemedTextInput label="Email" value="" onChange={handleChange} />
    );
    const input = getByLabelText("Email");

    fireEvent.changeText(input, "hello@test.com");
    expect(handleChange).toHaveBeenCalledWith("hello@test.com");
  });
});

describe("ThemedTextArea", () => {
  it("is multiline and respects height", () => {
    const { getByLabelText } = render(
      <ThemedTextArea label="Bio" value="abc" onChange={() => { }} rows={4} />
    );

    const input = getByLabelText("Bio");
    expect(input.props.multiline).toBe(true);
    expect(input.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ height: 4 * 32 })])
    );
  });
});

describe("ThemedTwinInput", () => {
  it("applies left positioning style", () => {
    const { getByTestId } = render(
      <ThemedTwinInput
        label="First Name"
        value=""
        onChange={() => { }}
        twinPosition="left"
      />
    );
    const input = getByTestId("container");

    expect(input.parent?.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ marginRight: 12 })])
    );
  });
});
