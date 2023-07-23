import { customAlphabet } from "nanoid/non-secure";

export function generatePassword() {
  const nanoid = customAlphabet("012345aAbBcCdDeEfFiIoOuUzZxX*!@#$^&*?-_", 8);
  let password = nanoid();
  while (!checkPassword(password)) {
    password = nanoid();
  }
  return password;
}

export function checkPassword(password: string) {
  if (password.length < 8) {
    return false;
  }
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$^&*?-]).{8,}$"
  );
  return regex.test(password);
}
