//получает все ключи из объекта
export const getKeys = <T>(obj: T) => Object.keys(obj as {}) as Array<keyof T>;
