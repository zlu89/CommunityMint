import React from 'react'
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import './HomeStyle.css'

const Home = () => {

    return (
       
            <Segment>

                <div className="topnav" id="myTopnav">
                  <a href="#home" className="active">Home</a>
                  <a href="#news">Login</a>
                  <a href="#contact">Mint</a>
                  <a href="#about">Public Marketplace</a>
                  <a href="javascript:void(0);" className="icon">
                    <i className="fa fa-bars"></i>
                  </a>
                </div>

        </Segment>        

        
        
    )

  }
export default Home;