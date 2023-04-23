import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ProductProvider } from "./context/ProductContext";
import { QueryClient, QueryClientProvider } from "react-query";
// import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Header />
      <ProductProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </ProductProvider>
    </>
  );
}

export default App;
