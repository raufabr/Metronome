/**
 * It takes an array of timestamps and returns the number of beats per minute
 * @param {number[]} arrayOfBeatTimestamps - An array of timestamps of when the user tapped the screen.
 * @returns The number of beats per minute.
 */
const calculateBeatsFromTimeAndTaps = (arrayOfBeatTimestamps: number[]): number => {
    if (arrayOfBeatTimestamps.length < 2)
        return 0
    
    const startTime = arrayOfBeatTimestamps[0];
    const endTime = arrayOfBeatTimestamps[arrayOfBeatTimestamps.length - 1];
    const beats =  (arrayOfBeatTimestamps.length * 60 * 1000) / (endTime - startTime);
    return Math.round(beats)
 }

export default calculateBeatsFromTimeAndTaps