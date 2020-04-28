import React, { Component } from "react";
import { createTransaction } from "../util/APIUtils";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Col,
  Tabs,
  notification
} from "antd";
import moment from "moment";
const FormItem = Form.Item;
const { TextArea } = Input;

const { Option } = Select;

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionType: {
        text: "Expenses"
      },
      paymentType: {
        text: ""
      },
      categoryType: {
        text: ""
      },
      note: {
        value: ""
      },
      date: {
        text: ""
      },
      amount: {
        text: ""
      }
      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePaymentTypeChange = this.handlePaymentTypeChange.bind(this);
    this.handleCategoryTypeChange = this.handleCategoryTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    // this.handleAmountValidate = this.handleAmountValidate.bind(this);
    //  this.handleDateChange = this.handleDateChange.bind(this);
    // this.handleNoteValidate = this.handleNoteValidate.bind(this);
  }

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });
  }

  handlePaymentTypeChange(value) {
    const paymentType = Object.assign(this.state.paymentType, { text: value });
    this.setState({
      paymentType: paymentType
    });
  }

  handleChangeDate = date => {
    const date1 = Object.assign(this.state.date, { text: date });
    this.setState({
      date: date1
    });
  };

  handleCategoryTypeChange(value) {
    const categoryType = Object.assign(this.state.categoryType, {
      text: value
    });
    this.setState({
      categoryType: categoryType
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const transactionData = {
      transactionType: this.state.transactionType.text,
      paymentType: this.state.paymentType.text,
      categoryType: this.state.categoryType.text,
      note: this.state.note.value,
      amount: this.state.amount.value,
      date: this.state.date.text
    };

    createTransaction(transactionData)
      .then(response => {
        notification.success({
          message: "trackPOCKET",
          description: "Transaction record successfuly added!"
        });
        this.setState({
          paymentType: {
            text: ""
          },
          categoryType: {
            text: ""
          },
          note: {
            value: ""
          },
          date: {
            text: ""
          },
          amount: {
            text: ""
          }
        });
        //    this.props.history.push("/transaction/new");
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/transaction/new", "error", "Try again.");
        } else {
          notification.error({
            message: "trackPOCKET",
            description:
              error.message || "Sorry! Something went wrong. Please try again!"
          });
        }
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="new-income-form">
        <FormItem className="transaction-from-row">
          Payment Account :
          <Select
            defaultValue="Cash"
            onChange={this.handlePaymentTypeChange}
            value={this.state.paymentType.text}
          >
            <Option value="Cash">Cash</Option>
            <Option value="Debit">Debit</Option>
            <Option value="Credit">Credit</Option>
          </Select>
        </FormItem>
        <FormItem className="transaction-from-row">
          Catecory :
          <Select
            placeholder="Select category"
            onChange={this.handleCategoryTypeChange}
            value={this.state.categoryType.text}
          >
            {/* {this.loadCategoryList()} */}
            <Option value="Children">Children</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="House Rent">House Rent</Option>
          </Select>
        </FormItem>
        <FormItem
          className="transaction-from-row"
          validateStatus={this.state.amount.validateStatus}
          help={this.state.amount.errorMsg}
        >
          Amount :
          <Input
            size="large"
            name="amount"
            autoComplete="off"
            // type="number"
            pattern="[0-9]*"
            placeholder="Add amount in numeric "
            inputMode="numeric"
            value={this.state.amount.value}
            onChange={event =>
              this.handleInputChange(event, this.validateAmount)
            }
          />
        </FormItem>
        <FormItem
          className="transaction-from-row"
          //   lable="Notes :"
          validateStatus={this.state.note.validateStatus}
          help={this.state.note.errorMsg}
        >
          Notes :
          <Input
            size="large"
            name="note"
            autoComplete="off"
            placeholder="Add notes"
            value={this.state.note.value}
            onChange={event => this.handleInputChange(event, this.validateNote)}
          />
        </FormItem>
        <FormItem
          className="transaction-from-row"
          //   validateStatus={this.state.date.validateStatus}
          //   help={this.state.date.errorMsg}
        >
          <Col xs={24} sm={4}>
            Date :
          </Col>
          <Col xs={50} sm={100}>
            <DatePicker
              value={this.state.date.text}
              onChange={this.handleChangeDate}
            >
              {/* {this.state.date.value} */}
            </DatePicker>
            {/* <Input>{this.state.date.value}</Input> */}
          </Col>
        </FormItem>

        <FormItem className="transaction-from-row">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="add-transaction-form-button"
          >
            Add Transaction
          </Button>
        </FormItem>
      </Form>
    );
  }

  validateNote = note => {
    return {
      validateStatus: null,
      errorMsg: null
    };
  };

  validateDate = date => {
    return {
      validateStatus: null,
      errorMsg: null
    };
  };

  validateAmount = amount => {
    // const str = amount.value;
    // if (str.charAt(str.length - 1) === ".") {
    //   return {
    //     validateStatus: null,
    //     errorMsg: null
    //   };
    // }
    return {
      validateStatus: null,
      errorMsg: null
    };
  };
}

export default ExpensesForm;
