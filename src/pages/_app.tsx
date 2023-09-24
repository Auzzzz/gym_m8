import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  );
}
export default api.withTRPC(MyApp);
