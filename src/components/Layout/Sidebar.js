import logo200Image from "assets/img/logo/logo_200.png";
import GymSplatLogo from "assets/img/logo/GymSplatWhiteLetters.png";
import sidebarBgImage from "assets/img/sidebar/sidebar-4.jpg";
import SourceLink from "components/SourceLink";
import React from "react";
import {
  MdAccountCircle,
  MdDashboard,
  MdViewCarousel,
  MdAccessTime,
  MdPeople,
  MdPages,
  MdFeedback,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from "reactstrap";
import bn from "utils/bemnames";
import DashboardPage from "../../pages/DashboardPage";

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const navComponents = [];

const navContents = [
  { to: "/dashboard", name: "dashboard", exact: true, Icon: MdDashboard },
  { to: "/reports", name: "Reports", exact: false, Icon: MdPages },
  // { to: "/reservations", name: "Reservations", exact: false, Icon: MdPeople },
  // { to: "/feedback", name: "Feedback", exact: false, Icon: MdFeedback },
  { to: "/activity", name: "Activity", exact: false, Icon: MdAccessTime },
];

const pageContents = [];

const navItems = [];

const bem = bn.create("sidebar");

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = (name) => () => {
    this.setState((prevState) => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e("background")} style={sidebarBackground} />
        <div className={bem.e("content")}>
          <img
            src={GymSplatLogo}
            style={{
              width: "90%",
            }}
          ></img>

          <Navbar>
            {/* <SourceLink className="navbar-brand d-flex"> */}

            <span
              style={{
                margin: "10px 20px",
                align: "center",
                color: "white",
                fontFamily: "-apple-system, BlinkMacSystemFont",
                fontWeight: "bold",
                fontSize: "17px",
              }}
              tag={DashboardPage}
            >
              <div style={{ "align-items": "center" }}> MAIN MENU </div>
            </span>
            {/* </SourceLink> */}
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e("nav-item")}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-capitalize"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e("nav-item-icon")} />
                  <span
                    style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {name}
                  </span>
                </BSNavLink>
              </NavItem>
            ))}

            <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-capitalize"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span
                      style={{
                        align: "center",
                        color: "white",
                        fontFamily: "-apple-system, BlinkMacSystemFont",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                      tag={DashboardPage}
                    >
                      {name}
                    </span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-capitalize"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span
                      style={{
                        align: "center",
                        color: "white",
                        fontFamily: "-apple-system, BlinkMacSystemFont",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                      tag={DashboardPage}
                    >
                      {name}
                    </span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <Collapse isOpen={this.state.isOpenPages}>
              {pageContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-capitalize"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span
                      style={{
                        align: "center",
                        color: "white",
                        fontFamily: "-apple-system, BlinkMacSystemFont",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                      tag={DashboardPage}
                    >
                      {name}
                    </span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
