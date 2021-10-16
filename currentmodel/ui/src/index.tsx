// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';


//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
    <BrowserRouter>
      <App /> {/* The various pages will be displayed by the `Main` component. */}
    </BrowserRouter>
    ), document.getElementById('root')
  );
