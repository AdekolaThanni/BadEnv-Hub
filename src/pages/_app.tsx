import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/global.css";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { ContextProvider } from "@/contexts/ContextProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/contexts/UserProvider";
import { Toaster } from "react-hot-toast";

require("@solana/wallet-adapter-react-ui/styles.css");

//@ts-ignore
function MyApp({ Component, pageProps }) {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <ContextProvider>
        <SessionProvider session={pageProps.session}>

        <UserProvider>
          {
            //@ts-ignore
            <NextUIProvider>
              <ThemeProvider enableSystem={true} attribute="class">
                  <Component {...pageProps} />
              </ThemeProvider>
            </NextUIProvider>
          }

          <Toaster position="bottom-center"></Toaster>
        </UserProvider>
          </SessionProvider>
      </ContextProvider>
    );
  }
}

export default MyApp;
