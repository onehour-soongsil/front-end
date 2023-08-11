import Side from "@/app/components/goalDetailPage/Side";
import Main from "@/app/components/goalDetailPage/Main";

export default function GoalDetailPage(props: { params: { id: any } }) {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.params;
  console.log(props);
  return (
    <>
      <Main _id={id} />
      <Side />
    </>
  );
}
