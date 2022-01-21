import { useCallback, useEffect, useState } from "react";
import BauCuaSpinner from "./BauCuaSninner";
import "./baucua.css";

import bau from "./../assets/images/bau.png";
import cua from "./../assets/images/cua.png";
import ca from "./../assets/images/ca.png";
import tom from "./../assets/images/tom.png";
import nai from "./../assets/images/nai.png";
import ga from "./../assets/images/ga.png";

const BauCua = (props) => {
  const [finishResult, setFinishResult] = useState(0);
  const [start, setStart] = useState(false);
  const [kq1, setKq1] = useState(0);
  const [kq2, setKq2] = useState(0);
  const [kq3, setKq3] = useState(0);

  const [user1, setUser1] = useState([500, 0]);
  const [user2, setUser2] = useState([500, 0]);
  const [user3, setUser3] = useState([500, 0]);
  const [user4, setUser4] = useState([500, 0]);
  const [bet, setBet] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // useEffect(() => {
  // console.log(bet);
  // }, [bet]);

  useEffect(() => {
    if (finishResult == 3) {
      let a = [...user1];
      a[1] = 0;
      let b = [...user2];
      b[1] = 0;
      let c = [...user3];
      c[1] = 0;
      let d = [...user4];
      d[1] = 0;

      let dupli = 1;
      let nowbett = [...bet];
      console.log(nowbett);

      nowbett.map((b, ii) => {
        if (ii == kq1 || ii == kq2 || ii == kq3) {
          if (
            (ii == kq1 && ii == kq2) ||
            (ii == kq1 && ii == kq3) ||
            (ii == kq3 && ii == kq2)
          )
            dupli = 2;
          else if (kq1 == kq2 && kq2 == kq3) dupli = 3;
          else dupli = 1;

          b.map((e, i) => {
            console.log(e + " _ " + ii);
            if (e != 0) {
              switch (i) {
                case 0:
                  a[0] = a[0] + e * dupli;
                  a[1] = a[1] + e * dupli;
                  break;
                case 1:
                  b[0] = b[0] + e * dupli;
                  b[1] = b[1] + e * dupli;
                  break;
                case 2:
                  c[0] = c[0] + e * dupli;
                  c[1] = c[1] + e * dupli;
                  break;
                default:
                  d[0] = d[0] + e * dupli;
                  d[1] = d[1] + e * dupli;
                  break;
              }
            }
          });
        } else {
          b.map((e, i) => {
            if (e != 0) {
              switch (i) {
                case 0:
                  a[0] = a[0] - e;
                  a[1] = a[1] - e;
                  break;
                case 1:
                  b[0] = b[0] - e;
                  b[1] = b[1] - e;
                  break;
                case 2:
                  c[0] = c[0] - e;
                  c[1] = c[1] - e;
                  break;
                default:
                  d[0] = d[0] - e;
                  d[1] = d[1] - e;
                  break;
              }
            }
          });
        }
      });

      setUser1(a);
      setUser2(b);
      setUser3(c);
      setUser4(d);

      setBet([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]);
    }
  }, [finishResult]);

  // let finishResult = [];

  const finishHandler = () => {
    setFinishResult((prev) => prev + 1);
    setStart(false);
  };

  const letStart = () => {
    setFinishResult(0);
    setStart(true);
  };

  const handleSelecte = (e, pos, user) => {
    let a = [...bet];
    let b = a[pos];
    b[user - 1] = parseInt(e.target.value);
    a[pos] = b;
    console.log(a);
    setBet(a);
  };

  const userSelect = (pos) => {
    return (
      <div className="row">
        <div className="col-6 mb-1">
          <div className="border-primary border border-5">
            <select
              class="form-select"
              onChange={(e) => handleSelecte(e, pos, 1)}
              value={bet[pos][0]}
            >
              <option value={0} selected>
                0
              </option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={500}>500</option>
              <option value={700}>700</option>
              <option value={1000}>1k</option>
            </select>
          </div>
        </div>
        <div className="col-6 mb-1">
          <div className="border-warning border border-5">
            <select
              class="form-select"
              onChange={(e) => handleSelecte(e, pos, 2)}
              value={bet[pos][1]}
            >
              <option value={0} selected>
                0
              </option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={500}>500</option>
              <option value={700}>700</option>
              <option value={1000}>1k</option>
            </select>
          </div>
        </div>
        <div className="col-6 ">
          <div className="border-dark border border-5">
            {/* <div className="user-baucua bg-dark" /> */}
            <select
              class="form-select"
              onChange={(e) => handleSelecte(e, pos, 3)}
              value={bet[pos][2]}
            >
              <option value={0} selected>
                0
              </option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={500}>500</option>
              <option value={700}>700</option>
              <option value={1000}>1k</option>
            </select>
          </div>
        </div>
        <div className="col-6 ">
          <div className="border-success border border-5">
            {/* <div className="user-baucua bg-success" /> */}
            <select
              class="form-select"
              onChange={(e) => handleSelecte(e, pos, 4)}
              value={bet[pos][3]}
            >
              <option value={0} selected>
                0
              </option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={500}>500</option>
              <option value={700}>700</option>
              <option value={1000}>1k</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  console.log("rerender");
  return (
    <div>
      <div className="snip-and-button">
        <div className={`spinner-container mb-1`}>
          <div className=" mx-auto">
            <BauCuaSpinner
              onFinish={finishHandler}
              timer={1000}
              start={start}
              setKq={setKq1}
            />
            <BauCuaSpinner
              onFinish={finishHandler}
              timer={1800}
              start={start}
              setKq={setKq2}
            />
            <BauCuaSpinner
              onFinish={finishHandler}
              timer={3000}
              start={start}
              setKq={setKq3}
            />
            <div className="gradient-fade"></div>
          </div>
        </div>
        <div
          className={
            "btn btn-danger mt-1" + (finishResult === 3 ? "" : "disabled")
          }
          onClick={() => letStart(true)}
        >
          Quay
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6 col-sm-4">
          <div
            className={
              "buacua-item border border-5 border-danger " +
              ((kq1 == 5 || kq2 == 5 || kq3 == 5) &&
                finishResult == 3 &&
                "bg-danger")
            }
          >
            <img src={nai} />
            {userSelect(5)}
          </div>
        </div>
        <div className="col-6 col-sm-4">
          <div
            className={
              "buacua-item border border-5 border-danger " +
              ((kq1 == 0 || kq2 == 0 || kq3 == 0) &&
                finishResult == 3 &&
                "bg-danger")
            }
          >
            <img src={bau} />
            {userSelect(0)}
          </div>
        </div>
        <div className="col-6 col-sm-4">
          <div
            className={
              "buacua-item border border-5 border-danger " +
              ((kq1 == 1 || kq2 == 1 || kq3 == 1) &&
                finishResult == 3 &&
                "bg-danger")
            }
          >
            <img src={ga} />
            {userSelect(1)}
          </div>
        </div>
        <div className="col-6 col-sm-4">
          <div
            className={
              "buacua-item border border-5 border-danger " +
              ((kq1 == 2 || kq2 == 2 || kq3 == 2) &&
                finishResult == 3 &&
                "bg-danger")
            }
          >
            <img src={ca} />
            {userSelect(2)}
          </div>
        </div>
        <div className="col-6 col-sm-4">
          <div
            className={
              "buacua-item border border-5 border-danger " +
              ((kq1 == 3 || kq2 == 3 || kq3 == 3) &&
                finishResult == 3 &&
                "bg-danger")
            }
          >
            <img src={cua} />
            {userSelect(3)}
          </div>
        </div>
        <div className="col-6 col-sm-4">
          <div
            className={
              "buacua-item border border-5 border-danger " +
              ((kq1 == 4 || kq2 == 4 || kq3 == 4) &&
                finishResult == 3 &&
                "bg-danger")
            }
          >
            <img src={tom} />
            {userSelect(4)}
          </div>
        </div>
      </div>
      {/* <p>
        Nhà cái <div className="user-baucua bg-danger" /> : {nhacai[0]} (+
        {nhacai[1]})
      </p> */}
      <p>Người chơi: </p>
      <div className="row">
        <div className="col-6">
          <div className="user-baucua bg-primary" /> :
          <strong> {user1[0]} </strong>{" "}
          <span className={user1[1] < 0 ? " text-danger" : " text-success"}>
            ( {user1[1]}){" "}
          </span>
        </div>
        <div className="col-6">
          <div className="user-baucua bg-warning" /> :
          <strong> {user2[0]} </strong>{" "}
          <span className={user2[1] < 0 ? " text-danger" : " text-success"}>
            ( {user2[1]}){" "}
          </span>
        </div>
        <div className="col-6">
          <div className="user-baucua bg-dark" /> :<strong> {user3[0]} </strong>{" "}
          <span className={user3[1] < 0 ? " text-danger" : " text-success"}>
            ({user3[1]}){" "}
          </span>
        </div>
        <div className="col-6">
          <div className="user-baucua bg-success" /> :
          <strong> {user4[0]} </strong>{" "}
          <span className={user4[1] < 0 ? " text-danger" : " text-success"}>
            ( {user4[1]}){" "}
          </span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default BauCua;
