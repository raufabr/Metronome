/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from "react";
import { Box, Button, Input, Text, Flex, Heading } from "@chakra-ui/react"
import useSound from "use-sound";
import calculateBeatsFromTimeAndTaps from "./utils/calculateBeatsFromTimeAndTaps";
import Beat from "./components/Beat";
import MAXNUMBEROFBEATS from "./constants/maxNumberOfManualBeats";
// TODO: Fix TSConfig to allow importing of sounds using ES6 syntax
const metronomeBeat = require("./assets/sounds/metronome-start-beat.mp3");

function App() {
  const [beatsPerMinute, setBeatsPerMinute] = useState<number>(60)
  const [playing, setPlaying] = useState<boolean>(false)
  const [beatToggle, setBeatToggle] = useState<boolean>(false)
  const [play] = useSound(metronomeBeat);
  const interval: any = useRef();
  const [beatsTimeStamp, setBeatsTimeStamp] = useState<number[]>([]);
  const ref = useRef(beatsTimeStamp);


  const resetCounter = () => {
    clearInterval(interval.current);
  }

  const handleChangeInBeat = () => {
    setBeatsPerMinute(calculateBeatsFromTimeAndTaps(beatsTimeStamp));
  }

  useEffect(() => {
    // Although I would've preferred to do it in the event
    ref.current=beatsTimeStamp
    if (ref.current.length === MAXNUMBEROFBEATS) {
      setBeatsTimeStamp([]);
      handleChangeInBeat();
    }
  }, [beatsTimeStamp]);

  useEffect(() => {
    if (!playing) {
      resetCounter()
    } else {
      resetCounter()
      interval.current = setInterval(
        () => {    
          setBeatToggle((beatToggle) => !beatToggle)
          play()
        },
        (60 / beatsPerMinute) * 1000
        );  
      }
  }, [playing, beatsPerMinute]);
    
  /* A cleanup function that is run when the component unmounts. */
  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);
  
  const handler = (event: KeyboardEvent) => {
    if (event.code === "Space") {
        setBeatsTimeStamp(previousState=> [...previousState, event.timeStamp]);
    }
}
  
/* Listening for a keypress event and logging the event to the console. */
  useEffect(() => {
    window.addEventListener("keydown", handler, false);
    return () => window.removeEventListener("keydown", handler, false);
  }, []);

  const handleSetBPM = () => {
    handleChangeInBeat();
    setBeatsTimeStamp([])
  }  

  return (
    <Box
      bg={beatToggle ? "#181818" : "#121212"}
      w="100vw"
      h="100vh"
      color="white">
      <Box p="4rem">
        <Heading as="h1" color="#D0D0D0">
          Metronome
        </Heading>
        <Input
          type="range"
          min="20"
          max="240"
          width="80%"
          value={beatsPerMinute}
          onChange={(event) => setBeatsPerMinute(Number(event.target.value))}
        />
        <Text color="#D0D0D0">Beats Per Minute: {beatsPerMinute}</Text>
        <Button
          onClick={() => setPlaying((playing) => !playing)}
          bg="#292929"
          w="6rem"
          h="2rem"
          border={0}
          color="#D0D0D0"
          borderRadius="4px">
          {playing ? "Pause" : "Play"}
        </Button>
        <Flex my="2rem">
          {beatsTimeStamp.map((element) => (
            <Beat key={element} />
          ))}
        </Flex>
        <Text color="#D0D0D0">Set the beat by pressing the space bar</Text>
        <Text color="#D0D0D0">
          New BPM: {calculateBeatsFromTimeAndTaps(beatsTimeStamp)}
        </Text>
        <Button
          w="6rem"
          h="2rem"
          border={0}
          borderRadius="4px"
          onClick={handleSetBPM}
          disabled={beatsTimeStamp.length < 2}
          bg="#5AF5FA"
          color="black"
          variant="outline">
          Set
        </Button>
      </Box>
    </Box>
  );
}

export default App;
