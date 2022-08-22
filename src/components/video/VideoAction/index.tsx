import React, { FC } from 'react';
import { Button, Col, Row, Space } from 'antd';
import numeral from 'numeral';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import { RiPlayListAddFill } from 'react-icons/ri';
import { IVideo } from '@interfaces/api';
import StarRatingComponent from 'react-star-rating-component';
import { IItemsEntity } from '@interfaces/youtube/youtubeVideo';

export interface IVideoActionProps {
    video: IVideo;
    youtubeVideoEntity: IItemsEntity;
}

const VideoAction: FC<IVideoActionProps> = ({ video, youtubeVideoEntity }) => {
    const { avgRate } = video;
    const likesCount = youtubeVideoEntity?.statistics?.likeCount;
    const commentsCount = youtubeVideoEntity?.statistics?.commentCount;

    const likes = numeral(likesCount).format('0.[00]a');
    const comments = numeral(commentsCount).format('0.[00]a');
    const playlists = numeral(video.playlistsCount).format('0.[00]a');

    return (
        <Row justify="space-between" align="middle">
            <Col span={12} className="d-flex align-content-center">
                <StarRatingComponent name="video-rate" starCount={5} value={Number(avgRate)} />
            </Col>
            <Space>
                <Button data-like type="link" icon={<HeartOutlined />}>
                    <span data-count>{likes}</span>
                </Button>
                <Button data-comment type="link" icon={<CommentOutlined />}>
                    <span data-count>{comments}</span>
                </Button>
                <Button data-playlist type="link" icon={<RiPlayListAddFill />}>
                    <span data-count>{playlists}</span>
                </Button>
            </Space>
        </Row>
    );
};

export default VideoAction;
