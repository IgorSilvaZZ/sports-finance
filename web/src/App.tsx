import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

import "react-multi-carousel/lib/styles.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
