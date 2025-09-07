import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Text } from 'react-native'
import { RowButtonContainer, ButtonContainer } from "@/components/ButtonContainer";

describe("RowButtonContainer", () => {
  it("renders children", () => {
    render(
      <RowButtonContainer>
        <TestChild />
      </RowButtonContainer>
    );
    expect(screen.getByTestId("test-child")).toBeTruthy();
  });
});

describe("ButtonContainer", () => {
  it("renders children", () => {
    render(
      <ButtonContainer>
        <TestChild />
      </ButtonContainer>
    );
    expect(screen.getByTestId("test-child")).toBeTruthy();
  });

  it("applies the given width to the inner view", () => {
    const { getByTestId } = render(
      <ButtonContainer width={200}>
        <TestChild />
      </ButtonContainer>
    );
    const inner = getByTestId("inner-view");
    expect(inner.props.style).toEqual(expect.objectContaining({ width: 200 }));
  });
});

const TestChild = () => <Text testID="test-child">hello</Text>
