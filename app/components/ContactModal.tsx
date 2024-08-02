// components/Modal.js
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles/ContactModal.module.css";
import Swal from "sweetalert2";

const Modal = ({ isOpen, onClose }) => {
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  const validationSchema = Yup.object({
    name: Yup.string().required("Nombre completo es requerido"),
    ci: Yup.string().required("Cédula de identidad es requerida"),
    phone_number: Yup.string().required("Número de teléfono es requerido"),
    email: Yup.string().email("Email inválido").required("Email es requerido"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    Swal.fire({
      title: "Muchas gracias!",
      text: "Para continuar con tu orden por favor ingresa a este chat de whatsapp: https://wa.me/123",
      icon: "success",
    });
    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-order`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(values),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Error al enviar el formulario");
    //   }

    //   const data = await response.json();
    //   console.log(data);
    //   setSubmitError("");
    // } catch (error) {
    //   setSubmitError("Hubo un problema al enviar el formulario.");
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>Información necesaria</h2>
        <Formik
          initialValues={{ name: "", ci: "", phone_number: "", email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre Completo</label>
                <Field className={styles.field} name="name" type="text" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="ci">Cédula de Identidad</label>
                <Field className={styles.field} name="ci" type="text" />
                <ErrorMessage
                  name="ci"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone_number">Número de Teléfono</label>
                <Field
                  className={styles.field}
                  name="phone_number"
                  type="text"
                />
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field className={styles.field} name="email" type="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>
              {submitError && (
                <div className={styles.errorBadge}>{submitError}</div>
              )}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                Enviar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
