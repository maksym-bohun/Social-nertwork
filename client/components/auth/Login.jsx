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
import PasswordInput from "../ui/PasswordInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { fetchCurrentUser, setUser } from "../../store/currentUserReducer";
import { fetchUsers } from "../../store/usersReducer";
import { path } from "../../utils/apiRoutes";

const Login = ({ navigation }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be more than 6 characters.")
        .max(20, "Password must be less than 20 characters")
        .required("Required"),
    }),
    onSubmit: async () => {
      const formData = new FormData();
      formData.append("email", formik.values.email);
      formData.append("password", formik.values.password);

      try {
        const jsonBody = JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
        });

        console.log("BODY", jsonBody);

        const res = await fetch(`${path}users/login`, {
          method: "POST",
          body: jsonBody,
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await res.json();
        if (data.status === "success") {
          await AsyncStorage.setItem("token", data.data.token);
          dispatch(fetchCurrentUser());
          dispatch(fetchUsers());
        } else {
          console.log("Error");
          console.log("error data ", data);
        }
      } catch (err) {
        console.log("Error: ", err.message);
      }
    },
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.form}>
        {/* Email */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={formik.handleChange("email")}
            value={formik.values.email}
            onBlur={formik.handleBlur("email")}
            autoCapitalize="none"
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

        <Pressable
          style={({ pressed }) => [
            styles.linkContainer,
            pressed && styles.pressed,
          ]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.signUpLink}>Don't have an account? Sign up!</Text>
        </Pressable>
        <TouchableOpacity
          onPress={formik.handleSubmit}
          style={styles.signupButton}
        >
          <Text style={styles.signupButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
