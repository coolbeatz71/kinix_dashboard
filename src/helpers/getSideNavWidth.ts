import { MAX_SIDENAV_WIDTH, MIN_SIDENAV_WIDTH } from '@constants/sidenav';

const getSideNavWidth = (expanded: boolean): number => {
    return expanded ? MAX_SIDENAV_WIDTH : MIN_SIDENAV_WIDTH;
};

export default getSideNavWidth;
