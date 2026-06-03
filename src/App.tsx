// App.tsx
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { seedDatabase } from "./utils/seedDatabase";

function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await seedDatabase();
      } catch (error) {
        console.error("Database seed failed", error);
      }
    };

    initializeApp();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
