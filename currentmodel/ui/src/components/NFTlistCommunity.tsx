import React from 'react'
import ImageUploading from 'react-images-uploading';
import { Party,Int } from '@daml/types';
// import Gallary from 'react-easy-image-gallery';
import { Header,Form, List, ListItem, Segment,Button } from 'semantic-ui-react';
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
const NFTlistCommunity: React.FC<Props> = ({currentuser}) => {
  const messagesResult = useStreamQueries(User.Community);
  const [issuer, setIssuer] = React.useState("");
  const [symbol, setContent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const ledger = useLedger();

  return (

      <div id="MarketNFTdisplay">
       <Header as='h2' size='medium' color='yellow' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}} >Your Communities</Header> 

      {messagesResult.contracts.map(message => {
        const {name,following} = message.payload;
        let followers=following.join(", ")
        return (
          
          <div>
              <div id="NFTsdisplayed">
                


               <List divided relaxed>
        <List.Item key={name}>
                 <span><strong>Community: {name}</strong></span>
                
                 <span className="testit"> <strong>{"\n"}  Followers: {followers} </strong></span>
       
              
                 </List.Item>
            </List>

              </div>
           </div>
        );
      }
      )}
     
     </div>


  );
};

export default NFTlistCommunity;