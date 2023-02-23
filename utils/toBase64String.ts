import { Buffer } from "buffer";

export const toBase64String = (string: string) => {
  return Buffer.from(string, "utf-8").toString("base64");
};
