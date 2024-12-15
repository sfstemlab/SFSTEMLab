
/**
 * 1 time seed script
 * fetches all cards from scryfall 
 * cleans/processes the data
 * inserts the data in the DB
 */

//-----NEW CODE -----------
// src/utils/api.ts

import { CardData, Set, Stats } from "@/types/types";

interface Card {
  set: string;
  name: string;
  card_faces?: { image_uris: { normal: string } }[];
  image_uris: { normal: string };
  rarity: string;
  colors: string[];
  type_line: string;
  related_uris: {
    edhrec: string;
  };
}


/**
 * Delays execution for a specified number of milliseconds.
 * @param ms - Milliseconds to delay.
 * @returns A promise that resolves after the delay.
 */
function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches all card data by handling pagination.
 * All logic is contained within the try and while blocks.
 * @param set - The set abbreviation.
 * @param name - (Optional) The card name.
 * @param rarity - (Optional) The card rarity.
 * @returns A promise that resolves to an array of CardData or null if an error occurs.
 */
export const fetchCardData = async (set?: string, name?: string, rarity?: string): Promise<CardData[] | null> => {
  // Construct the initial query URL
  let link = 'https://api.scryfall.com/cards/search?q=';
  if (set) {
    link += `s:${encodeURIComponent(set)}`;
  }
  if (name) {
    link += `&!${encodeURIComponent(name)}`;
  }
  if (rarity) {
    link += `&r:${encodeURIComponent(rarity)}`;
  }

  try {
    let has_more = true;
    let allCards: CardData[] = [];

    // Loop to handle pagination
    while (has_more && link) {
        const res = await fetch(link);
        if (!res.ok) {
            throw new Error("Response failed with status " + res.status);
        }

        const data: any = await res.json();
        has_more = data.has_more || false;
        //   console.log(`Has more pages: ${has_more}`);

        const cards = data.data;

        // Update the link to the next page if available
        if (data.next_page) {
            link = data.next_page;
        } else {
            link = '';
        }
        // Process each card after waiting for the delay between requests
        const cardsWithImages: CardData[] = [];
        for (const card of cards) {
            let cardImage: string | null = "https://placehold.co/600x400";
    
            if (card.name && card.set) {
                let formattedName = card.name.replace(/ /g, "-");
            if (formattedName.includes("/")) {
                formattedName = formattedName.split("/")[0];
            }
            const imageLink = `https://api.scryfall.com/cards/search?q=!${encodeURIComponent(formattedName)}&unique=prints`;
    
            try {
                const imgRes = await fetch(imageLink);
                if (!imgRes.ok) {
                    throw new Error("Image fetch failed with status " + imgRes.status);
                }
                const imgData: any = await imgRes.json();
                const correctCard = imgData.data.find((c: Card) => c.set === card.set);
                if (correctCard) {
                    if (correctCard.card_faces && correctCard.card_faces.length > 1) {
                        cardImage = correctCard.card_faces[0].image_uris.normal;
                    } else {
                        cardImage = correctCard.image_uris.normal;
                    }
                }
            } catch (error) {
                console.error(`Error fetching image for ${card.name} from set ${card.set}:`, error);
            }
        }
        // Determine the card type
        let type = "";
        if (card.type_line) {
            const typeLineParts = card.type_line.split(" ");
            if (
                typeLineParts[0] === "Legendary" ||
                typeLineParts[0] === "Basic" ||
                typeLineParts[0] === "Snow"
            ) {
                type = `${typeLineParts[0]} ${typeLineParts[1]}`;
            } else {
                type = typeLineParts[0];
            }
        }

        cardsWithImages.push({
            name: card.name,
            prices: card.prices,
            set: card.set,
            related_uris: {
                edhrec: card.related_uris.edhrec
            },
            rarity: card.rarity,
            colors: card.colors,
            type: type,
            cardImage,
        });
        
        await delay(100)
        
        };

      // Accumulate the processed cards
      console.log(`Fetched ${cardsWithImages.length} cards, Total accumulated: ${allCards.length}`);
      allCards = [...allCards, ...cardsWithImages];
      console.log(allCards)
    }

    return allCards;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchSets = async () => {
    const res = await fetch("/api/fetchSets");
    if (!res.ok) {
    throw new Error("Response failed with status " + res.status);
    }
    const data = await res.json();
    const badSetTypes = [
    "commander",
    "promo",
    "token",
    "memorabilia",
    "alchemy",
    "masterpiece",
    "minigame",
    "funny",
    "box",
    "arsenal",
    "duel_deck",
    "spellbook",
    "planechase",
    "from_the_vault",
    "archenemy",
    "starter",
    "premium_deck",
    "vanguard",
    ];
    const date = new Date();
    const mappedSets = data
    .map((set: Set) => ({
        name: set.name,
        abbreviation: set.abbreviation,
        icon: set.icon,
        releaseDate: set.releaseDate,
        type: set.tags[0],
    }))
    .filter(
        (set: {
        type: string;
        digital?: boolean;
        releaseDate: string;
        }) =>
        !badSetTypes.includes(set.type) &&
        !set.digital &&
        new Date(set.releaseDate) <= date
    );

    return mappedSets
  };