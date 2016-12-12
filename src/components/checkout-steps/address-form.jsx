import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';

import Layout from "../layout";
import BaseCheckoutLayout from "./base-checkout-layout";
import AddressFieldsConnector from "../../containers/checkout-steps/address-fields-connector";

class AddressForm extends Component {

  /* Render this step only if order is present and in a valid checkout state. */
  componentWillMount() {
    let orderState = this.props.order.state;

    if (orderState === undefined || this.props.order.checkout_steps.indexOf(orderState) === -1) {
      this.props.handleOrderNotPresent();
    }
  };

  handleAddressFormSubmit (formData) {
    this.props.handleAddressFormSubmit(formData, this.props.order);
  };

  componentDidMount () {
    if (this.props.countries.length === 0) {
      this.props.fetchCountries();
    }
  };

  render() {
    const useBilling = this.props.useBilling;
    return (
      <Layout>
        <BaseCheckoutLayout currentStep="address" displayLoader={ this.props.displayLoader }>
          <form onSubmit={this.props.handleSubmit(this.handleAddressFormSubmit.bind(this))}>
            <div>
              <label htmlFor="order_email">Email</label>
              <Field name="order[email]" component="input" type="text" id="order_email" />
            </div>
            <AddressFieldsConnector fieldNamePrefix="order[bill_address_attributes]"
                                    countries={ this.props.countries } />
            <div>
              <label htmlFor="use_billing">Ship to billing address</label>
              <Field name="order[use_billing]" component="input" type="checkbox" />
            </div>

            {
              !useBilling &&
              <AddressFieldsConnector fieldNamePrefix="order[ship_address_attributes]"
                                      countries={ this.props.countries } />
            }

            <div>
              <label htmlFor="save_user_address">Remember this Address</label>
              <Field name="save_user_address" component="input" type="checkbox" id="save_user_address" />
            </div>

            <button type="submit">Submit</button>
          </form>
        </BaseCheckoutLayout>
      </Layout>
    );
  };
};

AddressForm = reduxForm({
  form: 'addressForm'
})(AddressForm);

const selector = formValueSelector('addressForm');
AddressForm = connect(
  state => {
    const useBilling = selector(state, 'order[use_billing]');
    return {
      useBilling
    };
  }
)(AddressForm)

export default AddressForm;