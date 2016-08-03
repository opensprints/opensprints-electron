const serialPort = require('serialport');

export default function findArduino(cb) {
  serialPort.list((err, ports) => {
    ports.forEach((port) => {
      if (port.manufacturer === 'Arduino (www.arduino.cc)') {
        cb(new serialPort.SerialPort(port.comName, {
          // The higher the baud rate, the more cpu required to poll the serial port
          baudrate: 115200,
          dataBits: 8,
          stopBits: 1,
          parser: serialPort.parsers.readline('\n'),
        }));
      }
    });
  });
}
