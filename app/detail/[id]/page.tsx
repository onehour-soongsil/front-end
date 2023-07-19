import Side from "@/app/components/goalDetailPage/Side";
import Main from "@/app/components/goalDetailPage/Main";

export default function GoalDetailPage(props) {
  console.log(props);
  return (
    <>
      <Main goalId={props.params.id} />
      <Side />
    </>
  );
}
