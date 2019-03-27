import * as React from 'react';
import { Button, Layout, Menu, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import './App.css';

const { Header, Sider, Content } = Layout;

class App extends React.Component {
  public state = {
    collapsed: false,
  }

  public componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  public render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
        <DocumentTitle title={"Test Tile"}>
          <Layout>
            <Sider
              trigger={null}
              collapsible={true}
              collapsed={this.state.collapsed}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Icon type="user" />
                  <span>nav 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span>nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span>nav 3</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content style={{
                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
              }}
              >
                Content
              </Content>
            </Layout>
          </Layout>
        </DocumentTitle>
      </div>
    );
  }

  private toggle  = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
}

export default App;
