import type { Timetype } from "@/types";

export function formatMilliseconds(time: number) {
  return (time/1000).toFixed(3);
}

export const getAoX = (times: Timetype[], x: number, index=times.length - 1, exclude=1) => {
	if (times.length < x || index - x + 1 < 0 || times.length <= 0) {
		return null;
	}

	let subset = times.slice(index - x + 1, index + 1).map((time) => {
		if (time.modifier == "+2") {
			return time.time + 2000;
		}
		else if (time.modifier == "dnf") {
			return Infinity;
		}
		return time.time;
	});

	subset.sort((a, b) => a - b);

	let sum = 0;
	for (let i = exclude; i < (x - exclude); i++) {
		sum += subset[i];
	}
	return sum / (x - (exclude * 2));
}

export const getBestTime = (times: Timetype[]) => {
	let time = null;
	let smallest = Infinity;
	for (const t of times) {
		const value = t.time + (t.modifier == "+2" ? 2 : 0);
		if (value < smallest && t.modifier != "dnf") {
			time = t;
			smallest = value;
		}
	}
	return time;
}


