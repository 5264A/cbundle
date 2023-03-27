import React from 'react'
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill} from 'react-icons/ri'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LinkButton = ({url= '/' , title = 'Home'}) => (
     <Link to = {url}>
          <Button variant={'ghost'}>
              {title}
          </Button>
     </Link>
)

const logoutHandler = () => {
      console.log("LOGOUT SUCCESSFULLY")
}


const Header = () => {
  const {isOpen , onOpen , onClose} = useDisclosure();
  const isAuthenticated = true;
  const user = {
     role:'admin'
  }
  return (
    <>
      <ColorModeSwitcher/>
      <Button
        onClick={onOpen}
        colorScheme={'yellow'} 
        width = "12"
        height={'12'}
        left = "6"
        top={'6'}
        position={'fixed'}
        rounded = {'full'}
      >
           <RiMenu5Fill/>
      </Button>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
         <DrawerOverlay backdropFilter={'blur(2px)'}/>
             <DrawerContent>
                <DrawerHeader borderBottomWidth={'2px'}>Garib-Sikshha</DrawerHeader>
                  <DrawerBody>
                       <VStack spacing={'8'} alignItems={'flex-start'}>
                           <LinkButton url = '/' title =  "Home" />
                           <LinkButton url = '/courses' title = "Browse All Courses" />
                           <LinkButton url = '/request' title = "Request a Course" />
                           <LinkButton url = '/contact' title =  "Contact Us" />
                           <LinkButton url = '/about' title =  "About" />
                       </VStack>

                       <HStack
                        justifyContent={'space-evenly'}
                        position={'absolute'}
                        bottom={'2rem'}
                        width={'80%'}
                       >
                         {
                          isAuthenticated ? (<>
                              <VStack>
                                  <HStack>
                                    <Link to = '/profile'>
                                       <Button variant={'ghost'} colorScheme={'yellow'}>Profile</Button>  
                                    </Link> 
                                    <Button onClick={logoutHandler} variant={'ghost'}>
                                        <RiLogoutBoxLine/>
                                          Logout
                                    </Button>  
                                  </HStack>
                                  {
                                    user && user.role === 'admin' && (
                                       <Link to = '/admin/dashboard'>
                                          <Button colorScheme={'purple'} variant="ghost">
                                              <RiDashboardFill style={{margin:"4px"}} />
                                                Dashboard
                                          </Button>
                                       </Link>
                                    )
                                  }
                              </VStack>
                          </>) : (<>
                            <Link to = '/login'>
                               <Button colorScheme={'yellow'}>Login</Button>  
                            </Link>
                            <p>OR</p>
                            <Link to = '/register'>
                               <Button colorScheme={'yellow'}>Sign Up</Button>  
                            </Link>
                         </>) 
                         }  
                       </HStack>
                  </DrawerBody>
             </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header