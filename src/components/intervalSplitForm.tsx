import { FormEvent, useState } from "react";
import { Period } from "../types/Periods";

interface Props {
  split: (period: Period) => void;
}
export default function IntervalSplitForm(props: Props) {
  const [startInput, setStartInput] = useState<string>("");
  const [endInput, setEndInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetForm = () => {
    setStartInput("");
    setEndInput("");
    setError("");
  };

  const onsubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const periodsToInject = {
      start: parseInt(startInput),
      end: parseInt(endInput),
    };

    if (periodsToInject.start > periodsToInject.end) {
      setError("Start must be less than end");
      return;
    }

    props.split(periodsToInject);
    resetForm();
  };

  return (
    <>
      <form
        onSubmit={onsubmit}
        className="flex justify-center flex-col w-32 border p-4 bg-white rounded-md"
      >
        <label>
          Start:
          <input
            type="number"
            value={startInput}
            min="0"
            max="100"
            className="border"
            onChange={(e) => setStartInput(e.target.value)}
          />
        </label>
        <label>
          End:
          <input
            type="number"
            value={endInput}
            min="0"
            max="100"
            className="border"
            onChange={(e) => setEndInput(e.target.value)}
          />
        </label>
        <button className="px-4 py-2 border rounded-md bg-slate-600 text-white mt-4">
          Split
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
