import { DictionaryListing, DictionaryPosting, DictionaryPostingResponse, ExpressionType } from "@/types/dictionary";

export type DictionaryListingResponse = {
  status: number;
  body: {
    listings: DictionaryListing[] | null;
    expressiontypes: ExpressionType[] | null;
  } | null;
  message?: string;
}


export const getDictionaryListings = async (studentId: string): Promise<DictionaryListingResponse> => {
  if (studentId === "9eeb23") {
    return {
      status: 200,
      body: {
        expressiontypes: ["BODY"],
        listings: [
          {
            id: 1,
            type: "BODY",
            title: "다 했어요/끝났어요",
            category: [
              "REQUEST",
              "SHOWME"
            ],
            imgsrc: "@dictEx1",
            description: "수민이는 주어진 과제를 다했을 때 손담으로 표현할 수 있어요."
          },
          {
            id: 2,
            type: "BODY",
            title: "산책가요",
            category: [
              "REQUEST",
            ],
            imgsrc: "@dictEx2",
            description: "수민이는 산책가고 싶을 때 손담으로 표현할 수 있어요. "
          },
          {
            id: 3,
            type: "BODY",
            title: "하기 싫어요/그만 할래요",
            category: [
              "REJECTION"
            ],
            imgsrc: "@dictEx3",
            description: "수민이는 주어진 과제를 하기 싫거나 그만하고 싶을 때 눈 감고 자는 척해요. "
          },

        ]
      }
    }

  }
  return {
    status: 401,
    body: null,
    message: "No entries found"
  }


}

export const postDictionary = async (d: DictionaryPosting, b: Blob): Promise<DictionaryPostingResponse> => {
  return Promise.resolve({ status: 200, body: null });
}

