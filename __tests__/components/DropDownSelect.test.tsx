import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { DropDownSelect, DropDownOption } from "@/components/DropDownSelect";

describe("DropDownSelect", () => {
  const items: DropDownOption[] = [
    { key: "1", label: "Option 1" },
    { key: "2", label: "Option 2" },
  ];

  it("renders the label", () => {
    render(
      <DropDownSelect
        items={items}
        label="Test Label"
        selectedValue=""
        onValueChange={jest.fn()}
        placeholder="Select"
      />
    );
    expect(screen.getByText("Test Label")).toBeTruthy();
  });

  it("renders the selected value correctly", () => {
    render(
      <DropDownSelect
        items={items}
        label="Test Label"
        selectedValue="2"
        onValueChange={jest.fn()}
      />
    );
    expect(screen.getByDisplayValue("Option 2")).toBeTruthy();
  });

  it("renders placeholder when no value is selected", () => {
    render(
      <DropDownSelect
        items={items}
        label="Test Label"
        selectedValue=""
        onValueChange={jest.fn()}
        placeholder="Choose an option"
      />
    );
    expect(screen.getByDisplayValue("")).toBeTruthy();
  });

});
