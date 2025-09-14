import { API_BASE_URL } from "@/api/api"
import { useModal } from "@/hooks/useModal"
import { PropsWithChildren } from "react"
import { TouchableWithoutFeedback } from "react-native"

export const TouchableAvatar = ({ imagesrc, children }:
  { imagesrc?: string } & PropsWithChildren
) => {
  const imageurl = `${API_BASE_URL}/uploads/${imagesrc}`
  const { show } = useModal();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (imagesrc) {
          show("fullSizeImage", { uri: imageurl })
        }
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  )
}
