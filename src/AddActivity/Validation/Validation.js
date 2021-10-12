import * as yup from "yup";

const validation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

export default validation;
