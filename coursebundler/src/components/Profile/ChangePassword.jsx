import {
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import { useNavigate } from 'react-router-dom';
import toast  from 'react-hot-toast'
import { loadUser } from '../../redux/actions/user';
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(changePassword(oldPassword, newPassword));
    await dispatch(loadUser());
    navigate('/profile');
  };


  const { loading, message, error } = useSelector(state => state.profile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);
  return (
    <Container minH={'90vh'} py={'16'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Change Password"
          my={'16'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <InputGroup size="md">
            <Input
              type={show1 ? 'text' : 'password'}
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Old Password"
              focusBorderColor="yellow.500"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick1}>
                {show1 ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <InputGroup size="md">
            <Input
              type={show2 ? 'text' : 'password'}
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="New Password"
              focusBorderColor="yellow.500"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick2}>
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

          <Button isLoading={loading} w={'full'} colorScheme="yellow" type="submit">
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
