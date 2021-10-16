import React from 'react'
import ImageUploading from 'react-images-uploading';
import { Party,Int } from '@daml/types';
// import Gallary from 'react-easy-image-gallery';
import { Form, List, ListItem, Segment,Button } from 'semantic-ui-react';
import { User } from '@daml.js/currentmodel';
import { useQuery, useStreamQueries, } from '@daml/react';
import { useParty, useLedger } from '@daml/react';

type Props = {
  currentuser: Party;
}
/**
 * React component to edit a message to send to a follower.
 */
/**
 * React component displaying the list of messages for the current user.
 */
const NFTList: React.FC<Props> = ({currentuser}) => {
  const messagesResult = useStreamQueries(User.Asset);
  const [issuer, setIssuer] = React.useState("");
  const [symbol, setContent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const ledger = useLedger();

  return (

      <div id="MarketNFTdisplay">
      {messagesResult.contracts.map(message => {
        const {owner, symbol, issuer,price,display} = message.payload;
        if(currentuser == owner && display){
        return (
          <div>
              <div id="NFTsdisplayed">
                
               <img src={symbol} id="NFTimageDimensions" width="100" height="100" />

               <p>
                 <span><strong>Issuer: {issuer}</strong></span>
                 <span><strong>Price: {price}</strong></span>
               </p>
              </div>
           </div>
        );
      }
      })}
     
     </div>


  );
};

export default NFTList;