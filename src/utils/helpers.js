export const getBestTime = (times) => {
	let time = null;
	let smallest = Infinity;
	for (const t of times) {
		const value = t.value + (t.modifier == "+2" ? 2 : 0);
		if (value < smallest && t.modifier != "dnf") {
			time = t;
			smallest = value;
		}
	}
	return time;
}

export const getMean = (times) => {
	let count = 0;
	let sum = 0;
	for (let i = 0; i < times.length; i++) {
		if (times[i].modifier != "dnf") {
			sum += times[i].value + (times[i].modifier == "+2" ? 2000 : 0);
			count++;
		}
	}
	return sum / count;
}

export const getAoX = (times, x, index, exclude) => {
	index = index ?? times.length - 1;
	exclude = exclude ?? 1;

	if (times.length < x || index - x + 1 < 0 || times.length <= 0) {
		return null;
	}

	let subset = times.slice(index - x + 1, index + 1).map((time) => {
		if (time.modifier == "+2") {
			return time.value + 2000;
		}
		else if (time.modifier == "dnf") {
			return Infinity;
		}
		return time.value
	});

	subset.sort((a, b) => a - b);

	let sum = 0;
	for (let i = exclude; i < (x - exclude); i++) {
		sum += subset[i];
	}
	return sum / (x - (exclude * 2));
}



export const timeToString = (time) => {
	if (time == null) return "--";

	let milliseconds = time.value;

	if (time.modifier == "+2") {
		milliseconds += 2000;
		return formatMilliseconds(milliseconds) + "+";
	} else {
		return formatMilliseconds(milliseconds);
	}
}

export const formatMilliseconds = (milli) => {
	if (milli == Infinity) return "DNF";

	else if (milli == null || Number.isNaN(milli)) return "--";

	const milliseconds = Math.floor(milli % 1000);
	const seconds = Math.floor(milli / 1000) % 60;
	const minutes = Math.floor(milli / 1000 / 60) % 60;
	const hours = Math.floor(milliseconds / 1000 / 60 / 60);

	let hoursStr = "";
	let minutesStr = "";
	let secondsStr = String(seconds) + ".";
	let milliStr = String(milliseconds).padStart(3, "0");
	if (minutes) {
		minutesStr = String(minutes) + ":";
		secondsStr = String(seconds).padStart(2, "0") + ".";
	}
	if (hours) {
		hoursStr = String(hours) + ":"
		minutesStr = String(minutes).padStart(2, "0") + ":";
	}
	return hoursStr + minutesStr + secondsStr + milliStr;
}
export const lighten = (hex, percent) => {
	const num = parseInt(hex.slice(1), 16);
	const amt = percent * 2.55;

	const r = Math.min(255, (num >> 16) + amt);
	const g = Math.min(255, ((num >> 8) & 0x00FF) + amt);
	const b = Math.min(255, (num & 0x0000FF) + amt);

	return `#${((1 << 24) + (r << 16) + (g << 8) + b)
		.toString(16)
		.slice(1)
		.split(".")[0]}`;
}
