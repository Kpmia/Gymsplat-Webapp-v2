import {
  Button,
  Col,
  Row,
  Table,
  UncontrolledButtonDropdown,
} from "reactstrap";
import Page from "components/Page";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import FadeIn from "react-fade-in";
import "bootstrap/dist/css/bootstrap.css";
import { Animated } from "react-animated-css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import {
  Label,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardImg,
} from "reactstrap";
import {
  motion,
  useViewportScroll,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "@lottiefiles/lottie-player";
import DashboardPage from "./DashboardPage";

const axios = require("axios");

class Reservations extends DashboardPage {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      password: "",
      role: "Member",
      currentUser: "",
      itemId: "",
      dropdownOpen: false,
      setOpen: false,
      machineId: "",
      selectMachine: "",
      userMachine: [],
      userToken: "",
      allMachineData: "",
      matchedMachineData: [],
      successMessage: false,
      successAnimation: "",
      duration: "",
      dropdownMachineName: "",
      done: undefined,
      showPopup: false,
      secondmodal: false,
      showSmallPopup: false,
      addPersonButton: true,
      modalPopUp: false,
      removalForm: false,
      open: false,
      selectedOption: null,
      areYouSureModal: false,
    };
  }

  dropDownButton = () => {
    this.setState({ setOpen: !this.state.setOpen });
  };

  onOpenSecondModal = () => {
    this.setState({ secondmodal: true });
  };

  onCloseSecondModal = () => {
    this.setState({ secondmodal: false });
  };

  chooseMachine(event) {
    this.setState({ selectMachine: event.name });
  }

  userMachine(event) {
    this.setState({ userMachine: event._id });
    this.setState({ dropdownMachineName: event.name });
  }

  toggle = () => {
    this.setState({ dropdownOpen: true });
  };

  logoutMessage() {
    this.setState({ showSmallPopup: !this.state.showSmallPopup });
  }

  toggleModalPopup() {
    this.setState({ modalPopUp: !this.state.modalPopUp });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenSuccessMessage = () => {
    this.setState({ successMessage: true });
  };
  onCloseSuccessMessage = () => {
    this.setState({ successMessage: false });
    window.location.reload();
  };

  onOpenRemovalForm = () => {
    this.setState({ removalForm: true });

    fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
      var count = 0;
      for (var i = 0; i < this.state.allMachineData.length; i++) {
        var machineId = this.state.allMachineData[i]._id;

        for (var j = 0; j < this.state.allMachineData[i].queue.length; j++) {
          const matchedUser = this.state.allMachineData[i].queue[j].userId._id;
          var machineId = this.state.allMachineData[i]._id;
          var machineName = this.state.allMachineData[i].name;
          if (this.state.userId == matchedUser) {
            var joined = this.state.matchedMachineData.concat(
              this.state.allMachineData[i].queue[j]
            );

            joined[count]["name"] = machineName;
            joined[count]["machineId"] = machineId;

            count = count + 1;

            this.setState({ matchedMachineData: joined });
          }
        }
      }
    });
  };

  onCloseRemovalForm = () => {
    this.setState({ removalForm: false });
    this.setState({ matchedMachineData: [] });
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  Logout = (event) => {
    const message = ".";

    this.setState({ userId: "" });
    this.setState({ userToken: "" });
    this.setState({ firstName: "" });
    this.setState({ lastName: "" });
    this.setState({ email: "" });

    this.setState({ showSmallPopup: !this.state.showSmallPopup });
    this.setState({ addPersonButton: true });

    alert("Logged out");
  };

  confirmUser = (event) => {
    event.preventDefault();

    if (this.state.email == "") {
      alert("Please enter an email.");
      return;
    } else {
      var findUserId = false;
      axios
        .get(
          "https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/users"
        )
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (this.state.email == res.data[i].email) {
              this.setState({ userId: res.data[i]._id });
              this.setState({ firstName: res.data[i].firstName });
              this.setState({ lastName: res.data[i].lastName });
              findUserId = true;
            }
          }
          if (findUserId == false) {
            alert("User has not registered. Please register first.");
            return;
          }
          this.setState({ open: false });
          this.setState({ addPersonButton: false });
          this.setState({ showSmallPopup: true });

          alert("Successful attempt.");
        })
        .catch((error) => {
          alert("Something went wrong.");
        });
    }
  };

  handleChangeFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  };

  handleChangeLastName = (event) => {
    this.setState({ lastName: event.target.value });
  };

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangeDuration = (event) => {
    this.setState({ duration: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleRemoveId = (event) => {
    this.setState({ userId: event.target.value });
  };
  handleRemoveItemId = (event) => {
    this.setState({ itemId: event.target.value });
  };
  handleRemoveMachineId = (event) => {
    console.log(event.target.value);
    this.setState({ machineId: event.target.value });
  };

  openAreYouSureModal = () => {
    this.setState({ areYouSureModal: true });
  };

  closeAreYouSureModal = () => {
    this.setState({ areYouSureModal: false });
  };

  fetchDetails(event) {
    this.setState({ itemId: event._id });
    this.setState({ machineId: event.machineId });
    // var matchedMachineData = [...this.state.matchedMachineData];
    // matchedMachineData.splice(i, 1);
    // this.setState({matchedMachineData});
    this.setState({ areYouSureModal: true });
  }

  addEmptyTableCell = (event) => {
    this.setState({ areYouSureModal: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.firstname == "" ||
      this.state.lastName == ""
    ) {
      let message = "You did not fill out all of the fields. Please do so.";
      alert(message);
      return;
    } else {
      const userInfo = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: "Member",
      };

      axios({
        method: "post",
        url:
          "https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/signUp",
        data: userInfo,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response);

          const userId = response.data.user._id;
          const userToken = response.data.token;

          this.setState({ userToken: userToken });
          this.setState({ userId: userId });
          this.setState({ firstName: response.data.user.firstName });
          this.setState({ lastName: response.data.user.lastName });
          this.setState({ showPopup: !this.state.showPopup });
          this.setState({ showSmallPopup: !this.state.showSmallPopup });
          this.setState({ open: false });
          this.setState({ addPersonButton: false });

          alert("Success");
        })
        .catch((error) => {
          alert("That email or password has already been used.");
        });
    }
  };

  addToQueue = (event) => {
    event.preventDefault();

    if (this.state.userId == "") {
      const message = "Sorry, please first register or login the user!";
      alert(message);
      return;
    }
    if (this.state.duration == "" || this.state.userMachine == "") {
      alert("Please select a time or machine.");
      return;

      // } else if (this.state.machineId == "" || this.state.duration == "") {
      //   const message = "Choose a machine to reserve or choose a time."
      //   alert(message)
      //   return;
    } else {
      const queueInfo = {
        userId: this.state.userId,
        machineId: this.state.userMachine,
        duration: this.state.duration,
      };

      axios({
        method: "post",
        url:
          "https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/queues/add",
        data: queueInfo,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        var lengthArray = response.data.queue.length - 1;
        this.setState({ itemId: response.data.queue[lengthArray]._id });
        this.setState({ secondmodal: false });
        this.setState({ successMessage: true });

        alert("Added to the Queue!");
      });
    }
  };

  RemoveFromQueue = (event) => {
    if (this.state.userId == "") {
      const message = "Sorry, login a user.";
      alert(message);
      return;
    } else if (this.state.itemId == "" || this.state.machineId == "") {
      const message = "Please select which to remove.";
      alert(message);
      return;
    } else {
      const queueRemove = {
        userId: this.state.userId,
        machineId: this.state.machineId,
        itemId: this.state.itemId,
      };

      axios({
        method: "post",
        url:
          "https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/queues/remove",
        data: queueRemove,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        console.log("yess");

        alert("Removed!");

        console.log(response);
        this.setState({ userMachine: "" });
        this.setState({ itemId: "" });
        this.setState({ areYouSureModal: false });
        window.location.reload();
      });
    }
  };
  getMachineData() {
    return this.state.allMachineData;
  }

  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("managermember"));

    if (localStorage.getItem("managermember")) {
      this.setState({
        userId: this.userData.userId,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        email: this.userData.email,
        showSmallPopup: this.userData.showSmallPopup,
        addPersonButton: this.userData.addPersonButton,
      });
    } else {
      this.setState({
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        showSmallPopup: false,
        addPersonButton: true,
      });
    }

    var array = [];
    axios
      .get(
        "https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/machines"
      )
      .then((res) => {
        array.push(res.data[0]);

        this.setState({ allMachineData: res.data });
        this.setState({ usersCollection: array });
      })
      .catch(function (error) {
        console.log(error);
      });

    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          this.setState({ done: true });
        });
    }, 1200);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("managermember", JSON.stringify(nextState));
  }

  render() {
    return (
      <Page
        title=""
        breadcrumbs={[{ name: "Reservations", active: true }]}
        className="Activity"
      >
        {this.state.userId != "" ? (
          <div>
            <Animated
              animationIn="bounce"
              animationOut="fadeOut"
              isVisible={true}
            >
              <p style={{ textAlign: "right", color: "#999999" }}>
                {" "}
                Signed in{" "}
                {this.state.firstName + " " + this.state.lastName + " "}{" "}
              </p>
            </Animated>
            <button
              onClick={this.Logout}
              className="btn float-right"
              style={{
                color: "#999999",
                "margin-left": "25px",
                border: "4px solid #E7E7E7",
                "box-sizing": "border-box",
                "border-radius": "7px",
              }}
            >
              {" "}
              Sign Out{" "}
            </button>
          </div>
        ) : (
          <div> </div>
        )}

        <div>
          <Modal
            classNames={{
              overlay: "customOverlay",
              modal: "customModal",
            }}
            open={this.state.open}
            onClose={this.onCloseModal}
            center
          >
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customSwitches"
              />
              <label
                style={{ animation: "bounceIn" }}
                onClick={this.togglePopup.bind(this)}
                class="custom-control-label"
                for="customSwitches"
              >
                {" "}
                {this.state.showPopup ? "Log In" : "Sign Up"}{" "}
              </label>
            </div>

            {this.state.showPopup ? (
              <div>
                <form>
                  <div>
                    <FadeIn>
                      <h3
                        style={{
                          fontFamily: "--apple-system, BlinkMacSystemFont",
                          fontSize: "45px",
                          fontWeight: "bold",
                        }}
                      >
                        Sign Up
                      </h3>

                      <div className="form-group">
                        <label
                          style={{
                            fontFamily: "--apple-system, BlinkMacSystemFont",
                          }}
                        >
                          Email address
                        </label>
                        <Input
                          className="form-control"
                          style={{ fontWeight: "thin" }}
                          placeholder="Enter email"
                          email="email"
                          onChange={this.handleChangeEmail}
                        />
                      </div>

                      <div className="form-group">
                        <Label>Password</Label>
                        <Input
                          type="password"
                          className="form-control"
                          password="password"
                          onChange={this.handleChangePassword}
                          placeholder="Enter password"
                        />
                      </div>

                      <div className="form-group">
                        <label>First Name</label>
                        <Input
                          type="name"
                          className="form-control"
                          firstName="firstName"
                          onChange={this.handleChangeFirstName}
                          placeholder="Enter first name"
                        />
                      </div>

                      <div className="form-group">
                        <label>Last Name</label>
                        <Input
                          type="name"
                          className="form-control"
                          lastName="lastName"
                          onChange={this.handleChangeLastName}
                          placeholder="Enter last name"
                        />
                      </div>

                      <Button
                        onClick={this.handleSubmit}
                        style={{ color: "white" }}
                        className="btn btn-primary btn-block"
                      >
                        Submit
                      </Button>
                    </FadeIn>
                    <br></br>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <form>
                  <FadeIn>
                    <h3
                      style={{
                        fontFamily: "--apple-system, BlinkMacSystemFont",
                        fontSize: "45px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Member Sign In{" "}
                    </h3>

                    <div className="form-group">
                      <label style={{ fontFamily: "BlinkMacSystemFont" }}>
                        Email address
                      </label>
                      <Input
                        type="email"
                        onChange={this.handleChangeEmail}
                        className="form-control"
                        placeholder="Enter email"
                        email="email"
                      />
                    </div>

                    <Button
                      onClick={this.confirmUser}
                      className="btn btn-secondary btn-block"
                      style={{ color: "white" }}
                    >
                      Submit user
                    </Button>
                    <p className="forgot-password text-right">
                      Forgot <a href="#">password?</a>
                    </p>
                  </FadeIn>
                </form>
              </div>
            )}

            {this.state.loginPopUp ? (
              <div>
                <form>
                  <h3
                    style={{
                      fontFamily: "--apple-system, BlinkMacSystemFont",
                      fontSize: "45px",
                      fontWeight: "bold",
                    }}
                  >
                    Log In
                  </h3>

                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      email="email"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      password="password"
                      onChange={this.handleChange}
                      placeholder="Enter password"
                    />
                  </div>

                  <button
                    onClick={this.handleSubmit}
                    className="btn btn-primary btn-block"
                    style={{ "border-color": "gray" }}
                  >
                    Submit
                  </button>
                  <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                  </p>
                </form>
              </div>
            ) : null}
          </Modal>
        </div>

        {this.state.signUpPopup ? (
          <div>
            <form>
              <h3
                style={{
                  fontFamily: "--apple-system, BlinkMacSystemFont",
                  fontSize: "45px",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </h3>

              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  email="email"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  password="password"
                  onChange={this.handleChange}
                  placeholder="Enter password"
                />
              </div>

              <div className="form-group">
                <label>First Name</label>
                <input
                  type="name"
                  className="form-control"
                  firstName="firstName"
                  onChange={this.handleChange}
                  placeholder="Enter first name"
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="name"
                  className="form-control"
                  lastName="lastName"
                  onChange={this.handleChange}
                  placeholder="Enter last name"
                />
              </div>

              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <button
                onClick={this.handleSubmit}
                className="btn btn-primary btn-block"
                style={{ "border-color": "gray" }}
              >
                Submit
              </button>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </form>
          </div>
        ) : null}

        {!this.state.done ? (
          <ReactLoading type={"bars"} color={"#6B7CF7"} />
        ) : (
          <div>
            <br></br>
            <h1
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont",
                fontSize: "35px",
                fontWeight: "bold",
                color: "#0A0D18",
              }}
            >
              {" "}
              Reservations{" "}
            </h1>

            <br></br>
          </div>
        )}

        <UncontrolledButtonDropdown className="float-left">
          <DropdownToggle style={{ marginRight: "10px", color: "white" }} caret>
            {this.state.selectMachine == ""
              ? "Machines"
              : this.state.selectMachine}
          </DropdownToggle>
          <DropdownMenu>
            {this.state.allMachineData &&
              this.state.allMachineData.map((event) => {
                return (
                  <div
                    onClick={() => {
                      this.chooseMachine(event);
                    }}
                  >
                    <DropdownItem> {event.name} </DropdownItem>
                  </div>
                );
              })}
          </DropdownMenu>
        </UncontrolledButtonDropdown>

        {this.state.firstName == "" ? (
          <div>
            <Button
              classname="btn-primary float-left btn-lg"
              style={{ color: "white" }}
              onClick={this.onOpenModal}
            >
              {" "}
              Add Person{" "}
            </Button>
          </div>
        ) : null}

        {this.state.userId != "" ? (
          <div>
            <Modal
              classNames={{
                overlay: "customOverlay",
                modal: "customModal",
                focusTrapped: true,
                animationDuration: "500",
              }}
              open={this.state.removalForm}
              onClose={this.onCloseRemovalForm}
              center
            >
              <h1
                style={{
                  fontWeight: "bold",
                  fontFamily: "BlinkMacSystemFont, --apple-system",
                }}
              >
                {" "}
                User Sessions{" "}
              </h1>

              {!this.state.done ? (
                <ReactLoading type={"bars"} color={"#6B7CF7"} />
              ) : (
                <div>
                  <br></br>
                  <Table>
                    <tr>
                      {/* <th> Machine </th> */}
                      <th> # </th>
                      <th> Name </th>
                      <th> Duration </th>
                      <th> Time </th>
                      <th> Remove </th>
                    </tr>

                    <tbody>
                      {this.state.matchedMachineData &&
                        this.state.matchedMachineData.map((event, i) => {
                          return (
                            <tr
                              key={i}
                              data-item={event}
                              onClick={() => this.fetchDetails(event)}
                            >
                              <th> {i + 1} </th>
                              <th> {event.name} </th>
                              <th> {event.duration} </th>
                              <th> {event.updatedAt} </th>
                              <th>
                                {" "}
                                <Button
                                  style={{ color: "white" }}
                                  onClick={() => this.openAreYouSureModal}
                                >
                                  {" "}
                                  Remove{" "}
                                </Button>{" "}
                              </th>
                            </tr>
                          );
                        })}
                    </tbody>

                    <Modal
                      classNames={{
                        overlay: "customOverlay",
                        modal: "customModal",
                      }}
                      open={this.state.areYouSureModal}
                      onClose={this.closeAreYouSureModal}
                      center
                    >
                      Are you sure you want to remove{" "}
                      <strong>
                        {" "}
                        {this.state.firstName + " " + this.state.lastName}{" "}
                      </strong>
                      ?
                      <Button
                        onClick={this.addEmptyTableCell}
                        className="btn float-right"
                        style={{ color: "white" }}
                      >
                        {" "}
                        No{" "}
                      </Button>
                      <Button
                        onClick={this.RemoveFromQueue}
                        className="btn float-right"
                        style={{ marginRight: "10px", color: "white" }}
                      >
                        {" "}
                        Remove{" "}
                      </Button>
                    </Modal>
                  </Table>
                </div>
              )}
            </Modal>

            <Button
              onClick={this.onOpenRemovalForm}
              className="btn float-right"
              style={{ color: "white" }}
            >
              {" "}
              Remove Person{" "}
            </Button>

            <Button
              onClick={this.onOpenSecondModal}
              className="btn float-right"
              style={{ marginRight: "10px ", color: "white" }}
            >
              {" "}
              Add to Queue{" "}
            </Button>

            <br></br>

            <Modal
              classNames={{
                overlay: "customOverlay",
                modal: "custommodal",
              }}
              open={this.state.secondmodal}
              onClose={this.onCloseSecondModal}
              center
            >
              <p> You are adding: </p>
              <h1
                style={{
                  fontWeight: "bold",
                  fontFamily: "-apple-system, BlinkMacSystemFont",
                }}
              >
                {" "}
                {this.state.firstName + " " + this.state.lastName}
              </h1>
              <p> Please pick the workout duration (default: 5m).</p>

              {/* <Input type="select" name="select" id="exampleSelect"> */}

              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={this.handleChangeDuration}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Input>
              <br></br>

              <p> Please choose a machine (default: bench press).</p>

              <UncontrolledButtonDropdown>
                <DropdownToggle style={{ color: "white" }} caret>
                  {this.state.userMachine != ""
                    ? this.state.dropdownMachineName
                    : "Choose"}
                </DropdownToggle>
                <DropdownMenu>
                  {this.state.allMachineData &&
                    this.state.allMachineData.map((event) => {
                      return (
                        <div onClick={() => this.userMachine(event)}>
                          <DropdownItem> {event.name} </DropdownItem>
                        </div>
                      );
                    })}
                </DropdownMenu>
              </UncontrolledButtonDropdown>

              <br></br>
              <br></br>

              {this.state.dropdownMachineName != "" &&
              this.state.duration != "" ? (
                <div>
                  {" "}
                  <FadeIn>
                    {this.state.dropdownMachineName +
                      " for " +
                      this.state.duration +
                      " minutes"}{" "}
                  </FadeIn>{" "}
                </div>
              ) : (
                ""
              )}

              <br></br>

              <button
                onClick={this.addToQueue}
                className="btn float-right"
                style={{ "border-color": "gray" }}
              >
                {" "}
                Confirm{" "}
              </button>
            </Modal>

            <Modal
              classNames={{
                overlay: "customOverlay",
                modal: "customModal",
                focusTrapped: true,
                animationDuration: "500",
              }}
              open={this.state.successMessage}
              onClose={this.onCloseSuccessMessage}
              center
            >
              <br></br>
              <FadeIn>
                <h1
                  style={{
                    textAlign: "center",
                    fontFamily: "BlinkMacSystemFont",
                    fontWeight: "bold",
                  }}
                  classname="centered"
                >
                  Successful!
                </h1>
              </FadeIn>

              <FadeIn delay="600">
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    fontFamily: "BlinkMacSystemFont",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {this.state.firstName + " " + this.state.lastName}{" "}
                </p>
                <p
                  style={{
                    fontFamily: "BlinkMacSystemFont",
                    textAlign: "center",
                  }}
                  class="text-align"
                >
                  {" "}
                  has been added to{" "}
                  {this.state.dropdownMachineName +
                    " for " +
                    this.state.duration +
                    " minutes."}{" "}
                </p>
              </FadeIn>

              <br></br>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={this.onCloseSuccessMessage}
                style={{ "border-radius": "7px", color: "white" }}
                className="btn btn-primary float-right"
              >
                {" "}
                Great!{" "}
              </motion.button>
            </Modal>
          </div>
        ) : null}
        <br></br>

        <Table responsive>
          <tr>
            <th> # </th>
            <th className="text-center"> Time </th>
            <th className="text-center"> Name </th>
            <th className="text-center"> Email </th>
            <th className="text-center"> Duration </th>
          </tr>
          <tbody>
            {this.state.allMachineData &&
              this.state.allMachineData.map((event) => {
                if (this.state.selectMachine == event.name) {
                  var mapping = Array.from(event.queue);
                  return mapping.map((details, i) => (
                    <tr key={i}>
                      <th> {i + 1} </th>
                      <th className="text-center"> {details.updatedAt} </th>
                      <th className="text-center">
                        {" "}
                        {details.userId.firstName +
                          " " +
                          details.userId.lastName}{" "}
                      </th>
                      <th className="text-center"> {details.userId.email} </th>
                      <th className="text-center"> {details.duration} </th>
                    </tr>
                  ));
                }
              })}
          </tbody>
        </Table>
      </Page>
    );
  }
}

document.getElementById("Help-modal");

export default Reservations;
