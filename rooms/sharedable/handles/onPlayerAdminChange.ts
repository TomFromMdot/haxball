import { IPlayer, TeamsEnum, ChatEnum } from "@types"
import PlayerManager from '@sharedable/helpers/PlayerManager';
import {room, store} from "@context";

export default (changedPlayer : IPlayer, byPlayer : IPlayer) =>{
  if(changedPlayer.admin) return;

  const user = PlayerManager.getUser(changedPlayer).entity;

  if(user.state.role != "ADMIN") return;

  room.setPlayerAdmin(changedPlayer.id, true);
}