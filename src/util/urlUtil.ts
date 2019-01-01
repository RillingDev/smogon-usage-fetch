/**
 * Off-brand path.join().
 *
 * @param args URL paths to join.
 * @return Joined URL.
 */
const urlJoin = (...args: string[]): string => args.join("/");

export { urlJoin };
