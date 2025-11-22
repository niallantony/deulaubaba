import { DictionaryListing, DictionaryPosting } from "@/types/dictionary"
import { useState } from "react"
import { DictionaryForm } from "./DictionaryForm"
import { useDictionaryMutations } from "@/hooks/useDictionaryMutations"
import { useModal } from "@/hooks/useModal"
import { DictionaryView } from "./DictionaryView"

export const ListingDescription = ({ entry, onUpdate }: { entry: DictionaryListing, onUpdate: () => void }) => {
  const [edit, setEdit] = useState(false);
  const id = entry.id

  const { update, remove } = useDictionaryMutations();


  const { show, hide } = useModal();

  const handleModal = (() => show("confirm", {
    text: "정말 삭제하겠습니까?",
    onConfirm: handleDelete,
    confirmText: "삭제"
  }))

  const handleShowForm = () => {
    setEdit(true);
  }

  const handleEditSubmit = (dictionary: DictionaryPosting) => {
    update.mutate({ dictionary, id })
    onUpdate();
  }

  const handleDelete = () => {
    remove.mutate(entry.id);
    onUpdate();
    hide();
  }

  return (
    <>
      {
        edit ?
          (
            <DictionaryForm type={entry.type} onSubmit={handleEditSubmit} entry={entry} />
          )
          :
          (
            <DictionaryView entry={entry} onDeleteRequest={handleModal} onEditPress={handleShowForm} />
          )
      }
    </>
  )
}
