import { StudentAvatar } from "@/components/StudentAvatar";
import { theme } from "@/themes/global";
import { DictionaryListing, getCategoryColor } from "@/types/dictionary";
import { Pressable, PressableProps, TextProps, View, ViewProps, Text, StyleSheet } from "react-native";

export const Card = ({ children, onPress }: PressableProps) => (
  <Pressable style={styles.card} onPress={onPress}>
    {children}
  </Pressable>
);

export const CardInterior = ({ children }: ViewProps) => (
  <View style={styles.cardInterior}>{children}</View>
);

export const CardTitleHolder = ({ children }: ViewProps) => (
  <View style={styles.cardTitleHolder}>{children}</View>
);

export const CardTitle = ({ children }: TextProps) => (
  <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
    {children}
  </Text>
);

export const CategoryMarker = ({ color }: { color: string }) => (
  <View style={[styles.categoryMarker, { backgroundColor: color }]} />
);

export const CardDescriptionHolder = ({ children }: ViewProps) => (
  <View style={styles.cardDescriptionHolder}>{children}</View>
);

export const CardDescription = ({ children }: TextProps) => (
  <Text style={styles.cardDescription} numberOfLines={2} ellipsizeMode="tail">{children}</Text>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.inputs,
    borderRadius: 16, // xl
    paddingVertical: 12, // small
    paddingHorizontal: 12, // small
    marginVertical: 4, // mini
    flexDirection: "row",
  },
  cardInterior: {
    marginLeft: 12, // small
    flex: 1,
  },
  cardTitleHolder: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18, // md
    fontWeight: "700",
    maxWidth: 186,
  },
  categoryMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  cardDescriptionHolder: {
    flexDirection: "row",
  },
  cardDescription: {
    color: theme.colors.light,
  },
});


export const EntryCard = ({ entry, onClick }: { entry: DictionaryListing, onClick: () => void }) => {
  return (
    <Card onPress={onClick}>
      <StudentAvatar
        url={entry.imgsrc} width={64} height={64} />
      <CardInterior>
        <CardTitleHolder>
          <CardTitle > {entry.title} </CardTitle>
          {entry.category.map((category) => (
            <CategoryMarker key={category} color={getCategoryColor(category)} />
          ))}
        </CardTitleHolder>
        <CardDescriptionHolder>
          <CardDescription > {entry.description} </CardDescription>
        </CardDescriptionHolder>
      </CardInterior>
    </Card>
  )
}
