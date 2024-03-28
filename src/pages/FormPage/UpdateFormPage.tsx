import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employee-services";
import { Employee } from "../../services/interfaces";
import styles from "./UpdateFormPage.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { ToastContext, ToastVariant } from "../../context/toastNotification";

const schema = z.object({
  firstName: z.string().nonempty("First Name is Required"),
  middleName: z.string(),
  lastName: z.string().nonempty("Last Name is Required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  phoneNumber: z
    .string()
    .length(10, "Phone Number must be a valid phone number")
    .nonempty("Phone number is required"),
  hoursPerWeek: z
    .string()
    .min(1, "Employee must work a minimum of 1 hour per week")
    .max(168, "Employee can't work more than 168 hours in a week")
    .nonempty("Hours Per Week is Required"),
  startDate: z.string().nonempty("Date is Required"),
  employmentType: z.string().nonempty("Employment Type is Required"),
});

const FormPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Employee>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeInfo, setEmployeeInfo] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toastCtx = useContext(ToastContext);

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

  const submitHandler = async (data: Employee) => {
    if (id !== undefined) {
      console.log(data);
      updateEmployee(parseInt(id), data)
        .then(() =>
          toastCtx.dispatchToast({
            message: `${data.firstName}'s profile updated!`,
            variant: ToastVariant.Success,
            timeout: 3000,
          })
        )
        .catch((e) =>
          toastCtx.dispatchToast({
            message: e.message,
            variant: ToastVariant.Error,
            timeout: 5000,
          })
        )
        .finally(() => navigate("/"));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerButtonWrapper}>
        <h3 className={styles.header}>Update Employee</h3>
        <button onClick={() => navigate(`/profile/${id}`)}>Back</button>
      </header>
      {employeeInfo && (
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={styles.formWrapper}
        >
          <div className={styles.fieldWrapper}>
            <label htmlFor="firstName">First Name: </label>
            <div className={styles.inputErrorWrapper}>
              <input
                type="text"
                id="firstName"
                defaultValue={employeeInfo?.firstName}
                className={styles.textInput}
                {...register("firstName")}
              ></input>
              {errors.firstName && (
                <p className={styles.errorMessage}>
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <label htmlFor="middleName">Middle Name: </label>
            <div className={styles.inputErrorWrapper}>
              <input
                type="text"
                id="middleName"
                defaultValue={employeeInfo?.middleName}
                className={styles.textInput}
                {...register("middleName")}
              ></input>
              {errors.middleName && (
                <p className={styles.errorMessage}>
                  {errors.middleName.message}
                </p>
              )}
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <label htmlFor="lastName">Last Name: </label>
            <div className={styles.inputErrorWrapper}>
              <input
                type="text"
                id="lastName"
                defaultValue={employeeInfo?.lastName}
                className={styles.textInput}
                {...register("lastName")}
              ></input>
              {errors.lastName && (
                <p className={styles.errorMessage}>{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <label htmlFor="email">Email: </label>
            <div className={styles.inputErrorWrapper}>
              <input
                type="text"
                id="email"
                defaultValue={employeeInfo?.email}
                className={styles.textInput}
                {...register("email")}
              ></input>
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <label htmlFor="phoneNumber">Phone Number: </label>
            <div className={styles.inputErrorWrapper}>
              <input
                type="text"
                id="phoneNumber"
                defaultValue={employeeInfo?.phoneNumber}
                className={styles.textInput}
                {...register("phoneNumber")}
              ></input>
              {errors.phoneNumber && (
                <p className={styles.errorMessage}>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <label htmlFor="hoursPerWeek">Hours Per Week: </label>
            <div className={styles.inputErrorWrapper}>
              <input
                type="number"
                id="hoursPerWeek"
                defaultValue={employeeInfo?.hoursPerWeek}
                className={styles.numberInput}
                {...register("hoursPerWeek")}
              ></input>
              {errors.hoursPerWeek && (
                <p className={styles.errorMessage}>
                  {errors.hoursPerWeek.message}
                </p>
              )}
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <label htmlFor="startDate">Start Date: </label>
            <div className={styles.inputErrorWrapper}>
              <input
                type="datetime-local"
                id="startDate"
                defaultValue={employeeInfo?.startDate}
                className={styles.dateInput}
                {...register("startDate")}
              ></input>
              {errors.startDate && (
                <p className={styles.errorMessage}>
                  {errors.startDate.message}
                </p>
              )}
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <label htmlFor="employmentType">Employment Type: </label>
            <div className={styles.inputErrorWrapper}>
              <select id="employmentType" {...register("employmentType")}>
                <option value={"FullTime"}>Full Time</option>
                <option value={"PartTime"}>Part Time</option>
                <option value={"Casual"}>Casual</option>
                <option value={"Contract"}>Contract</option>
              </select>
              {errors.employmentType && (
                <p className={styles.errorMessage}>
                  {errors.employmentType.message}
                </p>
              )}
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FormPage;
