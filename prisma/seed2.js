import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
    const cardData = {
        released_at: new Date("2022-02-18"),
        image_uris: {
          small: "https://cards.scryfall.io/small/front/4/5/45e1ff1e-916b-4455-84cb-4125a79d76de.jpg?1656615700",
          normal: "https://cards.scryfall.io/normal/front/4/5/45e1ff1e-916b-4455-84cb-4125a79d76de.jpg?1656615700",
          large: "https://cards.scryfall.io/large/front/4/5/45e1ff1e-916b-4455-84cb-4125a79d76de.jpg?1656615700",
          png: "https://cards.scryfall.io/png/front/4/5/45e1ff1e-916b-4455-84cb-4125a79d76de.png?1656615700",
          art_crop: "https://cards.scryfall.io/art_crop/front/4/5/45e1ff1e-916b-4455-84cb-4125a79d76de.jpg?1656615700",
          border_crop: "https://cards.scryfall.io/border_crop/front/4/5/45e1ff1e-916b-4455-84cb-4125a79d76de.jpg?1656615700"
        },
        mana_cost: "{3}{B}",
        cmc: 4,
        type_line: "Legendary Enchantment Creature — Shrine",
        oracale_text: "Deathtouch\nAt the beginning of your end step, you may pay {1}. When you do, destroy target creature with toughness X or less, where X is the number of Shrines you control.",
        power: 2,
        toughness: 2,
        colors: ["B"],
        color_identity: ["B"],
        booster: true,
        legalities: {
          standard: "not_legal",
          future: "not_legal",
          historic: "legal",
          timeless: "legal",
          gladiator: "legal",
          pioneer: "legal",
          explorer: "legal",
          modern: "legal",
          legacy: "legal",
          pauper: "not_legal",
          vintage: "legal",
          penny: "legal",
          commander: "legal",
          oathbreaker: "legal",
          standardbrawl: "not_legal",
          brawl: "legal",
          alchemy: "not_legal",
          paupercommander: "not_legal",
          duel: "legal",
          oldschool: "not_legal",
          premodern: "not_legal",
          predh: "not_legal"
        },
        games: ["paper", "mtgo", "arena"],
        finishes: ["nonfoil", "foil"],
        reprint: false,
        set: "neo",
        set_name: "Kamigawa: Neon Dynasty",
        set_type: "expansion",
        set_uri: "https://api.scryfall.com/sets/59a2059f-5482-433f-8761-eb2e17859b71",
        rulings_uri: "https://api.scryfall.com/cards/45e1ff1e-916b-4455-84cb-4125a79d76de/rulings",
        digital: false,
        rarity: "uncommon",
        layout: "normal",
        edhrec_rank: 4780,
        prices: {
          usd: "0.13",
          usd_foil: "0.26",
          usd_etched: null,
          eur: "0.12",
          eur_foil: "0.34",
          tix: "0.03"
        },
        related_uris: {
          gatherer: "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=548395&printed=false",
          tcgplayer_infinite_articles: "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DGo-Shintai%2Bof%2BHidden%2BCruelty",
          tcgplayer_infinite_decks: "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DGo-Shintai%2Bof%2BHidden%2BCruelty",
          edhrec: "https://edhrec.com/route/?cc=Go-Shintai+of+Hidden+Cruelty"
        },
        purchase_uris: {
          tcgplayer: "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F262609%3Fpage%3D1",
          cardmarket: "https://www.cardmarket.com/en/Magic/Products/Singles/Kamigawa-Neon-Dynasty/Go-Shintai-of-Hidden-Cruelty?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          cardhoarder: "https://www.cardhoarder.com/cards/97114?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      };
    
      await db.card.create({
        data: cardData,
      });
    
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