import React from "react";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import MenuIcon from "material-ui/svg-icons/navigation/menu.js";
import {NavLink} from "react-router-dom";
import nordiclogo from "../../assets/nordic_logo.png";
import environment from "../../assets/environment.png";
import motion from "../../assets/motion.png";
import ui from "../../assets/ui.png";
import sound from "../../assets/sound.png";
import ifttt from "../../assets/ifttt.png";
import configuration from "../../assets/configuration.png";


class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onRequestChange = this.onRequestChange.bind(this);
  }

  toggleMenu(open) {
    this.setState({open: open});
  }

  onRequestChange(open, reason) {
    // For handling clicking the menu away, pressing escape or swiping
    if (!open) {
      this.setState({open: open});
    }
  }


  render() {
    return (
      <div>
        <IconButton className={"burgerIcon"} onClick={() => this.toggleMenu(true)} color="inherit" aria-label="Menu">
        hey
          <MenuIcon />
        </IconButton>
        <Drawer
          disableSwipeToOpen={true}
          docked={false}
          variant="temporary"
          containerClassName="menu"
          overlayClassName="overlay"
          open={this.state.open}
          /* onClose={() => this.toggleMenu(false)}
          onOpen={() => this.toggleMenu(true)} */
          onRequestChange={(open, reason) => this.onRequestChange(open, reason)}
        >
          <img className="logo" src={nordiclogo} />
          <ul>
            <NavLink to="/environment" className="menuLink"><MenuItem className="menuItem" onClick={() => this.toggleMenu(false)}><img src={environment} />Environment</MenuItem></NavLink>
            <NavLink to="/motion" className="menuLink"><MenuItem className="menuItem" onClick={() => this.toggleMenu(false)}><img src={motion} />Motion</MenuItem></NavLink>
            <NavLink to="/ui" className="menuLink"><MenuItem className="menuItem" onClick={() => this.toggleMenu(false)}><img src={ui} />UI</MenuItem></NavLink>
            <NavLink to="/configuration" className="menuLink"><MenuItem className="menuItem" onClick={() => this.toggleMenu(false)}><img src={configuration} />Configuration</MenuItem></NavLink>
            <NavLink to="/sound" className="menuLink"><MenuItem className="menuItem" onClick={() => this.toggleMenu(false)}><img src={sound} />Sound</MenuItem></NavLink>
            <NavLink to="/ifttt" className="menuLink"><MenuItem className="menuItem" onClick={() => this.toggleMenu(false)}><img src={ifttt} />IFTTT</MenuItem></NavLink>
          </ul>
        </Drawer>
      </div>
    );
  }
}

export default BurgerMenu;
