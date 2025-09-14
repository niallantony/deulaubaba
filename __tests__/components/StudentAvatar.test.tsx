import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { StudentAvatar } from "@/components/StudentAvatar";

describe("StudentAvatar", () => {
  it("renders fallback avatar when no url is provided", () => {
    const { getByTestId, queryByTestId } = render(
      <StudentAvatar width={50} height={50} />
    );

    expect(queryByTestId("image")).toBeNull();
    expect(getByTestId("no-image")).toBeOnTheScreen();
  });

  it("image source matches given url", () => {
    const { getByTestId } = render(
      <StudentAvatar url="avatar.png" width={50} height={50} />
    );

    expect(getByTestId("image").props.source[0].uri).toContain(`avatar.png`);
  });

  it("updates state on image load end", () => {
    const { getByTestId, queryByTestId } = render(
      <StudentAvatar url="avatar.png" width={50} height={50} />
    );

    const image = getByTestId("image");

    fireEvent(image, "loadEnd");

    expect(queryByTestId("no-image")).toBeNull();
  });

  it("renders loader when url is provided and image not loaded", () => {
    const { getByTestId } = render(
      <StudentAvatar url="avatar.png" width={50} height={50} />
    );

    expect(getByTestId("loader")).toBeTruthy();
  });

  it("applies correct border radius for full vs round style", () => {
    const { getByTestId } = render(
      <StudentAvatar url="avatar.png" width={50} height={50} style="round" />
    );

    const image = getByTestId("container");
    expect(image.props.style[0].borderRadius).toBe(128);
  });
});
