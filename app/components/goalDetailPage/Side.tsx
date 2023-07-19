"use client";

import styled from "styled-components";
import { Link } from "react-scroll";

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

export default function Side() {
  return (
    <SideDiv>
      <div>
        <LinkDiv>
          <Link to="1" spy={true} smooth={true}>
            <span>1</span>
          </Link>
        </LinkDiv>
        <LinkDiv>
          <Link to="2" spy={true} smooth={true}>
            <span>2</span>
          </Link>
        </LinkDiv>
        <LinkDiv>
          <Link to="3" spy={true} smooth={true}>
            <span>3</span>
          </Link>
        </LinkDiv>
      </div>
    </SideDiv>
  );
}
