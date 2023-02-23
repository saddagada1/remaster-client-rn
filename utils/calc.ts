export const calcExpiresIn = (expires_in: number) => {
  const now = new Date();
  return new Date(now.getTime() + expires_in * 1000).toString();
};

export const calcIsExpiring = (expires_in: string) => {
  const now = new Date();
  return Date.parse(expires_in) - now.getTime() <= 5000;
};

export const calcVideoTimestamp = (position: number) => {
  const minutes = Math.floor(position / 60);
  const seconds = position % 60;
  return `${minutes}:${seconds.toString().length === 1 ? "0" + seconds : seconds}`;
};

export const clamp = (value: number, lowerBound: number, upperBound?: number) => {
  "worklet";
  if (!upperBound) {
    return Math.max(lowerBound, value);
  }
  return Math.min(Math.max(lowerBound, value), upperBound);
};
