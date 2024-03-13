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

const Login = ({ navigation }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
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
    onSubmit: () => {
      navigation.navigate("Landing");
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={formik.handleChange("email")}
            value={formik.values.email}
            onBlur={formik.handleBlur("email")}
          />
        </View>
        {formik.errors.email && formik.touched.email ? (
          <Text>{formik.errors.email}</Text>
        ) : (
          ""
        )}

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
        {formik.errors.password && formik.touched.password ? (
          <Text>{formik.errors.password}</Text>
        ) : (
          ""
        )}
        <Pressable
          style={({ pressed }) => [
            styles.linkContainer,
            pressed && styles.pressed,
          ]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.signUpLink}>Don't have an account? Sign up!</Text>
        </Pressable>
        <Button title="Log in" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  form: {
    marginTop: -50,
    alignItems: "center",
    gap: 10,
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
  },
  icon: {
    paddingHorizontal: 8,
  },
  signUpLink: {
    color: "#666",
    paddingVertical: 1,
  },
  linkContainer: {},
  pressed: {
    opacity: 0.5,
  },
});
