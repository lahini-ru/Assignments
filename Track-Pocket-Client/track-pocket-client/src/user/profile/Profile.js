import React, { Component } from "react";
import { getUserProfile } from "../../util/APIUtils";
import { Avatar, Tabs } from "antd";
import { getAvatarColor } from "../../util/Colors";
import { formatDate } from "../../util/Helpers";
import LoadingIndicator from "../../common/LoadingIndicator";
import "./Profile.css";
import NotFound from "../../common/NotFound";
import ServerError from "../../common/ServerError";
import { Button } from "antd";

const TabPane = Tabs.TabPane;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: false
    };
    this.loadUserProfile = this.loadUserProfile.bind(this);
  }

  loadUserProfile(username) {
    this.setState({
      isLoading: true
    });

    getUserProfile(username)
      .then(response => {
        this.setState({
          user: response,
          isLoading: false
        });
      })
      .catch(error => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoading: false
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false
          });
        }
      });
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    this.loadUserProfile(username);
  }

  componentDidUpdate(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.loadUserProfile(nextProps.match.params.username);
    }
  }

  render() {
    const user = getUserProfile();
    console.log(user);

    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    if (this.state.notFound) {
      return <NotFound />;
    }

    if (this.state.serverError) {
      return <ServerError />;
    }

    const tabBarStyle = {
      textAlign: "center"
    };

    return (
      <div className="profile">
        {this.state.user ? (
          <div className="user-profile">
            <div className="user-details">
              <div className="user-avatar">
                <Avatar
                  className="user-avatar-circle"
                  style={{
                    backgroundColor: getAvatarColor(this.state.user.name)
                  }}
                >
                  {this.state.user.name[0].toUpperCase()}
                </Avatar>
              </div>
              <div className="user-summary">
                <div className="full-name">{this.state.user.name}</div>
                <div className="username">@{this.state.user.username}</div>
                <div className="user-joined">
                  Joined {formatDate(this.state.user.joinedAt)}
                </div>
              </div>
            </div>
            <div className="user-details">
              <Button type="primary">Update Profile</Button>
              <Button type="danger">Delete Profile</Button>
              {}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Profile;
