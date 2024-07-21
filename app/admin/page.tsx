"use client";

import React from "react";
import LoginForm from "../components/LoginForm";
import styles from "./styles.module.css";

const AdminLogin = () => {
  return (
    <div className={styles.loginView}>
      <LoginForm />
    </div>
  );
};

export default AdminLogin;
