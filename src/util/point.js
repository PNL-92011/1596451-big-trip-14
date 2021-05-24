const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFERS = {
  luggage:
  {
    name: 'Add luggage',
    price: 30,
    nickname: 'luggage',
  },
  comfort:
  {
    name: 'Switch to comfort class',
    price: 100,
    nickname: 'comfort',
  },
  meal:
  {
    name: 'Add meal',
    price: 15,
    nickname: 'meal',
  },
  seats:
  {
    name: 'Choose seats',
    price: 5,
    nickname: 'seats',
  },
  train:
  {
    name: 'Travel by train',
    price: 40,
    nickname: 'train',
  },
  uber:
  {
    name: 'Order Uber',
    price: 60,
    nickname: 'uber',
  },
  car:
  {
    name: 'Rent a car',
    price: 200,
    nickname: 'car',
  },
  breakfast:
  {
    name: 'Add breakfast',
    price: 50,
    nickname: 'breakfast',
  },
  tickets: {
    name: 'Book tickets',
    price: 40,
    nickname: 'tickets',
  },
  lunch: {
    name: 'Lunch in city',
    price: 30,
    nickname: 'lunch',
  },
};


const GROUP_OFFERS = {
  taxi: [ OFFERS.uber, OFFERS.luggage ],
  bus: [ OFFERS.seats, OFFERS.lunch, OFFERS.luggage ],
  train: [ OFFERS.train, OFFERS.tickets, OFFERS.luggage, OFFERS.meal, OFFERS.comfort ],
  ship: [ OFFERS.tickets, OFFERS.luggage, OFFERS.meal, OFFERS.comfort ],
  transport: [ OFFERS.car, OFFERS.tickets, OFFERS.luggage, OFFERS.comfort, OFFERS.meal ],
  drive: [ OFFERS.car, OFFERS.comfort ],
  flight: [ OFFERS.luggage, OFFERS.meal, OFFERS.comfort ],
  checkin: [OFFERS.comfort, OFFERS.breakfast ],
  sightseeing: [ OFFERS.tickets, OFFERS.seats ],
  restaurant: [ OFFERS.comfort ],
};
// уточнить про check-in

export { TYPES, OFFERS, GROUP_OFFERS };
