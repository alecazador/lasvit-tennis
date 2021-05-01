import React from "react";
import PropTypes from "prop-types";
import StripeCheckout from "react-stripe-checkout";
import { config } from "../../../modules/api/config";
import { useTranslation } from "react-i18next";

export function PayButton({ amount, currency, payCourse }) {
  const { t } = useTranslation();

  return (
    <StripeCheckout
      name={t("courses.payButton")}
      token={payCourse}
      amount={amount * 100}
      currency={currency}
      stripeKey={config.stripe.apiKey} // Stripe publishable API Key
      allowRememberMe={false}
    >
      <div className="mt-8 block w-full bg-purple-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-purple-700">
        {t("courses.payButton")}
      </div>
    </StripeCheckout>
  );
}

PayButton.propTypes = {
  amount: PropTypes.number.isRequired,
  payCourse: PropTypes.func.isRequired,
};