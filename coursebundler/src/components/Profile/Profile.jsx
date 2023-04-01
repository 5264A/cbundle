import React from 'react'
import {
  Avatar, 
  Button, 
  Container, 
  HStack, 
  Heading,  
  Image,  
  Stack, 
  Text, 
  VStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import {fileUploadCss} from '../../Auth/Register'
const Profile = () => {

  const user={
      name:"JAI SHRI RAM",
      email:"ramhanumang@gmail.com",
      CreatedAt: String(new Date().toISOString()),
      role:'user',
      subscription:{
          status:'dactive'
      },
      playlist:[
          {
            course:"Web Development",
            poster:"https://media.istockphoto.com/id/1334906074/photo/web-designer-working-with-multiple-devices.jpg?b=1&s=170667a&w=0&k=20&c=gQtc5l3nwoegnM8fc9jKzOCbh709i1FYE1p8gljrtOs="
          },
      ] ,
  }

  const removeFromPlaylistHandler = (id) =>{
         console.log(id);
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
      <Container minH={'95vh'} maxW={'container.lg'} py={'8'} >
            <Heading children="Profile" m={'8'} textTransform={'uppercase'}/>
            <Stack
            justifyContent={'flex-start'}
            direction={['column','row']}
            alignItems={'center'}
            spacing={['8','16']}
            padding={'8'}
            >
               <VStack>
                  <Avatar boxSize={'48'}/>
                  <Button
                    onClick={onOpen} 
                    colorScheme={'yellow'}
                    variant={'ghost'}
                  >
                  Change Photo
                  </Button>
               </VStack> 

               <VStack spacing={'4'} alignItems={['center','flex-start']}>
                   <HStack>
                       <Text children="Name :" fontWeight={'bold'}/>
                       <Text children={user.name} />
                   </HStack>{' '}
                   <HStack>
                       <Text children="Email :" fontWeight={'bold'}/>
                       <Text children={user.email} />
                   </HStack>
                   <HStack>
                       <Text children="CreatedAt :" fontWeight={'bold'}/>
                       <Text children={user.CreatedAt.split("T")[0]} />
                   </HStack>

                   {
                     user.role !== 'admin' && (
                      <HStack>
                       <Text children="Subscription :" fontWeight={'bold'}/>
                       {
                        user.subscription.status === 'active' ? (
                           <Button colorScheme='red'>Cancel Subscription</Button>
                        ):
                        (
                          <Link to="/subscribe">
                               <Button colorScheme='yellow'>Subscribe</Button>
                          </Link>
                        )
                       }
                      </HStack>
                     )
                   }

              <Stack direction={['column','row']} alignItems={'center'}>
                  <Link to="/updateprofile">
                      <Button>Update Profile</Button>
                  </Link>
                  <Link to="/changepassword">
                      <Button>Change Password</Button>
                  </Link>
              </Stack>
               </VStack> 
            </Stack>


            <Heading children="PlayList" my={'8'} size={'md'}/>

            {
              user.playlist.length > 0 && (
                <Stack
                direction={['column','row']} 
                alignItems={'center'}
                flexWrap={'wrap'}
                p="4"
                >
                  {
                    user.playlist.map((element)=>(
                      <VStack w={'48'} m={'2'} key={element.course} >
                          <Image
                            boxSize={'full'}
                            objectFit={'contain'}
                            src={element.poster}
                          />
                          <HStack>
                              <Link to={`/course/${element.course}`}>
                                  <Button variant={'ghost'} colorScheme="yellow">
                                        Watch Now
                                  </Button>
                              </Link>
                              <Button onClick={()=>removeFromPlaylistHandler(element.course)} >
                                   <RiDeleteBin7Fill/>
                              </Button>
                          </HStack>
                      </VStack>
                    ))
                  }
                </Stack>
              )
            }

          <ChangePhotoBox
            // changeImageSubmitHandler={changeImageSubmitHandler}
            isOpen={isOpen}
            onClose={onClose}
            // loading={loading}
          />
      </Container>
  )
}

export default Profile

function ChangePhotoBox({
  isOpen,
  onClose,
  // changeImageSubmitHandler,
  // loading,
}) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
          {/* onSubmit={e => changeImageSubmitHandler(e, image)} */}
            <form>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  // isLoading={loading}
                  w="full"
                  colorScheme={'yellow'}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}