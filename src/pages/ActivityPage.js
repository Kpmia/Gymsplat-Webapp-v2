import { Col, Row, Modal, ModalBody } from "reactstrap";
import Page from "components/Page";
import { NumberWidget } from "components/Widget";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import FadeIn from "react-fade-in";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import DashboardPage from "./DashboardPage";
import GymFloor from '../assets/img/gymfloor.svg'

class ActivityPage extends DashboardPage {
  constructor(props) {
    super(props);
    this.state = {
      hoveredArea: null,
      machines: [],
      peoplecountfromgym: null,
      done: false,
    };
  }

  refreshPage() {
    window.location.reload(false);
  }

  onClick(props) {
    return <div>You touched it ! {props}</div>;
  }

  componentDidMount() {


    window.scrollTo(0, 0);

    this.getWeightsCount();
    // this.getCardioCount();
    // this.getBenchPress();
    // this.getSquatRackCount();

    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => this.setState({ done: true }));
    }, 1200);
  }

  render() {
    if (!this.state.done) {
      return <div>Loading</div>;
    } else {
      return (
        <Page
          title=""
          breadcrumbs={[{ name: "Activity", active: true }]}
          className="Activity"
        >
          {this.state.todos}

          <br></br>
          <div>
            {!this.state.done ? (
              <ReactLoading type={"bars"} color={"#6B7CF7"} />
            ) : (
              <FadeIn>
                <h1
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont",
                    fontSize: "35px",
                    fontWeight: "bold",
                    color: "#0A0D18",
                  }}
                >
                  Current Activity
                  <Button
                    style={{
                      "margin-left": "25px",
                      "border-color": "white",
                      fontWeight: "bold",
                      fontFamily: "-apple-system, BlinkMacSystemFont",
                      color: "#6B7CF7",
                      fontSize: "15px",
                      background: "#E5E8FD",
                      "box-shadow": ", inset 0px 4px 10px rgba(0, 0, 0, 0.25)",
                      "border-radius": "10px",
                    }}
                    onClick={() => window.location.reload(false)}
                  >
                    Refresh{" "}
                  </Button>
                </h1>
              </FadeIn>
            )}{" "}
          </div>

          <FadeIn delay="300">
            <Row>
              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(117.8deg, #A880F7 8.79%, #9077F7 62.27%, #8272F7 92.79%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #805BE9",
                  }}
                  icon="ok"
                  title="Section 1"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeWMonth +
                    "/" +
                    this.state.timeWDay +
                    "/" +
                    this.state.timeWYear +
                    " @ " +
                    this.state.timeWHour +
                    ":" +
                    this.state.timeWMinute
                  }
                  subtitle={this.state.weights + " currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>
{/* 
              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(123.01deg, #F08987 0.8%, #F2A48F 53.78%, #F6C197 98.7%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #EF8887 ",
                  }}
                  icon="ok"
                  title="Section 2"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeSMonth +
                    "/" +
                    this.state.timeSDay +
                    "/" +
                    this.state.timeSYear +
                    " @ " +
                    this.state.timeSHour +
                    ":" +
                    this.state.timeSMinute
                  }
                  subtitle={this.state.squat + " currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>

              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(120.57deg, #66DFC5 14.94%, #5ED0DB 61.23%, #56C2F2 98.79%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 3"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeCMonth +
                    "/" +
                    this.state.timeCDay +
                    "/" +
                    this.state.timeCYear +
                    " @ " +
                    this.state.timeCHour +
                    ":" +
                    this.state.timeCMinute
                  }
                  subtitle={this.state.cardio + " currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>

              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(123.01deg, #F3B0BF 0.8%, #D59CC8 53.78%, #9D78D9 98.7%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 4"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeBMonth +
                    "/" +
                    this.state.timeBDay +
                    "/" +
                    this.state.timeBYear +
                    " @ " +
                    this.state.timeBHour +
                    ":" +
                    this.state.timeBMinute
                  }
                  subtitle={this.state.bench + " currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>
            </Row>

            <Row>
              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(123.01deg, #F3B0BF 0.8%, #D59CC8 53.78%, #9D78D9 98.7%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 5"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeBMonth +
                    "/" +
                    this.state.timeBDay +
                    "/" +
                    this.state.timeBYear +
                    " @ " +
                    this.state.timeBHour +
                    ":" +
                    this.state.timeBMinute
                  }
                  subtitle={"20 currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>

              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(120.57deg, #66DFC5 14.94%, #5ED0DB 61.23%, #56C2F2 98.79%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 6"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeBMonth +
                    "/" +
                    this.state.timeBDay +
                    "/" +
                    this.state.timeBYear +
                    " @ " +
                    this.state.timeBHour +
                    ":" +
                    this.state.timeBMinute
                  }
                  subtitle={" 35 currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>

              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(123.01deg, #F08987 0.8%, #F2A48F 53.78%, #F6C197 98.7%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 7"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeBMonth +
                    "/" +
                    this.state.timeBDay +
                    "/" +
                    this.state.timeBYear +
                    " @ " +
                    this.state.timeBHour +
                    ":" +
                    this.state.timeBMinute
                  }
                  subtitle={"28 currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>

              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(117.8deg, #A880F7 8.79%, #9077F7 62.27%, #8272F7 92.79%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 8"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeBMonth +
                    "/" +
                    this.state.timeBDay +
                    "/" +
                    this.state.timeBYear +
                    " @ " +
                    this.state.timeBHour +
                    ":" +
                    this.state.timeBMinute
                  }
                  subtitle={"49 currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>
            </Row>

            <Row>
              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(123.01deg, #F3B0BF 0.8%, #D59CC8 53.78%, #9D78D9 98.7%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 9"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeBMonth +
                    "/" +
                    this.state.timeBDay +
                    "/" +
                    this.state.timeBYear +
                    " @ " +
                    this.state.timeBHour +
                    ":" +
                    this.state.timeBMinute
                  }
                  subtitle={"20 currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>

              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(120.57deg, #66DFC5 14.94%, #5ED0DB 61.23%, #56C2F2 98.79%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 10"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeBMonth +
                    "/" +
                    this.state.timeBDay +
                    "/" +
                    this.state.timeBYear +
                    " @ " +
                    this.state.timeBHour +
                    ":" +
                    this.state.timeBMinute
                  }
                  subtitle={" 35 currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>

              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(123.01deg, #F08987 0.8%, #F2A48F 53.78%, #F6C197 98.7%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 11"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeBMonth +
                    "/" +
                    this.state.timeBDay +
                    "/" +
                    this.state.timeBYear +
                    " @ " +
                    this.state.timeBHour +
                    ":" +
                    this.state.timeBMinute
                  }
                  subtitle={"28 currently"}
                  number="5,400"
                  color="#F08A87"
                />
              </Col>

              <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
                <NumberWidget
                  style={{
                    background:
                      "linear-gradient(117.8deg, #A880F7 8.79%, #9077F7 62.27%, #8272F7 92.79%)",
                    color: "white",
                    "box-shadow": " 2px 62px 75px -25px #CBB3E4",
                  }}
                  icon="ok"
                  title="Section 12"
                  smalltitle={
                    "LAST UPDATED: " +
                    this.state.timeBMonth +
                    "/" +
                    this.state.timeBDay +
                    "/" +
                    this.state.timeBYear +
                    " @ " +
                    this.state.timeBHour +
                    ":" +
                    this.state.timeBMinute
                  }
                  subtitle={"49 currently"}
                  number="5,400"
                  color="#F08A87" */}
                {/* />
              </Col> */}
            </Row>

            <br></br>

            <h2>  <strong> Gym Floor </strong> </h2>


            <img height={'auto'} width='100%' src={GymFloor} />

          </FadeIn>

          {/* <div>
        {!this.state.done ? (
          <ReactLoading type={'cubes'} color={"#6B7CF7"} />
        ) : (

          // <FadeIn>
          // <h1 style={{'fontFamily': '-apple-system, BlinkMacSystemFont', 'fontSize': '35px', 'fontWeight': 'bold', 'color': '#0A0D18'}}> 
          // Map of Gym Floor
          // </h1>
          // </FadeIn>
          )} 
          </div> */}
        </Page>
      );
    }
  }
}

export default ActivityPage;
