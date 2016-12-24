'use strict';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import ShoppingProductComments from './ShoppingProductComments.js';
import ShoppingProductDetails from './ShoppingProductDetails.js';
import ShoppingWelPage from './ShoppingWelPage.js';
import ShoppingConformOrder from './ShoppingConformOrder.js';
import ShoppingCart from './ShoppingCart.js';
import ShoppingOrderList from './ShoppingOrderList.js';
import ShoppingInputComment from './ShoppingInputComment.js';
import ShoppingProductDetailPics from './ShoppingProductDetailPics.js';
import ShoppingChooseDegrees from '../components/ShoppingChooseDegrees.js';
import ShoppingRedPocketList from './ShoppingRedPocketList.js';
import ShoppingBonusPocketList from './ShoppingBonusPocketList.js'
export default function() {
    const history = createHistory();
    return (
        <Router history={ history }>
            <Route path="/mobileShopping" component="div">
                <IndexRoute component={ ShoppingWelPage } />
                <Route path="/mobileShopping/ShoppingWelPage" component={ ShoppingWelPage } />
                <Route path="/mobileShopping/ShoppingProductDetails/:pid" component={ ShoppingProductDetails } />
                <Route path="/mobileShopping/ShoppingProductComments/:pid" component={ ShoppingProductComments } />
                <Route path="/mobileShopping/ShoppingCart" component={ ShoppingCart } />
                <Route path="/mobileShopping/ShoppingConformOrder/:type" component={ ShoppingConformOrder } />
                <Route path="/mobileShopping/ShoppingOrderList" component={ ShoppingOrderList } />
                <Route path="/mobileShopping/ShoppingInputComment/:order_num" component={ ShoppingInputComment } />
                <Route path="/mobileShopping/ShoppingProductDetailPics/:pid" component={ ShoppingProductDetailPics } />
                <Route path="/mobileShopping/ShoppingRedPocketList/:type" component={ ShoppingRedPocketList } />
                <Route path="/mobileShopping/ShoppingBonusPocketList/:type" component={ ShoppingBonusPocketList } />
            </Route>
        </Router>
        );
}