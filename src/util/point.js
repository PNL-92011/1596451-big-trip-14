const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Chamonix', 'Rotterdam', 'Toulouse', 'Paris', 'Zurich', 'Madrid', 'Budapest', 'Izmir', 'Milan'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const OFFERS = [
  {
    name: 'Add luggage',
    price: 30,
    nickname: 'luggage',
  },
  {
    name: 'Switch to comfort class',
    price: 100,
    nickname: 'comfort',
  },
  {
    name: 'Add meal',
    price: 15,
    nickname: 'meal',
  },
  {
    name: 'Choose seats',
    price: 5,
    nickname: 'seats',
  },
  {
    name: 'Travel by train',
    price: 40,
    nickname: 'train',
  },
];


export { TYPES, CITIES, DESCRIPTIONS, OFFERS };
