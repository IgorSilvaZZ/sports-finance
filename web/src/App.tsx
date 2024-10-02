import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

import { router } from "./routes";

import { persistor, store } from "./store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toaster richColors />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
