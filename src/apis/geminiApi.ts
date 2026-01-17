import type { AiPlannerResult } from "../models/aiPlanner";
import type { UserPlannerFormValue } from "../models/aiPlanner";
import type { TourSpot } from "../models/tour";
import { GEMINI_API_KEY } from "../configs/env";

export const requestAiPlanner = async (
  spots: TourSpot[],
  form: UserPlannerFormValue
): Promise<AiPlannerResult> => {
  const api_key = GEMINI_API_KEY;

  const systemPrompt = `
대한민국 전문 여행 가이드 AI입니다.
반드시 JSON 형식으로만 응답하세요.

데이터 구조 규칙:
1. "itinerary"는 배열이어야 함.
2. 각 itinerary 원소는 "day", "title", "activities"를 가져야 함.
3. "activities"는 "time", "location", "description"을 가진 객체의 배열이어야 함.
4. "preparations"는 문자열 배열이어야 함.
5. "Day" 필드는 반드시 1, 2, 3... 과 같은 정수(Number)만 사용하세요.
6. activity의time은 오전, 오후로 13시가 아니라 오후 1시 이런 식으로 표시해줘.
5. "exclusionNotes": 지리적 거리나 일정상 이유로 제외된 장소와 그 사유 (문자열 배열, 없을 경우 빈 배열)

[중요: 현실성 및 동선 규칙]
- **지리적 거리 고려**: 선택된 장소들이 서로 너무 멀면(예: 서울과 제주) 이동 시간을 반드시 반영하고, 현실적으로 불가능한 일정이라면 가장 적합한 지역을 중심으로 일정을 재구성하세요.
- **이동 시간 포함**: 장소 간 이동 시간이 1시간 이상일 경우 "activities"의 description에 이동 수단과 예상 소요 시간을 명시하세요.
- **장소 선별**: 일정에 비해 장소가 너무 많으면, '무드'에 가장 잘 어울리는 장소 위주로 선별하고, 제외된 장소에 대해서는 "exclusionNotes"에 그 이유를 간단히 적어주세요.
- **동선 최적화**: 같은 날에는 지리적으로 가까운 장소끼리 배치하여 이동 동선을 최소화하세요.
`;

  const userPrompt = `
여행 조건:
- 장소: ${spots.map((s) => s.title).join(", ")}
- 일정: ${form.startDate} ~ ${form.endDate}
- 인원: ${form.peopleCount}명 (${form.companions})
- 무드: ${form.mood}
`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${api_key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json" },
      }),
    }
  );

  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("AI 응답 파싱 실패");

  const parsed = JSON.parse(text);
  console.log("AI 응답 데이터:", parsed);

  if (
    !parsed ||
    !Array.isArray(parsed.itinerary) ||
    !Array.isArray(parsed.preparations)
  ) {
    throw new Error("AI 응답 형식이 올바르지 않습니다.");
  }

  return parsed;
};
