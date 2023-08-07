import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

export default function SetDate() {
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 31;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 31;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <RangePicker
      className="w-full placeholder-red-500"
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={val => {
        setDates(val);
      }}
      onChange={val => {
        const now = dayjs(); // 현재시간
        console.log("현재", now);
        console.log("종료시간", val[1]);
        console.log("시작-현재", val[0]?.diff(now, "days"));
        console.log("종료-시작", val[1]?.diff(val[0], "days"));
        console.log("종료-현재", val[1]?.diff(now, "days"));

        setValue(val);
      }}
      onOpenChange={onOpenChange}
      changeOnBlur
    />
  );
}
