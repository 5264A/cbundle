import React from 'react'
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill} from 'react-icons/ri'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({url= '/' , title = 'Home' , onClose}) => (
     <Link onClick={onClose} to = {url}>
          <Button variant={'ghost'}>
              {title}
          </Button>
     </Link>
)


const Header = ({ isAuthenticated = false, user }) => {
  const {isOpen , onOpen , onClose} = useDisclosure();
  

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout())
    onClose();
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
        zIndex={'overlay'}
      >
           <RiMenu5Fill/>
      </Button>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
         <DrawerOverlay backdropFilter={'blur(2px)'}/>
             <DrawerContent>
                <DrawerHeader borderBottomWidth={'2px'}>Academate</DrawerHeader>
                  <DrawerBody>
                       <VStack spacing={'8'} alignItems={'flex-start'}>
                           <LinkButton url = '/' title =  "Home" onClose={onClose} />
                           <LinkButton url = '/courses' title = "Browse All Courses"  onClose={onClose}/>
                           <LinkButton url = '/request' title = "Request a Course"  onClose={onClose}/>
                           <LinkButton url = '/contact' title =  "Contact Us"  onClose={onClose}/>
                           <LinkButton url = '/about' title =  "About"  onClose={onClose}/>
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
                                    <Link onClick={onClose} to = '/profile'>
                                       <Button variant={'ghost'} colorScheme={'yellow'}>Profile</Button>  
                                    </Link> 
                                    <Button onClick={logoutHandler} variant={'ghost'}>
                                        <RiLogoutBoxLine/>
                                          Logout
                                    </Button>  
                                  </HStack>
                                  {
                                    user && user.role === 'admin' && (
                                       <Link onClick={onClose} to = '/admin/dashboard'>
                                          <Button colorScheme={'purple'} variant="ghost">
                                              <RiDashboardFill style={{margin:"4px"}} />
                                                Dashboard
                                          </Button>
                                       </Link>
                                    )
                                  }
                              </VStack>
                          </>) : (<>
                            <Link onClick={onClose} to = '/login'>
                               <Button colorScheme={'yellow'}>Login</Button>  
                            </Link>
                            <p>OR</p>
                            <Link onClick={onClose} to = '/register'>
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