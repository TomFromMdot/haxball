import { ICommandArgs, ChatEnum } from '@types';
import { room } from '@context';
import commands from '@sharedable/commands/all';

export default ({ player, message }: ICommandArgs) => {
  const availableCommands: string[] = commands
    .filter((command) => !command.admin)
    .map((command) => (command.price > 0 ? `${command.cmd} - ${command.price}⚡️` : command.cmd))
    .sort();

  room.sendAnnouncement(`Available commands: ${availableCommands.join(' 🔻 ')}`, player.id, ChatEnum.PURPLE, 'small-bold', 1);
};
