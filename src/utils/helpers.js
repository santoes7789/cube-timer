export const getBestTime = (times) => {
	let time = null;
	let smallest = Infinity;
	for (const t of times) {
		const value = t.value + (t.modifier == "+2" ? 2 : 0);
		if (value < smallest) {
			time = t;
			smallest = value;
		}
	}
	return time;
}

export const getAoX = (times, x, index, exclude) => {
	index = index ?? times.length - 1;
	exclude = exclude ?? 1;

	if (times.length < x || index - x + 1 < 0 || times.length <= 0) {
		return null;
	}

	let subset = times.slice(index - x + 1, index + 1).map((time) => {
		const mod = (time["modifiers"] == "+2") ? 2000 : 0;
		return time["value"] + mod;
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
	if (milli == null) return "--";

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
