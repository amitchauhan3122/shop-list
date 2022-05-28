import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../src/redux/configure-store";
import React  from "react";

const MAX_RETRIES = 2;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: MAX_RETRIES,
      refetchOnWindowFocus: false,
    },
  },
});
function MyApp({ Component, pageProps }) {
  return(
    <>
    <React.Fragment>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>

      <Component {...pageProps} />
          </Provider>
        </QueryClientProvider>
      </React.Fragment>
    </>
  )
  
}

export default MyApp
