import {useEffect, useState} from "react";
import styled from "styled-components";
import {CurrentQueueResponse, TimeStampResponse} from "../gen/queue_pb";
import {CurrentQueue} from "../api/CurrentQueue";
import {TimeStamp} from "../api/TimeStamp";
import {Stop} from "../api/Stop";
import {Pause} from "../api/Pause";
import {Resume} from "../api/Resume";
import {RemoveSong} from "../api/RemoveSong";

export const Queue = ({guildId, userId}) => {
    const [queue, setQueue] = useState<CurrentQueueResponse | null>(null);
    const [timeStamp, setTimeStamp] = useState<TimeStampResponse | null>(null);
    // const [whileCondition, setWhileCondition] = useState<boolean>(true);
    let whileCondition = false;

    const getTimeString = (seconds: number): string => {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds - (hours * 3600)) / 60);
        let secondsLeft = Math.floor(seconds - (hours * 3600) - (minutes * 60));

        let timeString = "";
        if (hours !== 0) {
            if (hours < 10) {
                timeString += `0${hours}:`;
            } else {
                timeString += `${hours}:`;
            }
        }
        if (minutes !== 0) {
            if (minutes < 10) {
                timeString += `0${minutes}:`;
            } else {
                timeString += `${minutes}:`;
            }
        } else {
            timeString += `00:`;
        }
        if (secondsLeft < 10) {
            timeString += `0${secondsLeft}`;
        } else {
            timeString += `${secondsLeft}`;
        }
        return timeString;
    }

    const getTimeSet = (): string => {
        if (timeStamp === null) {
            return "N/A";
        }
        return `${getTimeString(timeStamp.getTimestamp() / 1000)} / ${getTimeString(timeStamp.getDuration())}`;
    }

    function delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    const callTimeStamp = async () => {
        while (whileCondition) {
            const _ = TimeStamp.register(
                guildId,
                (msg: string) => {
                }, (err) => {
                }
            )

            await delay(500); // wait for 0.5 seconds. Due to network speed.

            const t = TimeStamp.getLastSavedTimeStamp()
            if (t !== null) {
                // console.log(`q is set.`);
                setTimeStamp(t);
            } else {
                TimeStamp.dismiss()
                setTimeStamp(t);
            }
        }
    }

    const callCurrentQueue = async (): Promise<void> => {
        while (whileCondition) {
            const _ = CurrentQueue.register(
                guildId,
                userId,
                (msg: string) => {
                },
                (err) => {
                }
            )

            await delay(500); // wait for 0.5 seconds. Due to network speed.

            // console.log(`before get last saved queue: ${whileCondition}`);
            const q = CurrentQueue.getLastSavedQueue()
            if (q !== null) {
                // console.log(`q is set.`);
                setQueue(q)
            } else {
                console.log(`q is null. continue the loop.`)
                CurrentQueue.dismiss()
                setQueue(null)
            }
        }
    }

    useEffect(() => {
        console.log(`use effect on initial`)
        whileCondition = true;
        callCurrentQueue().then(() => null);
        callTimeStamp().then(() => null);
        return () => {
            // when components unmount.
            console.log(`before use effect on unmount: ${whileCondition}`)
            // setWhileCondition(false);
            whileCondition = false;
            console.log(`after use effect on unmount: ${whileCondition}`)
        }
    }, []);

    return (
        <div>
            {
                queue === null ? <div>loading...</div> :

                    <EntireQueueWrapper>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
                                onClick={() => {
                                    Stop(
                                        guildId,
                                        userId,
                                        (_) => {
                                            const userInput = confirm("Stopped! You will be redirected to the home page.")
                                            if (userInput) window.location.href = "/"
                                            else {
                                                setQueue(null);
                                                setTimeStamp(null);
                                            }
                                        },
                                        (err: string) => {
                                            console.error(`got message (onEnd) ${err}`)
                                        }
                                    );
                                }}>
                            Stop
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                                onClick={() => {
                                    Pause(guildId, (_) => alert("Paused!"), (err) => alert(err))
                                }}>
                            Pause
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
                                onClick={() => {
                                    Resume(guildId, (_) => alert("Resumed!"), (err) => alert(err))
                                }}>
                            Resume
                        </button>
                        <a href={queue.getCurrentSong().getThumbnailUrl()} target="_blank">
                            <div>Current Song / 현재 재생중인 곡</div>
                            <div>{queue.getCurrentSong().getTitle()}</div>
                            <div>{getTimeSet()}</div>
                            <img src={queue.getCurrentSong().getThumbnailUrl()}
                                 alt={queue.getCurrentSong().getThumbnailUrl()}/>
                        </a>
                        {
                            queue.getSongsList().map((song, index) => {
                                    return (
                                        <QueueNextSongsWrapper key={index}>
                                            <a href={song.getUrl()} target="_blank">
                                                <div>{song.getPosition()}. {song.getTitle()}</div>
                                                <div>{getTimeString(song.getDuration())}</div>
                                                <img src={song.getThumbnailUrl()}
                                                     alt={song.getThumbnailUrl()}/>
                                            </a>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
                                                onClick={() => {
                                                    RemoveSong(
                                                        guildId,
                                                        userId,
                                                        song.getPosition(),
                                                        (_) => {
                                                            alert("Removed!")
                                                        },
                                                        (err) => {
                                                            alert(err)
                                                        }
                                                    )
                                                }}>
                                                Remove This Song
                                            </button>
                                        </QueueNextSongsWrapper>
                                    )
                                }
                            )
                        }
                    </EntireQueueWrapper>
            }
        </div>
    )
}

const EntireQueueWrapper = styled.div`
  text-align: center;
`;

const QueueNextSongsWrapper = styled.div`
  margin: 24px;
  text-align: center;
  background-color: #f6f6f6;
  border-radius: 25px;
  padding: 12px;
`;