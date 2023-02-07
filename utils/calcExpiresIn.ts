export const calcExpiresIn = (expires_in: number) => {
  const now = new Date();
  const calculated_expires_in = new Date(now.getTime() + expires_in * 1000);
  return calculated_expires_in.toString();
};
