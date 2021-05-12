import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

// export const Mode = {
//   DEFAULT: 'DEFAULT',
//   EDITING: 'EDITING',
// };

/**
 * Вспомогательная функция для отрисовки компонентов на странице
 * @param {object} container - место, куда помещаем компонент
 * @param {function} element - функция, которая отрисовывает конкретный кусок разметки
 * @param {string} place - место вставки в разметке
 */
export const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


/**
 * Вспомогательная функция. Возвращает DOM-элемент
 * @return {object} DOM-элемент
 */
export const createDomElement = (template) => {
  const newElement = document.createElement('div');   // 1. создаём пустой div-блок
  newElement.innerHTML = template;                    // 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент

  return newElement.firstElementChild;                // 3. возвращаем этот DOM-элемент
};


/**
 * Функция замены одного элемента на другой
 */
export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};


export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};


