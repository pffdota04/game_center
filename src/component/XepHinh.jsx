import "./xephinh.css"

const XepHinh = (props) => {


  //

  const gameBoard = () => {


  }

  return (
    <div>
      <h1>Xếp hình</h1>

      <div>
        <table>
          <tbody>
            {Array(15).fill(0).map(() => (
              <tr>
                <td className="game-block block-empty" />
                <td className="game-block block-empty" />
                <td className="game-block block-empty" />
                <td className="game-block block-empty" />
                <td className="game-block block-empty" />
                <td className="game-block block-empty" />
                <td className="game-block block-empty" />
                <td className="game-block block-empty" />
                <td className="game-block block-empty" />
                <td className="game-block block-empty" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default XepHinh;
