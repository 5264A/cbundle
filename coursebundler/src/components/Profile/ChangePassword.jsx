import { Button, Container, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React ,{ useState } from 'react'
const ChangePassword = () => {
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [show1, setShow1] = React.useState(false)
    const [show2, setShow2] = React.useState(false)
    const handleClick1 = () => setShow1(!show1)
    const handleClick2 = () => setShow2(!show2)
  return (
     <Container minH={'90vh'} py={'16'} >
          <form>
              <Heading
                textTransform={'uppercase'}
                children = "Change Password"
                my={'16'}
                textAlign={['center','left']}
              />

              <VStack spacing={'8'}>

              <InputGroup size='md'>
                    <Input
                        type={show1 ? 'text' : 'password'}
                        required
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        placeholder="Old Password"
                        focusBorderColor="yellow.500"
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick1}>
                        {show1 ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
             </InputGroup>


             <InputGroup size='md'>
                    <Input
                        type={show2 ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        focusBorderColor="yellow.500"
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick2}>
                        {show2 ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
             </InputGroup>

                 {/* <Input
                    required
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    placeholder="Old Password"
                    type={'password'}
                    focusBorderColor="yellow.500"
                 /> */}

                 {/* <Input
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    type={'password'}
                    focusBorderColor="yellow.500"
                 /> */}

                 <Button w={'full'} colorScheme="yellow" type="submit">
                    Change
                 </Button>
              </VStack>
          </form>
     </Container>
  )
}

export default ChangePassword