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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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
