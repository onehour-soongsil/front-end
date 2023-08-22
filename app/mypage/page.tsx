// "use client";

// import { useSession } from "next-auth/react";
// import styles from "./page.module.css";

// export default function MyPage() {
//   const session = useSession();
//   console.log(session);

//   return (
//     <div className={styles.container}>
//       <div className={styles.userProfile}>
//         <div className={styles.userImageContainer}>
//           <img src="/images/basic-avatar.png" alt="" />
//           <button>이미지 업로드</button>
//           <button>이미지 제거</button>
//         </div>
//         <div>
//           <h1>{session && session.data?.user.nickname}님의 마이페이지 입니다</h1>
//           <p>당신의 목표를 응원합니다</p>
//         </div>
//       </div>
//       <ul>
//         <li></li>
//         <li></li>
//       </ul>
//     </div>
//   );
// }
