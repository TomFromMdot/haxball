import Room from "core/Room";

const logger = (room: Room) => {
  process.stdout.write('> ');

  process.stdin.on('data', (data) => {
    const input = data.toString();

    const args = '...args';
    const roomCommand = new Function(args, `let [room] = args; return console.log(${input})`);

    roomCommand(room);

    process.stdout.write('>');
  });
};

export default logger;
