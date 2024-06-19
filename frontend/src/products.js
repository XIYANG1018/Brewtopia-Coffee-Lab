import southernWeatherImage from './assets/images/southernweather.png';
import geometryImage from './assets/images/geometry.png';
import monarchImage from './assets/images/monarch.png';
import tropicalImage from './assets/images/tropical.png';
import palmaImage from './assets/images/palma.png';
import doyenneImage from './assets/images/doyenne.png';
import coldBrewImage from './assets/images/coldbrew.png';
import decafImage from './assets/images/decaf.png';
import southernHover from './assets/images/southernhover.jpeg';
import coldhover from './assets/images/coldhover.jpeg';
import decafhover from './assets/images/decafhover.jpeg';
import doyennerhover from './assets/images/doyennerhover.jpeg';
import geohover from './assets/images/geometryhover.png';
import monarchhover from './assets/images/monarchhover.jpeg';

const products = [
  {
    _id: '1',
    name: 'SOUTHERN WEATHER',
    image: southernWeatherImage,
    hoverImage: southernHover,
    description:
      'Southern Weather embodies everything we love about specialty coffee and has evolved into a foundational blend. We brew this in our own cafes as a “House” filter option and love how it balances the relationship between modern citric acidity flavors with full bodied chocolates. This comfortable, yet surprisingly complex and sophisticated coffee is approachable to all. It performs well on its own for the purist or with fats such as dairy or plant based beverages, making it a true answer for all coffee needs.',
    brand: 'Apple',
    category: 'Electronics',
    price: 20,
    countInStock: 10,
    rating: 4.5,
    numReviews: 120,
    color: 'black',
    textColor: 'white',
    sizes: {
      '4oz': 10,
      '10oz': 20,
      '2lbs': 30,
      '5lbs': 58
    }
  },
  {
    _id: '2',
    name: 'GEOMETRY',
    image: geometryImage,
    hoverImage: geohover,
    description:
      'Geometry has been defined as "describing spaces that lie beyond the normal range of human experience." Soon it will also be defined as "that coffee from Onyx that I am in love with and completely redefined my relationship with coffee." It\'s our answer for everything and has two of our favorite coffees—a washed processed Ethiopian & Colombian. This blend has become one of our favorite coffees. We love it as a filter coffee, and we love it as espresso. And not only does is it taste great as either but it\'s easy to dial in as espresso or filter.',
    brand: 'Apple',
    category: 'Electronics',
    price: 25,
    countInStock: 7,
    rating: 4.0,
    numReviews: 80,
    color: '#e3b080',
    textColor: 'black',
    sizes: {
      '4oz': 10,
      '10oz': 25,
      '2lbs': 30,
      '5lbs': 58
    }
  },
  {
    _id: '3',
    name: 'MONARCH',
    image: monarchImage,
    hoverImage: monarchhover,
    description:
      'Monarch is our most developed roast that conveys a flavor profile that we intentionally designed to work well with milk. Cream and plant based beverages mix with ease, creating a rich, decadent flavor. It involves a natural, sugar-dense coffee that binds to the fats and creates multiple complex caramelized notes during the roasting process. Look for dark chocolate and undertones of thick winey berries. Enjoy as drip or espresso.',
    brand: 'Cannon',
    category: 'Electronics',
    price: 30,
    countInStock: 5,
    rating: 4,
    numReviews: 120,
    color: '#8c898c',
    textColor: 'white',
    sizes: {
      '4oz': 10,
      '10oz': 30,
      '2lbs': 30,
      '5lbs': 58
    }
  },
  {
    _id: '4',
    name: 'TROPICAL WEATHER',
    image: tropicalImage,
    hoverImage: southernHover,
    description:
      'Tropical Weather is a seasonal blend that celebrates coffees from our favorite coffee producing country: Ethiopia. We take a fresh washed offering that provides delicate florals and juicy texture, and incorporate a natural processed coffee that promotes pungent fruits and natural sugars. The result is indeed better than the sum of its parts. If you miss the long days of summer then Tropical Weather is your cup of sunshine. With a floral aroma, notes of berries and plum, along with the tannins and sweetness of sweet tea, you\'ll be leaving the house wearing shorts all year long.',
    brand: 'Sony',
    category: 'Electronics',
    price: 24,
    countInStock: 11,
    rating: 5,
    numReviews: 120,
    color: '#e1a5a4',
    textColor: 'black',
    sizes: {
      '4oz': 10,
      '10oz': 24,
      '2lbs': 30,
      '5lbs': 58
    }
  },
  {
    _id: '5',
    name: 'COLOMBIA LA PALMA GESHA LACTIC HONEY',
    image: palmaImage,
    hoverImage: southernHover,
    description:
      'This lactic-processed micro-lot from our friends at La Palma Y El Tucan boasts a layered complexity in the cup. After years of honing this process, the hard work at the wet mill yields a red-fruit sweetness like guava and melon, with delicate florals like jasmine and white flower.',
    brand: 'Logitech',
    category: 'Electronics',
    price: 27,
    countInStock: 7,
    rating: 4.5,
    numReviews: 100,
    color: '#a89fd0',
    textColor: 'black',
    sizes: {
      '4oz': 10,
      '10oz': 27,
      '2lbs': 37,
      '5lbs': 60
    }
  },
  {
    _id: '6',
    name: 'COLD BREW',
    image: coldBrewImage,
    hoverImage: coldhover,
    description:
      'This coffee is intentionally sourced and roasted to craft the perfect cold brew coffee. Lower in acidity and high in sugar browning, this coffee reacts well with fats in dairy or tastes smooth and sweet on its own. We look for coffees that will take a large amount of heat during the caramelization process and extend the roast times to increase the body and remove acidity. Designed for cold extraction only, expect notes of Cocoa, Dates and a thicken creamy texture.',
    brand: 'Amazon',
    category: 'Electronics',
    price: 22,
    countInStock: 0,
    rating: 4,
    numReviews: 124,
    color: '#646872',
    textColor: 'white',
    sizes: {
      '4oz': 10,
      '10oz': 22,
      '2lbs': 30,
      '5lbs': 58
    }
  },

  {
    _id: '7',
    name: 'DECAF COLOMBIA INZÁ SAN ANTONIO',
    image: decafImage,
    hoverImage: decafhover,
    description:
      'Rest easy with this washed decaffeinated coffee from Cauca, Inzá. We’ve intentionally sourced this coffee for the purpose of decaffeination, selecting this regional lot from San Antonio for it\'s structured sweetness of red apple and raw sugar, with a balanced acidity reminiscent of pear.',
    brand: 'Amazon',
    category: 'Electronics',
    price: 28,
    countInStock: 0,
    rating: 4,
    numReviews: 129,
    color: '#a73e5a',
    textColor: 'white',
    sizes: {
      '4oz': 10,
      '10oz': 28,
      '2lbs': 30,
      '5lbs': 58
    }
  },

  {
    _id: '8',
    name: 'DOYENNE',
    image: doyenneImage,
    hoverImage: doyennerhover,
    description:
      'Doyenne is defined as a woman who is the most prominent person in a particular field. Coffee production is traditionally male led due to the cultural relationship dynamics in producing countries. Women have always contributed to and are often the backbone of coffee production, contributing detail oriented, quality-focused excellence to the field. Until recent years, they are rarely honored for this work. Doyenne seeks to identify and amplify the stories of woman achieving incredible marks in coffee. The selections are curated by Andrea Allen, co-founder of Onyx Coffee Lab and 2020 US Barista Champion. The heart is for women to collaborate and to boost each other\'s work and achievement through stories.',
    brand: 'Amazon',
    category: 'Electronics',
    price: 30,
    countInStock: 0,
    rating: 4.5,
    numReviews: 123,
    color: '#3c4f84',
    textColor: 'white',
    sizes: {
      '4oz': 10,
      '10oz': 30,
      '2lbs': 60,
      '5lbs': 80
    }
  },
]

export default products
