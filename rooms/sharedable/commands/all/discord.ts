import { ICommandArgs, ChatEnum } from '@types';

import {room} from "@context";

export default ({player, message}: ICommandArgs) => {
  room.sendAnnouncement(`🔻 Discord: https://discord.gg/your_discord`, player.id, ChatEnum.PURPLE, 'small-bold', 1);
};
