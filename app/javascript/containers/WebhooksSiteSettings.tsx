import { connect } from "react-redux";

import WebhooksSiteSettingsP from "../components/SiteSettings/Webhooks/WebhooksSiteSettingsP";
import { State } from "../reducers/rootReducer";
import { requestWebhooks } from "../actions/Webhook/requestWebhooks";
import { IWebhook } from "../interfaces/IWebhook";
import { submitWebhook } from "../actions/Webhook/submitWebhook";

const mapStateToProps = (state: State) => ({
  webhooks: state.webhooks
});

const mapDispatchToProps = (dispatch: any) => ({
  requestWebhooks() {
    dispatch(requestWebhooks());
  },

  onSubmitWebhook(webhook: IWebhook, authenticityToken: string): Promise<any> {
    return dispatch(submitWebhook(webhook, authenticityToken));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebhooksSiteSettingsP);