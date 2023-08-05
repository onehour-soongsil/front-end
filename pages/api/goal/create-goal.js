export default function handler(요청, 응답) {
  if (요청.method === "POST") {
    return 응답.status(200).json("처리완료");
  }
  // POST 요청이 아닌 경우에 대한 반환 값을 추가합니다.
  return 응답.status(405).json({ error: "허용되지 않는 메소드입니다." });
}
