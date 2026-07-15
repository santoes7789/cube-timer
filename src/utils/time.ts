import type { Time } from "@/db/times";

export function formatMilliseconds(time: number | null | undefined) {
  if (time == null) return null;
  return (time/1000).toFixed(3);
}

export const getAoX = (times: Time[], x: number, index=times.length - 1, exclude=1) => {
	if (times.length < x || index - x + 1 < 0 || times.length <= 0) {
		return null;
	}

	let subset = times.slice(index - x + 1, index + 1).map((time) => {

    return time.getTimeValueDnfIsNull() ?? Infinity;
	});

	subset.sort((a, b) => a - b);

	let sum = 0;
	for (let i = exclude; i < (x - exclude); i++) {
		sum += subset[i];
	}
	return sum / (x - (exclude * 2));
}

export const getBestTime = (times: Time[]) => {
	let time = null;
	let smallest = Infinity;
	for (const t of times) {
		const value = t.getTimeValue();
		if (value < smallest && t.modifier != "dnf") {
			time = t;
			smallest = value;
		}
	}
	return time;
}

export const getWorstTime = (times: Time[]) => {
	let time = null;
	let largest = 0;
	for (const t of times) {
		const value = t.getTimeValue();
		if (value > largest && t.modifier != "dnf") {
			time = t;
			largest = value;
		}
	}
	return time;
}

export const getTotalTime = (times: Time[]) => {
  let sum = 0;

  for (const t of times) {
    sum += t.time;
  }
  return sum;
}

  
export const getSessionAverage = (times: Time[]) => {
  let sum = 0;
  let count = 0;

  for (const t of times) {
    if(t.modifier != "dnf") {
      sum += t.time + (t.modifier == "+2" ? 2 : 0);
      count++;
    }
  }

  if(count == 0) return null;
  return sum/count; 
}

export const getDeviation = (times: Time[]) => {
  let sum = 0;
  let count = 0;
  let mean = getSessionAverage(times);
  if (!mean) return null;

  for (const t of times) {
    if (t.modifier != "dnf") {
      sum += (mean - (t.time + (t.modifier == "+2" ? 2 : 0))) ** 2;
      count ++;
    }
  }
  
  return Math.sqrt(sum/count);
}