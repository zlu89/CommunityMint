import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { Party,Int } from '@daml/types';
import { User } from '@daml.js/currentmodel';
import { useParty, useLedger } from '@daml/react';
//import ImageUploading from 'react-images-uploading';
type Props = {
  currentuser: Party;
}

/**
 * React component to edit a message to send to a follower.
 */
const DisplayToggle: React.FC<Props> = ({currentuser}) => {
  const issuer = useParty();
  const [symbol, setContent] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const ledger = useLedger();
  const newowner = "alice"
  const submitMessage = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }
      setIsSubmitting(true);
      //await ledger.exerciseByKey(User.User.Display, currentuser, {issuer:currentuser, symbol,owner:currentuser,issueid:"1",publicmarket: ["Mike","Alice"]});
      await ledger.exerciseByKey(User.User.TransferNFT, currentuser, {symbol:symbol,owner:currentuser,newOwner:newowner,issuer:currentuser,issueid:"1"});
      await ledger.exerciseByKey(User.User.Display, currentuser, {issuer:currentuser, symbol,owner:currentuser,issueid:"1",publicmarket: []});

      setContent("");
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
      <Button id= "DisplayToggleButton3"
        // fluid
        className='test-select-message-send-button'
        type="submit"
        disabled={isSubmitting || currentuser === undefined || symbol === ""}
        loading={isSubmitting}
        content="Send NFT"
      />
    </Form>
  );
};

export default DisplayToggle;