export const registerFormControls = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter Your First name",
    componentType: "input",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter Your Last name",
    componentType: "input",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter Your Phone Number",
    componentType: "input",
    type: "text",
  },
  {
    name: "gender",
    label: "Gender",
    placeholder: "Gender",
    componentType: "select",
    options: [
      {
        id: "male",
        label: "Male",
      },
      {
        id: "female",
        label: "Female",
      },
    ],
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];
