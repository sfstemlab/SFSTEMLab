import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
    // Seed Rarities
    const raritiesData = [
        { level: "Common" },
        { level: "Uncommon" },
        { level: "Rare" },
        { level: "Mythic Rare" },
    ];

    await db.rarity.createMany({
        data: raritiesData,
        skipDuplicates: true,
    });

    const rarities = await db.rarity.findMany();
    const rarityMap = Object.fromEntries(rarities.map((r) => [r.level, r.id]));

    // Seed Colors
    const colorsData = ["White", "Blue", "Black", "Red", "Green"];

    await db.color.createMany({
        data: colorsData.map((color) => ({ name: color })),
        skipDuplicates: true,
    });

    const colors = await db.color.findMany();
    const colorMap = Object.fromEntries(colors.map((c) => [c.name, c.id]));

    // Seed Types
    const typesData = [
        "Artifact",
        "Battle",
        "Creature",
        "Enchantment",
        "Instant",
        "Kindred",
        "Land",
        "Planeswalker",
        "Sorcery",
    ];

    await db.type.createMany({
        data: typesData.map((type) => ({ name: type })),
        skipDuplicates: true,
    });

    const types = await db.type.findMany();
    const typeMap = Object.fromEntries(types.map((t) => [t.name, t.id]));

    // Seed Supertypes
    const supertypesData = ["Legendary", "Snow", "World"];

    await db.supertype.createMany({
        data: supertypesData.map((supertype) => ({ name: supertype })),
        skipDuplicates: true,
    });

    const supertypes = await db.supertype.findMany();
    const supertypeMap = Object.fromEntries(
        supertypes.map((st) => [st.name, st.id])
    );

    // Seed Subtypes
    const artifactSubtypesData = [
        "Attraction",
        "Blood",
        "Bobblehead",
        "Clue",
        "Contraption",
        "Equipment",
        "Food",
        "Fortification",
        "Gold",
        "Incubator",
        "Junk",
        "Map",
        "Powerstone",
        "Treasure",
        "Vehicle",
    ];
    const creatureSubtypesData = [
        "Aarakocra",
        "Ape",
        "Aristocrat",
        "Assassin",
        "Atog",
        "Avatar",
        "Basilisk",
        "Bat",
        "Bear",
        "Beast",
        "Beetle",
        "Bird",
        "Bison",
        "Boar",
        "Bringer",
        "Camel",
        "Cat",
        "Centaur",
        "Cephalid",
        "Chimera",
        "Cleric",
        "Construct",
        "Crocodile",
        "Demon",
        "Djinn",
        "Dog",
        "Dragon",
        "Drake",
        "Druid",
        "Dryad",
        "Dwarf",
        "Elemental",
        "Elf",
        "Elk",
        "Frog",
        "Giant",
        "Golem",
        "Gorgon",
        "Goblin",
        "Griffin",
        "Hag",
        "Halfling",
        "Hamster",
        "Horror",
        "Horse",
        "Human",
        "Hydra",
        "Insect",
        "Jellyfish",
        "Kavu",
        "Kirin",
        "Knight",
        "Kobold",
        "Kraken",
        "Lizard",
        "Manticore",
        "Merfolk",
        "Minotaur",
        "Monk",
        "Naga",
        "Nightmare",
        "Octopus",
        "Ooze",
        "Orc",
        "Owl",
        "Plant",
        "Prism",
        "Salamander",
        "Shaman",
        "Sheep",
        "Shapeshifter",
        "Snake",
        "Troll",
        "Unicorn",
        "Vampire",
        "Warrior",
        "Wraith",
        "Yeti",
        "Zombie",
    ];
    const enchantmentSubtypesData = [
        "Aura",
        "Background",
        "Cartouche",
        "Case",
        "Class",
        "Curse",
        "Role",
        "Room",
        "Rune",
        "Saga",
        "Shard",
        "Shrine",
    ];
    const spellSubtypesData = ["Adventure", "Arcane", "Chorus", "Lesson", "Trap"];
    const landSubtypesData = [
        "Cave",
        "Cloud",
        "Desert",
        "Forest",
        "Gate",
        "Island",
        "Lair",
        "Locus",
        "Mine",
        "Mountain",
        "Sphere",
        "Plains",
        "Power-Plant",
        "Swamp",
        "Tower",
        "Urza's",
    ];
    const planeswalkerSubtypesData = [
        "Ajani",
        "Chandra",
        "Dack",
        "Daretti",
        "Domri",
        "Garruk",
        "Gideon",
        "Jace",
        "Karn",
        "Kaya",
        "Liliana",
        "Nicol Bolas",
        "Nissa",
        "Ral",
        "Sorin",
        "Teferi",
        "Teyo",
        "Tamiyo",
        "Vraska",
    ];

    await db.artifactType.createMany({
        data: artifactSubtypesData.map((subtype) => ({ name: subtype })),
        skipDuplicates: true,
    });

    await db.creatureType.createMany({
        data: creatureSubtypesData.map((subtype) => ({ name: subtype })),
        skipDuplicates: true,
    });

    await db.enchantmentType.createMany({
        data: enchantmentSubtypesData.map((subtype) => ({ name: subtype })),
        skipDuplicates: true,
    });

    await db.spellType.createMany({
        data: spellSubtypesData.map((subtype) => ({ name: subtype })),
        skipDuplicates: true,
    });

    await db.landType.createMany({
        data: landSubtypesData.map((subtype) => ({ name: subtype })),
        skipDuplicates: true,
    });

    await db.planeswalkerType.createMany({
        data: planeswalkerSubtypesData.map((subtype) => ({ name: subtype })),
        skipDuplicates: true,
    });

    const artifactSubtypes = await db.artifactType.findMany();
    const artifactSubtypeMap = Object.fromEntries(
        artifactSubtypes.map((st) => [st.name, st.id])
    );
    const creatureSubtypes = await db.creatureType.findMany();
    const creatureSubtypeMap = Object.fromEntries(
        creatureSubtypes.map((st) => [st.name, st.id])
    );
    const enchantmentSubtypes = await db.enchantmentType.findMany();
    const enchantmentSubtypeMap = Object.fromEntries(
        enchantmentSubtypes.map((st) => [st.name, st.id])
    );
    const spellSubtypes = await db.spellType.findMany();
    const spellSubtypeMap = Object.fromEntries(
        spellSubtypes.map((st) => [st.name, st.id])
    );
    const landSubtypes = await db.landType.findMany();
    const landSubtypeMap = Object.fromEntries(
        landSubtypes.map((st) => [st.name, st.id])
    );
    const planeswalkerSubtypes = await db.planeswalkerType.findMany();
    const planeswalkerSubtypeMap = Object.fromEntries(
        planeswalkerSubtypes.map((st) => [st.name, st.id])
    );

    // Seed Card Sets
    const sets = fetchSets();
    const cardSetsData = sets.map((set) => ({
        name: set.name,
        code: set.code,
        releaseDate: set.releaseDate,
    }));

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
    const packTypeMap = Object.fromEntries(
        packTypes.map((pt) => [pt.name, pt.id])
    );

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
