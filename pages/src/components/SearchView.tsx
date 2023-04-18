import styled from "styled-components";
import {useState} from "react";
import {VideoInfo} from "../gen/play_pb";
import {Search} from "../api/Search";
import {Play} from "../api/Play";

/**
 * In this view, the user can search for a specific video through gRPC backend server.
 */
export const SearchView = ({guildId, userId}) => {
    const [videos, setVideos] = useState<Array<VideoInfo>>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [isLoadingSearching, setIsLoadingSearching] = useState<boolean>(false);
    const [isLoadingPlaying, setIsLoadingPlaying] = useState<boolean>(false);

    /**
     * Search for a video.
     * and filter whether the input is url or keyword.
     */
    const search = () => {
        setIsLoadingSearching(true);

        // judge string is url or not. url includes absolute path and relative path.
        const absolutePath = new RegExp("^(?:[a-z]+:)?//", "i");
        const relativePath = new RegExp("(^\\.\\/)|(^(?!\\/)(?!.*?\\:\\/)(?!.*?\\:\\/\\/)([\\s\\S]*?\\/)\\2?[^.][\\s\\S]*$)", "i");

        let keyword = null;
        let url = null;
        if (absolutePath.test(userInput) || relativePath.test(userInput)) {
            url = userInput;
        } else {
            keyword = userInput;
        }

        Search(keyword, url, (videos) => {
            setVideos(videos.getVideoinfoList());
            setIsLoadingSearching(false);
        }, (err) => {
            // toast error message.
            alert(err);
            setIsLoadingSearching(false);
        })
    }

    /**
     * Just event wrapper for filtering enter key.
     * @param event
     */
    const searchEnter = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    }

    /**
     * Convert seconds to h:m:s format.
     * @param d: play time as seconds.
     */
    const secondsToHms = (d) => {
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }

    const play = (event) => {
        setIsLoadingPlaying(true);
        Play(guildId, userId, event.target.value, (msg) => {
                console.log(msg);
                setIsLoadingPlaying(false);
            }, (err) => {
                // toast error message.
                alert(err);
                setIsLoadingPlaying(false);
            }
        )
    }


    return (
        <SearchViewWrapper>
            <input id="text_input" type="text" placeholder="Search for a video." onKeyUp={searchEnter}
                   className="mt-12 w-1/2 h-12 text-center border-4 border-b-red-500 hover:border-red-500"
                   value={userInput} onChange={e => setUserInput(e.target.value)}/>
            <br/><br/>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={search} disabled={isLoadingSearching}>{isLoadingSearching && <i className="fa fa-refresh fa-spin"/>}Search
            </button>
            <br/><br/>
            {
                isLoadingSearching ?
                    <i className="fa-solid fa-magnifying-glass fa-shake fa-2xl"></i>:
                    <VideosWrapper>
                        {
                            // show the search results in videos array.
                            videos.map((video, index) => {
                                return (
                                    <VideoWrapper key={index}>
                                        <a href={video.getUrl()} target="_blank">
                                            <VideoImage src={video.getThumbnailUrl()} alt="thumbnail image"/>
                                            <VideoTitle>{video.getTitle()}</VideoTitle>
                                            <p>{secondsToHms(video.getDuration().getSeconds())}</p>
                                        </a>
                                        <button onClick={play} value={video.getUrl()} key={index + "button"}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                disabled={isLoadingPlaying}>
                                            {isLoadingPlaying && <i className="fa fa-refresh fa-spin"/>}Play on Discord
                                        </button>
                                    </VideoWrapper>
                                )
                            })
                        }
                    </VideosWrapper>
            }
        </SearchViewWrapper>
    )
}

const SearchViewWrapper = styled.div`
  height: 64vh;
  text-align: center;
  min-width: 300px;
`;

const VideosWrapper = styled.div`
  text-align: center;
  display: inline-flex;
`;

const VideoImage = styled.img`
  width: auto;
  height: auto;
  display: inline;
`;

const VideoWrapper = styled.div`
  //background-color: blue;
  text-align: center;
  margin-bottom: 12px;
  height: auto;
  width: 50vw;
`;

const VideoTitle = styled.p`
  font-size: 1.2rem;
`;