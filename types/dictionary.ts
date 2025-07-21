import { CommunicationCategories, ExpressionTypes } from "@/constants/CommunicationCategories";

export type DictionaryListing = {
  id: number;
  type: ExpressionType;
  title: string;
  category: CommunicationCategory[];
  imgsrc?: string;
  description?: string;
}


export type DictionaryPosting = {
  studentId: string;
  type: ExpressionType;
  title: string;
  category: CommunicationCategory[];
  imgsrc?: string;
  description?: string;
}

export type DictionaryPostingResponse = {
  status: number;
  body: {
    listings: DictionaryListing[] | null;
    expressiontypes: ExpressionType[] | null;
  } | null;
  message?: string;
}

export type CommunicationCategory = keyof typeof CommunicationCategories;

export const categoryKeys: CommunicationCategory[] = Object.keys(CommunicationCategories) as CommunicationCategory[]

export function getCategoryColor(category: CommunicationCategory) {
  return CommunicationCategories[category].color;
}
export function getCategoryTitle(category: CommunicationCategory) {
  return CommunicationCategories[category].title;
}

export type ExpressionType = keyof typeof ExpressionTypes;

export const expressionKeys: ExpressionType[] = Object.keys(ExpressionTypes) as ExpressionType[];

export function getExpressionType(expression: ExpressionType) {
  return {
    title: ExpressionTypes[expression].title,
    description: ExpressionTypes[expression].description
  }
}
