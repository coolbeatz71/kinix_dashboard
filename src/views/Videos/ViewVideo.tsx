import React, { FC, Fragment, useCallback, useEffect } from 'react';
import { Col, Grid, Row } from 'antd';
import ServerError from '@components/common/ServerError';
import VideoTabs from '@components/video/VideoTabs';
import { IUnknownObject } from '@interfaces/app';
import { useAppDispatch } from '@redux/store';
import { useParams } from 'react-router-dom';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import getSingleVideoAction from '@redux/videos/single';
import { isEmpty } from 'lodash';
import getRelatedVideosAction from '@redux/videos/related';
import { IVideo } from '@interfaces/api';
import VideoPlayer from '@components/video/VideoPlayer';
import ViewVideoSkeleton from '@components/skeleton/ViewVideo';
import SectionTitle from '@components/common/SectionTitle';
import RelatedVideoCard from '@components/video/VideoRelatedCard';
import { VIDEO_PATH } from '@constants/paths';

const { useBreakpoint } = Grid;

const ViewVideo: FC = () => {
    const { lg } = useBreakpoint();
    const dispatch = useAppDispatch();
    const { slug } = useParams<IUnknownObject>();

    const {
        data: related,
        error: errRelated,
        loading: loadRelated,
    } = useSelector(({ videos: { related } }: IRootState) => related);
    // const { data:  } = useSelector(({ users: { currentUser } }: IRootState) => currentUser);
    const { data: video, error, loading } = useSelector(({ videos: { single } }: IRootState) => single);

    const loadVideo = useCallback(() => {
        dispatch(getSingleVideoAction(slug));
    }, [dispatch, slug]);

    useEffect(() => {
        loadVideo();
    }, [loadVideo]);

    useEffect(() => {
        const { tags } = video;
        if (!isEmpty(tags)) dispatch(getRelatedVideosAction({ slug, tags }));
    }, [dispatch, slug, video]);

    return (
        <Fragment>
            {error || errRelated ? (
                <ServerError onRefresh={() => loadVideo()} />
            ) : loading || loadRelated ? (
                <ViewVideoSkeleton />
            ) : (
                <Row justify="space-between" gutter={[0, 0]}>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <VideoPlayer video={video as IVideo} />
                        <div className="mt-3">
                            <VideoTabs video={video as IVideo} />
                        </div>
                    </Col>
                    {lg && (
                        <Col lg={8} className="ps-3">
                            <Row>
                                <Col span={24}>
                                    <SectionTitle title="Related videos" isRelated linkHasMore={VIDEO_PATH} />
                                </Col>

                                {(related as unknown as IVideo[]).map((el: IVideo) => (
                                    <Col key={el.id}>
                                        <RelatedVideoCard video={el} youtubeAPIVideo={[]} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    )}
                </Row>
            )}
        </Fragment>
    );
};

export default ViewVideo;
