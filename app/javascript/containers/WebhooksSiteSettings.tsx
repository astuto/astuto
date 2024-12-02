import { connect } from "react-redux";

import WebhooksSiteSettingsP from "../components/SiteSettings/Webhooks/WebhooksSiteSettingsP";
import { State } from "../reducers/rootReducer";
import { requestWebhooks } from "../actions/Webhook/requestWebhooks";
import { IWebhook } from "../interfaces/IWebhook";
import { submitWebhook } from "../actions/Webhook/submitWebhook";
import { deleteWebhook } from "../actions/Webhook/deleteWebhook";
import { ISiteSettingsWebhookForm } from "../components/SiteSettings/Webhooks/WebhookForm";
import { updateWebhook } from "../actions/Webhook/updateWebhook";

const mapStateToProps = (state: State) => ({
  webhooks: state.webhooks,

  isSubmitting: state.siteSettings.webhooks.isSubmitting,
  submitError: state.siteSettings.webhooks.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestWebhooks() {
    dispatch(requestWebhooks());
  },

  onSubmitWebhook(webhook: IWebhook, authenticityToken: string): Promise<any> {
    return dispatch(submitWebhook(webhook, authenticityToken));
  },

  onUpdateWebhook(id: number, form: ISiteSettingsWebhookForm, authenticityToken: string): Promise<any> {
    return dispatch(updateWebhook({id, form, authenticityToken}));
  },

  onToggleEnabledWebhook(id: number, isEnabled: boolean, authenticityToken: string) {
    dispatch(updateWebhook({id, isEnabled, authenticityToken}));
  },

  onDeleteWebhook(id: number, authenticityToken: string) {
    dispatch(deleteWebhook(id, authenticityToken));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebhooksSiteSettingsP);