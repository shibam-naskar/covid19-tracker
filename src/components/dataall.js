import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../App.css";
import { IconButton } from "@material-ui/core";
import { Facebook, GitHub, LinkedIn } from "@material-ui/icons";

const axios = require("axios").default;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const [count, setcount] = useState(true);
  const [rows, setrows] = useState([]);
  const [total, settotal] = useState([]);
  const headernames = ["ACTIVE", "CONFIRMED", "DEATHS", "RECOVERED"];
  useEffect(() => {
    if (count === true) {
      getData();
    }
  });

  async function getData() {
    axios
      .get("https://data.covid19india.org/data.json")
      .then(function (response) {
        setrows(response.data["statewise"]);
        settotal([
          response.data["statewise"][0]["active"],
          response.data["statewise"][0]["confirmed"],
          response.data["statewise"][0]["deaths"],
          response.data["statewise"][0]["recovered"],
        ]);
        console.log(rows);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (error) {
        setcount(false);
      });
  }
  const classes = useStyles();

  return (
    <>
      <div className='NavbarUp'>
        <h2 className="textnav">COVID 19 STATUS INDIA</h2>
      </div>
      <div className="alldata">
        <div className="parentDiv">
          <div className="dataMain">
            {total.map((data, ind) => (
              <div className={"dataCard" + (ind + 1)}>
                <h1 className="heading">{headernames[ind]}</h1>
                <h1 className="numbers">{data}</h1>
              </div>
            ))}
            {/* <div className="dataCard1">
        <h1 className="heading">ACTIVE</h1>
        <h1 className="numbers">{rows[0]['active']}</h1>
      </div>
      <div className="dataCard2">
        <h1 className="heading">CONFIRMED</h1>
        <h1 className="numbers">{rows[0]['confirmed']}</h1>
      </div>
      <div className="dataCard3">
        <h1 className="heading">DEATHS</h1>
        <h1 className="numbers">{rows[0]['deaths']}</h1>
      </div>
      <div className="dataCard4">
        <h1 className="heading">RECOVERED</h1>
        <h1 className="numbers">{rows[0]['active']}</h1>
      </div> */}
          </div>
        </div>
        <div className="tabledata">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>State</TableCell>
                  <TableCell align="right">Recovered</TableCell>
                  <TableCell align="right">Confirmed</TableCell>
                  <TableCell align="right">Active</TableCell>
                  <TableCell align="right">Deaths</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row["state"]}
                    </TableCell>
                    <TableCell align="right">{row["recovered"]}</TableCell>
                    <TableCell align="right">{row["confirmed"]}</TableCell>
                    <TableCell align="right">{row["active"]}</TableCell>
                    <TableCell align="right">{row["deaths"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="NavBar">
          <a href="https://github.com/shibam-naskar" target="_blank"><h2 className="textnav">Made By Shibam Naskar</h2></a>
          <div className="navicons">
            <a href="https://github.com/shibam-naskar" target="_blank">
          <IconButton>
            <GitHub/>
          </IconButton>
          </a>

          <a href="https://www.linkedin.com/in/shibam-naskar-601433203/" target="_blank">
          <IconButton>
            <LinkedIn/>
          </IconButton>
          </a>

          <a href="https://www.facebook.com/shibam.naskar.3/" target="_blank">
          <IconButton>
            <Facebook/>
          </IconButton>
          </a>
          </div>
        </div>
      </div>
    </>
  );
}
