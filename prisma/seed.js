import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function main() {
  // Seed Rarities
  const raritiesData = [
    { level: 'Common' },
    { level: 'Uncommon' },
    { level: 'Rare' },
    { level: 'Mythic Rare' },
  ];

  await db.rarity.createMany({
    data: raritiesData,
    skipDuplicates: true,
  });

  const rarities = await db.rarity.findMany();
  const rarityMap = Object.fromEntries(rarities.map((r) => [r.level, r.id]));

  // Seed Colors
  const colorsData = ['White', 'Blue', 'Black', 'Red', 'Green'];

  await db.color.createMany({
    data: colorsData.map((color) => ({ name: color })),
    skipDuplicates: true,
  });

  const colors = await db.color.findMany();
  const colorMap = Object.fromEntries(colors.map((c) => [c.name, c.id]));

  // Seed Types
  const typesData = ["Creature", "Instant"];

  await db.type.createMany({
    data: typesData.map((type) => ({ name: type })),
    skipDuplicates: true,
  });

  const types = await db.type.findMany();
  const typeMap = Object.fromEntries(types.map((t) => [t.name, t.id]));

  // Seed Supertypes
  const supertypesData = ["Legendary"];

  await db.supertype.createMany({
    data: supertypesData.map((supertype) => ({ name: supertype })),
    skipDuplicates: true,
  });

  const supertypes = await db.supertype.findMany();
  const supertypeMap = Object.fromEntries(supertypes.map((st) => [st.name, st.id]));

  // Seed Subtypes
  const subtypesData = ["Angel", "Goblin", "Scout"];

  await db.subtype.createMany({
    data: subtypesData.map((subtype) => ({ name: subtype })),
    skipDuplicates: true,
  });

  const subtypes = await db.subtype.findMany();
  const subtypeMap = Object.fromEntries(subtypes.map((st) => [st.name, st.id]));

  // Seed Card Sets
  const cardSetsData = [
    {
      name: "Core Set 2021",
      code: "M21",
      releaseDate: new Date("2020-07-03"),
    },
    {
      name: "Zendikar Rising",
      code: "ZNR",
      releaseDate: new Date("2020-09-25"),
    },
  ];

  await db.cardSet.createMany({
    data: cardSetsData,
    skipDuplicates: true,
  });

  const cardSets = await db.cardSet.findMany();
  const cardSetMap = Object.fromEntries(cardSets.map((cs) => [cs.code, cs.id]));

  // Seed Users
  const usersData = [
    {
      email: "augustwhite@spaceX.com",
      password: "tothemoon",
      username: "augustwhite",
      avatarUrl:
        "https://img.freepik.com/premium-vector/cartoon-illustration-astronaut_272293-4654.jpg",
    },
  ];

  await db.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  const users = await db.user.findMany();
  const userMap = Object.fromEntries(users.map((u) => [u.email, u.id]));

  // Seed Cards
  const cardsData = [
    {
      name: "Serra Angel",
      price: 2.5,
      cmc: 5,
      power: 4,
      toughness: 4,
      oracle_text: "Flying, vigilance",
      flavor_text: "Born with wings of light and a sword of faith.",
      rarityId: rarityMap["Uncommon"],
      cardSetId: cardSetMap["M21"],
    },
    {
      name: "Lightning Bolt",
      price: 1.0,
      cmc: 1,
      power: null,
      toughness: null,
      oracle_text: "Lightning Bolt deals 3 damage to any target.",
      flavor_text: "The spark mage shrieked, calling on the rage of the storm.",
      rarityId: rarityMap["Common"],
      cardSetId: cardSetMap["M21"],
    },
    {
      name: "Goblin Guide",
      price: 5.0,
      cmc: 1,
      power: 2,
      toughness: 2,
      oracle_text:
        "Haste\nWhenever Goblin Guide attacks, defending player reveals the top card of their library. If it's a land card, that player puts it into their hand.",
      flavor_text: `I've been all over this world. I even remember some of those places.`,
      rarityId: rarityMap["Rare"],
      cardSetId: cardSetMap["ZNR"],
    },
  ];

  const createdCards = [];
  for (const cardData of cardsData) {
    const card = await db.card.create({
      data: cardData,
    });
    createdCards.push(card);
  }

  // Seed CardColor using join table
  for (const card of createdCards) {
    const colorNames =
      {
        "Serra Angel": ["White"],
        "Lightning Bolt": ["Red"],
        "Goblin Guide": ["Red"],
      }[card.name] || [];

    for (const colorName of colorNames) {
      await db.cardColor.create({
        data: {
          cardId: card.id,
          colorId: colorMap[colorName],
        },
      });
    }
  }

  // Seed CardType using join table
  for (const card of createdCards) {
    const typeNames =
      {
        "Serra Angel": ["Creature"],
        "Lightning Bolt": ["Instant"],
        "Goblin Guide": ["Creature"],
      }[card.name] || [];

    for (const typeName of typeNames) {
      await db.cardType.create({
        data: {
          cardId: card.id,
          typeId: typeMap[typeName],
        },
      });
    }
  }

  // Seed CardSupertype using join table
  for (const card of createdCards) {
    const supertypeNames =
      {
        "Serra Angel": [],
        "Lightning Bolt": [],
        "Goblin Guide": [],
      }[card.name] || [];

    for (const supertypeName of supertypeNames) {
      await db.cardSupertype.create({
        data: {
          cardId: card.id,
          supertypeId: supertypeMap[supertypeName],
        },
      });
    }
  }

  // Seed CardSubtype using join table
  for (const card of createdCards) {
    const subtypeNames =
      {
        "Serra Angel": ["Angel"],
        "Lightning Bolt": [],
        "Goblin Guide": ["Goblin", "Scout"],
      }[card.name] || [];

    for (const subtypeName of subtypeNames) {
      await db.cardSubtype.create({
        data: {
          cardId: card.id,
          subtypeId: subtypeMap[subtypeName],
        },
      });
    }
  }

  // Seed PackTypes
  const packTypesData = [
    {
      name: "Booster Pack",
      numOfCards: 15,
      buyPrice: 3.99,
    },
    {
      name: "Draft Pack",
      numOfCards: 24,
      buyPrice: 9.99,
    },
  ];

  await db.packType.createMany({
    data: packTypesData,
    skipDuplicates: true,
  });

  const packTypes = await db.packType.findMany();
  const packTypeMap = Object.fromEntries(packTypes.map((pt) => [pt.name, pt.id]));

  // Seed Packs
  const packsData = [
    {
      setId: cardSetMap["M21"],
      userId: userMap["augustwhite@spaceX.com"],
      sellPrice: 3.0,
      packTypeId: packTypeMap["Booster Pack"], // Link to PackType
    },
    {
      setId: cardSetMap["ZNR"],
      userId: userMap["augustwhite@spaceX.com"],
      sellPrice: 4.0,
      packTypeId: packTypeMap["Draft Pack"], // Link to PackType
    },
  ];

  await db.pack.createMany({
    data: packsData,
    skipDuplicates: true,
  });

  // Final message indicating success
  console.log("Seed data has been inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
