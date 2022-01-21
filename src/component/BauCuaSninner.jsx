import { useEffect, useState } from "react";
import baucua from "./../assets/images/baucua.png";

const BauCuaSpinner = (props) => {
  //   const [timeCount, setTimeCount] = useState();
  const iconHeight = 150;
  const [valuePos, setValuePos] = useState(0);
  const [lastPos, setLastPos] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [finish, setFinish] = useState(false);
  let timeCount;
  const { setKq } = props;

  const setStartPosition = () => {
    let a = Math.floor(Math.random() * 6) * 150 * -1;

    return a;
  };
  useEffect(() => {
    setValuePos(setStartPosition());
  }, []);

  useEffect(() => {
    let inter;
    let random, randomSpeed;
    if (props.start) {
      setFinish(false);
      randomSpeed = Math.floor(Math.random() * 4) + 1;
      random = Math.floor(Math.random() * 6) + 1;
      timeCount = props.timer;
      random = (random * iconHeight) / (timeCount / 100 + 1);
      setSpeed(randomSpeed);

      inter = setInterval(() => {
        doSomeThingAwesome(inter, randomSpeed, random);
      }, 150);
    }
  }, [props]);

  const doSomeThingAwesome = (inter, randomSpeed, random) => {
    if (timeCount < 0) {
      setLastPos(Math.round(valuePos));
      setFinish(true);
      clearInterval(inter);
    } else {
      setFinish(false);
      if (lastPos < -20000)
        setValuePos((prev) => prev + iconHeight * randomSpeed + random);
      else setValuePos((prev) => prev - iconHeight * randomSpeed - random);
      timeCount = timeCount - 100;
    }
  };

  useEffect(() => {
    if (finish) {
      getSymbolFromPosition();
      setValuePos(Math.round(valuePos));
    }
  }, [finish]);

  const getSymbolFromPosition = () => {
    let noww = Math.round(valuePos);
    let result = Math.round((-1 * noww) / 150);
    while (result > 5) {
      result = result - 6;
    }
    setKq(result);
    props.onFinish();
  };

  return (
    <div
      style={{ backgroundPosition: "0px " + valuePos + "px" }}
      className="baucua-icon-list me-2 text-light"
    >
      {/* <h1>{Math.round(valuePos)}</h1>
      <h1>{speed}</h1>
      <h1>{lastPos}</h1> */}
    </div>
  );
};

export default BauCuaSpinner;
