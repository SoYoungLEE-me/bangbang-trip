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

// 날짜 시간 포맷팅 함수
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return dateStr;

  const formattedStr = dateStr.replace(/<br\s*\/?>/gi, "\n");

  if (formattedStr.length !== 8) return formattedStr;

  const year = formattedStr.substring(0, 4);
  const month = formattedStr.substring(4, 6);
  const day = formattedStr.substring(6, 8);

  return `${year}.${month}.${day}`;
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (!startDate && !endDate) return "";
  if (!endDate) return start;
  if (!startDate) return end;

  return `${start} ~ ${end}`;
};

export const formatTime = (timeStr: string): string => {
  if (!timeStr) return timeStr;

  const formattedStr = timeStr.replace(/<br\s*\/?>/gi, "\n");

  if (
    formattedStr.includes("\n") ||
    formattedStr.includes("월") ||
    formattedStr.includes("(")
  ) {
    return formattedStr.replace(/\b(\d{1,2}):(\d{2})\b/g, (match) => {
      return formatSingleTime(match);
    });
  }

  const simpleRangePattern = /^(\d{1,2}:\d{2})\s*[~-]\s*(\d{1,2}:\d{2})$/;
  const simpleMatch = formattedStr.match(simpleRangePattern);

  if (simpleMatch) {
    const [_, start, end] = simpleMatch;
    return `${formatSingleTime(start)} ~ ${formatSingleTime(end)}`;
  }

  const singleTimePattern = /^(\d{1,2}:\d{2})$/;
  if (singleTimePattern.test(formattedStr.trim())) {
    return formatSingleTime(formattedStr.trim());
  }

  return formattedStr;
};

const formatSingleTime = (time: string): string => {
  if (!time) return "";

  const timeMatch = time.match(/(\d{1,2}):(\d{2})/);
  if (!timeMatch) return time;

  let hour = parseInt(timeMatch[1], 10);
  const minute = timeMatch[2];

  if (hour === 24 || hour === 0) {
    return `오전 12:${minute}`;
  }

  let period = "오전";

  if (hour >= 12) {
    period = "오후";
    if (hour > 12) {
      hour = hour - 12;
    }
  }

  return `${period} ${hour}:${minute}`;
};
