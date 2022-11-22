import { useState } from "react";
import { getPeriodsToInject, getPeriodsToRemplace } from "../lib/utils";
import { Period } from "../types/Periods";
import IntervalSplitForm from "./intervalSplitForm";

export default function IntervalSplit() {
  const [periods, setPeriods] = useState<Period[]>([{ start: 0, end: 100 }]);

  const replacePeriod = (
    replaceFromIndex: number,
    replaceToIndex: number,
    periodToInject: Period
  ) => {
    const periodsToInject = getPeriodsToInject(periodToInject, {
      start: periods[replaceFromIndex].start,
      end: periods[replaceToIndex].end,
    });

    setPeriods([
      ...periods.slice(0, replaceFromIndex),
      ...periodsToInject,
      ...periods.slice(replaceToIndex + 1),
    ]);
  };

  const split = (periodToInject: Period) => {
    const { replaceFrom, replaceTo } = getPeriodsToRemplace(
      periodToInject,
      periods
    );

    if (replaceFrom !== null && replaceTo !== null) {
      replacePeriod(replaceFrom, replaceTo, periodToInject);
    }
  };

  return (
    <div className="bg-slate-100 h-screen">
      <div className="container p-8 m-auto flex flex-col items-center">
        <IntervalSplitForm split={split} />

        <div className="w-[500px] flex mt-4">
          {periods.map((period, index) => (
            <div
              key={period.start + period.end + index}
              className="p-1 m-1 border bg-white rounded-md"
            >
              {period.start} - {period.end}
            </div>
          ))}
        </div>

        <div className="w-[500px] flex mt-4">
          {periods.map((period, index) => (
            <div
              key={period.start + period.end + index}
              className="border bg-white rounded-md text-md h-4"
              style={{ width: `${period.end - period.start}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
