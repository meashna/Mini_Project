import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoPerson, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { RiLock2Fill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import Swal from "sweetalert";
import styles from "./SignUp.module.css";
import "react-circular-progressbar/dist/styles.css";

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
  const [showPassword, setShowPassword] = useState(false);

  // Navigate hook
  const navigate = useNavigate();

  // const handlePhoneChange = (e) => {
  //   const value = e.target.value;
  //   if (!value.match(/[^0-9 ]/) && value.replace(/\D/g, "").length <= 10) {
  //     setPhonenumber(value);
  //   }
  // };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.match(/[^0-9 ]/) && value.replace(/\D/g, "").length <= 10) {
      setPhonenumber(value);
      setInputs((prev) => ({ ...prev, phonenumber: value }));
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("This is inputs", Inputs);
    // Validation
    if (
      !Inputs.email.trim() ||
      !Inputs.password.trim() ||
      !Inputs.username.trim() ||
      !Inputs.phonenumber.trim() ||
      !Inputs.role.trim()
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
        Inputs
      );
      console.log("This is response", response.data._id);
      console.log(response.data._id);
      sessionStorage.setItem("id", response.data._id);
      if (response.data.message === "User added") {
        sessionStorage.setItem("id", response.data._id);
        localStorage.setItem("username", Inputs.username);
        localStorage.setItem("usermail", Inputs.email);
        sessionStorage.setItem("usermail", Inputs.email);
        // setProgress(100);
        // setTimeout(() => navigate("/home"), 500);
        if (Inputs.role === "buyer") {
          setProgress(100);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else if (Inputs.role === "seller") {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              onChange={change}
              value={Inputs.username}
              placeholder="Enter your name"
              pattern="[A-Za-z]+"
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
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
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
          <div className={styles.form_control}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={change}
              value={Inputs.password}
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
          <select name="role" value={Inputs.role} onChange={change} required>
            <option value="">Select Role</option>
            <option value="seller">I want to offer products for rent. </option>
            <option value="buyer">I am looking to purchase products.</option>
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
