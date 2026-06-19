import "./App.css";
import { Suspense } from "react";
import AppRouter from "./routes/AppRouter";
import { syncProfileNameFromGoogle } from "./services/auth";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import { useAuthStore } from "./stores/authStore";
import FullScreenLoading from "./common/components/FullScreenLoading";
import ScrollRestoration from "./common/components/ScrollRestoration";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // 회원가입 처리(가입 직후 signOut) 도중 발생하는 일시적 이벤트는 무시
      if (useAuthStore.getState().isSigningUp) return;
      const user = session?.user ?? null;
      setUser(user);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    syncProfileNameFromGoogle();
  }, []);

  return (
    <Suspense fallback={<FullScreenLoading />}>
      <ScrollRestoration />
      <AppRouter />
    </Suspense>
  );
}

export default App;
