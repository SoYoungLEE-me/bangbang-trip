import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  server: {
    proxy: {
      // 이제 /api/tour/areaBasedList2 라고 호출하면
      // https://apis.data.go.kr/B551011/KorService2/areaBasedList2 로 연결됩니다.
      "/api/tour": {
        target: "https://apis.data.go.kr/B551011/KorService2",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tour/, ""), // /api/tour 부분만 제거
      },
    },
  },
});
=======
})
>>>>>>> d3e186a302c8af7d1fa44270cce00cde025f48e8
