import React from 'react'
import Reservations from './Reservations'
import axios from 'axios'
import { Bar } from 'react-chartjs-2';
import { Label, Input, Table, Button, Card, Col, Row, CardHeader, CardBody, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Fade} from 'reactstrap';
import { getBarChart } from 'demos/barChart'
import FadeIn from 'react-fade-in';
import { Modal } from 'react-responsive-modal';
import ServerManager from './ServerManager';

class User extends ServerManager {
    
    handleMemberState = authState => {
          this.props.history.push('/members');
      };

    constructor() {
        super();
        this.state= {
            firstName: "",
            lastName: "",
            email: "",
            userId:  "",
            duration: "",
            password: "",
            machineId: "",
            machineName: "",
            itemId: "",
            smallMessage: "",
            openModal: false,
            showPopup: false,
            togglePopup: false,
            showAddQueueModal: false,
            showRemoveButton: false,
            totalNumReservations: 0,
            done: false
        }
    }
    
    openLoginModal = event => {
        this.setState({ openModal : true })
    }

    closeLoginModal = event => {
        this.setState({ openModal : false })
    }

    togglePopup = event => {
        this.setState({ togglePopup : !this.state.togglePopup })
    }

    openAddQueueModal = event => {
        this.state.machineName == "" ? 
        alert('Please first select a machine from the list.') : 
        this.setState({ showAddQueueModal : true })
    }

    closeAddQueueModal = event => {
        this.setState({ showAddQueueModal : false })
    }

    handleChangeEmail = event => {
        this.setState({ email : event.target.value })
    }

    handleChangePassword = event => {
        this.setState({ password : event.target.value })
    }

    handleChangeFirstName = event => {
        this.setState({ firstName : event.target.value })
    }

    handleChangeLastName = event => {
        this.setState({ lastName : event.target.value })
    }

    handleChangeDuration = event => {
        this.setState({ duration : event.target.value })
    }

    userMachine(event) {
        this.setState({ machineId : event._id })
        this.setState({ machineName : event.name })
    }

    getTotalNumberRes = event => {
        var totalNumUserRes = 0

        if (this.state.userId != "") {
            for(var i = 0; i < this.state.allMachineData.length; i++) {
                for (var j = 0; j < this.state.allMachineData[i].queue.length; j++) {
                    if (this.state.allMachineData[i].queue[j].userId._id == this.state.userId) {
                        totalNumUserRes += 1
                    }
                }
            }
        }
        this.setState({ totalNumReservations : totalNumUserRes })

        console.log(totalNumUserRes)
    }

    findUserMachines = event =>  {
        console.log('got here!')
        var message = ""
        var count = -1
        if (this.state.userId != "") {
            for(var i = 0; i < this.state.allMachineData.length; i++) {
                if (this.state.allMachineData[i]._id == event._id) {
                for(var j = 0; j < this.state.allMachineData[i].queue.length; j++ ) {
                    count += 1
                    if (this.state.allMachineData[i].queue[j].userId._id == this.state.userId) {
                        if (count == 0) {  message = "You are first!"}
                        else if (count == 1) {  message = "There is one person in front of you."}
                        else { message = "There are " + count + " people in front of you." }


                            this.setState({ smallMessage : message })
                            this.setState({ itemId : this.state.allMachineData[i].queue[j]._id })
                            this.setState({ showRemoveButton : true })
                            return;
                        }
                    }
                }
            }
        }
        this.setState({ smallMessage : ""})
        this.setState({ showRemoveButton : false })
    }

    addToQueue = event => {
        event.preventDefault();

        if (this.state.duration == "" || this.state.userMachine == "") {
            alert('Please select a time or machine.')
            return;  
        }
  
        if (this.state.userId == "") {
          const message = "Sorry, please first register or login."
          this.setState({ openModal : true })
          this.setState({ showAddQueueModal : false })
          this.setState({ togglePopup : true })

          alert(message)
          return;
        }
  
         else {
  
        const queueInfo = {
          userId: this.state.userId,
          token: this.state.userToken,
          machineId: this.state.machineId,
          duration: this.state.duration
        }
  
        axios({
          method: "post", 
          url: 'https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/queues/add',
          data: queueInfo,
          headers: { 'Content-Type': 'application/json' }

        }) .then(response => {

            console.log(response.data)

            alert("Added to the Queue!")
            this.setState({ showAddQueueModal : false })
            this.setState({ itemId : response.data._id })
            this.setState({ showRemoveButton : true })

            window.location.reload()
            })
        }
    }

    loginFlow = event => {

        if (this.state.email == "" || this.state.password == "" ) {
            alert("Please enter an email or password.")
            return;
   
          } else {

        const loginInfo = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(loginInfo)

        axios({
            method: "post", 
            url: "https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/login",
            data: loginInfo,
            headers: { 'Content-Type': 'application/json' }

          }) .then(response => {

            console.log(response)

            console.log(response.data.token)

            this.setState({ firstName : response.data.user.firstName })
            this.setState({ lastName : response.data.user.lastName })
            this.setState({ userToken : response.data.token })
            this.setState({ userId : response.data.user._id })

            this.setState({ openModal : false })

           alert("Successful attempt.")
   
         }) .catch ( error => {
           alert("Incorrect login.")
         
         })
        }
    }

    loggedOut = event => {


        this.setState({ userId : "" })
        this.setState({ firstName : "" })
        this.setState({ lastName : ""})
        this.setState({ email : ""})
        this.setState({ smallMessage : false })

        this.setState({ showRemoveButton : false})


        alert("Logged out")
  
      }


    removeFromQueue = event => {


        if (this.state.userId == "") {
          const message = "Sorry, login a user."
          alert(message)
          return;
    
        } else if (this.state.itemId == "" || this.state.machineId == "") {
          const message = "Please select which to remove."
          alert(message)
          return;
    
        } else {
    
        
        const queueRemove = {
          userId: this.state.userId,
          userToken: this.state.userToken,
          machineId: this.state.machineId,
          itemId: this.state.itemId
        }
    
        axios({
    
          method: "post", 
          url: "https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/queues/remove",
          data: queueRemove,
          headers: { 'Content-Type': 'application/json' }
    
        }) .then(response => {
    
          console.log('yess')
    
          alert('Removed!')
    
          console.log(response)
          this.setState({ machineId : ""})
          this.setState({ itemId : ""})
          this.setState({ showRemoveButton : false })


          window.location.reload()


      })
    
      }
    }





    handleSubmit = event => {



        event.preventDefault();

        if (this.state.email == "" || this.state.password == "" || this.state.firstname == "" || this.state.lastName == "") {
          let message = "You did not fill out all of the fields. Please do so."
          alert(message)
          return;

        } else {

        const userInfo = {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          role: "Member"
        }

        axios({
          method: "post", 
          url: "https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/signUp",
          data: userInfo,
          headers: { 'Content-Type': 'application/json' }
        }) .then(response => {
          console.log(response)

          const userId = response.data.user._id
          const userToken = response.data.token

          this.setState({ userToken : userToken})
          this.setState({ userId : userId })
          this.setState({ firstName : response.data.user.firstName})
          this.setState({ lastName : response.data.user.lastName})

          this.setState({ openModal : false })


          alert("Success")

        }) .catch ( error => {
          alert("That email or password has already been used.")
        })
      } 
    }

    componentDidMount() {

    this.getMachineData();
    this.getPopularTimes();
    this.getWeightsCount();
    this.getSquatRackCount();


    

     this.userData = JSON.parse(localStorage.getItem('user'));

     if (localStorage.getItem('user')) {
         this.setState({
             userId: this.userData.userId,
             firstName: this.userData.firstName,
             lastName: this.userData.lastName,
             email: this.userData.email,

         })
     } else {
         this.setState({
             userId: '',
             firstName: '',
             lastName: '',
             email: '',

         })
       }


        setInterval( () => {
            this.setState({
              curTime : new Date().toLocaleString()
            })
          },1000)

        
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }

    render() {


        // ** SECOND VERSION FEATURE **
        // const notifications = []
        // if(this.state.userId != "") {

        //     notifications.push(  
        //          <NotificationSystem
        //         dismissible={true}
        //         ref={notificationSystem =>
        //           (this.notificationSystem = notificationSystem)
        //         }
        //         style={NOTIFICATION_SYSTEM_STYLE}
        //       />
        // )

        

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date();
        var dayName = days[d.getDay()];

        var title = []
        var numPeople = []

        if (this.state.poptimes != null) {
            for(var i = 0; i < (this.state.poptimes).length; i++) {
                if (this.state.poptimes[i].name == dayName) {
                    title.push(this.state.poptimes[i].name)
                    for (var j = 0; j < this.state.poptimes[i].data.length; j++ ) {
                        numPeople.push(this.state.poptimes[i].data[j])
                    }
                }
            }
        }

        const data= getBarChart({
            label: dayName,
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 , 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            data: numPeople,
        })


    

        return (
        
        <div>

            {/* {notifications} */}

            <br></br>
            <br></br>
    

        <Col lg={6} sm={6} md={6} xs={12} className="mb-3>">
        <FadeIn delay='400'>

        <h1 style={{'fontFamily': '-apple-system, BlinkMacSystemFont', 'fontSize': '35px', 'fontWeight': 'bold', 'color': '#0A0D18'}}> 
        
        {this.state.userId != "" ? "Welcome " + this.state.firstName + " " + this.state.lastName  : "Hi there!"}  

        { this.state.userId == "" ? 
        <Button  style={{'color': 'white', 'alignContent': 'center', 'marginLeft': '20px'}} onClick={this.openLoginModal}> Log in </Button>
        :   <Button style={{'marginLeft': '20px', 'color': 'white'}} onClick={this.loggedOut}> Log out </Button>  }

        
        </h1>

        <p style={{'letter-spacing': '0.05em', 'fontSize': '15px', 'color': '#292929'}} class="card-text"> {this.state.curTime} </p>
        <br></br>
        <Modal 
        classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }} open={this.state.openModal} onClose={this.closeLoginModal} center> 
          <FadeIn> 
  
           <div class="custom-control custom-switch">
           <input type="checkbox" class="custom-control-input" id="customSwitches"/>
           <label style={{'animation': 'bounceIn'}} onClick={this.togglePopup} class="custom-control-label" for="customSwitches"> { this.state.showPopup ? "Log In" : "Sign Up"} </label>
         </div>
         
            {this.state.togglePopup ?  

            <div>

            <form>
            <div>
            <FadeIn>
                <h3 style={{'fontFamily': '--apple-system, BlinkMacSystemFont', 'fontSize': '45px', 'fontWeight': 'bold'}}>Sign Up</h3>

                <div className="form-group">
                    <label style={{'fontFamily': '--apple-system, BlinkMacSystemFont'}}>Email address</label>
                    <Input  className="form-control" style={{'fontWeight': 'thin'}}   placeholder="Enter email" email="email" onChange={this.handleChangeEmail}/>
                </div>

                <div className="form-group">
                    <Label>Password</Label>
                    <Input type="password" className="form-control" password="password" onChange={this.handleChangePassword} placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>First Name</label>
                    <Input type="name" className="form-control" firstName="firstName" onChange={this.handleChangeFirstName} placeholder="Enter first name" />
                </div>
                
                <div className="form-group">
                    <label>Last Name</label>
                    <Input type="name" className="form-control" lastName="lastName" onChange={this.handleChangeLastName} placeholder="Enter last name" />
                </div>

                <Button onClick={this.handleSubmit} style={{'fontWeight': 'lighter', 'fontSize': '14px', 'color': 'white', 'letterSpacing': '0.05em'}} className="bg-gradient-theme-left btn-block border-0">SUBMIT</Button>
      

                </FadeIn>
                <br></br>
                </div>

            </form>


</div>


 : 
 
 
                <div>

            
              <form>
              <FadeIn>
                 <h3 style={{'fontFamily': '--apple-system, BlinkMacSystemFont', 'fontSize': '45px', 'fontWeight': 'bold'}}>Log In</h3>
 
                 <div className="form-group">
                     <label style={{'fontFamily': 'BlinkMacSystemFont'}}>Email address</label>
                     <Input type="email"  onChange={this.handleChangeEmail} className="form-control" placeholder="Enter email" email="email" />
                 </div>
 
                 <div className="form-group">
                     <label>Password</label>
                     <Input type="password" onChange={this.handleChangePassword} className="form-control" password="password" placeholder="Enter password" />
                 </div>
 
                 <Button onClick={this.loginFlow} className="bg-gradient-theme-left btn-block border-0" style={{'fontWeight': 'lighter', 'fontSize': '14px', 'color': 'white', 'letterSpacing': '0.05em'}}> LOGIN</Button>
                 <p className="forgot-password text-right">
                     Forgot <a href="#">password?</a>
                 </p>
                 </FadeIn>
             </form>
             </div> }
              </FadeIn>
            </Modal>

        </FadeIn>
        </Col>

       <Row>


         <Col lg={6} md={6} sm={6} xs={12} className="mb-3"> 


<FadeIn delay='1000'>

{/* 
<Card style={{'box-shadow': '0px 4px 10px rgba(132, 131, 131, 0.25)','border-radius': '8px'}}> 
    <div class="card-body">

        <p className="float-left" style={{'letter-spacing': '0.05em', 'fontSize': '15px', 'color': '#292929'}} class="card-text"> RESERVATIONS </p>
        <p>  { this.state.smallMessage != "" ? this.state.smallMessage  : "" } </p>
        <UncontrolledButtonDropdown style={{'backgroundColor': '#FFF','color': '#8B74FC'}} className="float-right">
      <DropdownToggle  className="btn-primary-left border-0" style={{ 'marginRight': '10px', 'color': 'white'}} caret>
        {this.state.machineName == "" ? "Choose" : this.state.machineName}
      </DropdownToggle>
      <DropdownMenu>
        { this.state.allMachineData && this.state.allMachineData.map( event => {
            return (
              <div onClick={() => {
                  this.userMachine(event);
                  this.findUserMachines(event)
                  }}>
                  <DropdownItem> {event.name} </DropdownItem>
              </div>

          )}
        )}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
    </div>
    <Table responsive>
        <tr>
            <th> # </th>
            <th className="text-center"> Name </th>
            <th className="text-center"> Duration </th>

        </tr>
        <tbody>
            { this.state.allMachineData && this.state.allMachineData.map( event => {
                if (this.state.machineName == event.name) {
                    var mapping = Array.from(event.queue)
                    return (
                        mapping.map( (details, i) => 
                        <tr key={i}> 
                        <th> {i + 1} </th>
                        <th className="text-center"> {details.userId.firstName + " " + details.userId.lastName} </th>
                        <th className="text-center"> {details.duration} </th>

                        </tr>
                        )
                    )
                }})
            }
        </tbody>
    </Table>

    { this.state.showRemoveButton == false  ? 
    <div>
    <Button onClick={this.openAddQueueModal}  className="btn-primary btn-block"
 style={{'color': 'white'}}> Add yourself! </Button>
    </div>
    : this.state.showRemoveButton == true ?
    <div>
    <Button onClick={this.removeFromQueue}  className="btn btn-secondary btn-block" style={{'color': 'white'}}> Remove </Button>
    </div> 
    : null
    } 

    <Modal 
        classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }} open={this.state.showAddQueueModal} onClose={this.closeAddQueueModal} center> 

        For how long? (minutes)
            <Input type="select" name="select" id="exampleSelect" onChange={this.handleChangeDuration}>
                  <option  value="1">1</option>
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

             <Button onClick={this.addToQueue} className="btn btn-secondary btn-block" style={{'color': 'white'}}> {this.state.machineName + " for " + this.state.duration  + " minutes"} </Button>

        </Modal>



</Card> */}

</FadeIn>

</Col>


        <Col lg={6} md={6} sm={6} xs={12} className="mb-3"> 


          <FadeIn delay='1000'>
             <Card style={{'box-shadow': '0px 4px 10px rgba(132, 131, 131, 0.25)','border-radius': '8px'}}> 
                <div class="card-body">
                    <p style={{'letter-spacing': '0.05em', 'fontSize': '15px', 'color': '#292929'}} class="card-text"> ACTIVITY LEVELS  </p>
                    <p style={{'textAlign': 'center','letter-spacing': '0.05em', 'fontSize': '9px', 'color': '#888888'}} class="card-text"> {dayName.toUpperCase()} </p>

                </div>
                 <Bar style={{'border-radius': '7px'}}  data={data}/>
                 <div class="card-body">
                    <p style={{'textAlign': 'center','letter-spacing': '0.05em', 'fontSize': '9px', 'color': '#888888'}} class="card-text"> TIME </p>
                </div>
            </Card>

            </FadeIn>

         </Col>

         </Row>

         <Row>

         <Col lg={3} md={6} sm={6} xs={12}> 
         <FadeIn delay='300'>

             <Card style={{'border-radius': '2px', 'background': 'linear-gradient(54.22deg, #448FF5 -7.69%, #7C40E5 -7.68%, #3DB0EF 88.24%)'}}>
                 <CardBody>
                 <div class="card-body">
                    { this.state.weights && this.state.weights.map( event => {

                       return (
                           <div>
                    <p style={{'line-height': '28px','color': '#FFF', 'fontSize': '40px'}}> {event.People} </p>
                    <p style={{'letter-spacing': '0.00em', 'opacity': '0.7', 'fontFamily': 'Helvetica', 'fontWeight': 'lighter', 'fontSize': '18px', 'color': '#FFF'}} class="card-text"> People in Weights Section </p>
                    <p style={{'letter-spacing': '0.05em', 'opacity': '0.6', 'fontFamily': 'Helvetica', 'fontWeight': 'lighter', 'fontSize': '13px', 'color': '#FFF'}} class="card-text"> {"UPDATED AT: " + event.Month + "/" + event.Day + "/" + event.Year + " @ " + event.Hour + ":" + event.Minute}  </p>
                          </div>
                      )
                  })
                }
                </div>
                 </CardBody>
             </Card>  
           </FadeIn>
            </Col>

             <Col lg={3} md={6} sm={6} xs={12}> 
             <FadeIn delay='600'>


             <Card style={{'border-radius': '2px', 'background': 'linear-gradient(51.87deg, #4DCCEF -7.69%, #84E2BB 88.24%)'}}>
                 <CardBody>
                 <div class="card-body">
                    { this.state.squat && this.state.squat.map( event => {

                        return (
                            <div>
                            <p style={{'line-height': '30px','color': '#FFF', 'fontSize': '40px'}}>  {event.People} </p>
                            <p style={{'opacity': '0.8', 'fontFamily': 'Helvetica', 'fontWeight': 'lighter', 'fontSize': '18px', 'color': '#FFF'}} class="card-text"> People in Squat Racks Section </p>
                            <p style={{'letter-spacing': '0.05em', 'opacity': '0.6', 'fontFamily': 'Helvetica', 'fontWeight': 'lighter', 'fontSize': '13px', 'color': '#FFF'}} class="card-text">  {"UPDATED AT: " + event.Month + "/" + event.Day + "/" + event.Year + " @ " + event.Hour + ":" + event.Minute}  </p>
                            </div>
                        )
                    })
                }

                 </div>
                 </CardBody>
             </Card>  
             </FadeIn>

             </Col>

             <Col lg={3} md={6} sm={6} xs={12}> 
             <FadeIn delay='900'>


             <Card style={{'border-radius': '2px', 'background': 'linear-gradient(56.61deg, #F7086F -7.01%, #A93BAC 94.96%)'}}>
                 <CardBody>
                 <div class="card-body">
                    <p style={{'line-height': '30px','color': '#FFF', 'fontSize': '40px'}}> - </p>
                    <p style={{'opacity': '0.8', 'fontFamily': 'Helvetica', 'fontWeight': 'lighter', 'fontSize': '17px', 'color': '#FFF'}} class="card-text"> - </p>
                    <p style={{'letter-spacing': '0.05em', 'opacity': '0.6', 'fontFamily': 'Helvetica', 'fontWeight': 'lighter', 'fontSize': '9px', 'color': '#FFF'}} class="card-text"> - </p>
                </div>
                 </CardBody>
             </Card>  
             </FadeIn>

             </Col>


             <Col lg={3} md={6} sm={6} xs={12}> 
             <FadeIn delay='1200'>

             <Card style={{'border-radius': '2px', 'background': 'linear-gradient(58.65deg, #F34D34 23.23%, #F05833 23.24%, #EA1A66 93.51%)'}}>
                 <CardBody>
                 <div class="card-body">
                    <p style={{'line-height': '30px','color': '#FFF', 'fontSize': '40px'}}> - </p>
                    <p style={{'opacity': '0.8', 'fontFamily': 'Helvetica', 'fontWeight': 'lighter', 'fontSize': '17px', 'color': '#FFF'}} class="card-text"> - </p>
                    <p style={{'letter-spacing': '0.05em', 'opacity': '0.6', 'fontFamily': 'Helvetica', 'fontWeight': 'lighter', 'fontSize': '9px', 'color': '#FFF'}} class="card-text"> - </p>
                </div>
                 </CardBody>
             </Card>  
             </FadeIn>

             </Col>

        </Row>

            </div>
        )
    }


}

export default User

