import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import LoadingList from "../../components/LoadingList/LoadingList";
import { PageData } from "../../pages/ListPage/ListPage";
import { Employee, Filter } from "../../services/interfaces";
import styles from "./EmployeeCardContainer.module.scss";

interface EmployeeCardContainerProps {
  loading: boolean;
  employees: Employee[];
  filter: Filter | null;
  searchTerm: string;
  fetchData: (page: number) => Promise<void>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageData: PageData | null;
  setPageData: React.Dispatch<React.SetStateAction<PageData | null>>;
}

const EmployeeCardContainer = ({
  loading,
  employees,
  filter,
  searchTerm,
  fetchData,
  pageNumber,
  setPageNumber,
  pageData,
  setPageData,
}: EmployeeCardContainerProps) => {
  const handleNextPage = () => {
    if (pageData?.last == true) {
      setPageNumber(pageData.number);
    } else if (pageData) {
      setPageNumber(pageData.number + 1);
      //   fetchData(pageNumber);
    }
  };

  const handlePreviousPage = () => {
    if (pageData?.first == true) {
      setPageNumber(pageData.number);
    } else if (pageData) {
      setPageNumber(pageData.number - 1);
      fetchData(pageNumber);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.employeeCardContainer}>
        {/* <LoadingList /> */}
        {loading && <LoadingList />}
        {!loading &&
          employees &&
          employees
            .filter((employee) => {
              if (filter == null) {
                return true;
              } else {
                return employee.employmentType == filter;
              }
            })
            .filter(
              (employee) =>
                employee.firstName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                employee.lastName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((employee) => {
              return <EmployeeCard key={employee.id} employee={employee} />;
            })}
      </div>
      <div className={styles.paginationButtonContainer}>
        <button onClick={handlePreviousPage}>Previous Page</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default EmployeeCardContainer;
