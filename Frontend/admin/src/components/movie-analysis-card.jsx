import React from "react";
import "../css/movie-analysis-card.css";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
 import { saveAs } from "file-saver";

function MovieAnalysisCard({image,name}) {
  const [mouseHover, setMouseHover] = React.useState(false);

  const mouseHoverOverHandler = () => {
    setMouseHover(true);
  };
  const mouseHoverOutHandler = () => {
    setMouseHover(false);
  };
  const reportDownloadHandler = () => {
    axios
      .get(`http://localhost:5000/download/${name}`)
      .then((res) => {
        saveAs(res.request.responseURL, `Result.zip`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };



  const myStyle = {
    width: "170px",
    height: "200px",
    borderRadius: "0 20px 0 20px",
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "170px 200px",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div
      className="movie-analysis-card-container"
      style={myStyle}
      onMouseOver={mouseHoverOverHandler}
      onMouseOut={mouseHoverOutHandler}
    >
      {mouseHover && (
        <div className="movie-analysis-card-detail-container">
          <h5 className="movie-analysis-card-title">{name}</h5>
          <div className="movie-analysis-card-action-wrapper">
            <DownloadIcon
              onClick={reportDownloadHandler}
              className="movie-card-download-icon"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieAnalysisCard;
