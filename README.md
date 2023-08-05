# Use Debounce

A simple React hook to debounce a state value.

## Installation

```bash
npm install @aakashx2838/use-debounce

# or

yarn add @aakashx2838/use-debounce
```

## Usage

```js
import { useDebounce } from "@aakashx2838/use-debounce";

const [value, setValue] = useState("");
const debouncedValue = useDebounce(value, 500);

return (
  <div>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    <p>Debounced value: {debouncedValue}</p>
  </div>
);
```

## Defaults

```js
debounceTime = 500; // ms
```
