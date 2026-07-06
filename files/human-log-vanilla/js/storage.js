// localStorage 기반 기록 저장 유틸.
// 데이터 모델(개발 프롬프트 문서 5절 참고):
// {
//   date: "YYYY-MM-DD",   // 하루 1건 원칙
//   questionId, questionText,
//   optionId, optionLabel,
//   observation
// }

HL.STORAGE_KEY = "humanlog_responses";

HL.todayString = function () {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

HL.getResponses = function () {
  try {
    const raw = localStorage.getItem(HL.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("기록을 불러오지 못했어요.", err);
    return [];
  }
};

HL.saveResponses = function (responses) {
  try {
    localStorage.setItem(HL.STORAGE_KEY, JSON.stringify(responses));
    return true;
  } catch (err) {
    console.error("기록을 저장하지 못했어요.", err);
    return false;
  }
};

HL.getTodayResponse = function () {
  const today = HL.todayString();
  return HL.getResponses().find((r) => r.date === today) || null;
};

// 같은 날짜 기록이 있으면 덮어쓰고(upsert), 없으면 새로 추가한다.
HL.upsertResponse = function (record) {
  const responses = HL.getResponses();
  const idx = responses.findIndex((r) => r.date === record.date);
  if (idx >= 0) {
    responses[idx] = record;
  } else {
    responses.push(record);
  }
  HL.saveResponses(responses);
  return record;
};
