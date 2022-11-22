import { Period } from "../types/Periods";

export function getPeriodToInject(
  periodToInject: Period,
  globalPeriod: Period
): Period[] {
  const periodsToInject = [];

  if (globalPeriod.start !== periodToInject.start) {
    periodsToInject.push({
      start: globalPeriod.start,
      end: periodToInject.start - 1,
    });
  }

  periodsToInject.push({
    start: periodToInject.start,
    end: periodToInject.end,
  });

  if (globalPeriod.end !== periodToInject.end) {
    periodsToInject.push({
      start: periodToInject.end + 1,
      end: globalPeriod.end,
    });
  }

  return periodsToInject;
}

export function getPeriodToReplaceIndexes(
  periodToInject: Period,
  periods: Period[]
) {
  let replaceFrom = null;
  let replaceTo = null;

  for (let i = 0; i < periods.length; i++) {
    const period = periods[i];

    if (replaceFrom === null && periodToInject.start <= period.end) {
      replaceFrom = i;
    }

    if (replaceTo === null && periodToInject.end <= period.end) {
      replaceTo = i;
    }
  }

  return { replaceFrom, replaceTo };
}
