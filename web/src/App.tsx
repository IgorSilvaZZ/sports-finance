import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "sonner";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";

import { router } from "./routes";

import { persistor, store } from "./store";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

setDefaultOptions({ locale: ptBR });

function App() {
  return (
    <MantineProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Toaster richColors />
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </MantineProvider>
  );
}

export default App;
