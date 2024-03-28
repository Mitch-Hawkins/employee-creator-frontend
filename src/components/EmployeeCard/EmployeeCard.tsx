import { useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/noun-user-480711.png";
import { Employee } from "../../services/interfaces";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${employee.id}`);
  };

  return (
    <div className={styles.cardContainer}>
      <img src={avatar} />
      <h6>{employee.employmentType}</h6>
      <p>
        {employee.firstName} {employee.lastName}
      </p>
      <button onClick={handleViewProfile}>View Profile</button>
    </div>
  );
};

export default EmployeeCard;
