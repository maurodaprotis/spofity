import { Dashboard } from "./components/Dashboard";
import { AuthProvider } from "./context/UserProvider";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return (
    <AuthProvider code={code}>
      <Dashboard />
    </AuthProvider>
  );
}

export default App;
