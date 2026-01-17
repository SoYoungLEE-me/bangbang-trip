// 이미지 소스셋 설정 함수
export function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

// HTML 파싱 함수
export const formatHtmlText = (htmlString: string): string => {
  if (!htmlString) return "";
  return htmlString
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\n\s*\n/g, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
};
