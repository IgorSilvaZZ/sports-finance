import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
