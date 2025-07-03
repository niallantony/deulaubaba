export const CommunicationCategories = {
  ATTENTION: {
    title: "관심",
    color: "#6EC2F7",
  },
  HELP: {
    title: "도움 요청",
    color: "#8B60B8"
  },
  REQUEST: {
    title: "요구하기",
    color: "#F7716E"
  },
  SHOWME: {
    title: "물건, 장소 보여주기",
    color: "#1BD760"
  },
  PAIN: {
    title: "신체적 고통",
    color: "#937B53"
  },
  REJECTION: {
    title: "거부하기",
    color: "#F2B05C",
  }

} as const;

export const ExpressionTypes = {
  BODY: {
    title: "몸짓(손담)이나 표정으로 표현할 수 있어요",
    description: "예) 화장실에 가고싶을 때 바지를 잡아요."
  },
  VOCAL: {
    title: "발성으로 표현할 수 있어요",
    description: "예) 화장실에 가고싶을 때 ‘시이' 소리를 내요."
  },
  PICTURE: {
    title: "그림으로 표현할 수 있어요",
    description: "예) 화장실에 가고싶을 때 그림 카드를 가리켜요."
  },
  MESSAGE: {
    title: "문자로 표현할 수 있어요",
    description: "예) 원하는 것을 글로 쓰거나 입력할 수 있어요."
  },
  WORD: {
    title: "구어로 표현할 수 있어요",
    description: "예) 원하는 것을 짧은 단어로 말할 수 있어요.",
  },
  MISC: {
    title: "기타",
    description: "이렇게도 표현할 수 있어요."
  }
} as const;
