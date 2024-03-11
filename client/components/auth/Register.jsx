import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = ({ navigation }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Username must be less than 20 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be more than 6 characters.")
        .max(20, "Password must be less than 20 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .min(6, "Password must be more than 6 characters.")
        .max(20, "Password must be less than 20 characters")
        .required("Required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: () => {
      navigation.navigate("Landing");
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* Username  */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={formik.handleChange("username")}
            value={formik.values.username}
            onBlur={formik.handleBlur("username")}
          />
        </View>
        <Text
          style={[
            styles.errorInvisible,
            formik.errors.username && formik.touched.username
              ? styles.errorVisible
              : "",
          ]}
        >
          {formik.errors.username}
        </Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={formik.handleChange("email")}
            value={formik.values.email}
            onBlur={formik.handleBlur("email")}
          />
        </View>
        <Text
          style={
            formik.errors.email && formik.touched.email
              ? styles.errorVisible
              : styles.errorInvisible
          }
        >
          {formik.errors.email}
        </Text>

        {/* Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={passwordIsVisible ? false : true}
            onChangeText={formik.handleChange("password")}
            value={formik.values.password}
          />
          {!passwordIsVisible && (
            <Pressable
              onPress={() => setPasswordIsVisible(true)}
              style={styles.icon}
            >
              <Feather name="eye" size={22} color="black" />
            </Pressable>
          )}
          {passwordIsVisible && (
            <Pressable
              onPress={() => setPasswordIsVisible(false)}
              style={styles.icon}
            >
              <Feather name="eye-off" size={22} color="black" />
            </Pressable>
          )}
        </View>
        <Text
          style={
            formik.errors.password && formik.touched.password
              ? styles.errorVisible
              : styles.errorInvisible
          }
        >
          {formik.errors.password}
        </Text>

        {/* ConfirmPassword */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={confirmPasswordIsVisible ? false : true}
            onChangeText={formik.handleChange("confirmPassword")}
            value={formik.values.confirmPassword}
          />
          {!confirmPasswordIsVisible && (
            <Pressable
              onPress={() => setConfirmPasswordIsVisible(true)}
              style={styles.icon}
            >
              <Feather name="eye" size={22} color="black" />
            </Pressable>
          )}
          {confirmPasswordIsVisible && (
            <Pressable
              onPress={() => setConfirmPasswordIsVisible(false)}
              style={styles.icon}
            >
              <Feather name="eye-off" size={22} color="black" />
            </Pressable>
          )}
        </View>
        <Text
          style={
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? styles.errorVisible
              : styles.errorInvisible
          }
        >
          {formik.errors.confirmPassword}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.linkContainer,
            pressed && styles.pressed,
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.signUpLink}>
            Already have an account? Log in!
          </Text>
        </Pressable>
        <Button title="Sign up" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  form: {
    marginTop: -50,
    alignItems: "center",
  },
  input: {
    alignSelf: "stretch",
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    flex: 1,
  },
  inputContainer: {
    alignSelf: "stretch",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    paddingHorizontal: 8,
  },
  signUpLink: {
    color: "#666",
    paddingVertical: 1,
  },
  linkContainer: {
    borderBottomColor: "#666",
    borderBottomWidth: 1,
  },
  pressed: {
    opacity: 0.5,
  },
  errorVisible: {
    color: "red",
    margin: 0,
    alignSelf: "flex-start",
    padding: 2,
    height: 22,
  },
  errorInvisible: {
    color: "transparent",
    height: 22,
  },
});
