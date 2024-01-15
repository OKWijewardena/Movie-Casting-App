import React,{useEffect,useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../css/movie-reviews.css"
import { Chart } from "react-google-charts";
import axios from 'axios'


export default function MovieReview() {

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const axiosInstance = axios.create({
      timeout: 10000, // Set the timeout to 10 seconds (adjust as needed)
    });

    axios
      .get("http://4.247.169.16:2007/film_reviews")
      .then((res) => {
        setResult(res.data);
        setLoading(false); // Set loading to false when the data is received
        console.log(res.data);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);
  
    
  const data = [
    ["Movie ID", "Total Reviews"],
    ...result.map(movie => [movie.movie_id, movie.total_reviews])
  ];


    const options = {
        colors: "#426B4F",
        legend: { position: "none" },
      };

      function Schedule(percentage) {
        const parsedPercentage = parseFloat(percentage);
        if (parsedPercentage > 90) {
          return 30;
        } else if (parsedPercentage >= 80 && parsedPercentage <= 90) {
          return 25;
        } else if (parsedPercentage >= 70 && parsedPercentage < 80) {
          return 20;
        } else if (parsedPercentage >= 60 && parsedPercentage < 70) {
          return 15;
        } else if (parsedPercentage >= 50 && parsedPercentage < 60) {
          return 10;
        } else if (parsedPercentage >= 40 && parsedPercentage < 50) {
          return 7;
        } else {
          return 0;
        }
      }

    


  return (
    <div className="review-container">
      <center>
        <div className="review-chart">
          <h3 style={{fontSize:"30px"}}>Movie Reviews</h3>
          <br />
          <br />
          <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Movie ID</TableCell>
            <TableCell>Movie Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>m/0814255</TableCell>
            <TableCell>Percy Jackson</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/0878835</TableCell>
            <TableCell>Please Give</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/10</TableCell>
            <TableCell>10</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/1000013-12_angry_men</TableCell>
            <TableCell>Angry Men</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/1000079-20000_leagues_under_the_sea</TableCell>
            <TableCell>Legues Under the Sea</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/10000_bc</TableCell>
            <TableCell>BC</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/1000121-39_steps</TableCell>
            <TableCell>Steps</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/1000123-310_to_yuma</TableCell>
            <TableCell>3:10 to Yuma</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/10002008-charly</TableCell>
            <TableCell>Charly</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/1000204-abraham_lincoln</TableCell>
            <TableCell>Abraham Lincoln</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/10002114-dark_water</TableCell>
            <TableCell>Dark Water</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/1000224-accused</TableCell>
            <TableCell>The Accused</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m/10002516-lost_city</TableCell>
            <TableCell>The Lost City</TableCell>
          </TableRow>
          
          {/* Add more rows here as needed */}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
          <Chart
            chartType="Bar"
            width="90%"
            height="350px"
            data={data}
            options={options}
          />
        </div>
      </center>
      <div className="reviews-wrappwe">
        {result.map((movie, index) => (
          <div className="review-detail-box" key={index}>
            <Paper elevation={3} style={{ marginTop: '50px' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{movie.movie_id}</Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={[
                          {
                            name: "Positive",
                            value: parseFloat(movie.positive_percentage),
                            fill: "#8884d8",
                          },
                          {
                            name: "Negative",
                            value: parseFloat(movie.negative_percentage),
                            fill: "#FF0000",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <br />
                  <Typography variant="body2">
                    Total Reviews: {movie.total_reviews}
                  </Typography>
                  <br />
                  <Typography variant="body2">
                    Telecast Time Period (Months): {Schedule(movie.positive_percentage)}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
}