import { useState } from "react";
import { getPeriodsToInject, getPeriodsToRemplace } from "../lib/utils";
import { Period } from "../types/Periods";

export default function IntervalSplit(props: any) {
  const [periods, setPeriods] = useState<Period[]>([
    { start: 0, end: 19 },
    { start: 20, end: 30 },
    { start: 31, end: 100 },
  ]);

  const [startInput, setStartInput] = useState<string>("29");
  const [endInput, setEndInput] = useState<string>("40");
  const [error, setError] = useState<string>("");

  const reset = () => {
    setStartInput("");
    setEndInput("");
    setError("");
  };

  const replacePeriod = (replaceFromIndex: number, replaceToIndex: number) => {
    const periodsToInject = getPeriodsToInject(
      {
        start: parseInt(startInput),
        end: parseInt(endInput),
      },
      {
        start: periods[replaceFromIndex].start,
        end: periods[replaceToIndex].end,
      }
    );

    setPeriods([
      ...periods.slice(0, replaceFromIndex),
      ...periodsToInject,
      ...periods.slice(replaceToIndex + 1),
    ]);
  };

  const split = (event: any) => {
    event.preventDefault();

    const periodsToInject = {
      start: parseInt(startInput),
      end: parseInt(endInput),
    };

    if (periodsToInject.start > periodsToInject.end) {
      setError("Start must be less than end");
      return;
    }

    const { replaceFrom, replaceTo } = getPeriodsToRemplace(
      periodsToInject,
      periods
    );

    if (replaceFrom !== null && replaceTo !== null) {
      // todo check condition
      replacePeriod(replaceFrom, replaceTo);
    }

    reset();
  };

  return (
    <div className="bg-slate-100 h-screen">
      <div className="container p-8 m-auto flex flex-col items-center">
        <form
          onSubmit={split}
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
        <div className="w-[500px] flex mt-4">
          {periods.map((period, index) => (
            <div
              key={period.start + period.end + index}
              className="border bg-white rounded-md text-md h-4"
              style={{ width: `${period.end - period.start}%` }}
            >
              <span className="p-2">
                {period.start} - {period.end}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
