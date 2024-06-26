"use client";

import React, { useState } from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";

import logoApp from "@/assets/logo_page.png";
import axios from "axios";
import { toast } from "sonner";

function SigninComponents() {
  const [mail, setMail] = useState<string | null>(null);
  const [pass, setPass] = useState<string | null>(null);
  const [readyMail, setReadyMail] = useState<boolean>(false);

  const onPreLogin = async () => {
    if (!mail || mail.length == 0) toast.error("Ingresa tu correo electronico");

    const response = await axios.post("/api/auth/verify", {
      email: mail,
    });

    console.log(response)
    // setReadyMail(true);
  };

  return (
    <main className={styles.main}>
      <div className={styles.centerMain}>
        <div className={styles.boxLogo}>
          <Image className={styles.logoIcon} src={logoApp} alt="logo" />
        </div>
        <h4 className={styles.messagesSignin}>
          ¡Embárcate en una Épica Aventura Ciclista con mi Guía del
          Cicloviajero!
        </h4>
        <div className={styles.boxMailInput}>
          <input
            onChange={(e) => setMail(e.target.value)}
            className={styles.mailInput}
            type="text"
            placeholder="Ingresa tu correo electronico"
          />
        </div>

        {readyMail && mail && mail.length > 0 && (
          <div className={styles.boxMailInput}>
            <input
              onChange={(e) => setPass(e.target.value)}
              className={styles.mailInput}
              type="text"
              placeholder="Ingresa tu Contraseña"
            />
          </div>
        )}

        <div className={styles.boxMail}>
          <button onClick={onPreLogin}>
            {!readyMail ? "Verificar" : "Ingresar"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default SigninComponents;
