import { DictionaryListing, ExpressionType } from "@/types/dictionary";

export type DictionaryListingResponse = {
  status: number;
  body: {
    listings: DictionaryListing[] | null;
    expressiontypes: ExpressionType[] | null;
  } | null;
  message?: string;
}


export const getDictionaryListings = async (studentId: string): Promise<DictionaryListingResponse> => {
  if (studentId === "123456") {
    return {
      status: 200,
      body: {
        expressiontypes: ["body"],
        listings: [
          {
            id: 1,
            type: "body",
            title: "다 했어요/끝났어요",
            category: [
              "request",
              "showMe"
            ],
            imgsrc: "@dictEx1",
            description: "수민이는 주어진 과제를 다했을 때 손담으로 표현할 수 있어요."
          },
          {
            id: 2,
            type: "body",
            title: "산책가요",
            category: [
              "request",
            ],
            imgsrc: "@dictEx2",
            description: "수민이는 산책가고 싶을 때 손담으로 표현할 수 있어요. "
          },
          {
            id: 3,
            type: "body",
            title: "하기 싫어요/그만 할래요",
            category: [
              "rejection"
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

