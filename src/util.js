/**
 * Вспомогательная функция для отрисовки компонентов на странице
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {render};
