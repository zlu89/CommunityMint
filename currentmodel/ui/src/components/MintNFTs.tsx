import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { Party,Int } from '@daml/types';
import { User } from '@daml.js/currentmodel';
import { useParty, useLedger } from '@daml/react';
import ImageUploading from 'react-images-uploading';
type Props = {
  currentuser: Party;
}

/**
 * React component to edit a message to send to a follower.
 */
const MintNFT: React.FC<Props> = ({currentuser}) => {
  const issuer = useParty();
  const [symbol, setContent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [issueID, setissueID] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const ledger = useLedger();
  const submitMessage = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }
      if(issueID==""){
        await ledger.exerciseByKey(User.User.Mint, currentuser, {issuer:currentuser, symbol,description,issueid:"1"});
        await ledger.exerciseByKey(User.User.AddNFT, currentuser, {nftid:"1"});
      }
      setIsSubmitting(true);
      await ledger.exerciseByKey(User.User.Mint, currentuser, {issuer:currentuser, symbol,description,issueid:issueID});
      await ledger.exerciseByKey(User.User.AddNFT, currentuser, {nftid:"1"});
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
        placeholder="image URL"
        value={symbol}
        onChange={event => setContent(event.currentTarget.value)}
      />
       <Form.Input id= "MintDescription"
        // fluid
        className='test-select-message-content'
        placeholder="optional description"
        value={description}
        onChange={event => setDescription(event.currentTarget.value)}
      />
       <Form.Input id= "MintDescription"
        // fluid
        className='test-select-message-content'
        placeholder="NFT ID#"
        value={issueID}
        onChange={event => setissueID(event.currentTarget.value)}
      />
      <Button id= "MintSubmitButton"
        // fluid
        className='test-select-message-send-button'
        type="submit"
        disabled={isSubmitting || currentuser === undefined || symbol === ""}
        loading={isSubmitting}
        content="Mint"
      />
    </Form>
  );
};

export default MintNFT;