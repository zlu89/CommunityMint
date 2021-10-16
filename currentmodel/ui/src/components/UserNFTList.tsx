import React from 'react'
import { List, ListItem } from 'semantic-ui-react';
import { User } from '@daml.js/currentmodel';
import { useStreamQueries } from '@daml/react';
import { Party } from '@daml/types';
/**
 * React component displaying the list of messages for the current user.
 */
 type Props = {
  currentuser: Party;
}
/**
 * React component to edit a message to send to a follower.
 */
/**
 * React component displaying the list of messages for the current user.
 */
const UserNFTList: React.FC<Props> = ({currentuser}) => {
  const messagesResult = useStreamQueries(User.Asset);

  return (
    <List relaxed>
      {messagesResult.contracts.map(message => {
        const {owner, symbol, issuer,price,display} = message.payload;
        if(currentuser == owner){
        return (
          <ListItem
            className='test-select-message-item'
            key={message.contractId}>
              <div id="UserNFTsdisplayed">
               <img src={symbol} id="UserNFTimageDimensions" width="100" height="100" />
               <p>
                 <span><strong>Issuer: {issuer}</strong></span>
                 <span><strong>Price: {price}</strong></span>
               </p>
              </div>
           {/* <strong>{owner} &rarr; {symbol}:</strong> {quantity} */}
           
          </ListItem>
        );
      }
      })}
    </List>
  );
};

export default UserNFTList;