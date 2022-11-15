import App from "./App.ce.vue";

// import "./assets/main.css";

import { defineCustomElement } from "vue";
const UsageEstimator = defineCustomElement(App);
customElements.define("usage-estimator", UsageEstimator);
