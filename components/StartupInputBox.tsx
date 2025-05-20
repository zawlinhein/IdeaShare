import React from "react";
import { Input } from "./ui/input";

type StartupInputBoxProps = {
  error: string;
  id: string;
  name: string;
  placeholder: string;
};

const StartupInputBox = ({
  error,
  id,
  name,
  placeholder,
}: StartupInputBoxProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="startup-form_label">
        {id}
      </label>
      {id !== "description" && id !== "pitch" ? (
        <Input
          id={id}
          name={name}
          className="startup-form_input"
          required
          placeholder={placeholder}
        />
      ) : (
        <textarea
          id={id}
          name={name}
          className="startup-form_textarea"
          required
          placeholder={placeholder}
        />
      )}
      {error && <p className="startup-form_error">{error}</p>}
    </div>
  );
};

export default StartupInputBox;
