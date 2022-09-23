import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import SocialMediaButton from "../../components/SocialMediaButton";
import emailLogin from "../../firebase/login";
import GoogleAuth from "../../firebase/GoogleAuth";

const schema = yup.object().shape({
  email: yup.string().email().required("* Email is required."),
  password: yup
    .string()
    .required("* Password is required.")
    .min(8, "* Password is too short - should be 8 chars minimum."),
});

const LoginForm = () => {
  const [loginError, setLoginError] = useState();

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    emailLogin({ email: data.email, password: data.password }).catch((e) => setLoginError(e.message));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <TextInput name="email" register={register} placeholder="E-mail" error={errors.email} />
        {errors.email && <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>{errors.email.message}</span>}

        <TextInput name="password" register={register} placeholder="Password" type="password" error={errors.password} />
        {errors.password && <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>{errors.password.message}</span>}

        <Button type="submit">Login</Button>
        {loginError && (
          <span
            style={{
              color: "red",
              marginTop: -10,
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            {loginError}
          </span>
        )}
        <span style={{ fontWeight: "bold", marginBottom: 60 }}>
          <Link href="/forgot-password">Forgot Password?</Link>
        </span>

        {/*   Social Media Buttons  */}
        <hr style={{ width: "100%", height: 1, color: "#f6f6f655" }} />
        <span
          style={{
            textAlign: "center",
            marginTop: -35,
            padding: 15,
            backgroundColor: "white",
            display: "flex",
            alignSelf: "center",
            width: "max-content",
            fontWeight: "500",
          }}
        >
          Login with social media
        </span>
      </form>
      <div>
        <SocialMediaButton style={{ marginRight: 0 }} icon="google" onClick={GoogleAuth}>
          Google
        </SocialMediaButton>
      </div>
    </>
  );
};

export default LoginForm;
