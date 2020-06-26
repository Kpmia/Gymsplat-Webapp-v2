import Page from "components/Page";
import { NumberWidget } from "components/Widget";
import { getStackLineChart, stackLineChartOptions } from "demos/chartjs";
import React from "react";
import db from "./firebase";
import ModalExample from "./Modal";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Button } from "reactstrap";
import Cookies from "universal-cookie";
import firebase from "firebase";

import {
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Modal,
} from "reactstrap";
import FadeIn from "react-fade-in";

var saved = [];

const cookies = new Cookies();

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

class DashboardPage extends React.Component {
  constructor() {
    super();
    this.state = {
      done: undefined,
      currentActivity: 0,
      currentReservations: 0,
      poptimes: "",
      reserveUpdate: "",
      dateToday: "",
    };
  }

  getWeightsCount() {
    const ref = db
      .collection("fitnessonbroughton")
      .doc("weights")
      .collection("peoplecount")
      .orderBy("timestamp", "desc")
      .limit(1);
    ref.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        let weights = doc.data();
        let timeWeight = doc.data();
        let timeWMonth = doc.data();
        let timeWDay = doc.data();
        let timeWYear = doc.data();
        let timeWHour = doc.data();
        let timeWMinute = doc.data();

        weights = JSON.stringify(weights.People);
        timeWMonth = JSON.stringify(timeWeight.Month);
        timeWDay = JSON.stringify(timeWeight.Day);
        timeWYear = JSON.stringify(timeWeight.Year);
        timeWHour = JSON.stringify(timeWeight.Hour);
        timeWMinute = JSON.stringify(timeWeight.Minute);

        if (timeWMinute.length == 0) {
          var min = "0" + timeWMinute;
        } else {
          var min = timeWMinute;
        }

        this.setState({ weightsData: doc.data() });

        this.setState({ weights: weights });
        this.setState({ timeWMonth: timeWMonth });
        this.setState({ timeWDay: timeWDay });
        this.setState({ timeWYear: timeWYear });
        this.setState({ timeWHour: timeWHour });
        this.setState({ timeWMinute: min });
      });
    });
  }

  componentDidMount() {
    var date = new Date();

    var dateString = date.toISOString();

    this.setState({ dateToday: dateString });

    var savedTime = [];

    if (savedTime.length == 0) {
      var emptyArray = [];
      var date = new Date();
      var dateString = date.toUTCString();
      emptyArray.concat(dateString);

      this.setState({ reserveUpdate: emptyArray });
    } else {
      var sorted = savedTime.sort();
      var onePoint = sorted[savedTime.length - 1];
      this.setState({ reserveUpdate: onePoint });
    }

    savedTime.sort();
    this.setState({ reserveUpdate: savedTime });

    // this.getBenchPress();
    this.getWeightsCount();
    // this.getGraphData();
    // this.getCardioCount();
    // this.getSquatRackCount();

    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => this.setState({ done: true }));
    }, 1200);
  }

  render() {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date();

    if (d.getMinutes() - Number.parseInt(this.state.timeBMinute) > 5) {
      var connection = "Wifi connection is slow...";
    }

    var dayName = days[d.getDay()];

    var title = [];
    var numPeople = [];

    if (this.state.poptimes != null) {
      for (var i = 0; i < this.state.poptimes.length; i++) {
        if (this.state.poptimes[i].name == dayName) {
          title.push(this.state.poptimes[i].name);
          for (var j = 0; j < this.state.poptimes[i].data.length; j++) {
            numPeople.push(this.state.poptimes[i].data[j]);
          }
        }
      }
    }

    var minutes = [];
    var people = [];

    this.state.times &&
      this.state.times.map((event) => {
        minutes.push(event.minute);
        people.push(event.people);
      });

    if (minutes.length > 10 && people.length > 10) {
      minutes = minutes.splice(9);
      people = people.splice(9);
    }

    const data = getStackLineChart({
      label: dayName,
      labels: minutes,
      data: people,
    });

    return (
      <Page className="DashboardPage">
        <br></br>

        <modal action="toggle"></modal>
        <FadeIn>
          <h1
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont",
              fontSize: "35px",
              fontWeight: "bold",
              color: "#0A0D18",
            }}
          >
            {" "}
            Dashboard{" "}
          </h1>
        </FadeIn>
        <br></br>
        <Row>
          <Col lg={3} md={6} sm={6} xs={12} c className="mb-3">
            <div class="mask flex-center rgba-blue-light">
              <FadeIn delay="100">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(124.39deg, #A77EF7 27.11%, #8E76F7 60.16%, #7B70F7 92.06%)",
                    color: "white",
                    "box-shadow": "2px 62px 75px -25px #A4A0F9",
                  }}
                  title="Gym Utilization"
                  subtitle={
                    <label>
                      {/* {this.state.weights}% */}
                      <progress
                        style={{
                          marginLeft: "20",
                          align: "center",
                        }}
                        value={0}
                        max="100"
                      ></progress>{" "}
                      0%
                    </label>
                  }
                  smalltitle={"FULL VERSION FEATURE"}
                />
              </FadeIn>
            </div>
          </Col>

          <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
            <FadeIn delay="200">
              <NumberWidget
                style={{
                  background:
                    "linear-gradient(120.57deg, #F08B87 14.94%, #F2A18E 61.23%, #F5BD96 98.79%)",
                  color: "white",
                  "box-shadow": " 2px 62px 75px -25px #EF8887 ",
                }}
                icon="ok"
                title="Member Head Count"
                subtitle="0 currently"
                // subtitle={this.state.weights + " currently"}
                // val={
                //   "Last Updated: " +
                //   this.state.timeWMonth +
                //   "/" +
                //   this.state.timeWDay +
                //   "/" +
                //   this.state.timeWYear +
                //   " @ " +
                //   this.state.timeWHour +
                //   ":" +
                //   this.state.timeWMinute
                // }
                smalltitle="FULL VERSION FEATURE"
                number="5,400"
                color="#F08A87"
              />
            </FadeIn>
          </Col>

          <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
            <FadeIn delay="300">
              <NumberWidget
                style={{
                  background:
                    "linear-gradient(123.01deg, #F3B0BF 0.8%, #D59CC8 53.78%, #9D78D9 98.7%)",
                  color: "white",
                  "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                }}
                icon="ok"
                title="Reservations"
                subtitle={"0 currently"}
                smalltitle={
                  "FULL VERSION FEATURE"
                  // this.state.reserveUpdate.length == 0
                  //   ? "LAST UPDATED: " +
                  //     this.state.reserveUpdate[
                  //       this.state.reserveUpdate.length - 1
                  //     ]
                  //   : "LAST UPDATED: " + this.state.dateToday
                }
                // val="- today"
                number="5,400"
                color="#F08A87"
              />
            </FadeIn>
          </Col>

          <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
            <FadeIn delay="400">
              <NumberWidget
                style={{
                  background:
                    "linear-gradient(120.57deg, #66DFC5 14.94%, #5ED0DB 61.23%, #56C2F2 98.79%)",
                  color: "white",
                  "box-shadow": " 2px 62px 75px -25px #82DAE7",
                }}
                icon="ok"
                title="Feedback"
                subtitle={"0 currently"}
                smalltitle={"FULL VERSION FEATURE"}
                number="5,400"
                color="#F08A87"
              />
            </FadeIn>
          </Col>
        </Row>

        <br></br>
        <FadeIn>
          <h1
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont",
              fontSize: "25px",
              fontWeight: "bold",
              color: "#0A0D18",
            }}
          >
            {" "}
            General Trends{" "}
          </h1>
        </FadeIn>
        <br></br>
        <div class="card-body">
          <p
            style={{
              textAlign: "center",
              "letter-spacing": "0.05em",
              fontSize: "9px",
              color: "#888888",
            }}
            class="card-text"
          >
            {" "}
            {dayName.toUpperCase()}{" "}
          </p>
        </div>
        <Col lg={25} md={50} sm={25} xs={25}>
          <Line
            style={{ background: "#F0F3F9" }}
            data={data}
            options={stackLineChartOptions}
          />
          <div class="card-body">
            <p
              style={{
                textAlign: "center",
                "letter-spacing": "0.05em",
                fontSize: "9px",
                color: "#888888",
              }}
              class="card-text"
            >
              {" "}
              TIME (HOUR){" "}
            </p>
          </div>
          <CardBody
            fontFamily="Poppins"
            style={{ position: "absolute", left: 5, textShadow: false }}
          >
            <CardTitle fontFamily="Poppins"></CardTitle>
          </CardBody>
        </Col>
      </Page>
    );
  }
}
export default DashboardPage;
