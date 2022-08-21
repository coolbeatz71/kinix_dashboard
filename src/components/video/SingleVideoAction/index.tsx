import React, { FC } from 'react';
import { Button, Col, Row } from 'antd';
import { IUnknownObject } from '@interfaces/app';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import { RiPlayListAddFill } from 'react-icons/ri';
import { IVideo } from '@interfaces/api';
import StarRatingComponent from 'react-star-rating-component';

export interface ISingleVideoActionProps {
    video: IVideo;
    youtubeAPIVideo: IUnknownObject;
}

const SingleVideoAction: FC<ISingleVideoActionProps> = ({ video, youtubeAPIVideo }) => {
    const { avgRate } = video;
    const { likesCount, commentsCount } = youtubeAPIVideo;
    const likes = numeral(likesCount).format('0.[00]a');
    const comments = numeral(commentsCount).format('0.[00]a');

    return (
        <Row justify="space-between" align="middle">
            <Col span={12} className="d-flex align-content-center">
                <StarRatingComponent name="video-rate" starCount={5} value={Number(avgRate)} />
            </Col>
            <Col span={12} className="d-flex justify-content-end">
                <Button data-like type="link" icon={<HeartOutlined />}>
                    <span data-count>{likes}</span>
                </Button>
                <Button data-comment type="link" icon={<CommentOutlined />}>
                    <span data-count>{comments}</span>
                </Button>
                <Button type="link" icon={<RiPlayListAddFill />} />
            </Col>
        </Row>
    );
};

export default SingleVideoAction;
