import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { StateBasketContextProvider } from "@/context/reza/StateBasketContext";
import { ToggleFunctionContextProvider } from "@/context/reza/ToggleFunctionContext";
import { DataControllerContextProvider } from "@/context/reza/DataControllerContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StateBasketContextProvider>
        <DataControllerContextProvider>
          <ToggleFunctionContextProvider>
            <Navbar />
            <Component {...pageProps} />
          </ToggleFunctionContextProvider>
        </DataControllerContextProvider>
      </StateBasketContextProvider>
    </SessionProvider>
  );
}
