import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { TiSocialLinkedinCircular , TiSocialInstagramCircular } from 'react-icons/ti'
import { DiGithub } from 'react-icons/di';

const Footer = () => {
  return (
      <Box padding={'4'} bg="blackAlpha.800" minH={'10vh'}>
        <Stack direction={['column','row']}>
            <VStack alignItems={['center','flex-start']} width="full">
                 <Heading children = "All Right Reserved" color={'white'}/>
                 <Heading fontFamily={'body'} size="sm" color={'yellow'} children = "@Athlete Web Developer"/>
            </VStack>

            <HStack spacing={['2','10']} justifyContent="center" color={'white'} fontSize="50">
                <a href="https://www.linkedin.com/in/yashasvi-sharma-5125b8238/" target={'blank'}>
                <TiSocialLinkedinCircular />
                </a>
                <a href="https://sharmayashasvi.github.io/MeYashasvi_Profile/" target={'blank'}>
                <TiSocialInstagramCircular />
                </a>
                <a href="https://github.com/SharmaYashasvi/" target={'blank'}>
                <DiGithub />
                </a>
            </HStack>
        </Stack>
      </Box>
  )
}

export default Footer