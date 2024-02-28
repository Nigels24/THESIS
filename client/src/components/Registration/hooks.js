import { useState } from "react";
import { decodeToken } from "../../utils/token";
import api from "./../../configs/axios-base-url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useHook = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [gender, setGender] = useState("Male");
  const [mobileNumber, setMobileNumber] = useState("");
  const [yearGraduated, setYearGraduated] = useState("");
  const MAX_MOBILE_DIGITS = 11;
  const [showFormFirst, setShowFormFirst] = useState(true);
  const [employment_status, setemploymentstatus] = useState("Employed");
  const [jobDuration, setJobDuration] = useState("");
  const [employment_type, setemployment_type] = useState("");
  const [furtherStudies, setFurtherStudies] = useState("NO");
  const [otherStudiesDescription, setOtherStudiesDescription] = useState("");
  const [enrollFurtherStudies, setEnrollFurtherStudies] = useState(
    "With Doctoral Units"
  );
  const [otherEnrollDescription, setOtherEnrollDescription] = useState("");
  const [eligibility, seteligibility] = useState(
    "Bar and Board Examination Eligibility"
  );
  const [otherEligibilityDescription, setOtherEligibilityDescription] =
    useState("");

  const [setEligibilityAcquired, setOtherEligibilityAcquired] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [position_current_job, setposition_current_job] = useState("");
  const [place_current_job, setplace_current_job] = useState("");
  const [year_current_job, setyear_current_job] = useState("");
  const [current_job, setcurrent_job] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  // const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const isValid =
      inputValue.includes("@") &&
      (inputValue.includes(".com") || inputValue.includes(".edu.ph"));
    setIsEmailValid(isValid);
  };

  const handleMobileNumberChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, "");

    if (!isNaN(cleanedValue) && cleanedValue.length <= MAX_MOBILE_DIGITS) {
      setMobileNumber(cleanedValue);
    }
  };

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    const hasUppercase = /[A-Z]/.test(inputValue);
    const hasLowercase = /[a-z]/.test(inputValue);
    const hasSpecialChar = /[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/.test(inputValue);

    const isValid =
      hasUppercase && hasLowercase && hasSpecialChar && inputValue.length >= 8;

    setIsPasswordValid(isValid);
  };

  const handleConfirmPasswordChange = (e) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);
  };

  const handleNextButtonClick = () => {
    if (
      email &&
      isEmailValid &&
      mobileNumber &&
      yearGraduated &&
      isPasswordValid &&
      password === confirmPassword
    ) {
      setShowFormFirst(false);
    }
  };

  const handleBackButtonClick = () => {
    setShowFormFirst(true);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("middleName", middleName);
    formData.append("mobileNumber", mobileNumber);
    formData.append("gender", gender);
    formData.append("currentAddress", currentAddress);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("yearGraduated", yearGraduated);
    formData.append("avatar", avatar);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("employment_status", employment_status);
    formData.append("current_job", current_job);
    formData.append("year_current_job", year_current_job);
    formData.append("jobDuration", jobDuration);
    formData.append("position_current_job", position_current_job);
    formData.append("employment_type", employment_type);
    formData.append("place_current_job", place_current_job);
    formData.append("furtherStudies", furtherStudies);
    formData.append("enrollFurtherStudies", enrollFurtherStudies);
    formData.append("eligibility", eligibility);
    // formData.append("otp", otp);

    const key = sessionStorage.getItem("key");

    const data = await api.post("/register/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);

    for (const value of formData.values()) {
      console.log(value);
    }

    const data = await api.post("/register/verify", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast("Registration Complete");

    setTimeout(() => {
      navigate("/Login");
    }, 3000);
  };

  return {
    gender,
    setGender,
    setYearGraduated,
    showFormFirst,
    employment_status,
    setemploymentstatus,
    jobDuration,
    setJobDuration,
    employment_type,
    setemployment_type,
    furtherStudies,
    setFurtherStudies,
    otherStudiesDescription,
    setOtherStudiesDescription,
    enrollFurtherStudies,
    setEnrollFurtherStudies,
    otherEnrollDescription,
    setOtherEnrollDescription,
    eligibility,
    seteligibility,
    otherEligibilityDescription,
    setOtherEligibilityDescription,
    lastName,
    setLastName,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    currentAddress,
    setCurrentAddress,
    dateOfBirth,
    setDateOfBirth,
    handleEmailChange,
    handleMobileNumberChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleNextButtonClick,
    handleBackButtonClick,
    mobileNumber,
    yearGraduated,
    email,
    isEmailValid,
    password,
    isPasswordValid,
    confirmPassword,
    handleImageChange,
    handleRegister,
    position_current_job,
    year_current_job,
    place_current_job,
    setposition_current_job,
    setplace_current_job,
    setyear_current_job,
    setcurrent_job,
    current_job,
    setEligibilityAcquired,
    setOtherEligibilityAcquired,
    handleOTP,
    otp,
    setOtp,
    avatar,
    setAvatar,
    showPassword,
    setShowPassword,
  };
};
