import { useEffect, useState } from "react";
import {
  Alert,
  Progress,
  Spacer,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import type { EVENT_STATUS } from "@acme/types";

import SidebarWithHeader from "~/components/Sidebar";

export default function Home() {
  // Slowly increment the progress bar by 0.1 every 100ms
  const [progress, setProgress] = useState<number>(20);
  const [status, setStatus] = useState<EVENT_STATUS>("quals");
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
          <StatGroup>
            <Stat>
              <StatLabel>Matches</StatLabel>
              <StatNumber>{progress.toFixed(2)}%</StatNumber>
              <StatHelpText>
                {/* <StatArrow type="increase" /> */}
                {progress.toFixed(2)}/100
              </StatHelpText>
            </Stat>
            <div className="mx-5" />
            <Stat>
              <StatLabel>3256 Status</StatLabel>
              <StatNumber>45%</StatNumber>
              <StatHelpText>10/18 matches today</StatHelpText>
            </Stat>
            <div className="mx-5" />
            <Stat>
              <StatLabel>Scouted Matches</StatLabel>
              <StatNumber>
                {progress - 10 > 100 ? 100 : (progress - 10).toFixed(2)}%
              </StatNumber>
              <StatHelpText>10/18 matches today</StatHelpText>
            </Stat>
          </StatGroup>
        )}
        {status === "alliance_selection" && (
          <p className="text-center text-xl">
            The event is in alliance selection.
          </p>
        )}
      </div>
      <p>
        <Alert status="info">
          This is a demo of the scouting page. It is not connected to any
          server.
        </Alert>
      </p>
      <p>
        eventually: add graphs (3256 performance over time), card with next
        matches, also add a page showing who's scouting currently.
      </p>
    </SidebarWithHeader>
  );
}
