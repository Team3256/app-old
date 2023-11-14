import "../styles/globals.css";

import type { AppType } from "next/app";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import {
  checkClientPermissions,
  requestClientPermissions,
} from "~/utils/client_requestPermissions";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // Check if the user has the required permissions
  // console.log(checkClientPermissions());

  if (!checkClientPermissions() && typeof window !== "undefined" && false) {
    return (
      <ChakraProvider>
        <Alert status="error">
          <AlertTitle>
            Team3256 App requires the following permissions in order to work.
          </AlertTitle>
          <AlertDescription>
            <ul>
              <li>Notifications</li>
            </ul>
          </AlertDescription>
        </Alert>
        <Button onClick={() => requestClientPermissions()}>
          Request Permissions
        </Button>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default MyApp;
