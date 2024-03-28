import { useEffect, useState } from "react";
import EmployeeCardContainer from "../../containers/EmployeeCardContainer/EmployeeCardContainer";
import styles from "./ListPage.module.scss";
import { Employee, Filter } from "../../services/interfaces";
import { getAllEmployees } from "../../services/employee-services";

interface ListPageProps {
  searchTerm: string;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export interface PageData {
  pageable: object;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
}

const ListPage = ({ searchTerm, pageNumber, setPageNumber }: ListPageProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);
  // const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber, searchTerm, filter]);

  const fetchData = async (page: number) => {
    setLoading(true);
    getAllEmployees(page)
      .then((res) => {
        setEmployees(res.content);
        const { content, numberOfElements, sort, empty, ...tmp } = res;
        setPageData(tmp);
      })
      .catch((e: Error) => console.error(e))
      .finally(() => setLoading(false));
  };

  const handleFilterChange = (event: any) => {
    const value = event.target.value;
    console.log(value);
    setFilter((prevValue) => (prevValue == value ? null : value));
  };

  return (
    <div className={styles.pageContainer}>
      {/* Page Header */}
      <h2 className={styles.header}>Employee List</h2>
      {/* Filters up the top */}
      <div className={styles.chipsContainer}>
        {/* Replace these with chip components */}
        <h4 className={styles.chip}>First Name</h4>
        <h4 className={styles.chip}>Last Name</h4>
        <h4 className={styles.chip}>Employment Type</h4>
        <h4 className={styles.chip}>Hours Per Week</h4>
      </div>
      <section className={styles.sectionWrapper}>
        {/* Filter component middle left */}
        <div className={styles.filtersContainer}>
          <div className={styles.ageRangeContainer}>
            <h4>Age Range</h4>
            <div className={styles.ageInputWrapper}>
              <input type="number" />
              <input type="number" />
            </div>
          </div>
          <div className={styles.filterForm}>
            <form>
              <h4>Employement Type</h4>
              <div className={styles.filterFormOptions}>
                <input
                  type="radio"
                  id="FullTime"
                  name="employment"
                  value="FullTime"
                  checked={filter == "FullTime"}
                  onClick={handleFilterChange}
                  readOnly={true}
                />
                <label htmlFor="FullTime">Full Time</label>
              </div>
              <div className={styles.filterFormOptions}>
                <input
                  type="radio"
                  id="PartTime"
                  name="employment"
                  value="PartTime"
                  checked={filter == "PartTime"}
                  onClick={handleFilterChange}
                  readOnly={true}
                />
                <label htmlFor="PartTime">Part Time</label>
              </div>
              <div className={styles.filterFormOptions}>
                <input
                  type="radio"
                  id="Casual"
                  name="employment"
                  value="Casual"
                  checked={filter == "Casual"}
                  onClick={handleFilterChange}
                  readOnly={true}
                />
                <label htmlFor="Casual">Casual</label>
              </div>
              <div className={styles.filterFormOptions}>
                <input
                  type="radio"
                  id="Contract"
                  name="employment"
                  value="Contract"
                  checked={filter == "Contract"}
                  onClick={handleFilterChange}
                  readOnly={true}
                />
                <label htmlFor="Contract">Contract</label>
              </div>
            </form>
          </div>
        </div>
        {/* Container that loads EmployeeCards of a short description, with pagination */}
        <div>
          <EmployeeCardContainer
            loading={loading}
            employees={employees}
            filter={filter}
            searchTerm={searchTerm}
            fetchData={fetchData}
            pageData={pageData}
            setPageData={setPageData}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </section>
      {/* Pagination Buttons */}
    </div>
  );
};

export default ListPage;
