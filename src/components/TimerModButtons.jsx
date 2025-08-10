import DeleteIcon from '@/assets/icons/x-lg.svg?react';
import BanIcon from '@/assets/icons/ban.svg?react';
import ChatIcon from '@/assets/icons/chat-right-text.svg?react';
import { useTimes } from '@/App';
const TimerModButtons = () => {
	const timesContext = useTimes()

	const handleMod = (val) => {
		if (val === timesContext.currentTime.modifier) {
			const { modifier: _, ...deletedMod } = timesContext.currentTime;
			timesContext.modifyTime(deletedMod);
		} else {
			timesContext.modifyTime({ ...timesContext.currentTime, modifier: val });
		}
	};
	return (
		<div className='d-flex gap-3 justify-content-center' style={{ height: "20px" }}>
			<div className="d-flex hoverColor" role="button"
				onClick={() => {
					timesContext.deleteTime(timesContext.currentTime);
				}}
			>
				<DeleteIcon width={20} height={20} />
			</div>
			<div className="d-flex hoverColor" role="button"
				onClick={() => handleMod("dnf")} >
				<BanIcon width={20} height={20} />
			</div>
			<div className="d-flex align-items-center hoverColor" role="button"
				onClick={() => handleMod("+2")} >
				<p style={{ width: "20px", height: "20px", lineHeight: 1, fontSize: "16px" }}>
					+2
				</p>
			</div>
			<div className="d-flex hoverColor" role="button">
				<ChatIcon width={20} height={20} />
			</div>
		</div>

	)
}

export default TimerModButtons;
