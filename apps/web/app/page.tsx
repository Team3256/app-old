import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Index() {
  const cookieStore = cookies();
  const client = createClient(cookieStore);
  if ((await client.auth.getUser()).data.user == null) {
    return (
      <>
        <h1>Scouting app</h1>
        <Link href="/login">Login</Link>
      </>
    );
  }
  return redirect('/dashboard');
}
