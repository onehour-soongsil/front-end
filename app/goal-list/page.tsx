import GoalList from "../components/goal/GoalList";
import GoalListProvider from "../components/GoalListProvider";

export const dynamic = "force-dynamic";

async function getAllGoalList() {
  const res = await fetch(`http://localhost:3000/api/goal/show-goalList`, {
    next: { revalidate: 15 },
  });
  const data = res.json();
  return data;
}

export default async function GoalListPage() {
  const data = await getAllGoalList();

  return (
    <>
      <GoalListProvider allGoalList={data}>
        <GoalList />
      </GoalListProvider>
    </>
  );
}
