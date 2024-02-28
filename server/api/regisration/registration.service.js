const {
  PromiseQuery,
  beginTransactions,
  commitTransactions,
  rollBackTransactions,
} = require("../../utils/promise-query");
const { generateToken } = require("./../../utils/token");
const { TABLES } = require("./../../constants");
const { AuthService } = require("../auth/auth.service");
const { ErrorException } = require("../../utils/catch-error");
const { createLog } = require("../../events/listener");
const { ACTIONS } = require("./../../constants");

const RegistrationService = {
  REGISTER: async (payload) => {
    try {
      const {
        firstName,
        lastName,
        middleName,
        mobileNumber,
        gender,
        currentAddress,
        dateOfBirth,
        yearGraduated,
        email,
        hashedPassword,
        avatar,
        employment_status,
        current_job,
        year_current_job,
        jobDuration,
        position_current_job,
        employment_type,
        place_current_job,
        furtherStudies,
        enrollFurtherStudies,
        eligibility,
      } = payload;

      const status = "pending";

      const avatarPath = `/uploads/${avatar}`;

      const data = [
        firstName,
        lastName,
        middleName,
        mobileNumber,
        gender,
        currentAddress,
        dateOfBirth,
        yearGraduated,
        email,
        hashedPassword,
        avatarPath,
        employment_status,
        current_job,
        year_current_job,
        jobDuration,
        position_current_job,
        employment_type,
        place_current_job,
        furtherStudies,
        enrollFurtherStudies,
        eligibility,
        status,
      ];
      console.log(data);

      beginTransactions();
      const createdData = await PromiseQuery({
        query: `INSERT INTO ${TABLES.REGISTRATION} (fname, lname, mname, phoneno, gender, address, bday, yeargrad, email, password, Image, employment_status, current_job, year_current_job, job_duration_after_grad, position_current_job,  employment_type, place_current_job, engage_studies, enroll_studies,eligibility, status) 
         VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        values: data,
      });

      if (!createdData) {
        rollBackTransactions();
        throw new Error(
          "There was a problem during registration, something went wrong."
        );
      }

      if (createdData.affectedRows) {
        const { insertId } = createdData;

        const [registration] = await PromiseQuery({
          query: `SELECT * FROM ${TABLES.REGISTRATION} WHERE id=?`,
          values: [insertId],
        });

        if (!registration) {
          rollBackTransactions();
          throw new Error(
            "There was a problem during registration, something went wrong."
          );
        }

        const { password: createdPassword, ...tokenPayload } = registration;

        const accessToken = generateToken({
          ...tokenPayload,
          avatar: avatarPath,
        });

        await PromiseQuery({
          query: `UPDATE ${TABLES.REGISTRATION} SET token=? WHERE id=?`,
          values: [accessToken, registration.id],
        });

        commitTransactions();

        return {
          accessToken,
        };
      }
    } catch (err) {
      rollBackTransactions();
      throw err;
    }
  },
  UPDATE: async (payload) => {
    try {
      beginTransactions();
      const {
        mobileNumber,
        currentAddress,
        avatar,
        employment_status,
        current_job,
        year_current_job,
        position_current_job,
        employment_type,
        place_current_job,
        furtherStudies,
        enrollFurtherStudies,
        eligibility,
        id,
      } = payload;

      if (isNaN(id)) {
        throw new Error("Invalid id provided.");
      }

      const Image = avatar ? `/uploads/${avatar}` : "";

      /**
       * Get the before data first to as activity logs
       */
      const beforeRegistered = await AuthService.USER_ID({ id });

      let data = [
        mobileNumber,
        currentAddress,
        Image,
        employment_status,
        current_job,
        year_current_job,
        position_current_job,
        employment_type,
        place_current_job,
        furtherStudies,
        enrollFurtherStudies,
        eligibility,
        id,
      ];
      let query = `UPDATE ${TABLES.REGISTRATION} SET phoneno=?, address=?,Image=?, employment_status=?, current_job=?, year_current_job=?, position_current_job=?, employment_type=?, place_current_job=?, engage_studies=?, enroll_studies=?, eligibility=? WHERE id=?`;

      if (Image.trim().length === 0) {
        data = [
          mobileNumber,
          currentAddress,
          employment_status,
          current_job,
          year_current_job,
          position_current_job,
          employment_type,
          place_current_job,
          furtherStudies,
          enrollFurtherStudies,
          eligibility,
          id,
        ];
        query = `UPDATE ${TABLES.REGISTRATION} SET phoneno=?, address=?, employment_status=?, current_job=?, year_current_job=?, position_current_job=?, employment_type=?, place_current_job=?, engage_studies=?, enroll_studies=?, eligibility=? WHERE id=?`;
      }
      const updateData = await PromiseQuery({
        query: query,
        values: data,
      });

      if (!updateData) {
        throw new Error("Failed to update user data.");
      }

      const registered = await AuthService.USER_ID({ id });

      if (!registered) {
        throw new ErrorException("ID");
      }
      const { ...tokenPayload } = registered;

      const accessToken = generateToken({
        ...tokenPayload,
        avatar: avatar && `/uploads/${avatar}`,
      });

      const updateToken = await PromiseQuery({
        query: `UPDATE ${TABLES.REGISTRATION} SET token=? WHERE id=?`,
        values: [accessToken, id],
      });

      /**
       * Create activity logs here
       */
      const after = registered;
      const createLogs = await createLog({
        after,
        before: beforeRegistered,
        registration_id: id,
        action: ACTIONS.UPDATE,
        description: "A user updated his detail.",
      });

      commitTransactions();

      return {
        accessToken,
      };
    } catch (err) {
      rollBackTransactions();
      throw err;
    }
  },
  getAllRegistrations: async () => {
    try {
      const registrations = await PromiseQuery({
        query: `SELECT * FROM ${TABLES.REGISTRATION} WHERE status = 'verified'`,
      });
      return registrations;
    } catch (error) {
      console.error("Error fetching registration data:", error);
      throw new Error("Error fetching registration data");
    }
  },
  getUserEmail: async (email) => {
    try {
      const getUser = await PromiseQuery({
        query: `SELECT * FROM registration WHERE email=? AND status='verified'`,
        values: [email],
      });
      return getUser;
    } catch (error) {
      console.error("Error fetching registration data:", error);
      throw new Error("Error fetching registration data");
    }
  },
  postOtp: async (email, otp, createdAt, expiresAt) => {
    try {
      const postData = [email, otp, createdAt, expiresAt];

      await PromiseQuery({
        query: `INSERT INTO otp (email, otp, createdAt, expiresAt) VALUES (?, ?, ?, ?)`,
        values: postData,
      });
    } catch (error) {
      console.error("Error inserting OTP data:", error);
      throw new Error("Error inserting OTP data");
    }
  },
  deleteOtp: async (email) => {
    try {
      await PromiseQuery({
        query: `DELETE FROM otp WHERE email = ?`,
        values: [email],
      });
    } catch (error) {
      console.error("Error deleting OTP data:", error);
      throw new Error("Error deleting OTP data");
    }
  },
  updateStatus: async (email) => {
    try {
      const querys = await PromiseQuery({
        query: `UPDATE registration
                    SET status = 'verified'
                    WHERE email = ?`,
        values: [email],
      });
      console.log(querys, email);
    } catch (err) {
      console.log(err);
      throw new Error("Error updating OTP status");
    }
  },
  deleteUnverified: async (email) => {
    try {
      await PromiseQuery({
        query: `DELETE FROM registration WHERE status = 'pending' AND email = ?`,
        values: [email],
      });
      console.log("Email deleted successfully:", email);
    } catch (err) {
      console.log(err);
      throw new Error("Error deleting unverified email");
    }
  },

  getOtpByEmail: async (email) => {
    try {
      const otpData = await PromiseQuery({
        query: `SELECT * FROM otp WHERE email = ?`,
        values: [email],
      });
      return otpData[0]; // Assuming there's only one OTP data per email
    } catch (err) {
      console.log(err);
      throw new Error("Error retrieving OTP data by email");
    }
  },
};

module.exports = {
  RegistrationService,
};
