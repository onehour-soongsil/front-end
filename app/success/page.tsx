import { headers } from "next/headers";
import GoalList from "../components/goal/GoalList";

export const dynamic = "force-dynamic";

async function getSuccessGoalList() {
  const res = await fetch(`http://localhost:3000/api/goal/success-goalList`, {
    method: "GET",
    headers: headers(),
    next: { revalidate: 15 },
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getSuccessGoalList();

  return <GoalList data={data} type="success" />;
}
