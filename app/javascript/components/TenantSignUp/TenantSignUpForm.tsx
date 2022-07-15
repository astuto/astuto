import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../common/Box';
import { TenantSignUpTenantFormState } from '../../reducers/tenantSignUpReducer';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { DangerText } from '../common/CustomTexts';

interface Props {
  tenantForm: TenantSignUpTenantFormState;
  handleChangeTenantSiteName(siteName: string): void;
  handleChangeTenantSubdomain(subdomain: string): void;
  
  isSubmitting: boolean;
  error: string;
  handleSubmit(): void;
}

class TenantSignUpForm extends React.Component<Props> {
  form: any;

  constructor(props: Props) {
    super(props);

    this.form = React.createRef();
  }

  render() {
    const {
      tenantForm,
      handleChangeTenantSiteName,
      handleChangeTenantSubdomain,

      isSubmitting,
      error,
      handleSubmit,
    } = this.props;

    return (
      <Box customClass="tenantSignUpStep2">
        <h3>{ I18n.t('signup.step2.title') }</h3>

        <form ref={this.form}>
          <div className="formRow">
            <input
              type="text"
              autoFocus
              value={tenantForm.siteName}
              onChange={e => handleChangeTenantSiteName(e.target.value)}
              placeholder={I18n.t('signup.step2.site_name')}
              required
              id="tenantSiteName"
              className="formControl"
            />
          </div>

          <div className="formRow">
            <div className="input-group">
              <input
                type="text"
                value={tenantForm.subdomain}
                onChange={e => handleChangeTenantSubdomain(e.target.value)}
                placeholder={I18n.t('signup.step2.subdomain')}
                required
                id="tenantSubdomain"
                className="formControl"
              />
              <div className="input-group-append">
                <div className="input-group-text">.astuto.io</div>
              </div>
            </div>
          </div>

          <Button
            onClick={e => {
              e.preventDefault();
              handleSubmit();
            }}
            className="tenantConfirm"
          >
            { isSubmitting ? <Spinner /> : I18n.t('signup.step2.create_button') }
          </Button>

          { error !== '' && <DangerText>{ error }</DangerText> }
        </form>
      </Box>
    );
  }
}

export default TenantSignUpForm;