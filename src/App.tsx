import "./App.css";
import { Suspense } from "react";
import AppRouter from "./routes/AppRouter";
import { syncProfileNameFromGoogle } from "./services/auth";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    syncProfileNameFromGoogle();
  }, []);

  return (
    <Suspense fallback={<div>...loading</div>}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
