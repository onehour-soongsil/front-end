"use client";

import styled from "styled-components";
import { Link } from "react-scroll";
import { useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";

const SideDiv = styled.div`
  width: 10%;
  position: fixed;
  right: 3rem;
  margin-top: 200px;
  div {
    display: flex;
    flex-direction: column;
  }
`;

const LinkDiv = styled.div`
  margin: 10px 0px;
  cursor: pointer;
  font-size: 25px;
`;

const GreyCircle = styled(BsFillCircleFill)`
  background-color: grey;
`;
export default function Side() {
  const [currentPage, setCurrentPage] = useState("1");
  return (
    <SideDiv>
      <div>
        <LinkDiv active={currentPage === "1"}>
          <Link to="1" spy={true} smooth={true} onClick={() => setCurrentPage("1")}>
            {currentPage === "1" ? (
              <BsFillCircleFill className="text-transparent bg-main-color rounded-full" />
            ) : (
              <GreyCircle className="text-transparent bg-main-color rounded-full" />
            )}
          </Link>
        </LinkDiv>
        <LinkDiv active={currentPage === "2"}>
          <Link to="2" spy={true} smooth={true} onClick={() => setCurrentPage("2")}>
            {currentPage === "2" ? (
              <BsFillCircleFill className="text-transparent bg-main-color rounded-full" />
            ) : (
              <GreyCircle className="text-transparent bg-main-color rounded-full" />
            )}
          </Link>
        </LinkDiv>
        <LinkDiv active={currentPage === "3"}>
          <Link to="3" spy={true} smooth={true} onClick={() => setCurrentPage("3")}>
            {currentPage === "3" ? (
              <BsFillCircleFill className="text-transparent bg-main-color rounded-full" />
            ) : (
              <GreyCircle className="text-transparent bg-main-color rounded-full" />
            )}
          </Link>
        </LinkDiv>
      </div>
    </SideDiv>
  );
}
