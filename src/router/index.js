import React, {Component} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import Layouts from '../common/layout/index';
import Home from '../page/home';
import User from '../page/user';
import ProductList from '../page/product/index';
import ProductSave from '../page/product/index/save';
import ProductDetail from '../page/product/index/detail';
import CategoryList from '../page/product/category/index';
import CategoryAdd from '../page/product/category/add';
import OrderList from '../page/order/index';
import OrderDetail from '../page/order/orderDetail';
import Err from '../page/error';

class AuthorizedRoute extends Component {
    render() {
		let LayoutRouter = (
			<Layouts>
			  <Switch>
				<Route exact path='/admin' component={Home} />
				<Route path='/admin/user' component={User} />
				<Route path='/admin/product/index' component={ProductList} />
				<Route path='/admin/product/save/:id?' component={ProductSave} />
				<Route path='/admin/product/detail/:id' component={ProductDetail} />
				<Route path='/admin/product-category/index' component={CategoryList} />
				<Route path='/admin/product-category/add' component={CategoryAdd} />
				<Route path='/admin/order/index' component={OrderList} />
				<Route path='/admin/order/detail/:id' component={OrderDetail} />
				<Redirect exact from='/admin/product' to='/admin/product/index' />
				<Route component={Err} />
			  </Switch>
			</Layouts>
		  );
		const isLogged = this.props.loginStatus == true ? true : false;
        return (
                <Route path={this.props.path} render={props => {
                    return isLogged
                            ?  LayoutRouter
                            : <Redirect to="/login" />
                }} />
        )
    }
}

const mapState = (state) => ({
	loginStatus: state.login.get('login')
})

export default connect(mapState,null)(AuthorizedRoute);