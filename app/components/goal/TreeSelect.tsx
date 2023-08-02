import { TreeSelect } from "antd";
import React, { useState } from "react";

export default function MyTreeSelect() {
  const [value, setValue] = useState<string>();
  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  const treeData = [
    {
      title: "5",
      value: "1",
    },
    {
      title: "10",
      value: "2",
    },
    {
      title: "15",
      value: "2",
    },
    {
      title: "20",
      value: "2",
    },
    {
      title: "25",
      value: "2",
    },
    {
      title: "30",
      value: "2",
    },
  ];
  return (
    <TreeSelect
      style={{ width: "100%" }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      treeData={treeData}
      placeholder="Please select"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
}
