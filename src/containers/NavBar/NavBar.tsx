import logo from "../../assets/icons/icons8-employee-50.png";
import avatar from "../../assets/icons/icons8-avatar-60.png";
import add from "../../assets/icons/icons8-add-60.png";
import styles from "./NavBar.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const NavBar = ({
  searchTerm,
  setSearchTerm,
  pageNumber,
  setPageNumber,
}: NavBarProps) => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    setPageNumber(0);
    navigate("/");
  };

  return (
    <div className={styles.navBarContainer}>
      {/* Logo/Header */}
      <div className={styles.headerContainer} onClick={handleNavigateToHome}>
        <img src={logo} />
        <h1>Employee Tracker</h1>
      </div>
      {/* Searchbar with search icon */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      {/* Some dumb icon components in the top right corner */}
      <div className={styles.dumbIconsContainer}>
        <img src={add} onClick={() => navigate("/createForm")} />
        <img src={avatar} />
      </div>
    </div>
  );
};

export default NavBar;
