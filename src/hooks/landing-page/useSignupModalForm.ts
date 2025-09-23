import { useState } from "react";
import { useRegisterUserMutation } from "../../../generated/graphql";
import { toast } from "react-toastify";
import { Role } from "../../../generated/graphql";

export function useSignupModalForm(
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [registerUser] = useRegisterUserMutation();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: Role.User,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // Call the mutation to create a user
      const { firstname, lastname, email, username, password, role } = formData;
      const res = await registerUser({
        variables: {
          data: {
            firstname,
            lastname,
            email,
            username,
            password,
            role,
          },
        },
      });

      if (res.data?.registerUser) {
        toast("Registration successful", {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 2000,
          type: "success",
        });

        setRegisterSuccess(true);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast("Registration failed", {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 2000,
        type: "error",
      });
    }
  };

  return { formData, handleChange, handleSubmit };
}
