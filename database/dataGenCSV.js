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
  };
  return listing;
}

function generateListings() {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let i = 1; i <= 10000000; i += 1) {
    const listing = generateListing();
    id += 1;
    writer.write(listing);
    console.log('Record:', i);
  }
  writer.end();
  console.log('end');
}

generateListings();

/* ============================================
=                 Data Schema                 =
===============================================


create table test_seed(
id integer,
city varchar(255),
title varchar(255),
hostImage varchar(255),
roomInfo varchar(255),
numberOfGuests integer,
numberOfBedrooms integer,
numberOfBeds integer,
numberOfBaths integer,
isSuperHost boolean,
isGreatLocation boolean,
isSparklingClean boolean,
isGreatCheckIn boolean,
isSelfCheckIn boolean,
description text,
hasWifi boolean,
hasEssentials boolean,
hasCable boolean,
hasLaptopSpace boolean,
hasHeating boolean,
hasKitchen boolean,
hasPillowsBlankets boolean,
bedroom integer);


============================================ */
