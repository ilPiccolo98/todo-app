import * as yup from "yup";

const validation = yup.object().shape({
  id: yup.number().required(),
});

export default validation;
