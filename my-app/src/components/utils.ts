//render the current time played on the video
export const renderTime = (time: number) => `${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`;

