import { useModal } from "@/hooks/useModal"
import { PropsWithChildren } from "react"
import { TouchableWithoutFeedback } from "react-native"

export const TouchableAvatar = ({ imagesrc, children }:
  { imagesrc?: string } & PropsWithChildren
) => {
  const { show } = useModal();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (imagesrc) {
          show("fullSizeImage", { uri: imagesrc })
        }
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  )
}
