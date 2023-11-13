import { Button } from "@chakra-ui/react";

import SidebarWithHeader from "~/components/Sidebar";

export default function PitDisplay() {
  return (
    <SidebarWithHeader>
      <Button
        onClick={() => {
          window.opener.postMessage("close", "*");
        }}
      >
        {" "}
        Close Popup{" "}
      </Button>
      <Button
        onClick={() => {
          window.opener.postMessage("unlock", "*");
        }}
      >
        {" "}
        Remove Lock on Popup{" "}
      </Button>
      <Button
        onClick={() => {
          window.opener.postMessage("unlock", "*");
          // Fullscreen using the browser's API
          const elem = document.documentElement;
          elem.requestFullscreen();
        }}
      >
        Full Screen
      </Button>
    </SidebarWithHeader>
  );
}
