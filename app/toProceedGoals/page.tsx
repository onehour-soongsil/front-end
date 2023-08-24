import { headers } from "next/headers";
import GoalList from "../components/goal/GoalList";

export const dynamic = "force-dynamic";

async function getStartingGoalList() {
  const res = await fetch(`http://localhost:3000/api/goal/toProceed-goalList`, {
    method: "GET",
    headers: headers(),
    next: { revalidate: 15 },
  });
  const data = await res.json();
  return data;
}

export default async function GoalListPage() {
  const data = await getStartingGoalList();

  return <GoalList data={data} type="toProceed" />;
}
