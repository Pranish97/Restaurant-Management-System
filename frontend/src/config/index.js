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

export const addMenuElement = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter Dish Name",
    componentType: "input",
    type: "text",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter Dish Price",
    componentType: "input",
    type: "number",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter Dish Description",
    componentType: "textarea",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select Category",
    componentType: "select",
    options: [
      { id: "burger", label: "Burger" },
      { id: "pizza", label: "Pizza" },
      { id: "drinks", label: "Drinks" },
      { id: "bakery", label: "Bakery" },
      { id: "momo", label: "Momo" },
    ],
  },
];
