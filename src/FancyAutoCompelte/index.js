import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./index.css";
import BANERIMAGE from "./topbaner.jpg";

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
  "indusbank",
];

const FacnyAutoComplete = function (props) {
  const [inputVal, setInputVal] = useState("");
  const [suggestList, setsuggestList] = useState([]);

  //hint will be empty string in first render
  const [hint, setHint] = useState("");
  const [targetedDiv, setTagatedDiv] = useState(-1);

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

      //set the hint

      const hint = filteredUPI[0] ? filteredUPI[0]?.slice(bankUPI.length) : "";
      console.log("value", hint);
      setsuggestList(filteredUPI);
      setHint(value + hint);
    }
  };
  const getTargetDiv = () => {
    //index
    return targetedDiv;
  };
  const highLightDiv = (suggestList, keycode) => {
    switch (keycode) {
      case 40: {
        setTagatedDiv((targetDivRef) => {
          if (targetDivRef >= 0) {
            return targetDivRef + 1;
          }
          return 0;
        });
        return;
      }
      case 38: {
        setTagatedDiv((targetDivRef) => {
          if (targetDivRef >= 0) {
            return targetDivRef - 1;
          }
          return 0;
        });
        return;
      }
    }
  };
  console.log("rndering", targetedDiv);
  return (
    <div className="form-container">
      <div className="top-baner">
        <img src={BANERIMAGE} />
      </div>
      <div className="input-container">
        <input value={hint} className="hint"></input>

        <input
          className="input"
          value={inputVal}
          onChange={(event) => onType(event)}
          onKeyDown={(event) => {
            const { keyCode = null } = event;
            console.log("keycode", event.keyCode);
            if (keyCode == 39) setInputVal(hint);
            if (keyCode == 40 || keyCode == 38) {
              highLightDiv(suggestList, keyCode);
              return;
            }
            if (keyCode == 13) {
              const val = suggestList.filter((val, idx) => idx == targetedDiv);
              setInputVal(inputVal + val);
              setHint(inputVal + val);
              return;
            }
            setsuggestList([]);
            setHint("");
          }}
        ></input>
        {suggestList.length > 0 && (
          <div className="form-suggestions-container">
            {suggestList.length &&
              suggestList.map((item, idx) => {
                const backgroundColor =
                  targetedDiv >= 0
                    ? targetedDiv == idx
                      ? "red"
                      : "white"
                    : "";

                console.log(
                  "backgroundColor",
                  targetedDiv,
                  idx,
                  targetedDiv == idx,
                  backgroundColor
                );

                return (
                  <div
                    style={{ backgroundColor: backgroundColor }}
                    className="suggested-bank"
                  >
                    {item}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacnyAutoComplete;
