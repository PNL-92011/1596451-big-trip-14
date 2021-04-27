/**
 * Вспомогательная функция для отрисовки компонентов на странице
 * @param {object} container - место, куда помещаем компонент
 * @param {function} template - функция, которая отрисовывает конкретный кусок разметки
 * @param {string} place - место вставки в разметке
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


export { render };
