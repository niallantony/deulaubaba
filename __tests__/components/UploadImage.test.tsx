// UploadImage.test.tsx
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { UploadImage } from "@/components/UploadImage";
import * as ImagePicker from "expo-image-picker";

// mock image assets
jest.mock("@/assets/images/addPhotoDark.png", () => "mocked-add-photo.png");

// mock ImagePicker
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
}));

describe("UploadImage", () => {
  const setImageMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders addPhoto icon if no image and no preImage", () => {
    const { getByRole } = render(
      <UploadImage setImage={setImageMock} image={null} />
    );
    const button = getByRole("button", { name: "프로필 이미지 업로드" });
    expect(button).toBeTruthy();
  });

  it("renders user-picked image if image prop is set", () => {
    const { getByRole, getByTestId } = render(
      <UploadImage setImage={setImageMock} image={"picked-uri"} />
    );
    const button = getByRole("button", { name: "프로필 이미지 업로드" });
    expect(button).toBeTruthy();
    expect(getByTestId("user-image")).toBeTruthy();
  });

  it("renders preImage with overlay if image not set", () => {
    const { getByRole, getByTestId } = render(
      <UploadImage
        setImage={setImageMock}
        image={null}
        preImage="existing-avatar.png"
      />
    );
    const button = getByRole("button", { name: "프로필 이미지 업로드" });
    expect(button).toBeTruthy();
    // ImageBackground overlay check
    expect(getByTestId("overlay")).toBeTruthy();
  });

  it("calls ImagePicker and updates state when image is picked", async () => {
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: "new-image-uri" }],
    });

    const { getByRole } = render(
      <UploadImage setImage={setImageMock} image={null} />
    );

    fireEvent.press(getByRole("button", { name: "프로필 이미지 업로드" }));

    await waitFor(() => {
      expect(setImageMock).toHaveBeenCalledWith("new-image-uri");
    });
  });

  it("does nothing if picker is canceled", async () => {
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValueOnce({
      canceled: true,
    });

    const { getByRole } = render(
      <UploadImage setImage={setImageMock} image={null} />
    );

    fireEvent.press(getByRole("button", { name: "프로필 이미지 업로드" }));

    await waitFor(() => {
      expect(setImageMock).not.toHaveBeenCalled();
    });
  });
});


