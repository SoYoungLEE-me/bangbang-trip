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
