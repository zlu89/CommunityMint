// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { Icon, List } from 'semantic-ui-react'
import { Party } from '@daml/types';
import { User } from '@daml.js/currentmodel';

type Props = {
  users: User.Asset[];
}

/**
 * React component to display a list of `User`s.
 * Every party in the list can be added as a friend.
 */
const MarketNFTs: React.FC<Props> = ({users}) => {
  return (
    <List divided relaxed>
      {[...users].sort((x, y) => "hi".localeCompare("hi")).map(user =>
        <List.Item key={user.owner}>
          
          
          <List.Icon name='user' />
          <List.Content>
          <div id="NFTsdisplayed">
                
                <img src={user.symbol} id="NFTimageDimensions" width="100" height="100" />
                  
                <p>
                  <span><strong>Issuer: {user.issuer}</strong></span>
                  <span><strong>Price: {user.price}</strong></span>
                </p>
               </div>
            <List.Content floated='right'>
              <Icon
                name='add user'
                link
                className='test-select-add-user-icon'></Icon>
            </List.Content>
          </List.Content>
        </List.Item>
      )}
    </List>
  );
};

export default MarketNFTs;
