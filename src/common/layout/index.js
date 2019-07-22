import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginActionCreators from '../../page/login/store/actionCreators'
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import { Logo, Avatars } from './style';
import { Link, NavLink, withRouter } from 'react-router-dom';

class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subkey: '',
      keys: ''
    }
  }
  componentWillMount() {
    let pathName = this.props.location.pathname;
    console.log(pathName)
    switch (pathName) {
      case '/admin':
        return this.setState({
          subkey: '',
          keys: 'sub1'
        });
      case '/admin/product/index':
        return this.setState({
          subkey: 'sub2',
          keys: '2'
        });
      case '/admin/product-category/index':
        return this.setState({
          subkey: 'sub2',
          keys: '3'
        });
      case '/admin/order/index':
        return this.setState({
          subkey: 'sub4',
          keys: '4'
        });
      case '/admin/user':
        return this.setState({
          subkey: 'sub4',
          keys: '5'
        });
      default:
        return this.setState({
          subkey: '',
          keys: ''
        });
    }
  }
  logout() {
    this.props.logout();
    this.props.history.push('/login');
  }
  render() {
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    const menu = (
      <Menu
        style={{ width: 256 }}
      >
        <Menu.Item key='10' style={{ padding: '8px', background: '#fafafa', color: 'rgba(0,0,0,.85)' }}>WELCOME {this.props.username}</Menu.Item>
        <Menu.Item key='11'><Icon type="credit-card" />信息</Menu.Item>
        <Menu.Item key='12'><Icon type="setting" />账户设置</Menu.Item>
        <Menu.Item key='13'><Icon type="bell" />通知</Menu.Item>
        <Menu.Item key='14' onClick={this.logout.bind(this)}><Icon type="poweroff" style={{ marginRight: '8px' }} />退出</Menu.Item>
      </Menu>
    );
    const logins = (
      <Menu
        style={{ width: 256 }}
      >
        <Menu.Item key='15'><Link to='/login'>请登录</Link></Menu.Item>
      </Menu>
    );
    return (
      <Layout>
        <Header className="header">
          <Link to='/admin'>
            <Logo>React</Logo>
          </Link>
          <Avatars>
            <Dropdown overlay={this.props.login ? menu : logins} trigger={['click']}>
              <Avatar icon="user" />
            </Dropdown>
          </Avatars>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[this.state.keys]}
              defaultOpenKeys={[this.state.subkey]}
              //selectedKeys={['pathName']}
              inlineCollapsed={'false'}
              style={{ height: 'calc(100vh - 64px)', borderRight: 0 }}
            >
              <Menu.Item key="sub1">
                <Link to='/admin'>
                  <Icon type="shop" />
                  首页
           </Link>
              </Menu.Item>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />商品</span>}>
                <Menu.Item key="2"><NavLink to='/admin/product/index'>商品管理</NavLink></Menu.Item>
                <Menu.Item key="3"><NavLink to='/admin/product-category/index'>品类管理</NavLink></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />订单</span>}>
                <Menu.Item key="4"><NavLink to='/admin/order/index'>订单管理</NavLink></Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="user" />用户</span>}>
                <Menu.Item key="5"><NavLink to='/admin/user'>用户管理</NavLink></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px' }}>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapState = (state) => ({
  login: state.login.get('login'),
  username: state.login.get('username')
})

const mapDispatch = (dispatch) => ({
  logout() {
    dispatch(loginActionCreators.logout());
  }
})

export default withRouter(connect(mapState, mapDispatch)(Layouts));