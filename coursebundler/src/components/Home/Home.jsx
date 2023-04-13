import React from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import "./Home.css";
import vg from "../../assets/images/logo.png";
import introVideo from "../../assets/videos/intro.mp4"
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
const Home = () => {
  return (
    <section className='home'>
        <div className="container">
            <Stack
            direction={['column','row']} // column for mobile row for big screen
            height="100%"
            justifyContent={['center','space-between']}
            alignItems="center"
            spacing={['16','56']} // 16 for mobile 56 for big screen
            >
             <VStack
              width={'full'} 
              alignItems = {['center','flex-end']}
              spacing="8"
              >
                <Heading color={'black'} children = "Welcome to Academate" size={'2xl'}/>
                <Text
                  color={'black'}
                  fontSize={'2xl'}
                  fontFamily="cursive"
                  textAlign={['center', 'left']}
                  children="Find Valuable content at reasonable price."
                />
                <Link to="/courses">
                  <Button size={'lg'} colorScheme = "yellow">
                    Explore Now
                  </Button>
                </Link>
             </VStack>

            <Image 
              className="vector-graphics"
              boxSize={'md'}
              src={vg}
              objectFit="contain"
            />
            </Stack>
        </div>
        <Box padding={'8'} bg="blackAlpha.800">
        <Heading
          textAlign={'center'}
          fontFamily="body"
          color={'yellow.400'}
          children="OUR BRANDS"
        />
        <HStack
          className="brandsBanner"
          justifyContent={'space-evenly'}
          marginTop="4"
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video
          muted
          autoPlay
          loop
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        ></video>
      </div>
    </section>
  )
}

export default Home