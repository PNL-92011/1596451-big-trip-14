/**
 * Функция обновления элемента в массиве
 * @returns array - возвращает массив с обновленным значением
 */
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};


/** Функция получения доп.опций в зависимости от типа события */
export const getArrayByType = (array, type) => {
  for (const key in array) {
    if (key === type) {
      return array[key];
    }
  }
};
