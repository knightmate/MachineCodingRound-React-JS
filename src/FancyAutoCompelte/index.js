import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./index.css";
const listOfUPI = [
  "rbl",
  "paytm",
  "okicici",
  "sbi",
  "aubank",
  "yesbank",
  "hdfcbank",
  "alibank",
  "upi",
  "okaxis",
  "unionbank",
  "bankofmaharashtra",
  "indusbank"
];

const FacnyAutoComplete = function (props) {
  const [inputVal, setInputVal] = useState("");
  const [suggestList, setsuggestList] = useState([]);

  //hint will be empty string in first render
  const [hint, setHint] = useState("");

  const onType = (event) => {
    console.log("onChagne", event);
    const value = event.target.value;
    setInputVal(value);
    if (!value.includes("@")) return;

    const [userName, bankUPI] = value.split("@");
    console.log("userName", userName);
    console.log("bankUPI", bankUPI);
    let filteredUPI;
    //bankUpi is defined , means "@" entered
    if (bankUPI || bankUPI === "") {
      const pattern = new RegExp(bankUPI);
      filteredUPI = listOfUPI.filter((upi) => {
        if (!bankUPI) return upi;
        return pattern.test(upi);
      });

      console.log("filteredUPI", filteredUPI);
      //set the hint
      const hint = filteredUPI[0].slice(bankUPI.length);
      console.log("value", hint);
      setsuggestList(filteredUPI);
      setHint(value + hint);
    }
  };

  return (
    <div className="form-container">
      <div className="input-container">
        <input value={hint} className="hint"></input>

        <input
          className="input"
          value={inputVal}
          onChange={(event) => onType(event)}
          onKeyDown={(event) => {
            const { keyCode = null } = event;
            console.log("keycode", event.keyCode);
            if (keyCode == 39) {
              setInputVal(hint);
              setsuggestList([]);
              setHint("");
            }
          }}
        ></input>
      </div>

      {suggestList.length > 0 && (
        <div className="form-suggestions-container">
          {suggestList.length &&
            suggestList.map((item) => {
              return <div>{item}</div>;
            })}
        </div>
      )}
    </div>
  );
};

export default FacnyAutoComplete;
