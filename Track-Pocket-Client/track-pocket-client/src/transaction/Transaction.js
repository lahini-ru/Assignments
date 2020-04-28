import React, { Component } from "react";
import "./Transaction.css";
import { Avatar } from "antd";
import { getAvatarColor, getTransTypecolor } from "../util/Colors";
import { formatDateTime } from "../util/Helpers";

class Transaction extends Component {
  render() {
    return (
      <div
        className="trans-container"
        style={{
          backgroundColor: getTransTypecolor(
            this.props.transaction.transactionType
          )
        }}
      >
        <div className="trans-content">
          <div className="trans-details">
            <div className="trans-avatar">
              <Avatar
                className="trans-avatar-circle"
                style={{
                  backgroundColor: getAvatarColor(
                    this.props.transaction.transactionType
                  )
                }}
              >
                {this.props.transaction.transactionType[0].toUpperCase()}
              </Avatar>
            </div>
            <div className="trans-summary">
              <div className="trans-category">
                <h2>{this.props.transaction.category}</h2>
              </div>
              <div className="trans-payment">
                {this.props.transaction.paymentAccount}
              </div>
              <div className="trans">Rs.{this.props.transaction.amount}.00</div>

              <div className="user-joined">
                Created{" "}
                {formatDateTime(this.props.transaction.transActionDateTime)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;
