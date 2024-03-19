import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ChangeAvatar from "../ui/ChangeAvatar";
import PasswordInput from "../ui/PasswordInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/currentUserReducer";

const Register = ({ navigation }) => {
  const [avatar, setAvatar] = useState(require("../../assets/avatar.png"));
  const [avatarFull, setAvatarFull] = useState(
    require("../../assets/avatar.png")
  );
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);

  const dispatch = useDispatch();

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
    onSubmit: async () => {
      const formData = new FormData();
      formData.append("name", formik.values.username);
      formData.append("email", formik.values.email);
      formData.append("password", formik.values.password);
      formData.append("passwordConfirm", formik.values.confirmPassword);
      formData.append("avatar", avatarFull);

      try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/users/signup", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        await AsyncStorage.setItem("token", data.data.token);
        console.log("TOKEN ", data.data.token);
        dispatch(setUser(data.data));
        navigation.navigate("Landing");
      } catch (err) {
        console.log("Error: ", err.message);
      }
    },
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.avatarContainer}>
        <ChangeAvatar
          setImage={setAvatar}
          setAvatarFull={setAvatarFull}
          source={avatar}
          imageStyle={{ height: 170, width: 170 }}
        />
      </View>

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
        <PasswordInput
          passwordIsVisible={passwordIsVisible}
          setPasswordIsVisible={setPasswordIsVisible}
          placeholder="Password"
          onChange={formik.handleChange("password")}
          value={formik.values.password}
        />

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

        <PasswordInput
          passwordIsVisible={confirmPasswordIsVisible}
          setPasswordIsVisible={setConfirmPasswordIsVisible}
          placeholder="Confirm password"
          onChange={formik.handleChange("confirmPassword")}
          value={formik.values.confirmPassword}
        />
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
        <TouchableOpacity
          onPress={formik.handleSubmit}
          style={styles.signupButton}
        >
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -50,
    marginBottom: 30,
  },
  changeImageIconContainer: {
    backgroundColor: "#8DC6FC",
    padding: 5,
    borderRadius: 40,
    position: "absolute",
    bottom: 0,
    right: 20,
    borderColor: "#fff",
    borderWidth: 3,
  },

  avatar: {
    height: 200,
    width: 200,
  },
  form: {
    paddingTop: -50,
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

  signUpLink: {
    color: "#666",
    paddingVertical: 1,
  },
  linkContainer: {},
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
  signupButton: {
    backgroundColor: "#8DC6FC",
    padding: 10,
    borderRadius: 10,
    marginTop: 50,
  },
  signupButtonText: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "500",
    letterSpacing: 0.6,
  },
});
