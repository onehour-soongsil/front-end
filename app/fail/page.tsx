import { headers } from "next/headers";
import GoalList from "../components/goal/GoalList";

export const dynamic = "force-dynamic";

async function getFailGoalList() {
  const res = await fetch(`http://localhost:3000/api/goal/fail-goalList`, {
    method: "GET",
    headers: headers(),
    next: { revalidate: 15 },
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getFailGoalList();

  return <GoalList data={data} type="fail" />;
}
