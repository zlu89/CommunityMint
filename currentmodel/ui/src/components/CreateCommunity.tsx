import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { Party,Int } from '@daml/types';
import { User } from '@daml.js/currentmodel';
import { useParty, useLedger } from '@daml/react';
import Ledger from  '@daml/ledger';
import * as jwt from "jsonwebtoken";
import ImageUploading from 'react-images-uploading';
type Props = {
  currentuser: Party;
}

/**
 * React component to edit a message to send to a follower.
 */
const CreateCommunity: React.FC<Props> = ({currentuser}) => {
  const issuer = useParty();
  const [symbol, setContent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [communitypassword, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
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
  

  const submitMessage = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }
      const createToken = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [currentuser,"public"],readAs: [issuer,"public"] } }, "secret")
   
      const ledger = new Ledger({ httpBaseUrl: httpBaseUrl, reconnectThreshold: 100, token: createToken, wsBaseUrl: wsBaseUrl }) 
  
      setIsSubmitting(true);
      await ledger.exerciseByKey(User.User.CreatePublicCommunity, currentuser, {communityname:symbol,public:"public",password:communitypassword});
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
        className='test-select-message-send-button'
        type="submit"
        disabled={isSubmitting || currentuser === undefined || symbol === ""}
        loading={isSubmitting}
        content="Create"
      />
    </Form>
  );
};

export default CreateCommunity;