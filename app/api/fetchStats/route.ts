import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const setAbbr = searchParams.get('setAbbr');
  const rarity = searchParams.get('rarity');

  if (!setAbbr || !rarity) {
    return NextResponse.json({ message: 'Missing query parameters' }, { status: 400 });
  }

  const link = `https://api.scryfall.com/cards/search?q=s:${setAbbr}+r:${rarity}`;

  try {
    const res = await fetch(link);
    if (!res.ok) {
      throw new Error('Response failed');
    }
    const data = await res.json();
    return NextResponse.json({ total_cards: data.total_cards });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
