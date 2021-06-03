import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./components/App";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
