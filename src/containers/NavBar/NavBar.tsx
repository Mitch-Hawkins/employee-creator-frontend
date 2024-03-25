import logo from "../../assets/icons/icons8-employee-50.png";
import search from "../../assets/icons/icons8-search-24.png";
import avatar from "../../assets/icons/icons8-avatar-60.png";
import heartEmpty from "../../assets/icons/icons8-heart-50.png";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.navBarContainer}>
      {/* Logo/Header */}
      <div className={styles.headerContainer}>
        <img src={logo} />
        <h1>Employee Tracker</h1>
      </div>
      {/* Searchbar with search icon */}
      <div className={styles.searchContainer}>
        <img src={search} />
        <input type="text"></input>
      </div>
      {/* Some dumb icon components in the top right corner */}
      <div className={styles.dumbIconsContainer}>
        <img src={heartEmpty} />
        <img src={avatar} />
      </div>
    </div>
  );
};

export default NavBar;
