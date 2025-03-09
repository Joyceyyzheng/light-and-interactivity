// // I didn't write this code, chat did
// class ClapProcessor extends AudioWorkletProcessor {
//   constructor() {
//     super();
//     this.lastClapTime = 0; // in milliseconds
//     this.clapCount = 0;
//     // Adjust these thresholds based on testing:
//     this.CLAP_THRESHOLD = 0.3; // amplitude threshold for a clap
//     this.CLAP_DEBOUNCE_TIME = 300; // minimum time between claps (ms)
//     this.DOUBLE_CLAP_WINDOW = 1000; // time window to register two claps (ms)
//   }

//   process(inputs, outputs, parameters) {
//     // We only use the first input and first channel.
//     const input = inputs[0];
//     if (input && input.length > 0) {
//       const channelData = input[0];
//       let sum = 0;
//       for (let i = 0; i < channelData.length; i++) {
//         sum += Math.abs(channelData[i]);
//       }
//       const avg = sum / channelData.length;

//       // currentTime is in seconds; convert to milliseconds:
//       const now = currentTime * 1000;

//       if (avg > this.CLAP_THRESHOLD) {
//         // Only count if enough time has passed since the last detected clap:
//         if (now - this.lastClapTime > this.CLAP_DEBOUNCE_TIME) {
//           this.clapCount++;
//           // If we detect two claps within our window:
//           if (
//             this.clapCount === 2 &&
//             now - this.lastClapTime < this.DOUBLE_CLAP_WINDOW
//           ) {
//             this.port.postMessage({ event: "doubleclap" });
//             this.clapCount = 0;
//           }
//           this.lastClapTime = now;
//         }
//       }

//       // Reset count if too much time has passed:
//       if (now - this.lastClapTime > this.DOUBLE_CLAP_WINDOW) {
//         this.clapCount = 0;
//       }
//     }
//     return true;
//   }
// }
// registerProcessor("clap-processor", ClapProcessor);
