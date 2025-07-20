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
  type: ExpressionType;
  title: string;
  category: CommunicationCategory[];
  imgsrc?: string;
  description?: string;
}

export type CommunicationCategory = keyof typeof CommunicationCategories;

export function getCategoryColor(category: CommunicationCategory) {
  return CommunicationCategories[category].color;
}

export type ExpressionType = keyof typeof ExpressionTypes;

export function getExpressionType(expression: ExpressionType) {
  return {
    title: ExpressionTypes[expression].title,
    description: ExpressionTypes[expression].description
  }
}
