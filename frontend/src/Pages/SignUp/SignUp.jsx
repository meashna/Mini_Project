import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoPerson, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import styles from "./SignUp.module.css";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phonenumber, setPhonenumber] = useState("");
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.match(/[^0-9 ]/) && value.replace(/\D/g, "").length <= 10) {
      setPhonenumber(value);
      setInputs((prev) => ({ ...prev, phonenumber: value }));
    }
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (/^\D*$/.test(value)) {
      // If no digits are found, update the state
      if (name === "username") {
        setInputs((prev) => ({ ...prev, username: value }));
      }
    }
  };

  const confirmpswrdChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (/^\D*$/.test(value)) {
      // If no digits are found, update the state
      if (name === "confirmPassword") {
        setConfirmPassword(value);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal({
        icon: "warning",
        title: "Passwords do not match.",
        button: "Try Again",
      });
      return;
    }

    // Include only password in Inputs
    const inputData = { ...Inputs, password };

    // Validation
    if (
      !inputData.email.trim() ||
      !inputData.username.trim() ||
      !inputData.phonenumber.trim() ||
      !inputData.role.trim()
    ) {
      Swal({
        icon: "warning",
        title: "Please fill out all fields.",
        button: "Try Again",
      });
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signup",
        inputData
      );

      if (response.data.message === "User added") {
        sessionStorage.setItem("id", response.data._id);
        localStorage.setItem("username", inputData.username);
        localStorage.setItem("usermail", inputData.email);
        sessionStorage.setItem("usermail", inputData.email);

        if (inputData.role === "buyer") {
          setProgress(100);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else if (inputData.role === "seller") {
          setProgress(100);
          setTimeout(() => {
            navigate("/seller");
          }, 2000);
        }

        Swal({
          icon: "success",
          title: "Registered Successfully.",
          button: "OK",
        });
      }
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data.message === "User already exists"
      ) {
        Swal({
          icon: "error",
          title: "User already exists",
          button: "Try Again",
        });
        navigate("/signin");
      }
    }
  };

  // Effects
  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(prevProgress + Math.random() * 10, 100);
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [loading]);

  return (
    <div>
      <div className={styles.form_container}>
        {loading ? (
          <div className={styles.loader_container}>
            <CircularProgressbar
              value={progress}
              text={`${progress.toFixed(0)}%`}
              styles={{
                text: { fill: "#fff" },
                trail: { stroke: "#d6d6d6" },
                path: { stroke: "#458393", strokeLinecap: "round" },
              }}
            />
          </div>
        ) : (
          <div className={styles.loader_container} style={{ display: "none" }}>
            <CircularProgressbar
              value={progress}
              text={`${progress.toFixed(0)}%`}
            />
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.login_heading}>Register</h2>
          <div className={styles.form_control}>
            <input
              type="text"
              name="username"
              onChange={handleUsernameChange}
              value={Inputs.username}
              placeholder="Enter your name"
              pattern="^[A-Za-z][A-Za-z\s]*$"
              title="Name must start with a letter and can only contain letters and spaces"
              required
            />
            <div className={styles.icon}>
              <IoPerson />
            </div>
          </div>
          <div className={styles.form_control}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={change}
              value={Inputs.email}
              required
              pattern="[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
              title="Please enter a valid email address  e.g. 0OYk7@example.com"
            />
            <div className={styles.icon}>
              <MdOutlineAlternateEmail />
            </div>
          </div>
          <div className={styles.form_control}>
            <input
              placeholder="Phone no"
              type="tel"
              required
              pattern="\d{10}"
              title="Phone number must contain 10 digits."
              onChange={handlePhoneChange}
              value={Inputs.phonenumber}
            />
            <div className={styles.icon}>
              <FaPhoneAlt />
            </div>
          </div>

          {/* password */}
          <div className={styles.form_control}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
              title="Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one digit, and one special character"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.toggle_password}
            >
              {showPassword ? (
                <IoEyeOutline className={styles.viewicon} />
              ) : (
                <IoEyeOffOutline className={styles.viewicon} />
              )}
            </button>
          </div>

          {/* confirm password */}
          <div className={styles.form_control}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
              title="Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one digit, and one special character"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className={styles.toggle_password}
            >
              {showConfirmPassword ? (
                <IoEyeOutline className={styles.viewicon} />
              ) : (
                <IoEyeOffOutline className={styles.viewicon} />
              )}
            </button>
          </div>

          <select
            name="role"
            value={Inputs.role}
            onChange={change}
            required
            className={styles.select}
          >
            <option value="">Select Role</option>
            <option value="seller">Seller </option>
            <option value="buyer">Buyer</option>
          </select>

          <button className={styles.login_btn} type="submit">
            Register
          </button>
          <p className={styles.reg_p}>
            Already have an account?
            <Link className={styles.reg_link} to="/signin">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
