const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

const titleRandom = ['Perfectly located', 'Light & spacious garden flat', 'Private Modern Guesthouse', 'Ocean View Hideaway', 'Perfect Haven by Golden Gate', 'Private Backyard Cottage', 'Sunny Room Heart of', 'Luxury Gold Coast', 'Central Surfers Studio OceanView', 'Broken Head Bodhi Treehouse', 'Mountain tiny house', 'Blue Mountains Cottage', 'The Copa Cabana', 'The Tree House', 'Stroll Around Victoria Park', 'Entire Home with Opera House views', 'Luxury Apartment in the heart of', 'Stylish inner-city home', 'Little Paradise', 'Stunning River View'];

const roomInfoRandom = ['Private room', 'Entire guesthouse', 'Entire guestsuite', 'Entire House'];

let id = 1;

function generateListing() {
  const titleRandomArray = titleRandom[Math.floor(Math.random() * titleRandom.length)];
  const roomInfoRandomArray = roomInfoRandom[Math.floor(Math.random() * roomInfoRandom.length)];

  function numberOfGuests() {
    if (roomInfoRandomArray === 'Private room') {
      return 2;
    }
    return 6;
  }

  function numberOfBedrooms() {
    if (roomInfoRandomArray === 'Private room') {
      return 1;
    }
    return faker.random.number({ min: 2, max: 5 });
  }

  function numberOfBeds() {
    if (roomInfoRandomArray === 'private room') {
      return 1;
    }
    return faker.random.number({ min: 2, max: 5 });
  }

  function numberOfBaths() {
    if (roomInfoRandomArray === 'private room') {
      return 1;
    }
    return faker.random.number({ min: 2, max: 4 });
  }

  const bedrooms = numberOfBedrooms();
  const city = faker.address.city();
  const listing = {
    id,
    city,
    title: `${titleRandomArray} ${city}`,
    hostImage: faker.image.avatar(),
    roomInfo: roomInfoRandomArray,
    numberOfGuests: numberOfGuests(),
    numberOfBedrooms: bedrooms,
    numberOfBeds: numberOfBeds(),
    numberOfBaths: numberOfBaths(),
    isSuperhost: faker.random.boolean(),
    isGreatLocation: faker.random.boolean(),
    isSparklingClean: faker.random.boolean(),
    isGreatCheckIn: faker.random.boolean(),
    isSelfCheckIn: faker.random.boolean(),
    description: faker.lorem.paragraph() + faker.lorem.paragraph(),
    hasWiFi: true,
    hasEssentials: true,
    hasCable: true,
    hasLaptopSpace: true,
    hasHeating: true,
    hasKitchen: true,
    hasPillowsBlankets: true,
    bedroom: bedrooms,
  };
  return listing;
}

function generateListings() {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let i = 1; i <= 10000000; i += 1) {
    const listing = generateListing();
    writer.write(listing);
    id += 1;
    console.log('Record:', i);
  }
  writer.end();
  console.log('end');
}

generateListings();
