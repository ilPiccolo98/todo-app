import * as yup from "yup";

const validation = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  description: yup.string().required(),
});

export default validation;
