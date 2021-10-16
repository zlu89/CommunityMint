import React from 'react'
import ImageUploading from 'react-images-uploading';
import { Party,Int } from '@daml/types';
// import Gallary from 'react-easy-image-gallery';
import { Form, List, ListItem, Segment,Button } from 'semantic-ui-react';
import { User } from '@daml.js/currentmodel';
import { useQuery, useStreamQueries,useStreamFetchByKeys } from '@daml/react';
import { useParty, useLedger } from '@daml/react';
import Ledger from  '@daml/ledger';
import * as jwt from "jsonwebtoken";
import { Container, Grid, Header, Icon, Divider, SemanticWIDTHS } from 'semantic-ui-react';
import { Asset } from '@daml.js/currentmodel/lib/User';


type Props = {
  currentuser: Party;
}
/**
 * React component to edit a message to send to a follower.
 */
/**
 * React component displaying the list of messages for the current user.
 */
const NFTlistBid: React.FC<Props> = ({currentuser}) => {
  let position_reference = 0;
  const messagesResult = useStreamQueries(User.Asset);
  const [issuer, setIssuer] = React.useState("");
  const [symbol, setContent] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitting2, setIsSubmitting2] = React.useState(false);
  const myUserResult = useStreamFetchByKeys(User.User, () => [currentuser], [currentuser]);
  const myUser = myUserResult.contracts[0]?.payload;

  var purchasepower = myUser?.wallet;


 const httpBaseUrl = undefined;
 const applicationId = 'currentmodel-sandbox'
 const ledgerId = applicationId 

  // Unfortunately, the development server of `create-react-app` does not proxy
  // websockets properly. Thus, we need to bypass it and talk to the JSON API
  // directly in development mode.
const wsBaseUrl = 'ws://localhost:7575/'
  
//const createToken = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: ["Bob"] } }, "secret")
  
  //const ledger = useLedger();
  //const ledger = new Ledger({ httpBaseUrl: httpBaseUrl, reconnectThreshold: 100, token: createToken, wsBaseUrl: wsBaseUrl }) 
  

  const submitMessage = (issuer:Party,symbol:string,owner:Party,newOwner:Party,message:Asset) => async (event: React.FormEvent) => {

    const createToken = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [issuer,owner,currentuser],readAs: [issuer,owner,currentuser] } }, "secret")
  
    const ledger = new Ledger({ httpBaseUrl: httpBaseUrl, reconnectThreshold: 100, token: createToken, wsBaseUrl: wsBaseUrl }) 

    try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }
      if(purchasepower === undefined) {
        return ;
      }
      else if(parseFloat(price)>parseFloat(purchasepower)){
        throw 'Wallet balance not enough for bid';
      }
      setIsSubmitting(true);
      //const myUserResult=ledger.fetchByKey(User.Asset, {issuer, symbol,issueid:"1"})
      await ledger.exerciseByKey(User.User.ProposeTransferNFT, currentuser, {asset: message,newOwner:currentuser,price});
      alert(`Bid was successfully placed`);
      setContent("");
      setDescription("");
    } catch (e) {
      alert(`Error:\n${JSON.stringify(e)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

 

  return (
    <Segment>
<Header as='h2' size='medium' color='violet' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}} >Public NFT Market </Header> 
{messagesResult.contracts.map(message => {
        const {owner, symbol, issuer,price,display,description} = message.payload;
        let r=message.payload
        if(!(currentuser == owner) ){
          let ind = "grid-child " + owner  + symbol  + issuer;
          //console.log("ind:",ind)

          //let position2 = messagesResult.contracts
          //console.log("Position:",position2)
          let position = position_reference % 4;
          //for (Int i = 0; i < messagesResult.contracts.length; i++)
          
          if (position == 0) {
              ind = "leftposition"
          } else if (position == 1){
            ind = "centerposition";
          } else if (position == 2){
            ind = "rightposition";
          } else {
            ind = "morerightposition";
          }
          position_reference = position_reference + 1;
    return (

      <div className="bidleftposition">
      <div className="bidcard">
<div className="topcard">
<img src={symbol} id="NFTimageDimensions" width="100" height="100" text-align="center" />


</div>
<div className="middlecard">
<div className="time">Issuer: {issuer}  Owner:{owner}</div>
</div>
<div className="bottombid" >

<Form.Input 
        className='bidnumberinput'
        placeholder="Enter bid"
        onChange={event => setPrice(event.currentTarget.value)}
        fluid
      />

<Form onSubmit={submitMessage(issuer,symbol,owner,currentuser,r)} className="profile-action">
<Button id= "BidButton"
// fluid
className='test-select-message-send-button'
type="submit"
//disabled={isSubmitting || currentuser === undefined || symbol === ""}
//loading={isSubmitting}
content="Place"
/>  

</Form>
</div>
</div>


<div>


</div>

</div>
);

    }
      }
    )}
 






   </Segment>




  );



};

export default NFTlistBid;