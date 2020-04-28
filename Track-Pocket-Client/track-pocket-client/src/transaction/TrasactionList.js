import React, { Component } from "react";
import "./TransactionList.css";
import { withRouter } from "react-router-dom";
import {
  getAllTransactions,
  getIncomeTransactions,
  geExpensesTransactions
} from "../util/APIUtils";
import LoadingIndicator from "../common/LoadingIndicator";
import { TRANSACTION_LIST_SIZE } from "../constants/index";
import Transaction from "./Transaction";

import {
  Form,
  Input,
  Select,
  Col,
  Tabs,
  Button,
  Icon,
  notification
} from "antd";
const { TabPane } = Tabs;
const FormItem = Form.Item;
const { TextArea } = Input;

const { Option } = Select;

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
      last: true,
      isLoading: false
    };
    this.loadTransactionList = this.loadTransactionList.bind(this);
  }

  loadTransactionList(page = 0, size = TRANSACTION_LIST_SIZE) {
    let promise;
    if (this.props.username) {
      if (this.props.type === "EXPENSES") {
        promise = geExpensesTransactions(this.props.username, page, size);
      } else if (this.props.type === "INCOME") {
        promise = getIncomeTransactions(this.props.username, page, size);
      }
    } else {
      promise = getAllTransactions(page, size);
    }

    if (!promise) {
      return;
    }

    this.setState({
      isLoading: true
    });

    promise
      .then(response => {
        const transactions = this.state.transactions.slice();
        //const currentVotes = this.state.currentVotes.slice();

        this.setState({
          transactions: transactions.concat(response.content),
          page: response.page,
          size: response.size,
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          last: response.last,

          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.loadTransactionList();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      // Reset State
      this.setState({
        transactions: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        last: true,
        isLoading: false
      });
      this.loadTransactionList();
    }
  }

  handleLoadMore() {
    this.loadTransactionList(this.state.page + 1);
  }

  render() {
    const tabBarStyle = {
      textAlign: "center"
    };

    const transViews = [];
    this.state.transactions.forEach(transaction => {
      transViews.push(
        <Transaction key={transaction.id} transaction={transaction} />
      );
    });

    return (
      <div className="new-transaction-container">
        <h1 className="page-title">List of Transaction</h1>
        <div className="new-transaction-content">
          {transViews}
          {!this.state.isLoading && this.state.transactions.length === 0 ? (
            <div className="no-transactions-found">
              <span>No Transactions Found.</span>
            </div>
          ) : null}
          {!this.state.isLoading && !this.state.last ? (
            <div className="load-more-transactions">
              <Button
                type="dashed"
                onClick={this.handleLoadMore}
                disabled={this.state.isLoading}
              >
                <Icon type="plus" /> Load more
              </Button>
            </div>
          ) : null}
          {this.state.isLoading ? <LoadingIndicator /> : null}
          {/* <Tabs
            defaultActiveKey="1"
            animated={false}
            tabBarStyle={tabBarStyle}
            size="large"
            className="new-transaction-tabs"
          >
            <TabPane tab="ALL" key="1">
              {transViews}
              {!this.state.isLoading && this.state.transactions.length === 0 ? (
                <div className="no-transactions-found">
                  <span>No Transactions Found.</span>
                </div>
              ) : null}
              {!this.state.isLoading && !this.state.last ? (
                <div className="load-more-transactions">
                  <Button
                    type="dashed"
                    onClick={this.handleLoadMore}
                    disabled={this.state.isLoading}
                  >
                    <Icon type="plus" /> Load more
                  </Button>
                </div>
              ) : null}
              {this.state.isLoading ? <LoadingIndicator /> : null}
            </TabPane>
            {/* <TabPane tab="INCOME" key="2">
            {transViews}
            </TabPane>
            <TabPane tab="EXPENSES" key="3">
            {transViews}
            </TabPane> */}
          {/* </Tabs> */}
        </div>
      </div>
    );
  }
}

export default withRouter(TransactionList);
