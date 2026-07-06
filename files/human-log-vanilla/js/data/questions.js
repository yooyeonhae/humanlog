// 전역 네임스페이스. 모듈 번들러 없이 script 태그 순서로 로드하기 위해
// 모든 파일이 window.HL 객체 아래에 기능을 붙인다.
window.HL = window.HL || {};

HL.QUESTIONS = [
  { id: "q1", text: "시험 전날 나는 어떤 편인가?" },
  { id: "q2", text: "새로운 사람을 만나면 보통 어떻게 행동하나요?" },
  { id: "q3", text: "약속이 갑자기 취소되면 어떤 생각이 먼저 드나요?" },
  { id: "q4", text: "집중이 안 될 때 나는 무엇을 하나요?" },
  { id: "q5", text: "친구가 힘들어 보이면 어떻게 행동하나요?" },
];

// 모든 질문에 공통으로 쓰이는 4지 선택지.
// 주의: 성격 유형이 아니라 '오늘 이 순간의 행동 경향'을 고르는 용도.
HL.ANSWER_OPTIONS = [
  { id: "act", label: "바로 행동한다" },
  { id: "think", label: "조금 생각한다" },
  { id: "depends", label: "상황마다 다르다" },
  { id: "unsure", label: "잘 모르겠다" },
];

HL.getRandomQuestion = function (excludeId) {
  const pool = excludeId
    ? HL.QUESTIONS.filter((q) => q.id !== excludeId)
    : HL.QUESTIONS;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
};

HL.findQuestion = function (id) {
  return HL.QUESTIONS.find((q) => q.id === id) || null;
};
