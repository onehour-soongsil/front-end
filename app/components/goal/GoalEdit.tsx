import React, { useState, useEffect } from "react";

export default function GoalEditForm() {
  const [tite, setTite] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>("");
  const [endDate, setEndDate] = useState<Date | undefined>("");
  const [goal, setGoal] = useState<string>("");
}
