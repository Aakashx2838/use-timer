# Use Debounce

A simple React timer hook.

## Installation

```bash
npm install @aakashx2838/use-timer

# or

yarn add @aakashx2838/use-timer
```

## Usage

```js
import { useTimer } from "./use-timer";

function App() {
  const { time, isRunning, toggle, reset } = useTimer({
    reverse: true,
    targetTime: -5,
    loop: true,
  });

  return (
    <>
      <p>
        {time.h}: {time.m}: {time.s}
      </p>
      <button onClick={toggle}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default App;
```

## Defaults

```js
let step = 1; // in seconds
let timeInterval = 1; // in seconds
let startTime = 0; // in seconds
let targetTime = 0; // in seconds
let reverse = false;
let loop = false;

let onComplete = () => {};
let onStart = () => {};
let onPause = () => {};
let onTimeUpdate = (time: number) => {};
```

## Options

| Option       | Type     | Description                                                                                    |
| ------------ | -------- | ---------------------------------------------------------------------------------------------- |
| step         | number   | The amount of time to increment/decrement the timer by.                                        |
| timeInterval | number   | The interval at which the timer updates.                                                       |
| startTime    | number   | The time at which the timer should start.                                                      |
| targetTime   | number   | The time at which the timer should stop (Only provide if reverse is true).                     |
| reverse      | boolean  | If true, the timer will count down. If false, the timer will count up.                         |
| loop         | boolean  | If true, the timer will restart when it reaches the target time.                               |
| onComplete   | function | A callback function that will be called when the timer reaches the target time.                |
| onStart      | function | A callback function that will be called when the timer starts.                                 |
| onPause      | function | A callback function that will be called when the timer is paused.                              |
| onTimeUpdate | function | A callback function that will be called when the timer updates. The current time is passed in. |

## Structure of time

```js
{
  h: number;
  m: number;
  s: number;
}
```
