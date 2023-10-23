import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Select,
  Switch,
} from "@chakra-ui/react";

import SidebarWithHeader from "~/components/Sidebar";

export default function Home() {
  return (
    <SidebarWithHeader>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-center text-2xl">Pit Display</p>
        <Alert className="w-1/2" status="info">
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            Pit Display requires a dedicated computer / iPad / phone to run on.
            It is recommended to use a computer connected to a TV or monitor.
          </AlertDescription>
        </Alert>
        {/* Setup menu */}
        <h2 className="text-center text-2xl">Configure Your Pit Display</h2>
        <FormControl>
          <FormLabel>Pit Display Mode</FormLabel>
          <Select placeholder="Select">
            <option>Queue / Livestream Split 50/50</option>
            <option>Queue Focus</option>
            <option>Live Stream Focus</option>
            <option>Live Stream Only</option>
            <option>Queue Only</option>
          </Select>
          <Switch colorScheme="pink" mt={4}>
            Live Stream Only - Show Queue Notifications?
          </Switch>
          <br />
          <Switch colorScheme="pink" mt={4}>
            Queue Modes Only - Show Upcoming Match Info?
          </Switch>
          <br />
          <Switch colorScheme="pink" mt={4} isDisabled isChecked>
            Allow remote control of Pit Display? - Force enabled by your Team
            Captain.
          </Switch>
          <br />
          <Switch colorScheme="pink" mt={4}>
            Stream music to Pit Display?
          </Switch>
          <br />
          <br />
          <p>
            You will recieve pages or notifications as "Pit Display".
            <br />
            Notifications or Pages requested to your user account ("Vivek
            Nadig") will not show up. <br />
            Multiple Pit Displays can be run at the same time, and will all
            recieve the same notifications.
          </p>
          <Checkbox colorScheme="pink" mt={4}>
            I understand and agree to the above.
          </Checkbox>
        </FormControl>
        <Button
          colorScheme="pink"
          onClick={() => {
            const popup = window.open(
              "pitdisplay_view?running=true",
              "popup",
              "fullscreen=yes,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no",
            );
            if (popup === null) {
              alert(
                "Failed to open Pit Display in a new window. Please allow popups from this site.",
              );
              return;
            }
            if (
              popup.outerWidth < screen.availWidth ||
              popup.outerHeight < screen.availHeight
            ) {
              popup.moveTo(0, 0);
              popup.resizeTo(screen.availWidth, screen.availHeight);
              const forceLock = setInterval(() => {
                popup.moveTo(0, 0);
                popup.resizeTo(screen.availWidth, screen.availHeight);
              }, 10);
              popup.onbeforeunload = () => {
                clearInterval(forceLock);
              };
              // On postMessage from popup, close it
              window.addEventListener("message", (event) => {
                if (event.data === "close") {
                  popup.close();
                } else if (event.data === "unlock") {
                  clearInterval(forceLock);
                }
              });
            }
          }}
        >
          Launch
        </Button>
      </div>
    </SidebarWithHeader>
  );
}
