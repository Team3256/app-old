// Return all the events for a given year, via TBA

import { NextResponse, NextRequest } from 'next/server';
import { getTeamEvents } from '@acme/tba/team';

export async function GET(req: NextRequest, { params }: { params: { team: string } }) {
  if (params.team === '@me') {
    const { number, year } = { number: 3256, year: 2024 };
    const events = await getTeamEvents(number, year as number);
    return NextResponse.json({
      events: events,
      year: 2024,
      team: 3256,
    });
  }
  const { number, year } = { number: parseInt(params.team), year: 2024 };
  const events = await getTeamEvents(number, year as number);
  return NextResponse.json({ events: events, year: 2024, team: parseInt(params.team) });
}
