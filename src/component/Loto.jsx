import { useEffect, useState } from "react";
import "./loto.css";

const Loto = (props) => {
  const [paper, setPaper] = useState([]);
  const [binggo, setBinggo] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setPaper((prev) => [makePaper()]);
  }, []);

  // Check Bingo
  useEffect(() => {
    let count;
    paper.map((rows, i) => {
      rows.map((row) => {
        count = 0;
        row.map((e) => {
          if (result.includes(e)) {
            count++;
            if (count === 5) {
              setBinggo((prev) => [...prev, i + 1]);
            }
          }
        });
      });
    });
  }, [result]);

  const makePaper = () => {
    let a = [];
    a.push(randomLine());
    a.push(randomLine());
    a.push(randomLine());
    return a;
  };

  const randomLine = () => {
    let nowDec;
    let line = [];
    for (let i = 0; i < 5; i++) {
      nowDec = Math.floor(Math.random() * 9); // random 0 -> 8
      line.map((e) => {
        if (Math.floor(e / 10) == nowDec) {
          nowDec = false;
        }
      });
      if (nowDec !== false) {
        line.push(check(nowDec));
      } else i--;
    }
    line.sort(function (a, b) {
      return a - b;
    });
    return line;
  };

  const check = (nowDec) => {
    return (
      Math.floor(Math.random() * (nowDec * 10 + 10 - nowDec * 10)) + nowDec * 10
    );
  };

  const LotoPaper = (location, name) => {
    let breakk = false;
    return location.map((e, i) => {
      return (
        <div className="row justify-content-center mb-1 text-light">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((number) => {
            breakk = false;
            return (
              <div className="col-110 bg-primary p-0">
                {e.map((current) => {
                  if (breakk) return "";
                  else if (Math.floor(current / 10) == number) {
                    if (result.includes(current)) {
                      breakk = true;
                      return (
                        <strong className="text-nowrap bd-highlight text-light bg-danger">
                          {current}
                        </strong>
                      );
                    } else {
                      return <span className="">{current}</span>;
                    }
                  } else return "";
                })}
              </div>
            );
          })}
        </div>
      );
    });
  };

  const getResutl = () => {
    let nowDec = false;
    while (nowDec === false) {
      nowDec = Math.floor(Math.random() * 90) + 1;
      if (result.includes(nowDec)) nowDec = false;
    }
    setResult((prev) => [...prev, nowDec]);
  };

  const morePaper = () => {
    setPaper((prev) => [...prev, makePaper()]);
  };

  return (
    <div>
      <h1>Lô tô</h1>
      <div className="btn btn-primary" onClick={() => getResutl()}>
        Quay số
      </div>
      <div className="col-12">
        KQ quay số:{" "}
        {result.map((e) => (
          <div className="bg-danger d-inline-block me-1 p-1 rounded-circle text-light">
            {e + " "}
          </div>
        ))}
      </div>
      <div className="row mt-2">
        {paper.map((e, i) => (
          <div className={"col-12 col-sm-6 col-lg-4 mb-3 "}>
            <div className="border border-dark pt-1">
              {LotoPaper(e, i + 1)}
              <span
                className={
                  "text-danger" +
                  (binggo.includes(i + 1)
                    ? " border border-danger border-5 "
                    : "")
                }
              >
                Tờ {i + 1} {binggo.includes(i + 1) ? " Bingo" : ""}
              </span>
            </div>
          </div>
        ))}
        <div className={"col-12 col-sm-6 col-lg-4 mb-3 "}>
          <div className="border border-dark p-2">
            <div className="btn btn-primary" onClick={() => morePaper()}>
              Tạo thêm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loto;
