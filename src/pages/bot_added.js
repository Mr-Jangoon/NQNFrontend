import React from "react";
import { Container, Divider, Button, Card, List, Loader } from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import "./bot_added.css";
import {discordURL} from "../config";
import {parse} from "query-string";

function BotAddedPage(props) {
  const loggedIn = props.loggedIn;
  const query = parse(props.location.search);
  const guildId = query.guild_id;
  const guild = props.guilds[guildId];
  const name = guild && guild.name;

  const justLanded = name? ` in ${name}!`: "!";
  const primaryButton = loggedIn? `View ${name}`: "Login";
  const url = `/guilds/${guildId}/permissions`;

  return (
    <Container fluid>
      <div className="bot_joined_background"/>
      <Card centered className="bot_joined_modal">
        <Card.Content>
          <Card.Header textAlign="center" as="h2">
            NQN just landed{justLanded}
          </Card.Header>
          <Card.Description>
            Check everything's working by logging into the website, or join our Support Server for help!
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item
              icon="check"
              content="Check that permissions are set up correctly!"
            />
            <List.Item
              icon="check"
              content="See which channels you can run commands in!"
            />
            <List.Item
              icon="check"
              content="Send a test message to your server!"
            />
          </List>

          <Button primary fluid size="large" loading={loggedIn && !name} onClick={() => {
            if (loggedIn) {
              if (!name) {
                return
              }
              props.history.push(url);
            } else {
              localStorage.setItem("redirect", url);
              window.location = discordURL;
            }
          }}>
            {primaryButton}
          </Button>
          <Divider hidden/>
          <Button secondary fluid size="large" onClick={() => {
            window.open("https://discord.gg/UMVpPN7", "_blank");
          }}>
            Join NQN Support
          </Button>
        </Card.Content>
      </Card>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    guilds: state.user.guilds
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BotAddedPage);
