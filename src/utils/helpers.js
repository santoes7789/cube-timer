export const timeToString = (time) => {
	let milliseconds = time["value"];

	console.log("hello?");
	if (time["modifiers"] == "+2") {
		milliseconds += 2000;
		return formatMilliseconds(milliseconds) + "+";
	} else {
		return formatMilliseconds(milliseconds);
	}
}

export const formatMilliseconds = (milli) => {
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
