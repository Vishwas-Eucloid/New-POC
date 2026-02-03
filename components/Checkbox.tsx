// *********************
// Role of the component: Checkbox input component
// Name of the component: Checkbox.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (PostHog tracking added, uncontrolled preserved)
// *********************

"use client";

import React from "react";
import posthog from "posthog-js";

const Checkbox = ({
  text,
  stateValue,
  setStateValue,
}: {
  text: string;
  stateValue: any;
  setStateValue: any;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    // 1️⃣ Keep existing behavior (uncontrolled)
    setStateValue(checked);

    // 2️⃣ Analytics only
    posthog.capture("filter_checkbox_toggled", {
      label: text,
      checked,
      component: "Checkbox",
    });
  };

  return (
    <div className="form-control">
      <label className="cursor-pointer flex items-center">
        <input
          type="checkbox"
          defaultChecked
          onChange={handleChange}
          className="checkbox checkbox-warning"
        />
        <span className="label-text text-lg ml-2">{text}</span>
      </label>
    </div>
  );
};

export default Checkbox;
