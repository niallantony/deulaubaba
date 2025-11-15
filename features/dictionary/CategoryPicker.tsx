import { CenteredOverlay } from "@/components/CenteredOverlay";
import { theme } from "@/themes/global";
import { categoryKeys, CommunicationCategory, getCategoryColor, getCategoryTitle } from "@/types/dictionary";
import { useState } from "react";
import { Pressable, PressableProps, TextProps, View, Text, StyleSheet } from "react-native";

export const CategoryChip = ({
  children, onPress, active = true,
}: { active?: boolean } & PressableProps) => (
  <Pressable
    style={[
      styles.categoryChip,
      active ? styles.activeCategoryChip : styles.inactiveCategoryChip
    ]}
    onPress={onPress}
  >
    {children}
  </Pressable>
);

export const CategoryColor = ({ color }: { color: string }) => (
  <View style={[styles.categoryColor, { backgroundColor: color }]} />
);

export const CategoryTitle = ({
  children,
  color,
  size = "large",
  ...props
}: { color: string; size?: "large" | "small" } & TextProps) => (
  <Text
    style={[
      size === "large" ? styles.categoryTitle : styles.smallCategoryTitle,
      { color },
    ]}
    {...props}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  categoryChip: {
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
  },
  activeCategoryChip: {
    backgroundColor: theme.colors.accent,
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

  const toggleCategory = (c: CommunicationCategory) => {
    const updated = categories.includes(c)
      ? categories.filter((cat) => cat !== c)
      : [...categories, c];
    setCategories(updated);
    setCategory(updated);
  };

  return (
    <CenteredOverlay>
      {categoryKeys.map((cat) => (
        <CategoryButton
          key={cat}
          category={cat}
          active={categories.includes(cat)}
          onToggle={() => toggleCategory(cat)}
        />
      ))}
    </CenteredOverlay>
  );
};

const CategoryButton = ({ category, active, onToggle }: {
  category: CommunicationCategory;
  active: boolean;
  onToggle: () => void;
}) => {
  const color = getCategoryColor(category);
  const title = getCategoryTitle(category);
  return (
    <CategoryChip active={active} onPress={onToggle}>
      <CategoryTitle color={active ? "white" : color}>{title}</CategoryTitle>
      <CategoryColor color={color} />
    </CategoryChip>
  )

}

export const CategoryIndicator = ({ category }: { category: CommunicationCategory }) => {
  const color = getCategoryColor(category);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden', maxWidth: '100%' }}>
      <CategoryColor color={color} />
      <CategoryTitle
        color={color}
        size="small"
      >
        {getCategoryTitle(category)}
      </CategoryTitle>
    </View>
  )

}
