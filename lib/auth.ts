/* Single shared credential gate for the QWork Academy portal.
   This is a help/training portal with public-style content, so a
   single lightweight session cookie is sufficient. */

export const SESSION_COOKIE = "qw_session";
export const SESSION_VALUE = "qwork-academy-ok";

export const CREDENTIALS = {
  user: "qwork",
  pass: "qwork123",
};

export function checkCredentials(user: string, pass: string): boolean {
  return user.trim().toLowerCase() === CREDENTIALS.user && pass === CREDENTIALS.pass;
}
