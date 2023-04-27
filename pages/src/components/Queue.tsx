import {useEffect, useState} from "react";
import styled from "styled-components";
import {CurrentQueueResponse, Song, TimeStampResponse} from "../gen/queue_pb";
import {CurrentQueue} from "../api/CurrentQueue";
import {TimeStamp} from "../api/TimeStamp";
import {Stop} from "../api/Stop";
import {Pause} from "../api/Pause";
import {Resume} from "../api/Resume";
import {RemoveSong} from "../api/RemoveSong";
import {SkipSong} from "../api/SkipSong";
import {RepeatSong} from "../api/RepeatSong";
import {ShuffleQueue} from "../api/ShuffleQueue";
import {ReactSortable} from "react-sortablejs";
import {SongItem} from "../types";
import {ChangeSongPosition} from "../api/ChangeSongPosition";

export const Queue = ({guildId, userId}) => {
    const [queueRes, setQueueRes] = useState<CurrentQueueResponse | null>(null);
    const [queue, setQueue] = useState<Array<SongItem>>(null);
    const [timeStamp, setTimeStamp] = useState<TimeStampResponse | null>(null);
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

            // console.log(`before get last saved queueRes: ${whileCondition}`);
            const q = CurrentQueue.getLastSavedQueue()
            if (q !== null) {
                // console.log(`q is set.`);
                setQueueRes(q)
            } else {
                CurrentQueue.dismiss()
                setQueueRes(null)
            }
        }
    }

    useEffect(() => {
        // console.log(`use effect on initial`)
        whileCondition = true;
        callCurrentQueue().then(() => null);
        callTimeStamp().then(() => null);
        return () => {
            // when components unmount.
            // setWhileCondition(false);
            whileCondition = false;
        }
    }, []);

    useEffect(() => {
        // When queueRes is changed.
        // convert queueRes to queue.
        if (queueRes !== null) {
            setQueue(queueRes.getSongsList().map((song: Song, index: number) => {
                return {
                    id: song.getPosition(),
                    song: song,
                }
            }))
        }
    }, [queueRes]);

    return (
        <div>
            {
                queueRes === null ? <div>Nothing in queue...</div> :

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
                                                setQueueRes(null);
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
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
                            onClick={() => {
                                Resume(guildId, (_) => alert("Resumed!"), (err) => alert(err))
                            }}>
                            Resume
                        </button>
                        <button
                            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded m-4"
                            onClick={() => {
                                ShuffleQueue(guildId, () => alert("Shuffled!"), (err) => alert(err))
                            }}>
                            Shuffle!
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-700 py-2 px-4 rounded m-4"
                            onClick={() => {
                                alert(
                                    "To change song's order, Just drag it. Not adjusted in current playing song.\n" +
                                    "큐 순서를 바꾸려면 드래그 하세요. 현재 재생중인 곡은 적용 되지 않습니다."
                                )
                            }}
                        >
                            <i className="fa-regular fa-circle-question fa-xl"></i>
                        </button>
                        <br/>
                        <div className="bg-gray-200 p-4 rounded-lg">
                            <a href={queueRes.getCurrentSong().getUrl()}
                               target="_blank">
                                <div>Current Song / 현재 재생중인 곡</div>
                                <div className="font-bold">{queueRes.getCurrentSong().getTitle()}</div>
                                <div>{getTimeSet()}</div>
                                <p className="inline">playing by <p
                                    className="inline font-bold">{queueRes.getCurrentSong().getApplicant()}</p></p>
                                <img src={queueRes.getCurrentSong().getThumbnailUrl()}
                                     alt={queueRes.getCurrentSong().getThumbnailUrl()}
                                     className="w-full"
                                />
                                {
                                    queueRes.getCurrentSong().getIsRepeat() ?
                                        <div className="font-bold mt-4">Repeating / 반복 중</div> :
                                        <div></div>
                                }
                            </a>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                                onClick={() => {
                                    RepeatSong(guildId, userId,
                                        (isRepeat) => alert(isRepeat ? "Repeat this song." : "Not Repeat"),
                                        (err) => alert(err))
                                }}>
                                Repeat
                            </button>
                        </div>


                        {queue !== null ?
                            <ReactSortable list={queue} setList={(newState)=>{
                                ChangeSongPosition(
                                    guildId,
                                    userId,
                                    [0].concat(newState.map((song) => song.id)),
                                    () => {
                                    }, (err) => {
                                        console.error(`got message (onEnd) ${err}`);
                                    }
                                )
                            }}>
                                {
                                    queue.map((songItem, index) => {
                                            let song = songItem.song;
                                            return (
                                                <QueueNextSongsWrapper key={index}>
                                                    <a href={song.getUrl()} target="_blank">
                                                        <div>{song.getPosition()}. {song.getTitle()}</div>
                                                        <div>{getTimeString(song.getDuration())}</div>
                                                        <p className="inline">added by <p
                                                            className="inline font-bold">#{song.getApplicant()}</p></p>
                                                        <img src={song.getThumbnailUrl()}
                                                             alt={song.getThumbnailUrl()}
                                                             className="w-full"
                                                        />
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
                                                    <button
                                                        className="bg-orange-300 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded m-4"
                                                        onClick={() => {
                                                            SkipSong(guildId, userId, song.getPosition(),
                                                                () => alert("Skipped!"),
                                                                (err) => alert(err))
                                                        }}>
                                                        Skip to
                                                    </button>
                                                </QueueNextSongsWrapper>
                                            )
                                        }
                                    )
                                }
                            </ReactSortable>
                            :
                            <div></div>
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