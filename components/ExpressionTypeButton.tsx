import { theme } from "@/themes/global";
import { ExpressionType, getExpressionType } from "@/types/dictionary";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export const ExpressionTypeButton = ({ expression, add = false }: { expression: ExpressionType; add?: boolean; }) => {
  const { title, description } = getExpressionType(expression);
  return (
    <Link href={`/dictionary/viewList/${expression}${add ? '/add' : ''}`} asChild>
      <Pressable style={styles.button}>
        <Text style={styles.first}>{title}</Text>
        <Text style={styles.second}>{description}</Text>
      </Pressable>
    </Link>

  )

}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    marginVertical: 4,
    backgroundColor: theme.colors.accent,
  },
  first: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 800,
    color: theme.colors.lightText,
  },
  second: {
    fontWeight: 600,
    color: theme.colors.lightText
  }
})
