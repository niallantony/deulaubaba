import { categoryKeys, CommunicationCategory, getCategoryColor, getCategoryTitle } from "@/types/dictionary";
import { useState } from "react";
import { View } from "react-native";
import { styled } from "styled-components/native";

const CategoryChip = styled.Pressable`
  background-color: ${props => props.theme.colors.accent};
  flex-direction: row;
  margin: 2px 0;
  border-radius: ${props => props.theme.radii.md};
  padding: ${props => props.theme.spacing.small};
  justify-content: space-between;
  align-items: center;
`

const InactiveCategoryChip = styled.Pressable`
  background-color: ${props => props.theme.colors.inputs};
  flex-direction: row;
  margin: 2px 0;
  padding: ${props => props.theme.spacing.small};
  justify-content: space-between;
  align-items: center;
`

const CategoryColor = styled.View<{ $color: string }>`
  background-color: ${props => props.$color};
  height: 16px;
  width: 16px;
  border-radius: 16px;
`

const CategoryTitle = styled.Text<{ $color: string }>`
  font-weight: 700;
  font-size: ${props => props.theme.sizes.md};
  color: ${props => props.$color}
`

const SmallCategoryTitle = styled.Text<{ $color: string }>`
  font-size: ${props => props.theme.sizes.sm};
  color: ${props => props.$color}
`

export const CategoryPicker = ({ setCategory, category }: {
  setCategory: (c: CommunicationCategory[]) => void;
  category: CommunicationCategory[];
}) => {
  const [categories, setCategories] = useState<CommunicationCategory[]>(category);

  const addCategory = (category: CommunicationCategory) => {
    if (!categories.includes(category)) {
      const updated = [...categories, category];
      setCategories(updated);
      setCategory(updated)
    }
  }

  const removeCategory = (category: CommunicationCategory) => {
    if (categories.includes(category)) {
      const updated = categories.filter((containing => containing !== category))
      setCategories(updated)
      setCategory(updated)
    }

  }


  return (
    <View>
      {categoryKeys && categoryKeys.map((category) => {
        return (
          <CategoryButton
            category={category}
            key={category}
            active={categories.includes(category)}
            handleAdd={() => addCategory(category)}
            handleRemove={() => removeCategory(category)}
          />
        )
      })}
    </View>
  )

}

const CategoryButton = ({ category, active, handleAdd, handleRemove }: {
  category: CommunicationCategory;
  active: boolean;
  handleAdd: () => void;
  handleRemove: () => void;
}) => {
  const color = getCategoryColor(category);
  const title = getCategoryTitle(category);
  return (
    <>
      {active ?
        (<CategoryChip onPress={handleRemove}>
          <CategoryTitle $color={"white"}>{title}</CategoryTitle>
          <CategoryColor $color={color} style={{ marginLeft: 10 }} />
        </CategoryChip>)
        :
        (<InactiveCategoryChip onPress={handleAdd}>
          <CategoryTitle $color={color}>{title}</CategoryTitle>
          <CategoryColor $color={color} style={{ marginLeft: 10 }} />
        </InactiveCategoryChip>)
      }
    </>
  )

}

const SmallChip = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 ${props => props.theme.spacing.mini};
`

export const CategoryIndicator = ({ category }: { category: CommunicationCategory }) => {
  const color = getCategoryColor(category);
  return (
    <SmallChip>
      <CategoryColor $color={color} style={{ marginRight: 6 }} />
      <SmallCategoryTitle $color={color}>{getCategoryTitle(category)}</SmallCategoryTitle>
    </SmallChip>
  )

}
