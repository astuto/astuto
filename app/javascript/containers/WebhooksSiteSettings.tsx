import { connect } from "react-redux";

import WebhooksSiteSettingsP from "../components/SiteSettings/Webhooks/WebhooksSiteSettingsP";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebhooksSiteSettingsP);