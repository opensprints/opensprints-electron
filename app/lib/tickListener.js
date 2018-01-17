import johnnyFiveAdapter from './johnnyFiveAdapter';

const NUM_RACERS = 4;
const counts = [];
const tickFunctions = [];

const sensorFunctionFactory = i => () => {
  counts[i] += 1;
  console.log('Racer %s has %s ticks', i, counts[i]);
};

for (let i = 0; i < NUM_RACERS; i++) {
  // Initialize counts
  counts.push(0);

  // Initialize tickFunctions

  tickFunctions.push(sensorFunctionFactory(i));
}

johnnyFiveAdapter(tickFunctions);

// const STATE_IDLE = 'STATE_IDLE';
// const STATE_IDLE = 'STATE_COUNTDOWN';
// const STATE_IDLE = 'STATE_RACING';
//
// var state = STATE_IDLE;
//
// var onData = function(bike) {``
//   switch (state) {
//     case STATE_IDLE:
//     break;
//     case STATE_COUNTDOWN:
//     break;
//     case STATE_RACING:
//     break;
//   }
// }

// TODO: setRaceConfig
/**
 * config: {
 *   bikes: 2,
 *   countdownSeconds: 3,
 *   raceDuration: { type: 'ticks', value: 500 }, testing: false
 * }
 */
// Initializing a Race Notes from OpenSprints-comm
/**
 ReactionTicks = 2

 Initializing a Race Notes:
 set all Go LEDs to Red
 for each bike:
 set hasFinished = false
 set finishTime = 0
 set ticks = 0
 While countdown is active:
 if any bike's ticks >= 2
 report false start
 On Start:
 set raceStartTime
 set reactionFlag for each bike
 Game Loop:
 Check if any racer has finished
 if testing
 bike's ticks += bikeIndex + 4

 */
