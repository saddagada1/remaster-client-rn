export const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randKeys = (obj: Object, num: number) => {
  const objectKeys = Object.keys(obj);
  if (num === objectKeys.length) {
    return objectKeys;
  }
  let keys: string[] = [];
  for (let i = 0; i < num - 1; i++) {
    keys.push(objectKeys[Math.floor(Math.random() * objectKeys.length)]);
  }
  return keys;
};
