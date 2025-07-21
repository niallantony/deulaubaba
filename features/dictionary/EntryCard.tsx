import { StudentAvatar } from "@/components/StudentAvatar";
import { DictionaryListing, getCategoryColor } from "@/types/dictionary";
import { styled } from "styled-components/native";

const Card = styled.View`
  background-color: ${props => props.theme.colors.inputs};
  border-radius: ${props => props.theme.radii.xl};
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.small};
  margin: ${props => props.theme.spacing.mini} 0;
  flex-direction: row;
`

const CardInterior = styled.View`
  margin-left: ${props => props.theme.spacing.small};
  flex: 1;
`

const CardTitle = styled.Text`
  font-size: ${props => props.theme.sizes.md};
  font-weight: 700;
  max-width: 186px;
`

const CardTitleHolder = styled.View`
  flex-direction: row;
  align-items: center;
`

const CategoryMarker = styled.View<{ $color: string }>`
  background-color: ${props => props.$color};
  width: 16px;
  height: 16px;
  border-radius: 8px;
  margin: 0 2px;
`

const CardDescription = styled.Text`
  color: ${props => props.theme.colors.light};
`

const CardDescriptionHolder = styled.View`
  flex-direction: row;
`

export const EntryCard = ({ entry }: { entry: DictionaryListing }) => {
  console.log(entry)
  return (
    <Card>
      <StudentAvatar
        url={entry.imgsrc} width={64} height={64} />
      <CardInterior>
        <CardTitleHolder>
          <CardTitle numberOfLines={1} ellipsizeMode="tail"> {entry.title} </CardTitle>
          {entry.category.map((category) => (
            <CategoryMarker key={category} $color={getCategoryColor(category)} />
          ))}
        </CardTitleHolder>
        <CardDescriptionHolder>
          <CardDescription numberOfLines={2} ellipsizeMode="tail"> {entry.description} </CardDescription>
        </CardDescriptionHolder>
      </CardInterior>
    </Card>
  )
}
