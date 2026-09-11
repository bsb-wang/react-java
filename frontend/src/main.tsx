import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

async function enableMock() {
  if (import.meta.env.VITE_USE_MOCK === "true") {
    const { worker } = await import("../mocks/browser");
    await worker.start();
    console.log("Mock Enabled");
  } else {
    console.log("Mock Disabled");
  }
}

enableMock();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
