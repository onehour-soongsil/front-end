import { getServerSession } from "next-auth";
import GoalList from "../components/goal/GoalList";
import GoalListProvider from "../components/GoalListProvider";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

async function getAllGoalList() {
  const res = await fetch(`http://localhost:3000/api/goal/show-goalList`, {
    next: { revalidate: 15 },
  });
  const data = await res.json();
  return data;
}

export default async function GoalListPage() {
  const data = await getAllGoalList();
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <>
        <GoalListProvider allGoalList={data}>
          <GoalList />
        </GoalListProvider>
      </>
    );
  }
  return (
    <>
      <h1>로그인 없이 접근할 생각하지도 마라</h1>
    </>
  );
}
