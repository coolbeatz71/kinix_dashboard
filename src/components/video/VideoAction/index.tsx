import React, { FC, useState } from 'react';
import { Button, Col, Row, Space } from 'antd';
import numeral from 'numeral';
import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { RiPlayListAddFill } from 'react-icons/ri';
import { IVideo } from '@interfaces/api';
import StarRatingComponent from 'react-star-rating-component';
import { IItemsEntity } from '@interfaces/youtube';

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

    const [openRatingModal, setOpenRatingModal] = useState<boolean>(false);

    return (
        <Row justify="space-between" align="middle">
            <Col span={12} className="d-flex align-content-center">
                <StarRatingComponent
                    name="video-rate"
                    starCount={5}
                    value={Number(avgRate)}
                    onStarClick={() => setOpenRatingModal(true)}
                />
            </Col>
            <Space>
                <Button data-like type="text" icon={<LikeOutlined />}>
                    <span data-count>{likes}</span>
                </Button>
                <Button data-comment type="text" icon={<CommentOutlined />}>
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
