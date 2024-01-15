import React, { useEffect, useState } from "react";
import "../css/movie-analysis.css";
import MovieAnalysisCard from "../components/movie-analysis-card";
import Background from "../images/movie.jpeg";
import Background2 from "../images/images.jpeg";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Loader from "../components/Loader";

function MovieAnalysis() {
  const [formActive, setFormActive] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pageActivater, setPageActivater] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [movieFile, setMovieFile] = useState("");
  const [btnText, setBtnText] = useState("Continue");
  const [loader, setLoader] = useState(false);
  const [analyisData, setAnalyisData] = useState({
    fps: 0,
    obj_accuracy: 0,
    obj_dimension: 0,
    img_accuracy: 0,
    year: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/movie/details/1020`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setMovies(res.data);
        }
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  const formHandlerActive = () => {
    setFormActive(true);
  };

  const formHandlerInActive = () => {
    setFormActive(false);
  };

  const continueHandler = () => {
    setPageActivater(true);
  };

  const videoUploadHandler = async () => {
    setBtnText("Please waite");
    if (movieName.trim().length === 0) {
      alert("Please enter movie name.");
      return;
    }
    if (!movieFile) {
      alert("Please select upload a movie.");
      return;
    }
    let formData = new FormData();
    formData.append("video", movieFile);
    axios
      .post(`http://localhost:5000/upload/${movieName}`, formData)
      .then((res) => {
        if (res.status === 201) {
          setBtnText("Continue");
          continueHandler();
        }
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setBtnText("Continue");
        alert(err.message);
      });
  };

  const analyzeHandler = () => {
    if (analyisData.fps === 0) {
      alert("Please enter fps rate.");
      return;
    }
    if (analyisData.obj_accuracy === 0) {
      alert("Please enter object accuracy.");
      return;
    }
    if (analyisData.obj_dimension === 0) {
      alert("Please enter object dimension.");
      return;
    }
    if (analyisData.img_accuracy === 0) {
      alert("Please enter image accuracy.");
      return;
    }
    if (analyisData.year === 0) {
      alert("Please enter movie related year.");
      return;
    }
    const data = {
      user_id: "1020",
      movie_name: movieName,
      file_name: movieName + ".mp4",
      fps_rate: analyisData.fps,
      obj_accuracy: analyisData.obj_accuracy,
      obj_dimension: analyisData.obj_dimension,
      img_accuracy: analyisData.img_accuracy,
      year: analyisData.year,
    };
    setLoader(true);
    setPageActivater(false);
    setFormActive(false);
    axios
      .post(`http://localhost:5000/check/video`, data)
      .then((res) => {
        setLoader(false);
        alert("Movie analyzed successfully.");
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div className="movie-page-container">
      <Loader
        openState={loader}
        message="We are currently analyzing the movie. Please be patient."
      />

      <div className="movie-page-container-title">Movies Analyzed Results</div>
      <div className="movie-page-result-container">
        {movies.map((movie, index) => (
          <MovieAnalysisCard
            image={Background}
            name={movie.movie_name}
            key={index}
          />
        ))}
      </div>
      <div
        onMouseOver={formHandlerActive}
        className={
          formActive
            ? "movie-page-form-wrapper-active"
            : "movie-page-form-wrapper"
        }
      >
        <div
          className="movie-page-form-wrapper-expander"
          onMouseOver={formHandlerActive}
        />
        <div className="movie-page-form-container">
          <div className="movie-page-form-title-wrapper">
            <label className="movie-page-form-title">Analyze Movie</label>
            <CloseIcon
              onClick={formHandlerInActive}
              sx={{ color: "white", fontSize: "22px", cursor: "pointer" }}
            />
          </div>
          {!pageActivater ? (
            <div className="movie-page-form-one-container">
              <div className="movie-form-input-wrapper">
                <label className="movie-form-input-label">Movie Name</label>
                <input
                  type="text"
                  placeholder="Movie Name"
                  className="movie-form-input"
                  onChange={(e) => {
                    setMovieName(e.target.value);
                  }}
                />
              </div>
              <div className="movie-form-input-wrapper">
                <label className="movie-form-input-label">Movie</label>
                <input
                  type="file"
                  className="movie-form-input-file"
                  onChange={(e) => {
                    setMovieFile(e.target.files[0]);
                  }}
                />
              </div>
              <div className="movie-form-action-wrapper">
                <button
                  className="movie-form-action-button"
                  onClick={videoUploadHandler}
                >
                  {btnText}
                </button>
              </div>
            </div>
          ) : (
            <div className="movie-page-form-one-container">
              <div className="movie-form-input-wrapper">
                <label className="movie-form-input-label">FPS Rate</label>
                <input
                  type="number"
                  placeholder="2 to 6"
                  className="movie-form-input"
                  onChange={(e) => {
                    setAnalyisData({
                      ...analyisData,
                      fps: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="movie-form-input-wrapper">
                <label className="movie-form-input-label">Object Size</label>
                <select
                  type="text"
                  className="movie-form-input"
                  onChange={(e) => {
                    setAnalyisData({
                      ...analyisData,
                      obj_dimension: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value={0}>Select One</option>
                  <option value={20}>20x20</option>
                  <option value={40}>40x40</option>
                  <option value={60}>60x60</option>
                  <option value={80}>80x80</option>
                  <option value={100}>100x100</option>
                </select>
              </div>
              <div className="movie-form-input-wrapper">
                <label className="movie-form-input-label">
                  Object Accuracy
                </label>
                <select
                  type="text"
                  className="movie-form-input"
                  onChange={(e) => {
                    setAnalyisData({
                      ...analyisData,
                      obj_accuracy: parseFloat(e.target.value),
                    });
                  }}
                >
                  <option value={"0"}>Select One</option>
                  <option value={"0.5"}>0.5</option>
                  <option value={"0.6"}>0.6</option>
                  <option value={"0.7"}>0.7</option>
                  <option value={"0.8"}>0.8</option>
                  <option value={"0.9"}>0.9</option>
                </select>
              </div>
              <div className="movie-form-input-wrapper">
                <label className="movie-form-input-label">Image Accuracy</label>
                <select
                  type="text"
                  className="movie-form-input"
                  onChange={(e) => {
                    setAnalyisData({
                      ...analyisData,
                      img_accuracy: parseFloat(e.target.value),
                    });
                  }}
                >
                  <option value={"0"}>Select One</option>
                  <option value={"0.5"}>0.5</option>
                  <option value={"0.6"}>0.6</option>
                  <option value={"0.7"}>0.7</option>
                  <option value={"0.8"}>0.8</option>
                  <option value={"0.9"}>0.9</option>
                </select>
              </div>
              <div className="movie-form-input-wrapper">
                <label className="movie-form-input-label">
                  Movie Represented Year
                </label>
                <input
                  type="number"
                  placeholder="eg:- 2000"
                  className="movie-form-input"
                  onChange={(e) => {
                    setAnalyisData({
                      ...analyisData,
                      year: parseInt(e.target.value),
                    });
                  }}
                />
              </div>

              <div className="movie-form-action-wrapper">
                <button
                  className="movie-form-action-button"
                  onClick={analyzeHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieAnalysis;
