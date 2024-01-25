import { useEffect, useState } from "react";
import "../../components/Registration/form.css";
import ASidebar from "../../components/AlumniSide/ASidebar";
import AAlumniboardView from "../../components/AlumniSide/AAlumniboardView";
import { useHooks } from "./hooks";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

const AProfile = () => {
  const {
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
    employment_status,
    setemploymentstatus,
    otherEligibilityDescription,
    otherEnrollDescription,
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
    closeProfile,
    handleMobileNumberChange,
    handleImageChange,
    handleUpdateProfile,
    updated,
  } = useHooks();

  useEffect(() => {
    if (updated) {
      // Fetch the updated user details
      mobileNumber("");
      setCurrentAddress("");
      setemploymentstatus("");
      setcurrent_job("");
      setyear_current_job("");
      setposition_current_job("");
      setemployment_type("");
      setplace_current_job("");
      setFurtherStudies("");
      setEnrollFurtherStudies("");
      seteligibility("");
      setImage("");
      handleUpdateProfile();
    }
  }, [updated, handleUpdateProfile]);

  console.log(
    "profilePic value",
    firstName,
    lastName,
    middleName,
    mobileNumber,
    gender,
    currentAddress,
    dateOfBirth,
    yearGraduated,
    setemploymentstatus,
    employment_status,
    current_job,
    year_current_job,
    jobDuration,
    position_current_job,
    employment_type,
    place_current_job,
    furtherStudies,
    enrollFurtherStudies
  );

  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh] border">
        <ASidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <AAlumniboardView />

        <div className="min-h-screen flex flex-col items-center mx-auto bg-green-100">
          <div className="body-container">
            <div className="flex justify-end text-2xl">
              <button onClick={toggleProfile}>
                <AiFillEdit />
              </button>
            </div>
            <div className="profile-picture">
              {Image && (
                <img
                  src={Image}
                  alt="profile picture"
                  className="w-40 h-40 rounded-full mx-auto "
                  style={{
                    backgroundSize: "contain",
                  }}
                />
              )}
            </div>
            {/* /*Modal Update Section */}
            <form action="#" onSubmit={handleUpdateProfile}>
              {/* onSubmit={handleProfile}*/}
              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10 overflow-x-auto">
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  <div className="bg-zinc-200 p-4 rounded h-[70%] w-[50%] shadow-lg z-20">
                    <div
                      className="flex justify-end text-2xl"
                      onClick={closeProfile}
                    >
                      <AiFillCloseCircle />
                    </div>
                    <div className="fields">
                      <div className="input-fields">
                        <label>Mobile Number </label>
                        <input
                          type="text"
                          placeholder="Enter mobile number"
                          value={mobileNumber || ""}
                          onChange={handleMobileNumberChange}
                        />
                      </div>
                      <div className="input-fields">
                        <label>Current Address</label>
                        <input
                          type="text"
                          placeholder="Brgy.; City/Municipality;Province"
                          value={currentAddress}
                          onChange={(e) => setCurrentAddress(e.target.value)}
                        />
                      </div>

                      <div className="input-fields">
                        <label>Image</label>
                        <input type="file" onChange={handleImageChange} />
                      </div>

                      <div className="fields">
                        <div className="input-fields">
                          <select
                            value={employment_status}
                            onChange={(e) =>
                              setemploymentstatus(e.target.value)
                            }
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
                              />
                            </div>
                            <div className="input-fields">
                              <label>Year(s) in Current Job</label>
                              <input
                                value={year_current_job}
                                onChange={(e) =>
                                  setyear_current_job(e.target.value)
                                }
                                type="number"
                                placeholder=""
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
                              />
                            </div>
                            <div className="input-fields">
                              <label>Employment Type</label>
                              <select
                                value={employment_type}
                                onChange={(e) =>
                                  setemployment_type(e.target.value)
                                }
                              >
                                <option value="">Select Employment Type</option>
                                <option value="Regular">Regular</option>
                                <option value="Casual">Casual</option>
                                <option value="Project">Project</option>
                                <option value="Seasonal">Seasonal</option>
                                <option value="Fixed">Fixed-term</option>
                                <option value="Probationary">
                                  Probationary
                                </option>
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
                              />
                            </div>
                            <div className="input-fields">
                              <label>Engage in further Studies?</label>
                              <select
                                value={furtherStudies}
                                onChange={(e) => {
                                  setFurtherStudies(e.target.value);
                                }}
                              >
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                              </select>
                            </div>

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
                                />
                              )}
                            </div>

                            <div className="input-fields">
                              <label>Eligibility Acquired (if any)</label>
                              <select
                                value={eligibility}
                                onChange={(e) => {
                                  seteligibility(e.target.value);
                                  if (e.target.value !== "Other") {
                                    setOtherEligibilityDescription(""); // Clear custom input if not "Other"
                                  }
                                }}
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
                                <option value="Other">Other</option>
                              </select>
                              {eligibility === "Other" && (
                                <input
                                  type="text"
                                  placeholder="Please specify"
                                  value={otherEligibilityDescription}
                                  onChange={(e) =>
                                    setOtherEligibilityDescription(
                                      e.target.value
                                    )
                                  }
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
                                />
                              )}
                            </div>
                            <div className="input-fields">
                              <label>Eligibility Acquired (if any)</label>
                              <select
                                value={eligibility}
                                onChange={(e) => {
                                  setEligibilityAcquired(e.target.value);
                                  if (e.target.value !== "Other") {
                                    setOtherEligibilityDescription(""); // Clear custom input if not "Other"
                                  }
                                }}
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
                                  Career Service Professional and
                                  Sub-Professional Eligibility
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
                                <option value="Other">Other</option>
                              </select>
                              {eligibility === "Other" && (
                                <input
                                  type="text"
                                  placeholder="Please specify"
                                  value={otherEligibilityDescription}
                                  onChange={(e) =>
                                    setOtherEligibilityDescription(
                                      e.target.value
                                    )
                                  }
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <button
                        className="Button"
                        onClick={() => {
                          handleUpdateProfile();
                          toast("Updated Successfully");
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="form first">
                <div className="details personal">
                  <div className="fields">
                    <div className="input-fields">
                      <label className="header">LastName</label>
                      <label className="label">{lastName}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">FirstName</label>
                      <label className="labeled">{firstName}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">MiddleName</label>
                      <label className="label">{middleName}</label>
                    </div>

                    <div className="input-fields">
                      <label className="header">Mobile Number </label>
                      <label className="label">{mobileNumber} </label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Gender</label>
                      <label className="label">{gender}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Current Address</label>
                      <label className="label">{currentAddress}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Date of Birth</label>
                      <label className="label">{dateOfBirth}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Year Graduated</label>
                      <label className="label">{yearGraduated}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Employment Status</label>
                      <label className="label">{employment_status}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Current Job</label>
                      <label className="label">{current_job}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Year Current Job</label>
                      <label className="label">{year_current_job}</label>
                    </div>

                    <div className="input-fields">
                      <label className="header">Job Duration</label>
                      <label className="label">{jobDuration}</label>
                    </div>

                    <div className="input-fields">
                      <label className="header">Position Current Job</label>
                      <label className="label">{position_current_job}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Employment Type</label>
                      <label className="label">{employment_type}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Place Current Job</label>
                      <label className="label">{place_current_job}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Further Studies</label>
                      <label className="label">{furtherStudies}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Enroll Further Studies</label>
                      <label className="label">{enrollFurtherStudies}</label>
                    </div>
                    <div className="input-fields">
                      <label className="header">Eligibility</label>
                      <label className="label">{eligibility}</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AProfile;
