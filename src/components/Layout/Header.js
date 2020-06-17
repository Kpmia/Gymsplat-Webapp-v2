import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import React from 'react';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';
import Cookies from 'universal-cookie';

const bem = bn.create('header');

const cookies = new Cookies()

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'secondary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small> 2 </small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    email: '',
    displayName: '',
    role: ''
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  loggedOut = event => {
    cookies.remove('userIdManager')
    firebase.auth().signOut().then(function() {
      alert('Successful Logout.')
    })
    cookies.remove('userIdManager')
    window.location.href = '/login'
  }

  onOpenUpdateProfile = event => {
    return window.location.href = "/userprofile"
  }

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  getStaffMembers(id) {
    var database = firebase.database()
    database.ref('crc/users').on('value', event => {

        let users = event.val()

        console.log(users)

        let newState = []

        var role = ''


        for (var user in users) {
          if (user == id) {
              this.setState({ role : users[user].role })
              console.log('that is her!')
              newState.push({
                _id: user,
                creation: users[user].accountCreation,
                name: users[user].name,
                role: users[user].role,
                email: users[user].email
            })
          }
        }

        this.setState({
            users: newState
        })
    })
}

  componentDidMount() {

    firebase.auth().onAuthStateChanged(event => {
      var currentUser = firebase.auth().currentUser

      this.setState({ email : currentUser.email })
    })

      
      firebase.auth().onAuthStateChanged(event => {
          if (true) {
              console.log(event)
              this.getStaffMembers(event.uid)
              this.setState({ lastSignIn : event.metadata.lastSignInTime })
              // this.setState({ email : event.email })
              // this.setState({ displayName : event.displayName })
              
          } else {
            console.log('none')
          }
        });
  }

  render() {
    const { isNotificationConfirmed } = this.state;

    const buttonRedirect = []

    buttonRedirect.push(<Redirect to='/crc/members'></Redirect>)

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {/* {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
                  onClick={this.toggleNotificationPopover}
                />
              )} */}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={this.state.displayName} />
              </PopoverBody>
            </Popover>
          </NavItem>

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
               
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              style={{ minWidth: 250 }}
            >
              <PopoverBody style={{'color': 'black'}}>
                <UserCard style={{'color': 'black'}}
                  role={<strong> PILOT RUN </strong>} 
                  thirdtext={this.state.email}
                  subtext={this.state.displayName}
                  text={ "Last Signed In: " + this.state.lastSignIn}
                  className="primary"
                >
                  <ListGroup flush>
                    {/* <ListGroupItem onClick={this.onOpenUpdateProfile} tag="button" action className="border-light">
                      <MdSettingsApplications /> Profile
                    </ListGroupItem>
                    <ListGroupItem tag="button" onClick={() => window.location.href = "/staff"} action className="border-light">
                      <MdInsertChart /> Staff
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdMessage /> Messages
                    </ListGroupItem>
                    <ListGroupItem onClick={() => window.location.href = "/memberprofile"} tag="button" action className="border-light">
                      <MdPersonPin /> Member Information
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdHelp /> Help
                    </ListGroupItem> */}
                    <ListGroupItem onClick={this.loggedOut} tag="button" action className="border-light">
                      <MdExitToApp  /> Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
