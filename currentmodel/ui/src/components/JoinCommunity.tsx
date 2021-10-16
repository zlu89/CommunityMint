import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { Party,Int } from '@daml/types';
import { User } from '@daml.js/currentmodel';
import { useParty, useLedger } from '@daml/react';
import ImageUploading from 'react-images-uploading';
import * as jwt from "jsonwebtoken";
import Ledger from  '@daml/ledger';
type Props = {
  currentuser: Party;
}

/**
 * React component to edit a message to send to a follower.
 */


   
 //const createToken = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: ["Bob"] } }, "secret")
   
   //const ledger = useLedger();
   //const ledger = new Ledger({ httpBaseUrl: httpBaseUrl, reconnectThreshold: 100, token: createToken, wsBaseUrl: wsBaseUrl }) 
  


  

/**
 * React component to edit a message to send to a follower.
 */
const JoinCommunity: React.FC<Props> = ({currentuser}) => {
  const issuer = useParty();
  const [symbol, setContent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [follow, setfollow] = React.useState(false);
  const httpBaseUrl = undefined;
  const applicationId = 'currentmodel-sandbox'
  const ledgerId = applicationId 
  const [communitypassword, setPassword] = React.useState("");
   // Unfortunately, the development server of `create-react-app` does not proxy
   // websockets properly. Thus, we need to bypass it and talk to the JSON API
   // directly in development mode.
 const wsBaseUrl = 'ws://localhost:7575/'
 const createToken = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [currentuser,"public"],readAs: [issuer,"public"] } }, "secret")
   
 const ledger = new Ledger({ httpBaseUrl: httpBaseUrl, reconnectThreshold: 100, token: createToken, wsBaseUrl: wsBaseUrl }) 

  const submitMessage =  async (event: React.FormEvent) => {
        try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }
      console.log(communitypassword)
      setIsSubmitting(true);
      if(follow){
      await ledger.exerciseByKey(User.User.FollowCommunity, currentuser, {communityname:symbol,issuer:"public",passwordentered:communitypassword});
      }else{
        await ledger.exerciseByKey(User.User.RemoveFollowCommunity, currentuser, {communityname:symbol,issuer:"public"});


      }
      setContent("");
      setDescription("");
    } catch (error) {
      alert('wrong password was used');
    } finally {
      setIsSubmitting(false);
    }
  };
  const submitMessage2 =  async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }
      setIsSubmitting(true);
      await ledger.exerciseByKey(User.User.RemoveFollowCommunity, currentuser, {communityname:symbol,issuer:"public"});
      setContent("");
      setDescription("");
    } catch (error) {
      alert(`Error sending message:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={submitMessage}>
{/*       <Form.Dropdown
        selection
        className='test-select-message-receiver'
        placeholder="Select a follower"
        options={followers.map(follower => ({ key: follower, text: follower, value: follower }))}
        value={receiver}
        onChange={event => setReceiver(event.currentTarget.textContent ?? undefined)}
      /> */}

      <Form.Input id= "MintURL"
        // fluid
        className='test-select-message-content'
        placeholder="Community Name"
        value={symbol}
        onChange={event => setContent(event.currentTarget.value)}
      />
      <Form.Input id= "MintURL"
        // fluid
        className='test-select-message-content'
        placeholder="optional password"
        value={communitypassword}
        onChange={event => setPassword(event.currentTarget.value)}
      />
      <Button id= "MintSubmitButton"
       // fluid
       onClick={() => (setfollow(true))}
        className='test-select-message-send-button'
        type="submit"
        disabled={isSubmitting || currentuser === undefined || symbol === ""}
        loading={isSubmitting}
        content="Join"
        option="Join"
        name="MintSubmitButton"
      
      />
          <Button id= "MintSubmitButton2"
           // fluid
           onClick={() => (setfollow(false))}
            className='test-select-message-send-button'
            type="submit"
            disabled={isSubmitting || currentuser === undefined || symbol === ""}
            loading={isSubmitting}
            content="Remove"
            option="delete"
            name="MintSubmitButton2"
          />
    </Form>

  
  );
};

export default JoinCommunity;