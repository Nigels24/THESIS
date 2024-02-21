import logo from "../../assets/favicon.ico";
import "../Registration/form.css";
import { useHook } from "./hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const {
    gender,
    setGender,
    setYearGraduated,
    showFormFirst,
    employment_status,
    setemploymentstatus,
    employment_type,
    setemployment_type,
    furtherStudies,
    setFurtherStudies,
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
    otp,
    setOtp,
    handleOTP,
    showPassword,
    setShowPassword,
  } = useHook();

  return (
    <div className="min-h-screen flex flex-col items-center mx-auto bg-green-100">
      <div className="flex items-center mt-4">
        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-black font-mono text-2xl accent-indigo-300">
          Bachelor of Science in Computer Science
        </h1>
      </div>
      <div className="body-container">
        <header>Registration</header>
        <form action="#" onSubmit={handleRegister}>
          {showFormFirst && (
            <div className="form first">
              <div className="details personal">
                <span className="title">Personal Details</span>
                <div className="fields">
                  <div className="input-fields">
                    <label>LastName</label>
                    <input
                      type="text"
                      placeholder="Enter your lastname"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="input-fields">
                    <label>FirstName</label>
                    <input
                      type="text"
                      placeholder="Enter your firstname"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="input-fields">
                    <label>MiddleName</label>
                    <input
                      type="text"
                      placeholder="Enter your middlename"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </div>

                  <div className="input-fields">
                    <label>Mobile Number </label>
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      required
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                    />
                  </div>
                  <div className="input-fields">
                    <label>Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="input-fields">
                    <label>Current Address</label>
                    <input
                      type="text"
                      placeholder="Brgy.; City/Municipality;Province"
                      required
                      value={currentAddress}
                      onChange={(e) => setCurrentAddress(e.target.value)}
                    />
                  </div>
                  <div className="input-fields">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                  <div className="input-fields">
                    <label>Year Graduated</label>
                    <select
                      value={yearGraduated}
                      onChange={(e) => setYearGraduated(e.target.value)}
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="2014-2015">2014-2015</option>
                      <option value="2015-2016">2015-2016</option>
                      <option value="2016-2017">2016-2017</option>
                      <option value="2017-2018">2017-2018</option>
                      <option value="2018-2019">2018-2019</option>
                      <option value="2019-2020">2019-2020</option>
                      <option value="2020-2021">2020-2021</option>
                      <option value="2021-2022">2021-2022</option>
                      <option value="2022-2023">2022-2023</option>
                      <option value="2023-2024">2023-2024</option>
                    </select>
                  </div>
                  <div className="input-fields">
                    <label>Image</label>
                    <input type="file" onChange={handleImageChange} required />
                  </div>
                </div>
                <div className="details personal">
                  <span className="title">Login Details</span>
                  <div className="fields">
                    <div className="input-fields">
                      <label>Email</label>
                      <input
                        type="text"
                        placeholder="Enter your personal email"
                        required
                        value={email}
                        onChange={handleEmailChange}
                        className={isEmailValid ? "" : "border-red-500"}
                      />
                      {!isEmailValid && (
                        <span className="text-red-500 ">
                          Please enter a valid email address (e.g.,
                          example@example.com)
                        </span>
                      )}
                    </div>

                    <div className="input-fields">
                      <label>Password</label>
                      <div className="flex items-center w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={handlePasswordChange}
                          className={isPasswordValid ? "" : "border-red-500"}
                          required
                        />
                      </div>
                      {!isPasswordValid && (
                        <span className="text-red-500">
                          <br />
                          Password must contain at least one uppercase letter,
                          one lowercase letter, one special character, and be at
                          least 8 characters long.
                        </span>
                      )}
                    </div>
                    <div className="input-fields">
                      <label>Confirm Password</label>
                      <div className="relative flex items-center w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          className={
                            password === confirmPassword ? "" : "border-red-500"
                          }
                        />
                        <span
                          className="absolute right-10 top-4 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEye size={20} />
                          ) : (
                            <FaEyeSlash size={20} />
                          )}
                        </span>
                      </div>
                      {password !== confirmPassword && (
                        <span className="text-red-500">
                          Passwords do not match.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button className="nextBtn" onClick={handleNextButtonClick}>
                <span className="btnText">Next</span>
                <i className="uil uil-navigator"></i>
              </button>
            </div>
          )}

          {!showFormFirst && (
            <div className="form second">
              <div className="details personal">
                <span className="title">Employment Status</span>
                <div className="fields">
                  <div className="input-fields">
                    <label>Employment Status</label>
                    <select
                      value={employment_status}
                      onChange={(e) => setemploymentstatus(e.target.value)}
                      required
                    >
                      <option value="Employed">Employed</option>
                      <option value="Unemployed">Unemployed</option>
                    </select>
                  </div>

                  {employment_status === "Employed" && (
                    <>
                      <div className="input-fields">
                        <label>Current Job</label>
                        <input
                          value={current_job}
                          onChange={(e) => setcurrent_job(e.target.value)}
                          type="text"
                          placeholder=""
                          required
                        />
                      </div>
                      <div className="input-fields">
                        <label>Year(s) in Current Job</label>
                        <input
                          value={year_current_job}
                          onChange={(e) => setyear_current_job(e.target.value)}
                          type="number"
                          placeholder=""
                          required
                        />
                      </div>

                      <div className="input-fields">
                        <label>Position in Current Job</label>
                        <input
                          value={position_current_job}
                          onChange={(e) => {
                            setposition_current_job(e.target.value);
                          }}
                          type="text"
                          required
                        />
                      </div>
                      <div className="input-fields">
                        <label>Employment Type</label>
                        <select
                          value={employment_type}
                          onChange={(e) => setemployment_type(e.target.value)}
                          required
                        >
                          <option value="">Select Employment Type</option>
                          <option value="Regular">Regular</option>
                          <option value="Casual">Casual</option>
                          <option value="Project">Project</option>
                          <option value="Seasonal">Seasonal</option>
                          <option value="Fixed-Term">Fixed-term</option>
                          <option value="Probationary">Probationary</option>
                        </select>
                      </div>
                      <div className="input-fields">
                        <label>Employer/Place of Current Job </label>
                        <input
                          value={place_current_job}
                          onChange={(e) => {
                            setplace_current_job(e.target.value);
                          }}
                          type="text"
                          required
                        />
                      </div>
                      <div className="input-fields">
                        <label>Engage in further Studies?</label>
                        <select
                          value={furtherStudies}
                          onChange={(e) => {
                            setFurtherStudies(e.target.value);
                          }}
                          required
                        >
                          <option value="YES">YES</option>
                          <option value="NO">NO</option>
                        </select>
                      </div>
                      {furtherStudies === "YES" && (
                        <div className="input-fields">
                          <label>Enroll Further Studies?</label>
                          <select
                            value={enrollFurtherStudies}
                            onChange={(e) => {
                              setEnrollFurtherStudies(e.target.value);
                              if (e.target.value !== "Other") {
                                setOtherEnrollDescription(""); // Clear custom input if not "Other"
                              }
                            }}
                            required
                            // Add the disabled attribute based on the state
                          >
                            <option value="With Doctoral Units">
                              With Doctoral Units
                            </option>
                            <option value="MA/MS Graduate">
                              MA/MS Graduate
                            </option>
                            <option value="With MA/MS Units">
                              With MA/MS Units
                            </option>
                            <option value="Other Baccalaureate Course">
                              Other Baccalaureate Course
                            </option>
                            <option value="None">None</option>
                            <option value="Other">Other</option>
                          </select>
                          {enrollFurtherStudies === "Other" && (
                            <input
                              type="text"
                              placeholder="Please specify"
                              value={otherEnrollDescription}
                              onChange={(e) =>
                                setOtherEnrollDescription(e.target.value)
                              }
                              required
                            />
                          )}
                        </div>
                      )}

                      <div className="input-fields">
                        <label>Eligibility Acquired (if any)</label>
                        <select
                          value={eligibility}
                          onChange={(e) => {
                            seteligibility(e.target.value);
                            if (e.target.value !== "Other") {
                              setOtherEligibilityDescription("");
                            }
                          }}
                          required
                        >
                          <option value="Bar and Board Examination Eligibility">
                            Bar and Board Examination Eligibility
                          </option>
                          <option value="Pilot Eligibility for Military Aviators">
                            Pilot Eligibility for Military Aviators
                          </option>
                          <option value="National Service Training Eligibility">
                            National Service Training Eligibility
                          </option>
                          <option value="Philippine National Police (PNP) Entrance Eligibility">
                            Philippine National Police (PNP) Entrance
                            Eligibility
                          </option>
                          <option value="Barangay Health Workers Eligibility">
                            Barangay Health Workers Eligibility
                          </option>
                          <option value="Career Service Professional Eligibility">
                            Career Service Professional
                          </option>
                          <option value="Sub-Professional Eligibility">
                            Career Service Sub Professional
                          </option>
                          <option value="Honor Graduate Eligibility">
                            Honor Graduate Eligibility
                          </option>
                          <option value="Industrial Safety and Health Eligibility">
                            Industrial Safety and Health Eligibility
                          </option>
                          <option value="Philippine Veterans Affairs Office (PVAO) Eligibility">
                            Philippine Veterans Affairs Office (PVAO)
                            Eligibility
                          </option>
                          <option value="Fire Officer Eligibility">
                            Fire Officer Eligibility
                          </option>
                          <option value="Licensed Professional Teacher Eligibility">
                            Licensed Professional Teacher Eligibility
                          </option>
                          <option value="None">None</option>
                          <option value="Other">Other</option>
                        </select>
                        {eligibility === "Other" && (
                          <input
                            type="text"
                            placeholder="Please specify"
                            value={otherEligibilityDescription}
                            onChange={(e) =>
                              setOtherEligibilityDescription(e.target.value)
                            }
                            required
                          />
                        )}
                      </div>
                    </>
                  )}

                  {employment_status === "Unemployed" && (
                    <>
                      <div className="input-fields">
                        <label>Engage in further Studies?</label>
                        <select
                          onChange={(e) => {
                            setFurtherStudies(e.target.value);
                          }}
                          required
                        >
                          <option value="YES">YES</option>
                          <option value="NO">NO</option>
                        </select>
                      </div>
                      {furtherStudies === "YES" && (
                        <div className="input-fields">
                          <label>Enroll Further Studies?</label>
                          <select
                            value={enrollFurtherStudies}
                            onChange={(e) => {
                              setEnrollFurtherStudies(e.target.value);
                              if (e.target.value !== "Other") {
                                setOtherEnrollDescription(""); // Clear custom input if not "Other"
                              }
                            }}
                            required
                          >
                            <option value="With Doctoral Units">
                              With Doctoral Units
                            </option>
                            <option value="MA/MS Graduate">
                              MA/MS Graduate
                            </option>
                            <option value="With MA/MS Units">
                              With MA/MS Units
                            </option>
                            <option value="Other Baccalaureate Course">
                              Other Baccalaureate Course
                            </option>
                            <option value="Not Applicable">
                              Not Applicable
                            </option>
                            <option value="Other">Other</option>
                          </select>
                          {enrollFurtherStudies === "Other" && (
                            <input
                              type="text"
                              placeholder="Please specify"
                              value={otherEnrollDescription}
                              onChange={(e) =>
                                setOtherEnrollDescription(e.target.value)
                              }
                              required
                            />
                          )}
                        </div>
                      )}
                      <div className="input-fields">
                        <label>Eligibility Acquired (if any)</label>
                        <select
                          value={eligibility}
                          onChange={(e) => {
                            seteligibility(e.target.value);
                            if (e.target.value !== "Other") {
                              setOtherEligibilityDescription("");
                            }
                          }}
                          required
                        >
                          <option value="Bar and Board Examination Eligibility">
                            Bar and Board Examination Eligibility
                          </option>
                          <option value="Pilot Eligibility for Military Aviators">
                            Pilot Eligibility for Military Aviators
                          </option>
                          <option value="National Service Training Eligibility">
                            National Service Training Eligibility
                          </option>
                          <option value="Philippine National Police (PNP) Entrance Eligibility">
                            Philippine National Police (PNP) Entrance
                            Eligibility
                          </option>
                          <option value="Barangay Health Workers Eligibility">
                            Barangay Health Workers Eligibility
                          </option>
                          <option value="Career Service Professional and Sub-Professional Eligibility">
                            Career Service Professional Eligibility
                          </option>
                          <option value="Career Service Professional and Sub-Professional Eligibility">
                            Career Service Sub-Professional Eligibility
                          </option>
                          <option value="Honor Graduate Eligibility">
                            Honor Graduate Eligibility
                          </option>
                          <option value="Industrial Safety and Health Eligibility">
                            Industrial Safety and Health Eligibility
                          </option>
                          <option value="Philippine Veterans Affairs Office (PVAO) Eligibility">
                            Philippine Veterans Affairs Office (PVAO)
                            Eligibility
                          </option>
                          <option value="Fire Officer Eligibility">
                            Fire Officer Eligibility
                          </option>
                          <option value="Licensed Professional Teacher Eligibility">
                            Licensed Professional Teacher Eligibility
                          </option>
                          <option value="Not Applicable">Not Applicable</option>
                          <option value="Other">Other</option>
                        </select>
                        {eligibility === "Other" && (
                          <input
                            type="text"
                            placeholder="Please specify"
                            value={otherEligibilityDescription}
                            onChange={(e) =>
                              setOtherEligibilityDescription(e.target.value)
                            }
                            required
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="buttons">
                  <div className="backBtn" onClick={handleBackButtonClick}>
                    <i className="uil uil-navigator"></i>
                    <span className="btnText">Back</span>
                  </div>

                  <button
                    className="nextBtn"
                    onClick={(e) => {
                      handleOTP(e);
                      toast("Please Check Your Email for OTP");
                    }}
                  >
                    <span className="btnText">Proceed</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {!showFormFirst && (
            <div className="form third">
              <div className="details personal">
                <span className="title">OTP</span>
                <div className="fields">
                  <>
                    <div className="input-fields">
                      <label>OTP</label>
                      <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="number"
                        placeholder=""
                      />
                    </div>
                  </>
                </div>

                <div className="buttons">
                  <button className="nextBtn" onClick={handleRegister}>
                    <span className="btnText">Register</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Registration;
