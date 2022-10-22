import { useEffect, useState } from "react";
import Template from "components/root/Template";
import { Alert, AlertIcon, Box, Divider, Heading, Tag } from "@chakra-ui/react";

enum BatteryManagerEvents {
  ChargingChange = "chargingchange",
  ChargingTimeChange = "chargingtimechange",
  DischargingTimeChange = "dischargingtimechange",
  LevelChange = "levelchange",
}

type BatteryManagerEventMap = {
  [key in BatteryManagerEvents]: Event;
};

interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  addEventListener<K extends keyof BatteryManagerEventMap>(
    type: K,
    listener: (ev: BatteryManagerEventMap[K]) => void
  ): void;
  removeEventListener<K extends keyof BatteryManagerEventMap>(
    type: K,
    listener: (ev: BatteryManagerEventMap[K]) => void
  ): void;
}

type State = Pick<
  BatteryManager,
  "charging" | "chargingTime" | "dischargingTime" | "level"
>;

function Battery() {
  const [isSupported, setIsSupported] = useState(true);
  const [batteryManager, setBatteryManager] = useState<BatteryManager>();
  const [state, setState] = useState<State>({
    charging: false,
    chargingTime: Infinity,
    dischargingTime: Infinity,
    level: 0,
  });

  useEffect(() => {
    (window.navigator as any)
      .getBattery()
      .then((result: BatteryManager) => {
        setBatteryManager(result);
        setState({
          charging: result.charging,
          chargingTime: result.chargingTime,
          dischargingTime: result.dischargingTime,
          level: result.level,
        });
      })
      .catch(() => setIsSupported(false));
  }, []);

  useEffect(() => {
    if (!batteryManager) return;
    const eventHandler = (event: Event) => {
      if (!event.target) return;

      const value = event.target as unknown as BatteryManager;

      switch (event.type) {
        case BatteryManagerEvents.ChargingChange:
          setState((s) => ({ ...s, charging: value.charging }));
          break;
        case BatteryManagerEvents.ChargingTimeChange:
          setState((s) => ({ ...s, chargingTime: value.chargingTime }));
          break;
        case BatteryManagerEvents.DischargingTimeChange:
          setState((s) => ({ ...s, dischargingTime: value.dischargingTime }));
          break;
        case BatteryManagerEvents.LevelChange:
          setState((s) => ({ ...s, level: value.level }));
          break;
      }
    };

    batteryManager.addEventListener(
      BatteryManagerEvents.ChargingChange,
      eventHandler
    );
    batteryManager.addEventListener(
      BatteryManagerEvents.ChargingTimeChange,
      eventHandler
    );
    batteryManager.addEventListener(
      BatteryManagerEvents.DischargingTimeChange,
      eventHandler
    );
    batteryManager.addEventListener(
      BatteryManagerEvents.LevelChange,
      eventHandler
    );
    return () => {
      batteryManager.removeEventListener(
        BatteryManagerEvents.ChargingChange,
        eventHandler
      );
      batteryManager.removeEventListener(
        BatteryManagerEvents.ChargingTimeChange,
        eventHandler
      );
      batteryManager.removeEventListener(
        BatteryManagerEvents.DischargingTimeChange,
        eventHandler
      );
      batteryManager.removeEventListener(
        BatteryManagerEvents.LevelChange,
        eventHandler
      );
    };
  }, [batteryManager]);

  return (
    <Template>
      <>
        <Heading textAlign="center">Battery Status API</Heading>
        <Divider borderColor="black" margin="25px 0" />
        {!isSupported && (
          <Alert status="error">
            <AlertIcon />
            Battery API is not supported in your current browser
          </Alert>
        )}
        <Box textAlign="center">
          <Heading as="h5">Is Charging ?</Heading>
          {state.charging ? (
            <Tag variant="solid" margin={2}>
              Yes
            </Tag>
          ) : (
            <Tag variant="solid" margin={2}>
              No
            </Tag>
          )}
          <Heading as="h5">Charging Time</Heading>
          {state.chargingTime && (
            <Tag variant="solid" margin={2}>
              {state.chargingTime}
            </Tag>
          )}
          <Heading as="h5">Discharging Time</Heading>
          {state.dischargingTime && (
            <Tag variant="solid" margin={2}>
              {state.dischargingTime}
            </Tag>
          )}

          <Heading as="h5">Battery Level</Heading>
          {state.level && (
            <Tag variant="solid" margin={2}>
              {state.level * 100}%
            </Tag>
          )}
        </Box>
      </>
    </Template>
  );
}

export default Battery;
