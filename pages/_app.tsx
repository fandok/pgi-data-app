import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import "../styles/vars.css";
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
