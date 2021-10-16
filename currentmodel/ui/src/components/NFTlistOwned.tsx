import React from 'react'
import ImageUploading from 'react-images-uploading';
import { Party,Int } from '@daml/types';
// import Gallary from 'react-easy-image-gallery';
import { Form, List, ListItem, Segment,Button} from 'semantic-ui-react';
import { User } from '@daml.js/currentmodel';
import { useQuery, useStreamQueries, useStreamFetchByKeys} from '@daml/react';
import { useParty, useLedger } from '@daml/react';
import Ledger from  '@daml/ledger';
import * as jwt from "jsonwebtoken";
import { Container, Grid, Header, Icon, Divider, SemanticWIDTHS } from 'semantic-ui-react';
import { Asset, Follow } from '@daml.js/currentmodel/lib/User';
type AssethighestBids = { owner:string,issuer: string; bid: number; Url: string,id:string,bidder:string};
type communitylist= { key  :string,  value :string,   text  : string}
type communityfollowers={ name  :string,  followers :string[]}

type Props = {
  currentuser: Party;
}
/**
 * React component to edit a message to send to a follower.
 */
/**
 * React component displaying the list of messages for the current user.
 */
const NFTlistOwned: React.FC<Props> = ({currentuser}) => {
/*   const myUserResult = useStreamFetchByKeys(User.User, () => [currentuser], [currentuser]);
  const myUser = myUserResult.contracts[0]?.payload;
  var purchasepower = myUser?.wallet; */
  let position_reference = 0;
  const messagesResult = useStreamQueries(User.Asset);
  const messagetest = useStreamQueries(User.TransferProposal);
  const communitytest = useStreamQueries(User.Community);

  const [issuer, setIssuer] = React.useState("");
  const [symbol, setContent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitting2, setIsSubmitting2] = React.useState(false);

  const [communityname, setCommunityName] = React.useState("");
  const [combinedcommunitylist, setCommunityList] = React.useState([]);

  let myarray2: AssethighestBids[];
  myarray2=[];
  let communitylists:communitylist[];
  communitylists=[];
  let communityfollowerlists:communityfollowers[];
  communityfollowerlists=[];
  let fullobserverlist:string[];
  fullobserverlist=[];
  let holdertuple:communitylist[];
  holdertuple=[]
  let isin=false
/*   var myarray: [string, string,number,string,string,string][];
  myarray=[]; */
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
  

  const submitMessage = (issuer:Party,symbol:string,owner:Party,combinedcommunitylist:string,issueid:string,observers:string[]) => async (event: React.FormEvent) => {

    const createToken = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [issuer,owner],readAs: [issuer,owner] } }, "secret")
  
    const ledger = new Ledger({ httpBaseUrl: httpBaseUrl, reconnectThreshold: 100, token: createToken, wsBaseUrl: wsBaseUrl }) 

    try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }
      let currentobsers:string[];
      currentobsers=[];
      communityfollowerlists.forEach(item => {      
        if (item["name"]==combinedcommunitylist)
        currentobsers=item["followers"];
      })
      console.log(currentobsers.concat(observers))
      await ledger.exerciseByKey(User.User.AddCommunityDisplay, currentuser, {issuer, symbol,owner,issueid:issueid,publicmarket:currentobsers.concat(observers),communitytofollow:combinedcommunitylist});
      setContent("");
      setDescription("");
    } catch (error) {
      alert(`Error sending message:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitMessage2 = (issuer:Party,symbol:string,owner:Party,newOwner:Party,asset:Asset,bid:Number,issueid:string) => async (event: React.FormEvent) => {
    const createToken = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [issuer,owner,newOwner],readAs: [issuer,owner,newOwner] } }, "secret")
  
    const ledger2 = new Ledger({ httpBaseUrl: httpBaseUrl, reconnectThreshold: 100, token: createToken, wsBaseUrl: wsBaseUrl }) 



    try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }


      setIsSubmitting2(true);
      //await ledger.exerciseByKey(User.User.TransferNFT,)
      //await ledger.exerciseByKey(User.User.TransferNFT, {"_1":currentuser,"_2:":newOwner}, {symbol:symbol,owner:owner,newOwner:newOwner,issuer:issuer,issueid:"1"});
      await ledger2.exerciseByKey(User.User.Changewallets, currentuser, {newwallet:bid.toString(),buyerusername:newOwner});

      await ledger2.exerciseByKey(User.User.TransferNFT, currentuser, {symbol:symbol,owner:owner,newOwner:newOwner,issuer:issuer,issueid:issueid});
      await ledger2.exerciseByKey(User.User.AcceptTransferNFT, currentuser, {asset:asset,newOwner:newOwner,price:bid.toString()});

      setContent("");
      setDescription("");
    } catch (error) {
      alert(`Error sending message:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting2(false);
    }
  };
  const submitMessage3 = (issuer:Party,symbol:string,owner:Party,combinedcommunitylist:string,issueid:string,observers:string[]) => async (event: React.FormEvent) => {

    const createToken = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [issuer,owner],readAs: [issuer,owner] } }, "secret")
  
    const ledger = new Ledger({ httpBaseUrl: httpBaseUrl, reconnectThreshold: 100, token: createToken, wsBaseUrl: wsBaseUrl }) 

    try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }
      let currentobsers:string[];
      currentobsers=[];
      communityfollowerlists.forEach(item => {      
        if (item["name"]==combinedcommunitylist)
        currentobsers=item["followers"];
      })
      observers = observers.filter( function( el ) {
        return currentobsers.indexOf( el ) < 0;
      } );
      
      
      if(observers.length==0 || observers.indexOf(currentuser) <=-1){
        observers=observers.concat([issuer])
      }
      setIsSubmitting(true);
      await ledger.exerciseByKey(User.User.RemoveCommunityDisplay, currentuser, {issuer, symbol,owner,issueid:issueid,publicmarket:observers,communitytofollow:combinedcommunitylist});
    
      setContent("");
      setDescription("");
    } catch (error) {
      alert(`Error sending message:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  const refreshCommunity = (issuer:Party,symbol:string,owner:Party,issueid:string,fullobserverlist:string[]) => async (event: React.FormEvent) => {

    const createToken = jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [issuer,owner],readAs: [issuer,owner] } }, "secret")
  
    const ledger = new Ledger({ httpBaseUrl: httpBaseUrl, reconnectThreshold: 100, token: createToken, wsBaseUrl: wsBaseUrl }) 

    try {
      event.preventDefault();
      if (currentuser === undefined) {
        return;
      }


      setIsSubmitting(true);
      await ledger.exerciseByKey(User.User.Display, currentuser, {issuer, symbol,owner,issueid:issueid,publicmarket:fullobserverlist});
    
      setContent("");
      setDescription("");
    } catch (error) {
      alert(`Error sending message:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Segment id="testit">
<Header as='h2' size='medium' color='green' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}} >NFTs You own </Header> 
{messagetest.contracts.map(message => {
        const {asset,price,newOwner,processstate} = message.payload;
        if (asset.owner==currentuser && processstate=="offered") {
          // myarray.push([asset.owner,asset.issuer, parseFloat(price),asset.symbol,asset.issueid,newOwner]);
          myarray2.push({ owner:asset.owner,issuer: asset.issuer, bid: parseFloat(price),Url: asset.symbol,id:asset.issueid,bidder:newOwner})
        }

        
/*         return (
          <div>
              <div id="NFTsdisplayed">
                
               <img src={asset.symbol} id="NFTimageDimensions" width="100" height="100" />

               <p>
                 <span><strong>Issuer: {asset.issuer}</strong></span>
                 <span><strong>Price: {price}</strong></span>
                 <span><strong>new owner: {newOwner}</strong></span>
               </p>
              </div>
           </div>
        ); */
      }
        
        )
        
        }

{messagesResult.contracts.map(message => {
        const {owner, symbol, issuer,price,display,description,issueid,observers,communitydisplayed} = message.payload;
        if(currentuser == owner ){
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

/*           let priceoffered=0
          let personbidding="Noone"
          if (myarray!=undefined) {
            myarray.forEach(item => {      
              if (item[3]==symbol && item[1] ==issuer && item[2]>priceoffered && item[4]==issueid) {
              priceoffered=item[2];
              personbidding=item[5]
           } 
       });
          } */
          
          let priceoffered2=0
          let personbidding2="Noone"
          if (myarray2!=undefined) {
            myarray2.forEach(item => {      
              if (item["Url"]==symbol && item["issuer"] ==issuer && item["bid"]>priceoffered2 && item["id"]==issueid) {
              priceoffered2=item["bid"];
              personbidding2=item["bidder"]

           } 
       });
          }
          communitylists=[];
          communityfollowerlists=[];
          {communitytest.contracts.map(message => {
            const {following,name} = message.payload;
            isin=false
            communitylists.forEach(item => {      
              if (item["key"]==name) {
                isin=true;
           }
            }
            )
              if(!isin){
              communitylists.push( {key  :name,  value :name,   text  :name});
              }
              communityfollowerlists.push({name:name,followers:following});
                if( communitydisplayed.indexOf(name) > -1){
                  fullobserverlist=fullobserverlist.concat(following);
                 
                }
          /*         return (
              <div>
                  <div id="NFTsdisplayed">
                    
                   <img src={asset.symbol} id="NFTimageDimensions" width="100" height="100" />
          
                   <p>
                     <span><strong>Issuer: {asset.issuer}</strong></span>
                     <span><strong>Price: {price}</strong></span>
                     <span><strong>new owner: {newOwner}</strong></span>
                   </p>
                  </div>
               </div>
            ); */
          }
            
            )
        }
          
 if(observers.length>1){  
    if(priceoffered2>0){
  
      return (
  
        <div className={ind}>
 <div className="card">
          <div className="top2">
          <div className="float-childcommunity2 green">
        <Header as='h2' size='medium' color='red' textAlign='left' style={{}} >Displayed </Header> 
      </div>
      <div className="float-childcommunity3 blue">  
      <Form onSubmit={refreshCommunity(issuer,symbol,owner,issueid,fullobserverlist)} >

<Button id= "DisplayToggleButton5"
//fluid
className='test-select-message-send-button'
//width="100px"

type="submit"
//disabled={isSubmitting || currentuser === undefined || symbol === ""}
//loading={isSubmitting}
content="Refresh Display"
/>  
</Form>
</div>

        </div>
  <div className="top">
  <img src={symbol} id="NFTimageDimensions" width="280" height="250" text-align="center" />
  
  </div>
  <div className="middle">
  <div className="time">   <p>Issuer: {issuer}  <span className="tab"></span> <span className="tab"></span> <span className="tab"></span>Issue ID: {issueid}</p></div>
         </div>
  <div className="bottom">
  
  
    <Form.Dropdown
        selection
        fluid
        className='test-select-message-receiver'
        placeholder="Select a Community"
        options= { communitylists}
        //value={ communitylists}
        value={communityname}
       onChange={event => setCommunityName(event.currentTarget.textContent ?? "")}
      /> 

  <div className="float-childcommunity blue">
  <Form onSubmit={submitMessage(issuer,symbol,owner,communityname,issueid,observers)} className="profile-action">
  <Button id= "DisplayToggleButton"
  // fluid
  className='test-select-message-send-button'
  type="submit"
  //disabled={isSubmitting || currentuser === undefined || symbol === ""}
  //loading={isSubmitting}
  content="Display NFT to this community"
  />  
  
  </Form>
  </div>
  <div className="float-childcommunity green">
  <Form onSubmit={submitMessage3(issuer,symbol,owner,communityname,issueid,observers)} className="profile-action">
  <Button id= "DisplayToggleButton"
  // fluid
  className='test-select-message-send-button'
  type="submit"
  //disabled={isSubmitting || currentuser === undefined || symbol === ""}
  //loading={isSubmitting}
  content="Remove NFT from this community"
  />  
  
  </Form>
  </div>
  <Divider/>
  <p> {"/n"}</p>
  <p>
  Bid Price: {priceoffered2} by {personbidding2}</p>
  <Form onSubmit={submitMessage2(issuer,symbol,owner,personbidding2,message.payload,priceoffered2,issueid)} className="profile-action">
  <Button id= "DisplayToggleButton2"
  className='test-select-message-send-button2'
  type="submit"
  disabled={isSubmitting2 || currentuser === undefined || symbol === ""}
  loading={isSubmitting2}
  content="Accept Highest Bid"
  />  
  </Form> 

  </div>
  </div>
  
  <div>
  
  
  </div>
  
  </div>
  );
      }else{
        return (
  
          <div className={ind}>
          <div className="card">
          <div className="top2">
          <div className="float-childcommunity2 green">
        <Header as='h2' size='medium' color='red' textAlign='left' style={{}} >Displayed </Header> 
      </div>
      <div className="float-childcommunity3 blue">  
      <Form onSubmit={refreshCommunity(issuer,symbol,owner,issueid,fullobserverlist)} >

<Button id= "DisplayToggleButton5"
//fluid
className='test-select-message-send-button'
//width="100px"

type="submit"
//disabled={isSubmitting || currentuser === undefined || symbol === ""}
//loading={isSubmitting}
content="Refresh Display"
/>  
</Form>
</div>
  {/*     <div className="float-childcommunity3 blue">
        
        <Header as='h2' size='medium' color='blue' textAlign='left' style={{}} >Refresh:</Header> 
        </div> */}
        </div>
            <div className="top">
    <img src={symbol} id="NFTimageDimensions" width="280" height="250" text-align="center" />
    
    </div>
    <div className="middle">
      
  <div className="time">   <p>Issuer: {issuer}  <span className="tab"></span> <span className="tab"></span> <span className="tab"></span>Issue ID: {issueid}</p></div>
         </div>

 
    <div className="bottom">
    
    
    
    <Form.Dropdown
    fluid
        selection
        className='test-select-message-receiver'
        placeholder="Select a community"
        options= { communitylists}
        //value={ communitylists}
        value={communityname}
       onChange={event => setCommunityName(event.currentTarget.textContent ?? "")}
      /> 
  <div className="float-childcommunity blue">
  <Form onSubmit={submitMessage(issuer,symbol,owner,communityname,issueid,observers)} className="profile-action">

  <Button id= "DisplayToggleButton"
  // fluid
  className='test-select-message-send-button'
  type="submit"
  //disabled={isSubmitting || currentuser === undefined || symbol === ""}
  //loading={isSubmitting}
  content="Display NFT to this community"
  />  
  
  </Form>

  </div>

  <div className="float-childcommunity green">
  <Form onSubmit={submitMessage3(issuer,symbol,owner,communityname,issueid,observers)} className="profile-action">
  <Button id= "DisplayToggleButton"
  // fluid
  className='test-select-message-send-button'
  type="submit"
  //disabled={isSubmitting || currentuser === undefined || symbol === ""}
  //loading={isSubmitting}
  content="Remove NFT from this community"
  />  
  
  </Form>
  </div>
  
    </div>
    </div>
    
    
    <div>
    
    
    </div>
    
    </div>
    );
        
      }
    
  }else{
  if(priceoffered2>0){
  
    return (

      <div className={ind}>

      <div className="card">
      <Header as='h2' size='medium' color='red' textAlign='left' style={{padding: '1ex 0em 0ex 1em'}} >Not Displayed </Header> 

<div className="top">
<img src={symbol} id="NFTimageDimensions" width="280" height="250" text-align="center" />

</div>
<div className="middle">
<div className="time">   <p>Issuer: {issuer}  <span className="tab"></span> <span className="tab"></span> <span className="tab"></span>Issue ID: {issueid}</p></div>


</div>
<div className="bottom">


  <Form.Dropdown
      selection
      fluid
      className='test-select-message-receiver'
      placeholder="Select a community"
      options= { communitylists}
      //value={ communitylists}
      value={communityname}
     onChange={event => setCommunityName(event.currentTarget.textContent ?? "")}
    /> 

<div className="float-childcommunity blue">
<Form onSubmit={submitMessage(issuer,symbol,owner,communityname,issueid,observers)} className="profile-action">
<Button id= "DisplayToggleButton"
// fluid
className='test-select-message-send-button'
type="submit"
//disabled={isSubmitting || currentuser === undefined || symbol === ""}
//loading={isSubmitting}
content="Display NFT to this community"
/>  

</Form>
</div>
<div className="float-childcommunity green">
<Form onSubmit={submitMessage3(issuer,symbol,owner,communityname,issueid,observers)} className="profile-action">
<Button id= "DisplayToggleButton"
// fluid
className='test-select-message-send-button'
type="submit"
//disabled={isSubmitting || currentuser === undefined || symbol === ""}
//loading={isSubmitting}
content="Remove NFT from this community"
/>  

</Form>
</div>
<Divider/>
<p> {"/n"}</p>
<p>
  Bid Price: {priceoffered2} by {personbidding2}</p>
<Form onSubmit={submitMessage2(issuer,symbol,owner,personbidding2,message.payload,priceoffered2,issueid)} className="profile-action">
<Button id= "DisplayToggleButton2"
className='test-select-message-send-button2'
type="submit"
disabled={isSubmitting2 || currentuser === undefined || symbol === ""}
loading={isSubmitting2}
content="Accept Highest Bid"
/>  
</Form> 
</div>
</div>

<div>


</div>

</div>
);
    }else{
      return (

        <div className={ind}>
        <div className="card">
      <Header as='h2' size='medium' color='red' textAlign='left' style={{padding: '1ex 0em 0ex 1em'}} >Not Displayed</Header> 

 

  <div className="top">
  <img src={symbol} id="NFTimageDimensions" width="280" height="250" text-align="center" />
  
  </div>
  <div className="middle">
  <div className="time">   <p>Issuer: {issuer}  <span className="tab"></span> <span className="tab"></span> <span className="tab"></span>Issue ID: {issueid}</p></div>
         </div>


  <div className="bottom">
  
  
  
  <Form.Dropdown
  fluid
      selection
      className='test-select-message-receiver'
      placeholder="Select a community"
      options= { communitylists}
      //value={ communitylists}
      value={communityname}
     onChange={event => setCommunityName(event.currentTarget.textContent ?? "")}
    /> 
<div className="float-childcommunity blue">
<Form onSubmit={submitMessage(issuer,symbol,owner,communityname,issueid,observers)} className="profile-action">

<Button id= "DisplayToggleButton"
// fluid
className='test-select-message-send-button'
type="submit"
//disabled={isSubmitting || currentuser === undefined || symbol === ""}
//loading={isSubmitting}
content="Display NFT to this community"
/>  

</Form>

</div>

<div className="float-childcommunity green">
<Form onSubmit={submitMessage3(issuer,symbol,owner,communityname,issueid,observers)} className="profile-action">
<Button id= "DisplayToggleButton"
// fluid
className='test-select-message-send-button'
type="submit"
//disabled={isSubmitting || currentuser === undefined || symbol === ""}
//loading={isSubmitting}
content="Remove NFT from this community"
/>  

</Form>
</div>

  </div>
  </div>
  
  
  <div>
  
  
  </div>
  
  </div>
  );
      
    }
  
}


    }
      }
    )}
 






   </Segment>




  );



};

export default NFTlistOwned;