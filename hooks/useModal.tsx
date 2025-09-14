import { modalMap, ModalNames, ModalProps } from "@/types/modal";
import { createContext, PropsWithChildren, use, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";


export const ModalContext = createContext<{
  show: <K extends ModalNames>(name: K, props: ModalProps[K]) => void,
  hide: () => void
}>({
  show: () => { },
  hide: () => { }
})

export const useModal = () => {
  const value = use(ModalContext);
  if (!value) {
    throw new Error("Must be wrapped with ModalProvider")
  }

  return value;
}

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<{ name: ModalNames; props: any } | null>(null)


  const show = <K extends ModalNames>(name: K, props: ModalProps[K]) => setModal({ name, props })
  const hide = () => setModal(null)

  const ModalComponent = modal ? modalMap[modal.name] : null

  return (
    <ModalContext.Provider value={{ show, hide }}>
      {children}
      {ModalComponent &&
        <TouchableWithoutFeedback onPress={hide}>
          <View style={styles.overlay} testID="modal-container" >
            <ModalComponent {...modal?.props} onClose={hide} />
          </View>
        </TouchableWithoutFeedback>
      }
    </ModalContext.Provider>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
})
