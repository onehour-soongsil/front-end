"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import styles from "./page.module.css";
import ModalComponent from "../components/ui/modal/Modal";
import InputModal from "../components/ui/modal/InputModal";

export default function MyPage() {
  const session = useSession();

  const [openModal, setOpenModal] = useState("");
  const [deleteComplete, setDeleteComplete] = useState("");

  const handleOpenModal = str => setOpenModal(str);
  const handleCancel = () => setOpenModal("");

  const handleDeleteUser = () => {
    axios
      .delete(`/api/goal/delete/deleteUser`)
      .then(() => {
        setDeleteComplete("회원정보가 삭제되었습니다.");
      })
      .catch(err => handleOpenModal(err.response.data));
  };

  const handleLogOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <ModalComponent
        title="회원삭제완료"
        open={deleteComplete}
        onOk={handleLogOut}
        onCancel={handleLogOut}
      />
      <ModalComponent
        title="주의"
        open={openModal}
        onOk={handleDeleteUser}
        onCancel={handleCancel}
      />
      <InputModal title="알림" open={openModal} onCancel={handleCancel} />
      <div className={styles.container}>
        <div className={styles.userProfile}>
          <div className={styles.userImageContainer}>
            <img src={session && session.data?.user?.image} alt="" />
            <button type="button" className={styles.uploadBtn}>
              이미지 업로드
            </button>
            <button type="button" className={styles.deleteBtn}>
              이미지 제거
            </button>
          </div>
          <div className={styles.userProfileDesc}>
            <h1>{session && session.data?.user.nickname}님의 마이페이지 입니다</h1>
            <p>당신의 목표를 응원합니다</p>
          </div>
        </div>
        <ul className={styles.userInfo}>
          <li>
            <div className={styles.userInfoTitle}>
              <h1>이메일 주소</h1>
              <p>{session && session.data?.user?.email}</p>
            </div>
            <p className={styles.userInfoDesc}>회원 인증에 사용되는 이메일 주소입니다.</p>
          </li>
          <li>
            <div className={styles.userInfoTitle}>
              <h1>비밀번호 변경</h1>
              <button
                onClick={() => {
                  handleOpenModal("기존 비밀번호를 입력하세요.");
                }}
                type="button"
                className={styles.passwordChangeBtn}
              >
                변경하기
              </button>
            </div>
          </li>
          <li>
            <div className={styles.userInfoTitle}>
              <h1>진행 예정 목표</h1>
              <Link href="/toProceedGoals" type="button" className={styles.passwordChangeBtn}>
                확인하기
              </Link>
            </div>
            <p className={styles.userInfoDesc}>앞으로 진행예정인 목표를 확인할 수 있습니다.</p>
          </li>
          <li>
            <div className={styles.userInfoTitle}>
              <h1>성공한 목표</h1>
              <Link href="/success" type="button" className={styles.passwordChangeBtn}>
                확인하기
              </Link>
            </div>
            <p className={styles.userInfoDesc}>성공한 목표들을 확인할 수 있습니다.</p>
          </li>
          <li>
            <div className={styles.userInfoTitle}>
              <h1>실패한 목표</h1>
              <Link href="/fail" type="button" className={styles.passwordChangeBtn}>
                확인하기
              </Link>
            </div>
            <p className={styles.userInfoDesc}>실패한 목표들을 확인할 수 있습니다.</p>
          </li>
          <li>
            <div className={styles.userInfoTitle}>
              <h1>회원 탈퇴하기</h1>
              <button
                onClick={() => {
                  handleOpenModal("한번 삭제하면 복구할 수 없습니다.");
                }}
                type="button"
                className={styles.withdrawBtn}
              >
                탈퇴하기
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
