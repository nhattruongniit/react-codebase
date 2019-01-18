export default [
  {
    id: 1,
    inputType: 'TextField',
    name: 'email',
    label: 'Email',
    validate: ['required', 'email'],
  },
  {
    id: 2,
    inputType: 'TextField',
    name: 'firstName',
    label: 'First Name',
    validate: ['required'],
  },
  {
    id: 3,
    inputType: 'TextField',
    name: 'lastName',
    label: 'Last Name',
    validate: ['required'],
  },
  {
    id: 4,
    inputType: 'TextField',
    name: 'password',
    label: 'Password',
    validate: ['required'],
  },
  {
    id: 5,
    inputType: 'TextField',
    name: 'phone',
    label: 'Phone Number',
    validate: ['required'],
  },
];
