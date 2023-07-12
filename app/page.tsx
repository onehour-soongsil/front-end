"use client";

import { Layout, Carousel } from "antd";

const { Content } = Layout;

const carouselStyle = {
  height: "100vh",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
};

export default function Home() {
  return (
    <Content>
      <Carousel autoplay style={carouselStyle}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </Content>
  );
}
