import { CenteredOverlay } from "@/components/CenteredOverlay";
import { theme } from "@/themes/global";
import { categoryKeys, CommunicationCategory, getCategoryColor, getCategoryTitle } from "@/types/dictionary";
import { useState } from "react";
import { Pressable, PressableProps, TextProps, View, Text, StyleSheet } from "react-native";

export const CategoryChip = ({ children, onPress }: PressableProps) => (
  <Pressable style={styles.categoryChip} onPress={onPress}>
    {children}
  </Pressable>
);

export const InactiveCategoryChip = ({ children, onPress }: PressableProps) => (
  <Pressable style={styles.inactiveCategoryChip} onPress={onPress}>
    {children}
  </Pressable>
);

export const CategoryColor = ({ color }: { color: string }) => (
  <View style={[styles.categoryColor, { backgroundColor: color }]} />
);

export const CategoryTitle = ({ children, color }: { color: string } & TextProps) => (
  <Text style={[styles.categoryTitle, { color }]}>{children}</Text>
);

export const SmallCategoryTitle = ({ children, color }: { color: string } & TextProps) => (
  <Text style={[styles.smallCategoryTitle, { color }]}>{children}</Text>
);

const styles = StyleSheet.create({
  categoryChip: {
    backgroundColor: theme.colors.accent,
    flexDirection: "row",
    marginVertical: 2,
    borderRadius: 8,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    width: '80%'
  },
  inactiveCategoryChip: {
    backgroundColor: theme.colors.inputs,
    flexDirection: "row",
    marginVertical: 2,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    width: '80%'
  },
  categoryColor: {
    height: 16,
    width: 16,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  categoryTitle: {
    fontWeight: "700",
    fontSize: 18,
  },
  smallCategoryTitle: {
    fontSize: 12,
    flexShrink: 1,
  },
});

export const CategoryPicker = ({ setCategory, category, onClose }: {
  setCategory: (c: CommunicationCategory[]) => void;
  category: CommunicationCategory[];
  onClose: () => void;
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
    <CenteredOverlay>
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
    </CenteredOverlay>
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
          <CategoryTitle color={"white"}>{title}</CategoryTitle>
          <CategoryColor color={color} />
        </CategoryChip>)
        :
        (<InactiveCategoryChip onPress={handleAdd}>
          <CategoryTitle color={color}>{title}</CategoryTitle>
          <CategoryColor color={color} />
        </InactiveCategoryChip>)
      }
    </>
  )

}

export const CategoryIndicator = ({ category }: { category: CommunicationCategory }) => {
  const color = getCategoryColor(category);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden', maxWidth: '100%' }}>
      <CategoryColor color={color} />
      <SmallCategoryTitle
        color={color}
      >
        {getCategoryTitle(category)}
      </SmallCategoryTitle>
    </View>
  )

}
