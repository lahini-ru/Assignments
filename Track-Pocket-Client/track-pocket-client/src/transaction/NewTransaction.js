import React, { Component } from "react";
import { createTransaction, getCategoryList } from "../util/APIUtils";
import "./NewTransaction.css";
import ExpensesForm from "./ExpensesFrom";
import IncomeForm from "./IncomeFrom";
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

const { TabPane } = Tabs;
const FormItem = Form.Item;
const { TextArea } = Input;

const { Option } = Select;

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const tabBarStyle = {
      textAlign: "center"
    };
    return (
      <div className="new-transaction-container">
        <h1 className="page-title">Add Transaction</h1>
        <div className="new-transaction-content">
          <Tabs
            defaultActiveKey="1"
            animated={false}
            tabBarStyle={tabBarStyle}
            size="large"
            className="new-transaction-tabs"
          >
            <TabPane tab="INCOME" key="1">
              <IncomeForm />
            </TabPane>
            <TabPane tab="EXPENSES" key="2">
              <ExpensesForm />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

let index = 0;

class TransactionForm extends Component {
  state = {
    size: "default",
    items: ["jack", "lucy"]
  };

  addItem = () => {
    console.log("addItem");
    const { items } = this.state;
    this.setState({
      items: [...items, `New item ${index++}`]
    });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  constructor(props) {
    super(props);
    this.state = {
      transactionType: {
        type: "Expenses"
      },
      paymentType: {
        type: "Cash"
      },
      categoryType: [],
      note: {
        text: ""
      },
      Date: {
        text: ""
      },
      amount: {
        text: ""
      }
      
    };
    this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(
      this
    );
    this.handlePaymentTypeChange = this.handlePaymentTypeChange.bind(this);
    this.handleCategoryTypeChange = this.handleCategoryTypeChange.bind(this);
  }

  loadCategoryList() {
    let promise;
    if (this.props.username) {
      promise = getCategoryList();
    }
    promise.then(response => {
      // const categories = this.state.categories.slice();

      this.setState({
        // categories: categories.concat(response.categoryType),
        categoryType: response.categoryName,
        isLoading: false
      });
      // console.log(categories);
    });
    this.setState({
      isLoading: true
    });
  }

  handleTransactionTypeChange(value) {
    const transactionType = Object.assign(this.state.transactionType, {
      type: value
    });
    this.setState({
      transactionType: transactionType
    });
  }

  handlePaymentTypeChange(value) {
    const paymentType = Object.assign(this.state.paymentType, { type: value });
    this.setState({
      paymentType: paymentType
    });
  }

  handleCategoryTypeChange(value) {
    const categoryType = Array.assign(this.state.categoryType, {
      type: value
    });
    this.setState({
      categoryType: categoryType
    });
  }

  handleSubmit(event) {
    event.preventDeefault();
    const transactionData = {
      transactionType: this.state.transactionType.map()
    };
  }

  render() {
    const { size } = this.state;
    const category = [];
    console.log(category);
    this.state.categoryType.forEach(category => {
      category.push(
        <Option value={category.categoryName}>{category.categoryName}</Option>
      );
    });
    return (
      <Form className="new-transaction-form">
        <FormItem className="transaction-from-row">
          Transaction Type :
          <Select
            defaultValue="Expenses"
            onChange={this.handleTransactionTypeChange}
            value={this.state.transactionType.type}
          >
            <Option value="Income">Income</Option>
            <Option value="EXpenses">Expenses</Option>
          </Select>
        </FormItem>
        <FormItem className="transaction-from-row">
          Payment Account :
          <Select
            defaultValue="Cash"
            onChange={this.handlePaymentTypeChange}
            value={this.state.paymentType.type}
          >
            <Option value="Cash">Cash</Option>
            <Option value="Debit">Debit</Option>
            <Option value="Credit">Credit</Option>
          </Select>
        </FormItem>
        <FormItem className="transaction-from-row">
          Catecory :
          <Select
            size={size}
            placeholder="Select category"
            onChange={this.handleCategoryTypeChange}
            value={this.state.categoryType.type}
          >
            {/* {this.loadCategoryList()} */}
            <Option value="Clothing">Clothing</Option>
            <Option value="Childern">Childern</Option>
          </Select>
          {/* <Select
            style={{ width: 240 }}
            placeholder="custom dropdown render"
            dropdownRender={dropdownRender}
          >
            {items.map(item => (
              <Option key={item}>{item}</Option>
            ))}
          </Select> */}
        </FormItem>
        <FormItem className="transaction-from-row">
          Amount :
          <Input />
        </FormItem>
        <FormItem className="transaction-from-row">
          Notes :
          <TextArea />
        </FormItem>
        <FormItem className="transaction-from-row">
          <Col xs={24} sm={4}>
            Date :
          </Col>
          <Col xs={50} sm={100}>
            <DatePicker />
          </Col>
          {/* <Col>
            <TimePicker />
          </Col> */}
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
}

export default NewTransaction;
