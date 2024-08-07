import WaterIcon from "./quest_icons/water.svg"
import StretchIcon from "./quest_icons/stretch.svg";
import WalkIcon from "./quest_icons/walk.svg";
import PrioritizeIcon from "./quest_icons/prioritize.svg";
import SeedIcon from './flower_icons/seed.svg';
import Sprout1Icon from './flower_icons/sprout1.svg';
import Sprout2Icon from './flower_icons/sprout2.svg';
import TulipIcon from "./flower_icons/tulip.svg";
import SunflowerIcon from "./flower_icons/sunflower.svg"
import TulipPreviewIcon from "./flower_icons/tulip-small.svg";
import SunflowerPreviewIcon from "./flower_icons/sunflower-small.svg"

const iconMap = {
  water: <WaterIcon />,
  stretch: <StretchIcon />,
  walk: <WalkIcon />,
  prioritize: <PrioritizeIcon />,
  seed: <SeedIcon width={30} height={30}/>,
  sprout1: <Sprout1Icon width={60} height={60}/>,
  sprout2: <Sprout2Icon width={60} height={60}/>,
  tulip: <TulipIcon width={60} height={60}/>,
  sunflower: <SunflowerIcon width={60} height={60}/>,
  tulip_p: <TulipPreviewIcon />,
  sunflower_p: <SunflowerPreviewIcon />
};

export default iconMap;
