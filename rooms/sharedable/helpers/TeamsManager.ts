import { TeamsEnum, GameFinalsEnum, ChatEnum, IPlayer } from '@types';

import { room, store, config } from '@context';

import getPlayers from '../utils/getPlayers';

export default class {
  static async createTeams({ winnerTeamId, gameFinal }: { winnerTeamId: number; gameFinal: GameFinalsEnum }) {
    //Include winning players and clear teams
    const { redPlayers, bluePlayers, specPlayers } = getPlayers();

    let winnerPlayers = winnerTeamId == TeamsEnum.RED ? redPlayers : bluePlayers;

    if (gameFinal == GameFinalsEnum.DRAW) winnerPlayers = [];

    this.clearTeams([TeamsEnum.RED, TeamsEnum.BLUE]);

    room.sendAnnouncement('💠 WAIT 5 SECONDS TO NEXT MATCH', null, ChatEnum.AQUA, 'small-bold', 1);

    await new Promise((r) => setTimeout(r, 5000));

    //Check possible game options
    const maxPlayersOnTeam = Math.trunc(getPlayers().allPlayers.length / 2);
    const canPlayFullTeams = getPlayers().allPlayers.length >= config.app.targetPlayersOnTeam * 2;

    const currentTotalPlayersNumber = canPlayFullTeams ? config.app.targetPlayersOnTeam * 2 : maxPlayersOnTeam * 2;

    const _nIsEven = (n: number) => n % 2 == 0;

    //Convert players array to paris subarray [[], [], []]
    const getPairs = (players: IPlayer[]) => players.flatMap((_, i, a) => (i % 2 ? [] : [a.slice(i, i + 2)]));

    const getProcessedPlayers = ({ players }: { players: IPlayer[] }) => {
      const isNotEven = !_nIsEven(players.length);

      //Remove last player we nned even number to create pairs
      if (isNotEven) {
        return players.slice(0, players.length - 1);
      }

      return players;
    };

    //Nominate candidates to play and sort
    const isWinningPlayer = (player: IPlayer): IPlayer => winnerPlayers.find((winningPlayer) => winningPlayer.id == player.id) as IPlayer;

    const uniqueSpecPlayers = getPlayers().specPlayers.filter((specPlayer: IPlayer) => !isWinningPlayer(specPlayer));

    const matchQueueIds = store.matchQueue.flatMap((entry: { sender: IPlayer; recipient: IPlayer }) => [entry.sender.id, entry.recipient.id]);

    const candidatePlayers = [...winnerPlayers, ...uniqueSpecPlayers].filter(
      (player: IPlayer) => room.getPlayer(player.id) && !store.afkPlayersIds.has(player.id) && !matchQueueIds.includes(player.id)
    );

    let idx = 0;

    const processedPlayers = getProcessedPlayers({ players: candidatePlayers as IPlayer[] });

    const transformedList = store.matchQueue.map(({ sender, recipient }: { sender: IPlayer; recipient: IPlayer }) => [sender, recipient]);

    const playersPairs = [...transformedList, ...getPairs(processedPlayers)];

    let pairsCounter = 0;

    let redPlayersCounter = 0;
    let bluePlayersCounter = 0;

    const duoLimit = config.app.targetPlayersOnTeam < 3 ? 0 : Math.trunc(config.app.targetPlayersOnTeam / 2);

    while (true) {
      if (idx >= currentTotalPlayersNumber) break;

      //distribute pairs
      if (pairsCounter < duoLimit && canPlayFullTeams && store.matchQueue.length > 0) {
        const [player1, player2] = playersPairs[pairsCounter];

        const currentTeamId = pairsCounter % 2 ? TeamsEnum.BLUE : TeamsEnum.RED;
        currentTeamId === TeamsEnum.RED ? (redPlayersCounter += 2) : (bluePlayersCounter += 2);

        room.setPlayerTeam(player1.id, currentTeamId);
        room.setPlayerTeam(player2.id, currentTeamId);

        pairsCounter++;
        idx += 2;

        continue;
      }

      //distribute single players
      const currentTeamId = redPlayersCounter >= bluePlayersCounter ? TeamsEnum.BLUE : TeamsEnum.RED;
      currentTeamId === TeamsEnum.RED ? redPlayersCounter++ : bluePlayersCounter++;
      const singlePlayers = playersPairs.flat();

      room.setPlayerTeam(singlePlayers[idx].id, currentTeamId);

      idx++;
    }

    room.startGame();

    room.pauseGame(true);
    room.pauseGame(false);

    room.sendAnnouncement('DUO queue has been reseted!', null, ChatEnum.AQUA, 'small-bold', 1);

    store.matchQueue = [];

    await new Promise((r) => setTimeout(r, 1000));
  }

  static async createTeamsDynamically({ playerJoined, triggerPlayer }: { playerJoined: boolean; triggerPlayer: IPlayer }) {
    const { redPlayers, bluePlayers, specPlayers } = getPlayers();

    //First player on room exception
    const allPlayers = [...redPlayers, ...bluePlayers, ...specPlayers];

    if (allPlayers.length == 1) {
      room.setPlayerTeam(triggerPlayer.id, TeamsEnum.RED);

      room.startGame();
    }

    if (store.gameIsStarted == false) return;

    const teamsIsFull = redPlayers.length == config.app.targetPlayersOnTeam && bluePlayers.length == config.app.targetPlayersOnTeam;

    if (teamsIsFull) return;

    //Player has joined
    if (playerJoined) {
      const specHasPlayers = specPlayers.length % 2 == 0;

      if (!specHasPlayers) {
        const smallerTeamId = getPlayers().bluePlayers.length < getPlayers().redPlayers.length ? TeamsEnum.BLUE : TeamsEnum.RED;

        room.setPlayerTeam(triggerPlayer.id, smallerTeamId);

        return;
      }

      const movedPlayers = Object.entries(specPlayers);

      for (const [idx, player] of movedPlayers) {
        const redIsFull = getPlayers().redPlayers.length == config.app.targetPlayersOnTeam;
        const blueIsFull = getPlayers().bluePlayers.length == config.app.targetPlayersOnTeam;

        const isEvenPlayer = Number(idx) % 2 == 0;

        const targetTeamId = isEvenPlayer ? (redIsFull ? TeamsEnum.SPEC : TeamsEnum.RED) : blueIsFull ? TeamsEnum.SPEC : TeamsEnum.BLUE;

        await room.setPlayerTeam(player.id, targetTeamId);
      }

      return;
    }

    //Player has leave
    if (triggerPlayer.team == TeamsEnum.SPEC) return;

    // const triggeredPlayerTeam = triggerPlayer.team == TeamsEnum.RED ? redPlayers : bluePlayers;
    // const opponentPlayerTeam = triggerPlayer.team == TeamsEnum.RED ? bluePlayers : bluePlayers;

    // const triggeredPlayerTeamIsBigger = triggeredPlayerTeam.length > opponentPlayerTeam.length;

    // if (specPlayers.length == 0 && triggeredPlayerTeamIsBigger) {
    //   const biggerTeamId = redPlayers.length > bluePlayers.length ? TeamsEnum.RED : TeamsEnum.BLUE;

    //   const movedPlayer = biggerTeamId == TeamsEnum.RED ? redPlayers[0] : bluePlayers[0];

    //   if (movedPlayer) room.setPlayerTeam(movedPlayer.id, 0);

    //   return;
    // }

    const replacementPlayer = specPlayers[specPlayers.length - 1];

    if (!replacementPlayer) return;

    room.setPlayerTeam(replacementPlayer.id, triggerPlayer.team);

    if (triggerPlayer.position) room.setPlayerDiscProperties(replacementPlayer.id, triggerPlayer.position);
  }

  static clearTeams(teams: TeamsEnum[]) {
    const { redPlayers, bluePlayers } = getPlayers();

    const playedPlayers = [...redPlayers, ...bluePlayers];

    for (let i = playedPlayers.length - 1; i >= 0; i--) {
      const player = playedPlayers[i];
      if (teams.includes(player.team)) {
        room.setPlayerTeam(player.id, TeamsEnum.SPEC);
      }
    }
  }
}
