import { ICommand } from '@types';

import clearbans from '@sharedable/commands/admin/clearbans';
import afk from '@sharedable/commands/all/afk';
import afklist from '@sharedable/commands/all/afklist';

import leave from '@sharedable/commands/all/leave';
import rank from '@sharedable/commands/all/rank';
import discord from '@sharedable/commands/all/discord';
import back from '@sharedable/commands/all/back';
import toggleVPN from '../admin/toggleVPN';
import help from '@sharedable/commands/all/help';
import unmute from '@sharedable/commands/admin/unmute';

const commands: ICommand[] = [
  { cmd: '!clearbans', executor: clearbans, price: 0, admin: true },
  { cmd: '!afk', executor: afk, price: 50, admin: false },
  { cmd: '!back', executor: back, price: 0, admin: false },
  { cmd: '!afklist', executor: afklist, price: 0, admin: false },
  { cmd: '!bb', executor: leave, price: 0, admin: false },
  { cmd: '!rank', executor: rank, price: 0, admin: false },
  { cmd: '!discord', executor: discord, price: 0, admin: false },
  { cmd: '!togglevpn', executor: toggleVPN, price: 0, admin: true },
  { cmd: '!help', executor: help, price: 0, admin: false },
  { cmd: '!unmute', executor: unmute, price: 0, admin: true },
];

export default commands;
