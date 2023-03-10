import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import "firebase/auth";
import { useAuth } from "../utils/Firebase";
import { Auth } from "../config/Firebase";
import { firebaseAuth } from "../config/Firebase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Controller, useForm } from "react-hook-form";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function LoginDialog({ visible, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const { control, getValues, formState: { errors }, trigger, clearErrors } = useForm({
    defaultValues: { email: "", password: "", name: "" },
    reValidateMode: "onChange",
  });
  const navigate = useNavigate();

  const hasError = (name: keyof typeof errors) => !!errors[name];


  useEffect(() => {
    clearErrors();
  }, [clearErrors, activeTab]);

  return (
    <Dialog maxWidth="xs" open={visible} onClose={onClose}>
      <DialogContent>
        <Tabs
          variant="fullWidth"
          value={activeTab}
          onChange={(_, tab) => setActiveTab(tab)}
        >
          <Tab label="Login" value="login" />
          <Tab label="Sign up" value="signup" />
        </Tabs>
        <Box height={16} />

        {activeTab === "signup" && (
          <React.Fragment>
            <Controller
              render={({ field: { onChange, onBlur, value, ref } }) =>
                <TextField
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  error={hasError("name")}
                  disabled={loading}
                  onChange={onChange}
                />
              }
              rules={{ required: "Please provide your name" }}
              control={control}
              name="name"
            />

            <Box height={4} />
          </React.Fragment>
        )}

        <Controller
          render={({ field: { onChange, onBlur, value, ref } }) =>
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              error={hasError("email")}
              disabled={loading}
              onChange={onChange}
            />
          }
          rules={{
            required: "Please provide your email",
            pattern: {
              message: "Please provide a valid email",
              value: EMAIL_REGEX,
            },
          }}
          control={control}
          name="email"
        />

        <Box height={4} />

        <Controller
          render={({ field: { onChange, onBlur, value, ref } }) =>
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              error={hasError("password")}
              disabled={loading}
              onChange={onChange}
            />
          }
          rules={{
            required: "Please provide password",
            minLength: {
              value: 6,
              message: "Password should be at least 6 characters",
            },
          }}
          control={control}
          name="password"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={async () => {
            const valid = await trigger();

            if (!valid) {
              return;
            }

            const values = getValues();

            try {
              setLoading(true);
              if (activeTab === "login") {
                await Auth.signInWithEmailAndPassword(
                  values.email,
                  values.password
                );
              } else if (activeTab === "signup") {
                try {
                  const userCredential = await createUserWithEmailAndPassword(firebaseAuth, values.email, values.password)
                  await auth?.updateProfile({ displayName: values.name })
                  const user = userCredential.user;
                  console.log(user);
                } catch (error: any) {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                }
              }
              navigate("/fileschooser");
              onClose();
            } catch (error: any) {
              console.log({ error });
              setErrorMessage(error?.message || "Unknown error occured");
            } finally {
              setLoading(false);
            }
          }}
          color="primary"
        >
          {activeTab === "login" ? "Login" : "Sign up"}
        </Button>
      </DialogActions>
      <Snackbar
        open={errorMessage !== null}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert onClose={() => setErrorMessage(null)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
