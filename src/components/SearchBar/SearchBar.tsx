import styles from "./SearchBar.module.scss";
import search from "../../assets/icons/icons8-search-24.png";
// import { useState } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBar = ({
  setSearchTerm,
  pageNumber,
  setPageNumber,
}: SearchBarProps) => {
  //   const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setPageNumber(0);
  };

  //   const handleInputChange = (e: any) => {
  //     setInputValue(e.target.value);
  //   };

  return (
    <form className={styles.searchContainer} onSubmit={handleFormSubmit}>
      <button>
        <img src={search} />
      </button>
      <input type="text" onChange={handleFormSubmit}></input>
    </form>
  );
};

export default SearchBar;
