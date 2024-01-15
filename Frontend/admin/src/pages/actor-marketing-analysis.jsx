import React, { useState } from "react";
import "../css/actor-marketing-analysis.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import Loader from "../components/Loader";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Channa from "../images/channa.png";
import Mashi from "../images/mashi.png";
import Nadeeka from "../images/nadeeka.png";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ActorMarketingAnalysis() {
  const [loaderState, setLoaderState] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState(false);
  const [filmName, setFilmName] = useState("");
  const [filmDirectorName, setFilmDirectorName] = useState("");
  const [filmDirectorEmail, setFilmDirectorEmail] = useState("");
  const [filmAnalysisType, setFilmAnalysisType] = useState("");
  const [filmVideo, setFilmVideo] = useState("");

  const [AAOResults, setAAOResults] = useState([]);
  const [FMAOResultsValue1, setFMAOResultsValue1] = useState();
  const [FMAOResultsValue2, setFMAOResultsValue2] = useState();
  const [FMAOResultsGenre1, setFMAOResultsGenre1] = useState();
  const [FMAOResultsGenre2, setFMAOResultsGenre2] = useState();

  const [AAO, setAAO] = useState(false);
  const [FMAO, setFMAO] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#5143b8",
      },
    },
  });

  const data = {
    labels: [FMAOResultsGenre1, FMAOResultsGenre2],
    datasets: [
      {
        label: "Percentage",
        data: [FMAOResultsValue1, FMAOResultsValue2],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const submitHandler = () => {
    let formData = new FormData();
    formData.append("movie", filmVideo);

    if (filmName === "") {
      alert("Please enter the film trailer name");
    } else if (filmDirectorName === "") {
      alert("Please enter the film director name");
    } else if (filmDirectorEmail === "") {
      alert("Please enter the film director email");
    } else if (filmVideo !== "") {
      if (filmAnalysisType === "AAO") {
        setLoaderState(true);
        setLoaderMessage("Please Wait Actor Analysis Under The Processing...");
        setFMAO(false);
        axios
          .post("http://127.0.0.1:5000/movie-actor-identification", formData)
          .then((res) => {
            setLoaderState(false);
            setAAO(true);
            setAAOResults(res.data);
          });
      } else if (filmAnalysisType === "FMAO") {
        setLoaderState(true);
        setLoaderMessage(
          "Please Wait Film Marketing Analysis Under The Processing..."
        );
        setAAO(false);
        axios
          .post("http://127.0.0.1:5000/movie-film-marketing", formData)
          .then((res) => {
            setLoaderState(false);
            setFMAO(true);
            setFMAOResultsGenre1(res.data.highest_genre_1.genre);
            setFMAOResultsGenre2(res.data.highest_genre_2.genre);
            setFMAOResultsValue1(res.data.highest_genre_1.value);
            setFMAOResultsValue2(res.data.highest_genre_2.value);
          });
      } else if (filmAnalysisType === "AFMA") {
        setLoaderState(true);
        setLoaderMessage("Please Wait Actor Analysis Under The Processing...");
        axios
          .post("http://127.0.0.1:5000/movie-actor-identification", formData)
          .then((res) => {
            setLoaderMessage(
              "Please Wait Film Marketing Analysis Under The Processing..."
            );
            setAAOResults(res.data);
            axios
              .post("http://127.0.0.1:5000/movie-film-marketing", formData)
              .then((res) => {
                setLoaderState(false);
                setAAO(true);
                setFMAO(true);
                setFMAOResultsGenre1(res.data.highest_genre_1.genre);
                setFMAOResultsGenre2(res.data.highest_genre_2.genre);
                setFMAOResultsValue1(res.data.highest_genre_1.value);
                setFMAOResultsValue2(res.data.highest_genre_2.value);
              });
          });
      } else {
        alert("Please select the film analysis type");
      }
    } else {
      alert("Please enter the film video");
    }

    // setLoaderState(true);
    // setLoaderMessage("Hi");
  };
  return (
    <div className="actor-marketing-container">
      <Loader openState={loaderState} message={loaderMessage} />
      <div className="actor-marketing-title">
        Actor & Film Marketing Analysis
      </div>
      <div className="actor-marketing-input-container">
        <ThemeProvider theme={theme}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "31%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Film Trailer Name"
                color="primary"
                required
                value={filmName}
                onChange={(e) => {
                  setFilmName(e.target.value);
                }}
              />
              <TextField
                label="Film Director Name"
                color="primary"
                required
                value={filmDirectorName}
                onChange={(e) => {
                  setFilmDirectorName(e.target.value);
                }}
              />
              <TextField
                label="Film Director Email"
                color="primary"
                required
                value={filmDirectorEmail}
                onChange={(e) => {
                  setFilmDirectorEmail(e.target.value);
                }}
              />
            </div>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "47.2%",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <FormControl sx={{ m: 1, width: "47.2%" }}>
                <InputLabel color="primary">Film Analysis Type</InputLabel>
                <Select
                  color="primary"
                  // value={age}
                  label="Film Analysis Type"
                  // onChange={handleChange}
                  required
                  value={filmAnalysisType}
                  onChange={(e) => {
                    setFilmAnalysisType(e.target.value);
                  }}
                >
                  <MenuItem value={"AAO"}>Actor Analysis Only</MenuItem>
                  <MenuItem value={"FMAO"}>
                    Film Marketing Analysis Only
                  </MenuItem>
                  <MenuItem value={"AFMA"}>
                    Actor & Film Marketing Analysis
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Film Director Name"
                color="primary"
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setFilmVideo(e.target.files[0]);
                }}
              />
            </div>
          </Box>
          <center>
            <Box sx={{ "& > button": { m: 1, width: "50%" } }}>
              <Button
                onClick={submitHandler}
                variant="contained"
                color="primary"
                endIcon={<MovieFilterIcon />}
              >
                Analysis
              </Button>
            </Box>
          </center>
        </ThemeProvider>
      </div>
      <div className="actor-marketing-results-container">
        {AAO === true || FMAO === true ? (
          <div className="actor-marketing-title">{filmName} Film Results</div>
        ) : null}
        <div className="actor-marketing-results-contend-container">
          {AAO === true ? (
            <div className="actor-marketing-results-actor-container">
              <div className="actor-marketing-results-actor-title">
                Actor Analysis
              </div>
              <div className="actor-marketing-results-actor-warper">
                {/* --------------------------------- */}
                {AAOResults.map((actor) => (
                  <div className="card">
                    {actor === "Channa Perera" ? (
                      <img src={Channa} alt="" className="card-img" />
                    ) : actor === "Nadeeka Gunasekara" ? (
                      <img src={Nadeeka} alt="" className="card-img" />
                    ) : actor === "Mashi Siriwardene" ? (
                      <img src={Mashi} alt="" className="card-img" />
                    ) : null}
                    <div className="card-content">
                      <div className="card-content-topic">{actor}</div>
                      <div className="card-content-para">
                        Sir lankan Actress
                      </div>
                    </div>
                  </div>
                ))}
                {/* ---------------------------------------- */}
              </div>
            </div>
          ) : null}
          {FMAO === true ? (
            <>
              <div className="actor-marketing-results-pie-chart-container">
                <center>
                  <div className="actor-marketing-results-actor-title">
                    Film Genres Analysis
                  </div>
                </center>
                <div className="actor-marketing-results-pie-chart-wrapper">
                  <Pie data={data} />
                </div>
              </div>
              <div className="actor-marketing-results-suggestions-container">
                <div className="actor-marketing-results-suggestions-title">
                  Film Marketing System Suggestions
                </div>
                <div className="actor-marketing-results-suggestions-wrapper">
                  <div className="actor-marketing-results-suggestions-romantic">
                    Romantic Film Genres : Some of the months when action movies
                    might be more commonly released could include: January,
                    February, March
                  </div>
                  <div className="actor-marketing-results-suggestions-action">
                    Action Film Genres : Some of the months when action movies
                    might be more commonly released could include: December,
                    April, July, October
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
