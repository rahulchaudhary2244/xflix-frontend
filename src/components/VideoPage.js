import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../App';
import Navbar from './Navbar';
import VideoGrid from './VideoGrid';
import { useLocation } from 'react-router';
import VideoFrame from './VideoFrame';
import './styles.css';
import './VideoPage.css';
import moment from 'moment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Stack, Box, Button, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSnackbar } from 'notistack';
import { getVideoGridWidthStyle } from './Constants';

const VideoPage = () => {
    const [videos, setVideos] = useState([]);
    const location = useLocation();
    const { contentRating, releaseDate, title, _id, viewCount } =
        location.state.video;
    const [votes, setVotes] = useState(location.state.votes);
    const { enqueueSnackbar } = useSnackbar();

    const fetchVideos = async () => {
        const API_URL = `${config.endpoint}/videos`;
        try {
            const res = (await axios.get(API_URL)) || [];
            setVideos(res.data.videos);
            return res.data.videos;
        } catch (err) {
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
            });
            setVideos([]);
            return null;
        }
    };

    const fetchVideoById = async (id) => {
        const API_URL = `${config.endpoint}/videos/${id}`;
        try {
            const res = await axios.get(API_URL);
            setVotes(res.data.votes);
            return res.data;
        } catch (err) {
            enqueueSnackbar('Something went wrong in fetchVideoById()', {
                variant: 'error',
            });
            return null;
        }
    };

    const updateViewCount = async (id) => {
        try {
            const API_URL = `${config.endpoint}/videos/${id}/views`;
            await axios.patch(API_URL);
        } catch (err) {
            try {
                if (err.response.status === 404) {
                    enqueueSnackbar(err.response.data.message, {
                        variant: 'error',
                    });
                }
            } catch (e) {
                enqueueSnackbar('Something went wrong in updateViewCount()', {
                    variant: 'error',
                });
            }
        }
    };

    const updateVote = async (typeOfVote, operation) => {
        const API_URL = `${config.endpoint}/videos/${_id}/votes`;
        try {
            let payload = {
                vote: typeOfVote,
                change: operation,
            };
            await axios.patch(API_URL, payload);
        } catch (err) {
            enqueueSnackbar('Something went wrong updating vote', {
                variant: 'error',
            });
        }
    };

    const handleVotesClick = async (typeOfVote) => {
        try {
            if (typeOfVote === 'upVote') {
                await updateVote('upVote', 'increase');
                await updateVote('downVote', 'decrease');
            } else if (typeOfVote === 'downVote') {
                await updateVote('upVote', 'decrease');
                await updateVote('downVote', 'increase');
            }
            fetchVideoById(_id);
        } catch (err) {
            enqueueSnackbar('Something went wrong in handleVotesClick()', {
                variant: 'error',
            });
        }
    };

    useEffect(() => {
        updateViewCount(_id);
        fetchVideos();
    }, []);

    return (
        <div>
            <Navbar />
            <Box component="div" sx={getVideoGridWidthStyle()}>
                <VideoFrame video={location.state.video} />
                <div className="vp-content-container">
                    <div className="vp-description-container">
                        <div className="vp-title-text">{title}</div>
                        <div className="vp-duration-text">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span>{viewCount}</span>
                                <span
                                    style={{
                                        marginLeft: '0.5rem',
                                    }}
                                >
                                    <VisibilityIcon fontSize="small" />
                                </span>
                            </div>
                            <div className="dot"></div>
                            <div>{contentRating}</div>
                            <div className="dot"></div>
                            <div>{moment(new Date(releaseDate)).fromNow()}</div>
                        </div>
                    </div>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            size="medium"
                            startIcon={<ThumbUpIcon />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleVotesClick('upVote');
                            }}
                        >
                            {votes?.upVotes}
                        </Button>
                        <Button
                            variant="outlined"
                            size="meium"
                            endIcon={<ThumbDownIcon />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleVotesClick('downVote');
                            }}
                        >
                            {votes?.downVotes}
                        </Button>
                    </Stack>
                </div>
                <Divider />
                <VideoGrid videos={videos} />
            </Box>
        </div>
    );
};

export default VideoPage;
