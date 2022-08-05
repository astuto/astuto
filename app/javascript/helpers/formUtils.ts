import { FieldError } from "react-hook-form";
import I18n from 'i18n-js';

export const getLabel = (
  entity: string,
  attribute: string,
) => (
  I18n.t(`activerecord.attributes.${entity}.${attribute}`)
);

export const getValidationMessage = (
  validationType: FieldError['type'],
  entity: string,
  attribute: string,
) => (
  I18n.t(
    `common.validations.${validationType}`,
    { attribute: getLabel(entity, attribute) }
  )
);