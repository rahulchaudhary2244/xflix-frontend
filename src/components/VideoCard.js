import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';
import './styles.css';
import { scrollTop } from './Utility';
import moment from 'moment';

function VideoCard({ video }) {
    const { previewImage, releaseDate, title, _id, viewCount, votes } = video;

    return (
        <Link
            to={{
                pathname: `/video/${_id}`,
                state: {
                    video: video,
                    votes: votes,
                },
            }}
            className="vc-videocard-component"
            onClick={scrollTop}
        >
            <img
                className="vc-video-thumbnail"
                src={previewImage}
                alt={title}
            />
            <div className="vc-title">{title}</div>
            <div className="vc-release">
                <div>
                    {viewCount}
                    {viewCount.length <= 1 ? ' view' : ' views'}
                </div>
                <div className="dot"></div>
                <div>{moment(new Date(releaseDate)).fromNow()}</div>
            </div>
        </Link>
    );
}

export default VideoCard;
