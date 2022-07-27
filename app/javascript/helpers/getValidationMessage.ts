import { FieldError } from "react-hook-form";
import I18n from 'i18n-js';

const getValidationMessage = (
  validationType: FieldError['type'],
  entity: string,
  attribute: string,
) => (
  I18n.t(
    `common.validations.${validationType}`,
    { attribute: I18n.t(`activerecord.attributes.${entity}.${attribute}`) }
  )
);

export default getValidationMessage;