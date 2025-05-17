import { currentUser } from "@/lib/current-user";

export default async function Home() {
  const user = await currentUser();

  return <div>{JSON.stringify(user)}</div>;
}
