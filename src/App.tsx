import "./App.css";
import { Suspense } from "react";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
