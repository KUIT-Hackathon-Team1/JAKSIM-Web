import Router from "./pages/Router";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <>
      <AppLayout>
        <Router />
      </AppLayout>
    </>
  );
}

export default App;
