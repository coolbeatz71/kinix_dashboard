import React,{ useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { LIMIT } from "@constants/app";
import getAllStoryAction from "@redux/story/getAll";
import getStoryOverviewAction from "@redux/story/overview";
import getAllStoryPlanAction from "@redux/story/plans";
import { IRootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";

const Story = () => {
    const dispatch = useAppDispatch();
    const [storyTitle, setStoryTitle] = useState<string>('Story');
    const [planTitle, setPlanTitle] = useState<string>("Formule d'abonnement");

    const { loading, data, error } = useSelector(({ story: { overview } }: IRootState) => overview);

    const [openAddStoryModal, setOpenAddStoryModal] = useState(false);
    const [openAddStoryPlanModal, setOpenAddStoryPlanModal] = useState(false);

    const [pagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });

    const { page, limit, search } = pagination;

    const reloadPlan = (): void => {
        dispatch(getAllStoryPlanAction());
    };

    const reloadStory = (): void => {
        dispatch(
            getAllStoryAction({
                page,
                limit,
                search,
            }),
        );
    };

    const loadOverview = useCallback(() => {
        dispatch(getStoryOverviewAction());
    }, [dispatch]);

    useEffect(() => {
        loadOverview();
    }, [loadOverview]);

  return (  );
}
 
export default Story;
