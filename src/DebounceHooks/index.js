import React, { useEffect, useRef, useState } from "react";

export default function useDebounce(input) {
  //const [input,setInput]=React.useState(input);
  //console.log("HOOK is rendering ");
  const [isTyping, setIsTyping] = useState(false);
  const [intervalId, setIntervalId] = React.useState(null);
  const [apiFired, setApifired] = useState(false);

  //const isTyping = useRef(false);
  console.log("custom");
  useEffect(() => {
    console.log("useEffect of cusotmHooks, intercalid", isTyping);

    if (input) {
      const id = setTimeout(() => {
        //fire event,call the api and send response
        // console.log("into interal , statechanged", isTyping);
        setApifired(true);
        setIsTyping(false);
      }, 300);
      setIntervalId(id);
    }

    if (apiFired) {
      setApifired(false);
    }

    return () => {
      console.log("cleaup fun");
      clearInterval(intervalId);
    };
  }, [input]);

  return [apiFired, setIsTyping];
}
