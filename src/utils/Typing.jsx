"use client";
import { Typewriter } from "react-simple-typewriter";

const Typing = ({ words, cursor, cursorStyle }) => {
  return (
    <Typewriter
      words={words}
      loop={true}
      cursor={cursor}
      cursorStyle={cursorStyle}
    />
  );
};
export default Typing;
