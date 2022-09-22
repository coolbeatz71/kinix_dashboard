import React, { FC, Fragment, useCallback, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Col, Grid, Row } from 'antd';
import { useParams } from 'react-router-dom';
import ServerError from '@components/common/ServerError';
import VideoTabs from '@components/video/VideoTabs';
import { IUnknownObject } from '@interfaces/app';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import getSingleVideoAction from '@redux/videos/single';
import getRelatedVideosAction from '@redux/videos/related';
import { IVideo } from '@interfaces/api';
import VideoPlayer from '@components/video/VideoPlayer';
import ViewVideoSkeleton from '@components/skeleton/ViewVideo';
import SectionTitle from '@components/common/SectionTitle';
import RelatedVideoCard from '@components/video/VideoRelatedCard';
import { VIDEO_PATH } from '@constants/paths';
import { IYoutubeVideo } from '@interfaces/youtube';
import getYoutubeVideoAction from '@redux/videos/youtube';

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
    const {
        error: errYoutube,
        data: youtubeVideo,
        loading: loadYoutube,
    } = useSelector(({ videos: { youtube } }: IRootState) => youtube);
    const {
        data: video,
        error: errSingle,
        loading: loadSingle,
    } = useSelector(({ videos: { single } }: IRootState) => single);

    const loadVideo = useCallback(() => {
        dispatch(getSingleVideoAction(slug));
    }, [dispatch, slug]);

    useEffect(() => {
        loadVideo();
    }, [loadVideo]);

    useEffect(() => {
        const { tags, link } = video as IVideo;
        if (!isEmpty(tags)) {
            dispatch(getYoutubeVideoAction(link));
            dispatch(getRelatedVideosAction({ slug, tags }));
        }
    }, [dispatch, slug, video]);

    const error = errSingle || errRelated || errYoutube;
    const loading = loadYoutube || loadSingle || loadRelated;

    return (
        <Fragment>
            {error ? (
                <ServerError onRefresh={() => loadVideo()} />
            ) : loading ? (
                <ViewVideoSkeleton />
            ) : (
                <Row justify="space-between" gutter={[0, 0]}>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <VideoPlayer video={video as IVideo} youtubeVideo={youtubeVideo as IYoutubeVideo} />
                        <div className="mt-3">
                            <VideoTabs video={video as IVideo} />
                        </div>
                    </Col>
                    {lg && !isEmpty(related) && (
                        <Col lg={8} className="ps-3">
                            <Row>
                                <Col span={24}>
                                    <SectionTitle title="Related videos" isRelated linkHasMore={VIDEO_PATH} />
                                </Col>

                                {(related as unknown as IVideo[]).map((vid: IVideo) => (
                                    <Col key={vid.id} span={24}>
                                        <RelatedVideoCard video={vid} />
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
