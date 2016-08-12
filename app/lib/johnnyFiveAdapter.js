// Connecting to the arduino and configuring its gpio pin.
// Each 'up' on a sensor is a 'tick'.

import * as five from 'johnny-five';
const DEFAULT_NUM_BIKES = 4;
const LED_PINS = [9, 10, 11, 12, 13];
const SENSOR_PINS = [2, 3, 4, 5, 6];

export default function johnnyFiveAdapter(senseFunctions) {
  this.board = new five.Board({
    repl: false
  });

  this.board.on('connected', () => {
    console.log('The board is connected.');
  });

  this.board.on('ready', () => {
    console.log('The board is ready.');
    // Example of changing baudRate
    this.io.transport.update({ baudRate: 115200 }, (err) => {
      if (err) {
        console.error(`Error: ${err}`);
      }
      console.log('Successfully switched baudRate to 115200');
    });

    function setupButton(i) {
      // Create the LEDs:
      const led = new five.Led(LED_PINS[i]);

      // Create the sensors:
      const button = new five.Button({
        pin: SENSOR_PINS[i],
        isPullup: true
      });

      button.on('down', () => {
        led.on();
        senseFunctions[i]();
      });

      button.on('up', () => {
        led.off();
      });
    }

    for (let i = 0; i < senseFunctions.length; i++) {
      setupButton(i);
    }
  });

  this.board.on('error', () => {
    console.log('The board connection has an error.');
  });

  this.board.on('message', (event) => {
    console.log(
      'Received a %s message, from %s, reporting: %s',
      event.type, event.class, event.message
    );
  });
}
