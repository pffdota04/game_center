import "./App.css";
import Slider from "react-slick";

import tank from "./assets/images/tank.jpg";
import dua from "./assets/images/dua.jpg";
import loto from "./assets/images/loto.jpg";
import xoso from "./assets/images/xoso.jpg";
import xephinh from "./assets/images/xephinh.jpg";
import snake from "./assets/images/snake.jpg";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import RanSanMoi from "./component/RanSanMoi";
import DuaXe from "./component/DuaXe";
import XepHinh from "./component/XepHinh";
import Loto from "./component/Loto";
import XoSo from "./component/XoSo";

function App() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const listgame = [
    { name: "Rắn săn mồi", img: snake, link: "ran-san-moi" },
    { name: "Xếp hình", img: xephinh, link: "xep-hinh" },
    { name: "Đua xe", img: dua, link: "dua-xe" },
    { name: "Bắn súng", img: tank, link: "ban-sung" },
    { name: "Lô tô", img: loto, link: "lo-to" },
    { name: "Xổ số", img: xoso, link: "xo-so" },
  ];

  return (
    <div className="App container">
      <Router>
        <Slider {...settings}>
          {listgame.map((e, i) => (
            <div className="p-2">
              <h3>{e.name}</h3>
              <img src={e.img} alt={"Game " + i} className="w-100" />
              <Link
                className="btn btn-play btn-primary m-2 w-50 mx-auto  "
                to={e.link}
              >
                Play
              </Link>
            </div>
          ))}{" "}
        </Slider>
        <hr />
        <div>
          <Routes>
            <Route path="/ran-san-moi" element={<RanSanMoi />} />
            <Route path="/ban-sung" element={<DuaXe />} />
            <Route path="/dua-xe" element={<DuaXe />} />
            <Route path="/xep-hinh" element={<XepHinh />} />
            <Route path="/lo-to" element={<Loto />} />
            <Route path="/xo-so" element={<XoSo />} />

            <Route path="/" element={<div> AHAHAHA</div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
