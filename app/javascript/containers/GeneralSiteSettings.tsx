import { connect } from "react-redux";

import { requestTenant } from "../actions/Tenant/requestTenant";
import {
  changeSiteSettingsGeneralFormLocale,
  changeSiteSettingsGeneralFormSiteLogo,
  changeSiteSettingsGeneralFormSiteName
} from "../actions/changeSiteSettingsGeneralForm";
import GeneralSiteSettingsP from "../components/SiteSettings/General/GeneralSiteSettingsP";
import { State } from "../reducers/rootReducer";
import { updateTenant } from "../actions/Tenant/updateTenant";

const mapStateToProps = (state: State) => ({
  form: state.siteSettings.general.form,
  areDirty: state.siteSettings.general.areDirty,
  areUpdating: state.siteSettings.general.areUpdating,
  error: state.siteSettings.general.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestTenant() {
    dispatch(requestTenant());
  },

  updateTenant(
    siteName: string,
    siteLogo: string,
    locale: string,
    authenticityToken: string
  ): Promise<any> {
    return dispatch(updateTenant({
      siteName,
      siteLogo,
      locale,
      authenticityToken,
    }));
  },

  handleChangeSiteName(siteName: string) {
    dispatch(changeSiteSettingsGeneralFormSiteName(siteName));
  },

  handleChangeSiteLogo(siteLogo: string) {
    dispatch(changeSiteSettingsGeneralFormSiteLogo(siteLogo));
  },

  handleChangeLocale(locale: string) {
    dispatch(changeSiteSettingsGeneralFormLocale(locale));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSiteSettingsP);