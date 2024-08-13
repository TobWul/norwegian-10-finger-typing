export const getPressedKey = (event?: KeyboardEvent) => {
  if (!event) return null;
  return event.key.length > 1 ? event.code : event.key;
};
