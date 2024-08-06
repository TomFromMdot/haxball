import HaxballJS from 'haxball.js';

export default class {
  config: any;
  room: any;
  constructor(config) {
    this.config = config;
    this.room = null;
  }

  async create() {
    const HBInit = await HaxballJS;

    const room = HBInit(this.config.room);

    room.onRoomLink = (url) => console.log(url);

    const store = (await import(`rooms/${this.config.source.name}/src/store/index.ts`)).default;

    this.room = room;

    console.log(`Init ROOM: ${this.config.source.name}`);

    return { room, store, config: this.config };
  }

  async hydrate() {
    const hydrator = (await import(`rooms/${this.config.source.name}/index.ts`)).default;

    hydrator(this.room);

    console.log(`Hydrate ROOM: ${this.config.source.name}`);

    return this.room;
  }
}
