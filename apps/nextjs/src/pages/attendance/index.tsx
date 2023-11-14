import { useEffect, useState } from "react";
import {
  HStack,
  PinInput,
  PinInputField,
  Progress,
  VStack,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";

// import { api } from "~/utils/api";
import useNow from "~/utils/useNow";
import SidebarWithHeader from "~/components/Sidebar";

export default function Home() {
  const now = useNow(1);
  const TIME_TO_EXPIRE = 30000;
  // Generate random 6 digit number, every 30 seconds
  const [pin, setPin] = useState<string>("000000");
  const [lastReset, setLastReset] = useState<number>(Date.now());
  if (typeof window !== "undefined") {
    window.__ = { pin, setPin, lastReset, setLastReset };
  }
  useEffect(() => {
    // Every 30 seconds, get the PIN from the server
    const interval = setInterval(() => {
      // XXX: remove this and replace it with supabase
      const serverPin = api.attendance.getAttendanceQRURL.useQuery();
      setPin(serverPin.data);
      setLastReset(Date.now());
    }, TIME_TO_EXPIRE);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SidebarWithHeader>
        {/* did not use math.round, makes the progress bar look weird and jittery */}
        <Progress
          value={((now.valueOf() - lastReset) / TIME_TO_EXPIRE) * 100}
        />
        <br />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-center text-xl">Attendance</p>

          {/* QR Code div */}
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <QRCode value={buildQRCodeURL(pin)} onClick={() => {}} />
            <p className="text-center text-2xl">Scan to Check In</p>
            <VStack>
              <HStack>
                <PinInput
                  defaultValue={pin}
                  onChange={(e) => {
                    // Disallow input to PinInput
                    console.log(e);
                  }}
                  value={pin}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  &nbsp;-&nbsp;
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </VStack>
          </div>
        </div>
      </SidebarWithHeader>
    </>
  );
}
