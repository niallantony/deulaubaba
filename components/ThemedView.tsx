import { ReactNode } from "react";
import { styled } from "styled-components/native"
import { TitleText } from "./ThemedText";

export type PageTitleViewProps = {
  title: string;
  children: ReactNode;
}

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

export const UploadImageFrame = styled.View`
  display: flex;
  flex-direction: row;
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

