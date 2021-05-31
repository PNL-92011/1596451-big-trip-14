import { TYPES } from '../util/point.js';

export const DESTINATIONS = [
  {
    description: 'Amsterdam: lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=1',
        description: 'Amsterdam-1',
      },
    ],
  },
  {
    description: 'Budapest tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: 'Budapest',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=2',
        description: 'Budapest-1',
      },
      {
        src: 'http://picsum.photos/248/152?r=3',
        description: 'Budapest-2',
      },
    ],
  },
  {
    description: 'Chamonix eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=4',
        description: 'Chamonix-1',
      },
      {
        src: 'http://picsum.photos/248/152?r=5',
        description: 'Chamonix-2',
      },
      {
        src: 'http://picsum.photos/248/152?r=6',
        description: 'Chamonix-3',
      },
    ],
  },
  {
    description: 'Madrid fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus',
    name: 'Madrid',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=7',
        description: 'Madrid-1',
      },
      {
        src: 'http://picsum.photos/248/152?r=8',
        description: 'Madrid-2',
      },
      {
        src: 'http://picsum.photos/248/152?r=9',
        description: 'Madrid-3',
      },
      {
        src: 'http://picsum.photos/248/152?r=10',
        description: 'Madrid-4',
      },
    ],
  },
  {
    description: 'Paris tristique felis at fermentum pharetra. In rutrum ac purus sit amet tempus. Aliquam id orci ut lectus varius viverra.',
    name: 'Paris',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=11',
        description: 'Paris-1',
      },
      {
        src: 'http://picsum.photos/248/152?r=12',
        description: 'Paris-2',
      },
      {
        src: 'http://picsum.photos/248/152?r=13',
        description: 'Paris-3',
      },
      {
        src: 'http://picsum.photos/248/152?r=14',
        description: 'Paris-4',
      },
      {
        src: 'http://picsum.photos/248/152?r=15',
        description: 'Paris-5',
      },
    ],
  },
];


/** Group of offers by TYPE */////  уточнить про check-in !!
export const offersGroup = [
  {
    type: TYPES.taxi,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
    ],
  },
  {
    type: TYPES.bus,
    offers: [
      {
        title: 'Add meal',
        price: 15,
      },
      {
        title: 'Choose seats',
        price: 5,
      },
    ],
  },
  {
    type: TYPES.train,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
    ],
  },
  {
    type: TYPES.ship,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
    ],
  },
  {
    type: TYPES.transport,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
    ],
  },
  {
    type: TYPES.drive,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
      {
        title: 'Choose seats',
        price: 5,
      },
    ],
  },
  {
    type: TYPES.flight,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
    ],
  },
  // {
  //   type: TYPES.checkin,
  //   offers: [
  //     {
  //       title: 'Switch to comfort class',
  //       price: 80,
  //     },
  //     {
  //       title: 'Add meal',
  //       price: 15,
  //     },
  //   ],
  // },
  {
    type: TYPES.sightseeing,
    offers: [
      {
        title: 'Add meal',
        price: 15,
      },
    ],
  },
  {
    type: TYPES.restaurant,
    offers: [
      {
        title: 'Add luggage',
        price: 50,
      },
      {
        title: 'Switch to comfort class',
        price: 80,
      },
      {
        title: 'Add meal',
        price: 15,
      },
      {
        title: 'Choose seats',
        price: 5,
      },
      {
        title: 'Travel by train',
        price: 40,
      },
    ],
  },
];
