import { Content, Footer, Header, Sidebar } from 'components/Layout';
import React from 'react';
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty,
  MdAccessibility,
  MdFeedback,
  MdAccountBox,
} from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import ServerManager from '../../pages/ServerManager'
import firebase from 'firebase'





class MainLayout extends ServerManager {
  constructor() {
    super(); 
    this.state={
      currentReservations: 0
    }
  }
  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {

    this.getMachineData()

    firebase.auth().onAuthStateChanged(event => {

      var currentUser = firebase.auth().currentUser
      // if (true) {
          console.log(event)
          // this.setState({ lastSignIn : event.metadata.lastSignInTime })
          this.setState({ email : currentUser.email })
          // this.setState({ displayName : event.displayName })
          
      // } else {
      //   console.log('none')
      // }
    });


    // setTimeout(() => {
    //   if (!this.notificationSystem) {
    //     return;
    //   }

    //   this.notificationSystem.addNotification({
    //     title: <MdImportantDevices />,
    //     message: 'You reached 1,000 gym visits!',
    //     level: 'info',
    //   });
    // }, 1500);

    // setTimeout(() => {
    //   if (!this.notificationSystem) {
    //     return;
    //   }

    //   this.notificationSystem.addNotification({
    //     title: <MdAccessibility />,
    //     message: 'You have ' + this.state.currentReservations + ' reservations currently.',
    //     level: 'info',
    //   });
    // }, 2500);

    setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }


      this.notificationSystem.addNotification({
        title: <MdAccountBox />,
        message: 'Currently logged in as: ' + this.state.email,
        level: 'info',
      });
    }, 1000);

  // setTimeout(() => {
  //   if (!this.notificationSystem) {
  //     return;
  //   }

  //   this.notificationSystem.addNotification({
  //     title: <MdFeedback />,
  //     message: 'You have 0 feedback currently.',
  //     level: 'info',
  //   });
  // }, 1500);
}
  // close sidebar when
  handleContentClick = event => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      MainLayout.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        <Sidebar />
        <Content fluid onClick={this.handleContentClick}>
          <Header />
          {children}
          <Footer />
        </Content>

        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </main>
    );
  }
}

export default MainLayout;
