import { useEffect, useState } from "react";
import "./xoso.css";
const XoSo = (props) => {
  const [result, setResult] = useState([]);
  const [history, setHistory] = useState([]);
  const [paper, setPaper] = useState([]);

  useEffect(() => {
    // setPaper([makePaper()]);
    setHistory([]);
  }, []);

  useEffect(() => {
    console.log(paper);
  }, [paper]);

  useEffect(() => {
    setHistory((prev) => [...prev, result]);
  }, [result]);

  const getResutl = () => {
    let check = false;
    let nowResult = [];
    while (true) {
      check = Math.floor(Math.random() * 10); // 0 - 9
      // if (nowResult.includes(check)) continue; // enable duplica
      nowResult.push(check);
      if (nowResult.length === 6) break;
    }
    setResult(nowResult);
  };

  const makePaper = () => {
    let a = [];
    let check;
    while (true) {
      check = Math.floor(Math.random() * 10); // 0 - 9
      a.push(check);
      if (a.length === 6) break;
    }
    return a;
  };

  const morePaper = () => {
    setPaper((prev) => [...prev, makePaper()]);
  };

  const randomPaper = () => {
    let a = paper.length;
    console.log(paper);

    let newpaper = [];
    for (let i = 0; i < a; i++) {
      newpaper.push(makePaper());
    }
    console.log(newpaper);
    setPaper(newpaper);
  };

  const LottPaper = (location, name) => {
    // console.log(location);
    return location.map((e, i) => {
      console.log(e);
      console.log(result[i]);
      if (result[i] == e)
        return (
          <div className="bg-danger d-inline-block me-1 p-1 rounded-circle text-light ps-3 pe-3">
            {e}
          </div>
        );
      else
        return (
          <div className="bg-primary d-inline-block me-1 p-1 rounded-circle text-light ps-3 pe-3">
            {e}
          </div>
        );
    });
  };

  return (
    <div>
      <h1>Xổ số</h1>
      <div className="btn btn-primary" onClick={() => getResutl()}>
        Quay số
      </div>
      <div className="col-12 mt-1">
        {history.length !== 1 && "Kỳ " + (history.length - 1) + ":"}
        {result.map((e) => (
          <div className="bg-danger d-inline-block me-1 p-1 rounded-circle text-light ps-3 pe-3">
            {e + " "}
          </div>
        ))}
      </div>
      <div className="row mt-2">
        {paper.map((e, i) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-3 ">
            <div className="border border-dark pt-1">
              <span className={"text-danger"}>Tờ {i + 1}</span>
              <hr />
              <div className="mb-2">{LottPaper(e, i + 1)}</div>
            </div>
          </div>
        ))}
        <div className={"col-12 col-sm-6 col-lg-4 mb-3 "}>
          <div className="border border-dark p-2">
            <div className="btn btn-danger me-1" onClick={() => setPaper([])}>
              Xóa hết
            </div>
            <div className="btn btn-warning me-1" onClick={() => randomPaper()}>
              Trộn số
            </div>
            <div className="btn btn-primary" onClick={() => morePaper()}>
              Mua thêm
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <h5>Lịch sử quay số</h5>
        {history.map(
          (e, i) =>
            i !== 0 && (
              <div className="row mb-1 bg-secondary text-light">
                <div className="col-12"> Kì quay {i}</div>
                {e.map((num) => (
                  <div className="col-2">{num}</div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};
export default XoSo;
