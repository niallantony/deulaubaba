import { ReactNode } from "react";
import { styled } from "styled-components/native"
import { TitleText } from "./ThemedText";

export type PageTitleViewProps = {
  title: string;
  children: ReactNode;
}

export const InfoPane = styled.View`
  background-color: ${props => props.theme.colors.inputs};
  font-size: ${props => props.theme.sizes.md};
  padding: ${props => props.theme.spacing.default};
  border-radius: ${props => props.theme.radii.md};
  box-shadow: 0 7px 6px rgba(0,0,0,0.03);
`

export const AvatarPane = styled.View`
  background-color: ${props => props.theme.colors.inputs};
  border-radius: ${props => props.theme.radii.imageBorder};
  box-shadow: 0 7px 6px rgba(0,4,4,0.2);
  width: fit-content;
  height: fit-content;
  padding: ${props => props.theme.spacing.border};
`

export const PressableAvatarPane = styled.Pressable`
  background-color: ${props => props.theme.colors.inputs};
  border-radius: ${props => props.theme.radii.imageBorder};
  box-shadow: 0 7px 6px rgba(0,4,4,0.2);
  width: fit-content;
  height: fit-content;
  padding: ${props => props.theme.spacing.border};
`

export const FullView = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing.screenContainer};
`

export const FullViewWhite = styled.View`
  justify-content: center;
  height: 100%;
  align-items: center;
  padding: ${props => props.theme.spacing.screenContainer};
  border-radius: ${props => props.theme.radii.xl};
  background-color: ${props => props.theme.colors.inputs};
`
export const ProfileAvatarPane = styled.View`
  margin: ${props => props.theme.spacing.default};
`

export const FormView = styled.View`
  width: 100%;
  padding-left: ${props => props.theme.spacing.default};
  padding-right: ${props => props.theme.spacing.default};
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.default};
  margin-bottom: ${props => props.theme.spacing.default};
`


export const TwinInputs = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`

export const RowText = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`
export const UploadImageFrame = styled.View`
  display: flex;
  flex-direction: row;
`

const PageTitleContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: ${props => props.theme.spacing.screenContainer};
`

const PageTitleContent = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
`
const ScrollablePageTitleContent = styled.ScrollView`
  flex: 1;
  width: 100%;
`

export const ImageFrame = styled.View`
  display: flex;
  flex-direction: row;
`

export const ThemedScrollableView = styled.ScrollView`
  flex: 1;
  width: 100%;
`

export const PageTitleView = ({ title, children }: PageTitleViewProps) => {
  return (
    <PageTitleContainer>
      <TitleText>{title}</TitleText>
      <PageTitleContent>
        {children}
      </PageTitleContent>
    </PageTitleContainer>
  )
}

export const PageTitleScrollableView = ({ title, children }: PageTitleViewProps) => {
  return (
    <PageTitleContainer>
      <TitleText>{title}</TitleText>
      <ScrollablePageTitleContent>
        {children}
      </ScrollablePageTitleContent>
    </PageTitleContainer>
  )
}


