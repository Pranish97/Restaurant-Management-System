import { useState } from "react";
import { Link } from "react-router";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "../../config";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  gender: "",
  email: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);

  function onSubmit() {}

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground [font-family:'Iansui',cursive] mb-8">
          Register to ChefOps
        </h1>

        <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Register"}
          onSubmit={onSubmit}
        />

        <p className="mt-5 flex  justify-center gap-1">
          Already Have a Account?
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
