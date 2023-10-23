import { useEffect, useState } from "react";
import { Alert, Progress } from "@chakra-ui/react";

import type { EVENT_STATUS } from "@acme/types";

import SidebarWithHeader from "~/components/Sidebar";

export default function Home() {
  // Slowly increment the progress bar by 0.1 every 100ms
  const [progress, setProgress] = useState<number>(20);
  const [status, setStatus] = useState<EVENT_STATUS>("alliance_selection");
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((p: number) => p + 0.1);
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <SidebarWithHeader>
      <div className="flex flex-col items-center justify-center gap-4">
        {status === "quals" && (
          <Progress
            className="w-1/2"
            colorScheme="pink"
            hasStripe
            isAnimated
            value={progress}
          />
        )}
        {status === "alliance_selection" && (
          <>
            <Progress
              className="w-1/2"
              colorScheme="pink"
              isIndeterminate
              value={progress}
            />
          </>
        )}
        <p className="text-center text-2xl">Welcome to the scouting page!</p>
        {status === "quals" && (
          <p className="text-center text-xl">
            The event is {Math.trunc(progress)}% complete, with{" "}
            {Math.trunc(progress)} matches played.
          </p>
        )}
        {status === "alliance_selection" && (
          <p className="text-center text-xl">
            The event is in alliance selection.
          </p>
        )}
      </div>
    </SidebarWithHeader>
  );
}
