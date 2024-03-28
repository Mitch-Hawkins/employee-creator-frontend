import styles from "./ProfilePage.module.scss";
import avatar from "../../assets/icons/noun-user-480711.png";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  deleteEmployee,
  getEmployeeById,
} from "../../services/employee-services";
import { Employee } from "../../services/interfaces";
import { ToastContext, ToastVariant } from "../../context/toastNotification";

const ProfilePage = () => {
  const { id } = useParams();
  const [employeeInfo, setEmployeeInfo] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { dispatchToast } = useContext(ToastContext);

  useEffect(() => {
    if (id !== undefined) {
      fetchProfile(parseInt(id));
    }
  }, []);

  const fetchProfile = async (id: number) => {
    setLoading(true);
    getEmployeeById(id)
      .then((res) => setEmployeeInfo(res))
      .finally(() => setLoading(false));
  };

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleDelete = () => {
    if (id !== undefined) {
      deleteEmployee(parseInt(id))
        .then(() =>
          dispatchToast({
            message: `${employeeInfo?.firstName}'s profile Deleted`,
            variant: ToastVariant.Success,
            timeout: 3000,
          })
        )
        .catch((e) =>
          dispatchToast({
            message: `${e.message}`,
            variant: ToastVariant.Error,
            timeout: 5000,
          })
        )
        .finally(() => {
          setDeleteModal(false);
          navigate("/");
        });
    }
  };

  const handleDateFormat = () => {
    if (employeeInfo?.startDate != undefined) {
      const tmp: string = employeeInfo.startDate;
      // Extract date components
      const [datePart] = tmp.split("T");
      const [year, month, day] = datePart.split("-");

      const formattedDate = `${day}/${month}/${year}`;

      console.log(formattedDate); // Output: 19/5/2012
      return formattedDate;
    }
    return "No Date Available";
  };

  const handlePhoneFormat = () => {
    if (employeeInfo?.phoneNumber != undefined) {
      const tmp: string = employeeInfo.phoneNumber;
      const firstGroup = tmp.slice(0, 4);
      const secondGroup = tmp.slice(4, 7);
      const thirdGroup = tmp.slice(7, 10);

      // Join the groups with spaces and return the formatted number
      return `${firstGroup} ${secondGroup} ${thirdGroup}`;
    }
    return "No Available Phone Number";
  };

  const handleEmploymentTypeFormat = () => {
    if (employeeInfo?.employmentType != undefined) {
      const tmp: string = employeeInfo.employmentType;
      switch (tmp) {
        case "FullTime":
          return "Full Time";
        case "PartTime":
          return "Part Time";
        default:
          break;
      }
    }
    return "Employment Type Not Available";
  };

  return (
    <div className={styles.pageContainer}>
      {/* header */}
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Employee Profile</h2>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
      {/* wrapper for photo and info */}
      <div className={styles.profileContainer}>
        {/* large avatar icon on left */}
        <div className={styles.leftSideContainer}>
          <img src={avatar} className={styles.avatarContainer} />
          <button onClick={() => navigate(`/updateForm/${employeeInfo?.id}`)}>
            Edit Employee
          </button>
          <button onClick={handleDeleteClick}>Delete Employee</button>
        </div>
        {/* All the info in a bubble on the rigth */}
        <div className={styles.infoContainer}>
          <div className={styles.labelWrapper}>
            <label htmlFor="firstName">First Name:</label>
            <p>{employeeInfo?.firstName}</p>
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="middleName">Middle Name:</label>
            <p>{employeeInfo?.middleName}</p>
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="lastName">Last Name:</label>
            <p>{employeeInfo?.lastName}</p>
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="email">Email:</label>
            <p>{employeeInfo?.email}</p>
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <p>{handlePhoneFormat()}</p>
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="employmentType">Type of Employment:</label>
            <p>{handleEmploymentTypeFormat()}</p>
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="startDate">Employee Start Date:</label>
            <p>{handleDateFormat()}</p>
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="hoursPerWeek">Hours Per Week:</label>
            <p>{employeeInfo?.hoursPerWeek}</p>
          </div>
        </div>
        {/* Delete and Edit buttons */}
      </div>
      <section
        className={`${styles.modalBackdrop} ${
          deleteModal ? styles.modalVisible : ""
        }`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setDeleteModal(false);
          }
        }}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalInfoWrapper}>
            <h4>
              Are you sure you want to delete {employeeInfo?.firstName}'s
              profile?
            </h4>
            <div className={styles.modalButtonWrapper}>
              <button className={styles.modalButton} onClick={handleDelete}>
                Yes
              </button>
              <button
                className={styles.modalButton}
                onClick={() => setDeleteModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
