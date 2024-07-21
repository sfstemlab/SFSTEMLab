import { NextRequest, NextResponse } from 'next/server';

const badSetTypes = [
  'commander', 'promo', 'token', 'memorabilia', 'alchemy', 'masterpiece',
  'minigame', 'funny', 'box', 'arsenal', 'duel_deck', 'spellbook',
  'planechase', 'from_the_vault', 'archenemy', 'starter', 'premium_deck'
];

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const res = await fetch('https://api.scryfall.com/sets');
    if (!res.ok) {
      throw new Error('Response failed');
    }
    const data = await res.json();
    const date = new Date();
    const filteredSets = data.data.filter((set: any) =>
      !badSetTypes.includes(set.set_type) &&
      !set.digital &&
      new Date(set.released_at) <= date
    ).map((set: any) => ({
      name: set.name,
      abbreviation: set.code.toUpperCase(),
      description: set.description,
      icon: set.icon_svg_uri,
      tags: [set.set_type.replaceAll('_', ' ')],
      releaseDate: set.released_at,
      type: set.set_type
    }));

    return NextResponse.json(filteredSets);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
