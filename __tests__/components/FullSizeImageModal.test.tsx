import { render, waitFor } from "@testing-library/react-native"
import { FullSizeImageModal } from "@/components/FullSizeImageModal";
import { Image } from 'react-native'
import { act } from "react";


beforeAll(() => {
  jest.spyOn(Image, "getSize").mockImplementation((_uri, success) => {
    success(200, 100);
  })
})

describe('FullSizeImageModal', () => {
  it("renders loader initially", () => {
    const { getByTestId } = render(
      <FullSizeImageModal uri="test.jpg" onClose={() => { }} />
    )

    expect(getByTestId("loader")).toBeTruthy();
  })

  it("shows image after load", async () => {
    const { getByTestId, queryByTestId } = render(
      <FullSizeImageModal uri="test.jpg" onClose={() => { }} />
    )

    const img = getByTestId("image")
    act(() => {
      img.props.onLoad();
    }
    )

    await waitFor(() => {
      expect(queryByTestId("loader")).toBeNull();
    })
  })

  it("returns to loader on error", async () => {
    const { getByTestId } = render(
      <FullSizeImageModal uri="test.jpg" onClose={() => { }} />
    )

    const img = getByTestId("image");
    act(() => {
      img.props.onError();
    })

    await waitFor(() => {
      expect(getByTestId("loader")).toBeTruthy();
    })
  })
})

