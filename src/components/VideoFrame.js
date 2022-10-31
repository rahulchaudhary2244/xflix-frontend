import React from 'react';
import './VideoFrame.css';
import './styles.css';

const VideoFrame = ({ video }) => {
    const { title, videoLink } = video;

    return (
        <iframe
            className="vf-video-frame-component"
            src={`https://www.${videoLink}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
};

export default VideoFrame;
