import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

import { cookies } from 'next/headers';
export default async function Dashboard() {
  const go = async () => {
    'use server';
    const cookieStore = cookies();
    const client = createClient(cookieStore);
    client.auth.signOut();
    return redirect('/');
  };
  return (
    <form action={go}>
      <button>Sign out</button>
    </form>
  );
}
