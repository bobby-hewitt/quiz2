import React from 'react';
import { Route } from 'react-router'
import {Home, Host, Player} from 'containers'


const Routes = () => (
  <div>
    <main>
        <Route path="/p" component={Player} />
        <Route path="/host" component={Host} />
    </main>
  </div>
)

export default Routes;