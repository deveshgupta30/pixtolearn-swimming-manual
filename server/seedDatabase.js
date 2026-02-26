require('dotenv').config();
const mongoose = require('mongoose');
const Translation = require('./models/Translation');
const germanContent = require('./translations/germanContent');
const spanishContent = require('./translations/spanishContent');
const finnishContent = require('./translations/finnishContent');
const frenchContent = require('./translations/frenchContent');
const italianContent = require('./translations/italianContent');
const dutchContent = require('./translations/dutchContent');
const polishContent = require('./translations/polishContent');
const portugueseContent = require('./translations/portugueseContent');
const danishContent = require('./translations/danishContent');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const languages = [
  { code: 'EN', name: 'English', native: 'English', isEU: true },
  { code: 'DE', name: 'German', native: 'Deutsch', isEU: true },
  { code: 'ES', name: 'Spanish', native: 'Español', isEU: true },
  { code: 'FI', name: 'Finnish', native: 'Suomi', isEU: true },
  { code: 'FR', name: 'French', native: 'Français', isEU: true },
  { code: 'IT', name: 'Italian', native: 'Italiano', isEU: true },
  { code: 'NL', name: 'Dutch', native: 'Nederlands', isEU: true },
  { code: 'PL', name: 'Polish', native: 'Polski', isEU: true },
  { code: 'PT', name: 'Portuguese', native: 'Português', isEU: true },
  { code: 'DA', name: 'Danish', native: 'Dansk', isEU: true }
];

const packData = {
  fullPack: {
    packType: 'fullPack',
    packName: 'Full Pack',
    colorScheme: 'blue',
    overview: 'PIXTOLEARN Swimming resources are designed to help instructors, therapists, and families create structured, visual, and inclusive aquatic learning experiences.\n\nThe Full Pack brings together all PIXTOLEARN materials including flashcards, folders, stands, marker, towel, and swimming toys. It provides a complete visual learning system that supports confidence and communication in the water.\n\nEach component promotes understanding, independence, and enjoyment, helping every session remain consistent, engaging, and safe.\n\nThese materials are intended for adult guided use and provide structured visual support during swimming sessions.',
    whatIsIncluded: [
      '4 colour-coded folders containing all the flashcards organised by category',
      '1 x Session Plan Folder for effective lesson planning',
      '160 flashcards, including indexes and instructions',
      'PIXTOLEARN Swimming Stands & Holder (white bag) Includes 3 stands (first, next, then) and a holder for poolside organisation',
      'PIXTOLEARN Swimming Toys (yellow bag): 3 ducks, 2 sinkers, 1 water pistol, 1 pop tube, 1 water bucket, 1 ball',
      'Additional items: 1 x blue session bag, 1 x Pixtolearn highlighter marker, 1 x blue spear bag, 1 x microfibre towel'
    ],
    sections: {
      foldersFlashcards: {
        title: 'Folders & Flashcards',
        description: 'Organise, plan, and deliver structured swimming sessions using visual supports.\n\nEach folder groups waterproof PVC flashcards by category, helping instructors build clear, step-by-step routines.',
        suggestUseAndCare: [
          'Choose the cards needed for each session to represent routines or skills',
          'Change or combine folders as swimmers progress',
          'Place them on the stands or by the pool for visual guidance',
          'Store flat and away from direct sunlight to maintain shape and colour',
          'Rinse with clean water after use and dry fully',
          'Avoid scratches or friction that may damage the surface of the folders and flashcards'
        ],
        warnings: 'Educational and instructional resource intended for adult guided use. Not classified as a toy.'
      },
      swimmingToys: {
        title: 'Swimming Toys',
        description: 'PIXTOLEARN Swimming Toys are designed to make water play safe, fun, and educational. They help swimmers build confidence, coordination, and sensory awareness while promoting enjoyment through movement, colour, and texture.',
        suggestUseAndCare: [
          'Use toys as motivators during swimming sessions to encourage reaching, diving, and controlled movement in the water',
          'Combine play with learning activities to develop attention, strength, and confidence',
          'Rinse with clean water after each use',
          'Air dry in the shade and store away from direct sunlight'
        ],
        warnings: [
          'Use only under close adult supervision',
          'Suitable for children aged three years and above',
          'Not a lifesaving device',
          'Do not chew, bite, or wrap toys around the body',
          'Use only within the child\'s depth',
          'Shallow-water retrieval only; no head-first dives'
        ],
        compliance: 'Complies with:\nEN71 Part 1 Mechanical and Physical Properties\nEN71 Part 2 Flammability\nEN71 Part 3 Migration of Certain Elements\nUK Toys (Safety) Regulations 2011'
      },
      standsHolder: {
        title: 'Stands & Holder',
        description: 'Designed to support and display PixToLearn PVC flashcards during swimming sessions. Keeps visuals accessible and organised for instructors.',
        suggestUseAndCare: [
          'Place the stand on a dry, flat surface or pool edge',
          'Insert PVC flashcards upright for visual reference during activities',
          'Use holder to store unused cards safely between sessions'
        ],
        warnings: 'Educational and instructional resource intended for adult guided use. Not classified as a toy.'
      },
      towelMarker: {
        title: 'Towel & Marker',
        description: 'Support instruction and maintenance. The towel is for quick drying of hands, flashcards, or equipment; the marker allows customise white flashcards.',
        suggestUseAndCare: [
          'Use towel to wipe excess water or moisture from flashcards or stands',
          'Use marker for writing notes or instructions on blank PVC cards; erase with a dry cloth after use',
          'Wash towel in cold water, air dry only',
          'Keep marker capped when not in use',
          'Avoid applying marker on printed surfaces'
        ],
        warnings: 'Educational and instructional resource intended for adult guided use. Not classified as a toy.'
      }
    }
  },
  basicPack: {
    packType: 'basicPack',
    packName: 'Basic Pack',
    colorScheme: 'grey',
    overview: 'PIXTOLEARN Swimming resources are designed to help instructors, therapists, and families deliver structured, visual, and inclusive aquatic sessions.\n\nThe Basic Pack includes a folder with PVC flashcards, a waterproof marker, and a microfibre towel. It provides a simple yet effective visual toolkit for introducing structure and communication into swimming lessons.\n\nEach element supports clarity, confidence, and participation in a safe and inclusive environment.\n\nAll materials are intended for adult guided use and are not classified as toys.',
    whatIsIncluded: [
      'Yellow Expanding folder',
      '42 flashcards: Divided into three different categories, including indexes and instructions flashcards',
      'PIXTOLEARN Swimming Toys (yellow bag): 3 ducks, 2 sinkers, 1 water pistol, 1 pop tube, 1 water bucket, 1 ball',
      'Additional items:',
      '1 x blue session bag, 1 x Pixtolearn highlighter marker, 1 x blue spear bag, 1 x microfibre towel'
    ],
    sections: {
      foldersFlashcards: {
        title: 'Folder & Flashcards',
        description: 'Organise, plan, and deliver structured swimming sessions using visual supports.\n\nThe folder groups waterproof PVC flashcards by category, helping instructors build clear, step-by-step routines.',
        suggestUseAndCare: [
          'Choose the cards needed for each session to represent routines or skills',
          'Change or combine folders as swimmers progress',
          'Place them on the stands or by the pool for visual guidance',
          'Store flat and away from direct sunlight to maintain shape and colour',
          'Rinse with clean water after use and dry fully',
          'Avoid scratches or friction that may damage the surface of the folders and flashcards'
        ],
        warnings: 'Educational and instructional resource intended for adult guided use. Not classified as a toy.'
      },
      towel: {
        title: 'Towel',
        description: 'PIXTOLEARN Swimming Toys are designed to make water play safe, fun, and educational. They help swimmers build confidence, coordination, and sensory awareness while promoting enjoyment through movement, colour, and texture.',
        suggestUseAndCare: [
          'Use toys as motivators during swimming sessions to encourage reaching, diving, and controlled movement in the water',
          'Combine play with learning activities to develop attention, strength, and confidence',
          'Rinse with clean water after each use',
          'Air dry in the shade and store away from direct sunlight'
        ],
        warnings: 'Educational and instructional resource intended for adult guided use. Not classified as a toy.'
      }
    }
  },
  funPack: {
    packType: 'funPack',
    packName: 'Fun Pack',
    colorScheme: 'yellow',
    overview: 'PIXTOLEARN Swimming resources are created to help instructors, therapists, and families deliver structured, visual, and inclusive aquatic sessions.\n\nThe Basic Pack includes a folder with PVC flashcards, a waterproof marker, and a microfibre towel. It provides a simple yet effective visual toolkit for introducing structure and communication into swimming lessons.\n\nEach element supports clarity, confidence, and participation in a safe and inclusive environment.\n\nAll materials are intended for adult guided use and are not classified as toys.',
    whatIsIncluded: [
      'Yellow Expanding folder',
      '42 flashcards: Divided into three different categories, including indexes and instructions flashcards',
      'PIXTOLEARN Swimming Toys (yellow bag): 3 ducks, 2 sinkers, 1 water pistol, 1 pop tube, 1 water bucket, 1 ball',
      'Additional items:',
      '1 x blue session bag, 1 x Pixtolearn highlighter marker, 1 x blue spear bag, 1 x microfibre towel'
    ],
    sections: {
      foldersFlashcards: {
        title: 'Folder & Flashcards',
        description: 'Organise, plan, and deliver structured swimming sessions using visual supports.\n\nThe folder groups waterproof PVC flashcards by category, helping instructors build clear, step-by-step routines.',
        suggestUseAndCare: [
          'Choose the cards needed for each session to represent routines or skills',
          'Store flat and away from direct sunlight to maintain shape and colour',
          'Rinse with clean water after use and dry fully',
          'Avoid scratches or friction that may damage the surface of the folders and flashcards'
        ],
        warnings: 'Educational and instructional resource intended for adult guided use. Not classified as a toy.'
      },
      towelMarker: {
        title: 'Towel & Marker',
        description: 'Support instruction and maintenance. The towel is for quick drying of hands, flashcards, or equipment; the marker allows customise white flashcards.',
        suggestUseAndCare: [
          'Use towel to wipe excess water or moisture from flashcards or stands',
          'Use marker for writing notes or instructions on blank PVC cards; erase with a dry cloth after use',
          'Wash towel in cold water, air dry only',
          'Keep marker capped when not in use',
          'Avoid applying marker on printed surfaces'
        ],
        warnings: 'Educational and instructional resource intended for adult guided use. Not classified as a toy.'
      },
      swimmingToys: {
        title: 'Swimming Toys',
        description: 'PIXTOLEARN Swimming Toys are designed to make water play safe, fun, and educational. They help swimmers build confidence, coordination, and sensory awareness while promoting enjoyment through movement, colour, and texture.',
        suggestUseAndCare: [
          'Use toys as motivators during swimming sessions to encourage reaching, diving, and controlled movement in the water',
          'Combine play with learning activities to develop attention, strength, and confidence',
          'Rinse with clean water after each use',
          'Air dry in the shade and store away from direct sunlight'
        ],
        warnings: [
          'Use only under close adult supervision',
          'Suitable for children aged three years and above',
          'Not a lifesaving device',
          'Do not chew, bite, or wrap toys around the body',
          'Use only within the child\'s depth',
          'Shallow-water retrieval only; no head-first dives'
        ],
        compliance: 'Complies with:\nEN71 Part 1 Mechanical and Physical Properties\nEN71 Part 2 Flammability\nEN71 Part 3 Migration of Certain Elements\nUK Toys (Safety) Regulations 2011'
      }
    }
  },
  standsHolder: {
    packType: 'standsHolder',
    packName: 'Stands & Holder',
    colorScheme: 'beige',
    overview: 'PIXTOLEARN Swimming resources are created to help instructors, therapists, and families deliver structured, visual, and inclusive aquatic sessions.\n\nThe Stands & Holder Set allows users to display and organise PIXTOLEARN Swimming flashcards during lessons, keeping visuals clear, accessible, and consistent. It supports communication and structure in both professional and family learning settings.\n\nAll components are intended for adult guided use and are not classified as toys.',
    whatIsIncluded: [
      '3 x Stands: Labelled "first," "next," and "then."',
      '1 x Holder: For organising and storing flashcards',
      'Additional Flashcard: About the features of the product and some examples of how to use the stands'
    ],
    sections: {
      stands: {
        title: 'Stands',
        description: 'Designed to support and display PixToLearn PVC flashcards during swimming sessions.',
        suggestUseAndCare: [
          'Place the stand on a dry, flat surface or pool edge',
          'Insert PVC flashcards upright for visual reference during activities',
          'Use holder to store unused cards safely between sessions'
        ],
        warnings: 'Educational and instructional resource intended for adult guided use. Not classified as a toy.'
      },
      holder: {
        title: 'Holder',
        description: 'Keeps visuals accessible and organised for instructors.',
        suggestUseAndCare: [
          'Place the stand on a dry, flat surface or pool edge',
          'Insert PVC flashcards upright for visual reference during activities',
          'Use holder to store unused cards safely between sessions'
        ],
        warnings: 'Educational and instructional resource intended for adult guided use. Not classified as a toy.'
      }
    }
  }
};

const englishContent = {
  languageCode: 'EN',
  languageName: 'English',
  nativeName: 'English',
  isEUOfficial: true,
  content: {
    packs: packData,
    company: {
      name: 'PixToLearn Ltd',
      address: {
        street: '71–75 Shelton Street',
        city: 'Covent Garden, London',
        postcode: 'WC2H 9JQ',
        country: 'UK'
      },
      website: 'pixtolearn.com',
      email: 'hello@pixtolearn.com'
    }
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing translations
    await Translation.deleteMany({});
    console.log('Cleared existing translations');

    // Insert English content
    await Translation.create(englishContent);
    console.log('Created English translation');

    // Create entries for all other languages with proper translations
    const otherLanguages = languages.filter(lang => lang.code !== 'EN').map(lang => {
      let contentData;

      switch (lang.code) {
        case 'DE': contentData = germanContent; break;
        case 'ES': contentData = spanishContent; break;
        case 'FI': contentData = finnishContent; break;
        case 'FR': contentData = frenchContent; break;
        case 'IT': contentData = italianContent; break;
        case 'NL': contentData = dutchContent; break;
        case 'PL': contentData = polishContent; break;
        case 'PT': contentData = portugueseContent; break;
        case 'DA': contentData = danishContent; break;
        default: contentData = packData; // English fallback
      }

      return {
        languageCode: lang.code,
        languageName: lang.name,
        nativeName: lang.native,
        isEUOfficial: lang.isEU,
        content: {
          packs: contentData,
          company: englishContent.content.company
        }
      };
    });

    await Translation.insertMany(otherLanguages);
    console.log(`Created ${otherLanguages.length} placeholder translations`);

    console.log('Database seeded successfully!');
    console.log(`Total languages: ${languages.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
