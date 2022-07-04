import React, { useState,  } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/camera.png';
import {LOGIN_USER, ADD_USER} from '../../utils/mutations';
import Auth from '../../utils/auth';

import {
    CloseIcon, HamburgerIcon
} from '@chakra-ui/icons';
import {
    Box, Button, Checkbox, Flex, FormControl,
    FormLabel, Heading, HStack, IconButton, Image, Input, InputGroup, Modal, ModalContent, ModalOverlay, propNames, Stack, Text, useBreakpointValue, useColorModeValue, useDisclosure
} from '@chakra-ui/react';



export default function Navbar() {
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
    onToggle,
  } = useDisclosure();
  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onClose: onSignInClose,
  } = useDisclosure();
  const { isOpen: isOpen } = useDisclosure();
  const [signupModal, setSignupModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupMutation] = useMutation(ADD_USER);
  const [signinMutation] = useMutation(LOGIN_USER);

  const [isSending, setIsSending] = useState(false);

  const sendSignupRequest = () => {
    console.log(
      `Email: ${email} & Password: ${password} & Username: ${username}`
    );
    if (isSending) return;
    setIsSending(true);
    // let result =  myMutation({ variables: { username: username, email: email, password: password } });

    signupMutation({
      variables: { username: username, email: email, password: password },
    }).then(
      (result) => {
        console.log("result", result.data.addUser);
        setSignupModal(false);
        // navigate("/dashboard");
		Auth.login(result.data.addUser.token)
      },
      function (error) {
        console.log("error", error.message);
        setError(error.message);
        alert(` oops ${error.message}`);
      }
    );

    setIsSending(false);
  };

  const sendSigninpRequest = () => {
    console.log(`Email: ${email} & Password: ${password} `);
    if (isSending) return;
    setIsSending(true);

    signinMutation({ variables: { email: email, password: password } }).then(
      (result) => {
        console.log("result", result.data.addUser);
        setSignupModal(false);
        // navigate("/dashboard");
		Auth.login(result.data.login.token)
      },
      function (error) {
        console.log("error", error.message);
        setError(error.message);
        alert(` oops ${error.message}`);
      }
    );

    setIsSending(false);
    // console.log("result",result)
  };

  const handleToggleSignupModal = () => {
    setSignupModal(!signupModal);
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <HStack>
            <Image src={logo} boxSize="100px" objectFit="cover"></Image>
            <Heading
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"Helvetica, sans-serif;"}
              fontSize="6xl"
              color={useColorModeValue("gray.800", "white")}
            >
              Snap It!
            </Heading>
          </HStack>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            {/* <DesktopNav /> */}
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button onClick={onSignInOpen} fontSize={"lg"} fontWeight={400}>
            Sign In
          </Button>
          <Button
            onClick={handleToggleSignupModal}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"lg"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      


            <Modal isOpen={isSignInOpen} onClose={onSignInClose}>
                <ModalOverlay>
                    <ModalContent>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            bg={useColorModeValue('white', 'gray.800')}>
                            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                                <Stack align={'center'}>
                                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                                    <Text fontSize={'lg'} color={'gray.600'}>
                                    to enjoy creating and viewing photo albums
                                    </Text>
                                </Stack>
                                <Box
                                    rounded={'lg'}
                                    bg={useColorModeValue('white', 'gray.700')}
                                    boxShadow={'2xl'}
                                    p={8}>
                                    <Stack spacing={4}>
                                        <FormControl id="email">
                                            <FormLabel>Email address</FormLabel>
                                            <Input type="email" />
                                        </FormControl>
                                        <FormControl id="password">
                                            <FormLabel>Password</FormLabel>
                                            <Input type="password" />
                                        </FormControl>
                                        <Stack spacing={10}>
                                            {/* <Stack
                                                direction={{ base: 'column', sm: 'row' }}
                                                align={'start'}
                                                justify={'space-between'}>
                                                <Checkbox>Remember me</Checkbox>
                                                <Link color={'blue.400'}>Forgot password?</Link>
                                            </Stack> */}
                                            <Button
                                                bg={'blue.400'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'blue.500',
                                                }}>
                                                Sign in
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Flex>
                    </ModalContent>
                </ModalOverlay>
            </Modal>



            <Modal isOpen={isSignUpOpen} onClose={onSignUpClose}>
                <ModalOverlay>
                    <ModalContent>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            bg={useColorModeValue('gray.50', 'gray.800')}>
                            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                                <Stack align={'center'}>
                                    <Heading fontSize={'4xl'} textAlign={'center'}>
                                        Sign up
                                    </Heading>
                                    <Text fontSize={'lg'} color={'gray.600'}>
                                    to enjoy creating and viewing photo albums
                                    </Text>
                                </Stack>
                                <Box
                                    rounded={'lg'}
                                    bg={useColorModeValue('white', 'gray.700')}
                                    boxShadow={'lg'}
                                    p={8}>
                                    <Stack spacing={4}>
                                        <HStack>
                                            <Box>
                                                <FormControl id="username" isRequired>
                                                    <FormLabel>Username</FormLabel>
                                                    <Input type="text" />
                                                </FormControl>
                                            </Box>
                                        </HStack>
                                        <FormControl id="email" isRequired>
                                            <FormLabel>Email address</FormLabel>
                                            <Input type="email" />
                                        </FormControl>
                                        <FormControl id="password" isRequired>
                                            <FormLabel>Password</FormLabel>
                                            <InputGroup>
                                                <Input type={'password'} />
                                                {/* <InputRightElement h={'full'}>
                                                    <Button
                                                        variant={'ghost'}
                                                        onClick={() =>
                                                            setShowPassword((showPassword) => !showPassword)
                                                        }>
                                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                    </Button>
                                                </InputRightElement> */}
                                            </InputGroup>
                                        </FormControl>
                                        <Stack spacing={10} pt={2}>
                                            <Button
                                                loadingText="Submitting"
                                                size="lg"
                                                bg={'blue.400'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'blue.500',
                                                }}>
                                                Sign up
                                            </Button>
                                        </Stack>
                                        <Stack pt={6}>
                                            {/* <Text align={'center'}>
                                                Already a user? <Link color={'blue.400'}>Login</Link>
                                            </Text> */}
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Flex>
                    </ModalContent>
                </ModalOverlay>
            </Modal>





        </Box >
    )
}

