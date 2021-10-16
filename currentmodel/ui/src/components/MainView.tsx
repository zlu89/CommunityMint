// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { Decimal, Party } from '@daml/types';
import { User } from '@daml.js/currentmodel';
import { useParty, useLedger, useStreamFetchByKeys, useStreamQueries } from '@daml/react';
import UserList from './UserList';
import PartyListEdit from './PartyListEdit';
import NFTList from './NFTlist';
import NFTListOwned from './NFTlistOwned';
import UserNFTList from './UserNFTList';
import MintNFT from './MintNFTs';
import NFTlistBid from './NFTlistBid'
import CreateCommunity from './CreateCommunity'
import JoinCommunity from './JoinCommunity'
import NFTlistCommunity from './NFTlistCommunity'
//import ImageUpload from './ImageUpload';
import MarketNFTs from './MarketNFTs';
var testurl="click this ww"
type NFTIDS = { owner: number; index: Decimal; Url: number };
var globalnum=0
interface IProps_Square {
  message: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

class Square extends React.Component < IProps_Square > {
  render() {  
    return (
      <button onClick={this.props.onClick}>
        {this.props.message}
      </button>
    );
  }
}
// USERS_BEGIN
const MainView: React.FC = () => {
  const username = useParty();
  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [username]);
  const celebmarket = useStreamFetchByKeys(User.User, () => ["CelebrityMarket"], ["CelebrityMarket"]);
  const celebmarketuser = celebmarket.contracts[0]?.payload;
  const myUser = myUserResult.contracts[0]?.payload;
  const allUsers = useStreamQueries(User.User).contracts;
  const allAssets = useStreamQueries(User.Asset).contracts;
  let nftownednum=0;

  var purchasepower = myUser?.wallet;
  
// USERS_END
  // Sorted list of users that are following the current user
  const followers = useMemo(() =>
    allUsers
    .map(user => user.payload)
    .filter(user => user.username !== username)
    .sort((x, y) => x.username.localeCompare(y.username)),
    [allUsers, username]);
  const displayedassets= useMemo(() =>
     allAssets
     .map(asset => asset.payload),
    // .filter(user => user.display !== false),
    [allAssets, username]);
    
  // FOLLOW_BEGIN
  const ledger = useLedger();

  const follow = async (userToFollow: Party): Promise<boolean> => {
    try {
      await ledger.exerciseByKey(User.User.Follow, username, {userToFollow});
      return true;
    } catch (error) {
      alert(`Unknown error:\n${error}`);
      return false;
    }
  }

  const mint = async (issuer:Party, symbol:string): Promise<boolean> => {
    try {
      await ledger.exerciseByKey(User.User.Mint, username, {issuer,symbol,description:"hi",issueid:"1"});
      return true;
    } catch (error) {
      alert(`Unknown error:\n${error}`);
      return false;
    }
  }

  
  // FOLLOW_END
  //console.log(myUser)
  return (
    <Container id="widecontainer">
{/*       <Grid  columns={2}>
        <Grid.Row stretched>
          <Grid.Column> */}
                   <Header as='h1' color='blue' textAlign='center'>
  
  <Header.Content>
    
  <span className="tab"></span><span className="tab"></span><span className="tab"></span> <span className="tab"></span><span className="tab"></span><span className="tab"></span><span className="tab"></span><span className="tab"></span><span className="tab"></span><span className="tab"></span><span className="tab"></span>  <span className="tab"></span><span className="tab"></span><span className="tab"></span>{myUser ? `Welcome, ${myUser.username}!` : 'Loading...'}<span className="tab"></span>
  <span className="tab"></span>  Wallet: {purchasepower} eth   <span className="tab"></span><span className="tab"></span>
    {allAssets.map(message => {
const {owner, symbol, issuer,price,display} = message.payload;
if(username == owner ){
nftownednum=nftownednum+1}})}
NFTsOwned: {nftownednum}
  </Header.Content>
</Header>
         
            {/* <div id="MintNFT"> */}
            <Segment className="nft_owned2">
            <div className="float-container">
            <div className="float-child green">
            <Segment id="MintSegment">
              <Header as='h2'>
                <Icon name='pencil square' />
                <Header.Content>
                  Mint NFT
                  <Header.Subheader>Mint NFTs through image URLs</Header.Subheader>
                </Header.Content>
              </Header>
               <MintNFT
                currentuser={username}
              />
              
              <Divider />
              
              
              </Segment >
              </div>
              <div className="float-child blue">
            <Segment id="MintSegment2">
     

            <div className="float-childcommunity green">
            <Segment id="CommunitySegment">
              <Header as='h2'>
                <Header.Content>
                  Community Create
                  <Header.Subheader>Create a Community to share NFTs</Header.Subheader>
                </Header.Content>
              </Header>
               <CreateCommunity
                currentuser={username}
              />
              
            </Segment>
              
              
              </div>
              <div className="float-childcommunity blue">
              <Segment id="CommunitySegment">
              <Header as='h2'>
                <Header.Content>
                  Join a Community
                  <Header.Subheader>Join a Community to share NFTs</Header.Subheader>
                </Header.Content>
              </Header>
               <JoinCommunity
                currentuser={username}
              />
              
            </Segment>
              
              </div>
              
           
              
              </Segment>
              </div>
              </div>
              </Segment>
            {/* </div> */}
            <Segment className="nft_owned">
            
           
            <NFTListOwned 
            currentuser={username}/>

             
              
            </Segment>
              <Segment className="nftbid">
            
           
            <NFTlistBid 
            currentuser={username}/>
            
             
              
            </Segment>
            <Segment className="nftcommunitylist">
            
           
            <NFTlistCommunity 
            currentuser={username}/>
            
             
              
            </Segment>
{/*             <Segment>
            <ImageUpload/>
            </Segment> */}
            
          {/* </Grid.Column>
        </Grid.Row>
      </Grid> */}
    </Container>
    

  );
}

export default MainView;
