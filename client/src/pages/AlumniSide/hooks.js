import { useState, useEffect } from "react";
import { decodeToken } from "./../../utils/token";
import api from "../../configs/axios-base-url";

export const useHooks = () => {
  const token = localStorage.getItem("token");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const MAX_MOBILE_DIGITS = 11;
  const [gender, setGender] = useState("");

  const [currentAddress, setCurrentAddress] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [yearGraduated, setYearGraduated] = useState("");
  const [employment_status, setemploymentstatus] = useState("");
  const [current_job, setcurrent_job] = useState("");
  const [year_current_job, setyear_current_job] = useState("");
  const [jobDuration, setJobDuration] = useState("");
  const [position_current_job, setposition_current_job] = useState("");
  const [employment_type, setemployment_type] = useState("");
  const [place_current_job, setplace_current_job] = useState("");
  const [furtherStudies, setFurtherStudies] = useState("");
  const [enrollFurtherStudies, setEnrollFurtherStudies] = useState("");
  const [otherEnrollDescription, setOtherEnrollDescription] = useState("");
  const [OtherEligibilityDescription, setOtherEligibilityDescription] =
    useState("");
  const [eligibility, seteligibility] = useState("");
  const [Image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileNumberChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, "");

    if (!isNaN(cleanedValue) && cleanedValue.length <= MAX_MOBILE_DIGITS) {
      setMobileNumber(cleanedValue);
    }
  };
  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };
  const closeProfile = () => {
    setIsOpen(false);
  };

  const handleProfile = async (e) => {
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

    const data = await api.put("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.data.accessToken) {
      localStorage.setItem("token", data.data.accessToken);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // console.log("Token value", localStorage.getItem("token"));
      const details = decodeToken(localStorage.getItem("token"));
      // console.log("Decoded value", details);

      setFirstName(details.fname);
      setLastName(details.lname);
      setMiddleName(details.mname);
      setMobileNumber(details.phoneno);
      setGender(details.gender);
      setCurrentAddress(details.address);
      setDateOfBirth(details.bday);
      setYearGraduated(details.yeargrad);
      setemploymentstatus(details.employment_status);
      setcurrent_job(details.current_job);
      setyear_current_job(details.year_current_job);
      setJobDuration(details.job_duration_after_grad);
      setposition_current_job(details.position_current_job);
      setemployment_type(details.employment_type);
      setplace_current_job(details.place_current_job);
      setFurtherStudies(details.engage_studies);
      setEnrollFurtherStudies(details.enroll_studies);
      seteligibility(details.eligibility);
      if (details?.avatar) {
        setImage(details.avatar);
      } else {
        setImage(details.Image);
      }
    }
  }, [localStorage.getItem("token")]);
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };

  const [updated, setUpdated] = useState(false);

  const handleUpdateProfile = async (e) => {
    if (!e || !e.preventDefault) {
      return;
    }
    e.preventDefault();

    const formData = new FormData();

    formData.append("mobileNumber", mobileNumber);
    formData.append("currentAddress", currentAddress);
    formData.append("avatar", avatar);
    formData.append("employment_status", employment_status);
    formData.append("current_job", current_job);
    formData.append("year_current_job", year_current_job);
    formData.append("position_current_job", position_current_job);
    formData.append("employment_type", employment_type);
    formData.append("place_current_job", place_current_job);
    formData.append("furtherStudies", furtherStudies);
    formData.append("enrollFurtherStudies", enrollFurtherStudies);
    formData.append("eligibility", eligibility);

    try {
      const token = localStorage.getItem("token");
      const userDetails = decodeToken(token);
      console.log(userDetails);

      const userId = userDetails.id;

      const data = await api.put(`/update/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.data.accessToken) {
        localStorage.setItem("token", data.data.accessToken);
      }

      const updatedToken = localStorage.getItem("token");
      if (updatedToken) {
        const updatedDetails = decodeToken(updatedToken);

        setMobileNumber(updatedDetails.phoneno);
        setCurrentAddress(updatedDetails.address);
        setemploymentstatus(updatedDetails.employment_status);
        setcurrent_job(updatedDetails.current_job);
        setyear_current_job(updatedDetails.year_current_job);
        setposition_current_job(updatedDetails.position_current_job);
        setemployment_type(updatedDetails.employment_type);
        setplace_current_job(updatedDetails.place_current_job);
        setFurtherStudies(updatedDetails.engage_studies);
        setEnrollFurtherStudies(updatedDetails.enroll_studies);
        seteligibility(updatedDetails.eligibility);
        if (updatedDetails?.avatar) {
          setImage(updatedDetails.avatar);
        } else {
          setImage(updatedDetails.Image);
        }
      }
      setUpdated(true);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return {
    firstName,
    lastName,
    middleName,
    mobileNumber,
    gender,
    currentAddress,
    setCurrentAddress,
    setposition_current_job,
    setplace_current_job,
    setyear_current_job,
    setcurrent_job,
    setemploymentstatus,
    employment_status,
    setJobDuration,
    setemployment_type,
    setFurtherStudies,
    setEnrollFurtherStudies,
    setOtherEnrollDescription,
    seteligibility,
    setOtherEligibilityDescription,
    dateOfBirth,
    yearGraduated,
    current_job,
    year_current_job,
    jobDuration,
    position_current_job,
    employment_type,
    place_current_job,
    furtherStudies,
    enrollFurtherStudies,
    Image,
    eligibility,
    isOpen,
    toggleProfile,
    handleProfile,
    handleMobileNumberChange,
    otherEnrollDescription,
    OtherEligibilityDescription,
    closeProfile,
    handleUpdateProfile,
    handleImageChange,
  };
};
