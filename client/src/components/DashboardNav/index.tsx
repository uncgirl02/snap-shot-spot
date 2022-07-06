import { ReactNode } from 'react';
import { Link as ReachLink } from 'react-router-dom'
import Auth from '../../utils/auth'
import { QUERY_USER } from '../../utils/queries';

import logo from '../../assets/camera.png'
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalContent,
    ModalOverlay,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    List,
    ListItem,
    ListIcon
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { MdPeople } from 'react-icons/md';
import { useQuery } from '@apollo/client';

// const Links = ['Edit Profile', 'Friend List', 'Log Out'];

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('teal.300', 'teal.300'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

const logout = () => {
    Auth.logout();
}

// const jwt = require('jsonwebtoken');
// const User = require('../../../')

// const theUser = () => {

//     console.log(Auth.getUser())


export function DashboardNav() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
    const { isOpen: isFriendOpen, onOpen: onFriendOpen, onClose: onFriendClose } = useDisclosure();
    const { isOpen: isAddFriendOpen, onOpen: onAddFriendOpen, onClose: onAddFriendClose } = useDisclosure();
    
    // const { loading, data } = useQuery(QUERY_USER, {
    //     variables: { username: Auth.getUser() }
    // });
    
    // const user = data?.user || {};
    // const theUser = () => {
    //     user.friends.map(() => (
    //         console.log(user.friends._id))
    //     )}
    //     console.log(user.friends[2]._id)
    // }
    
    return (
        <>
            <Box bg={useColorModeValue('gray.300', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack>
                        <Image src={logo} boxSize='75px' objectFit='cover'></Image>
                        <Heading
                            textAlign={'center'}
                            fontSize='5xl'
                            color={useColorModeValue('gray.800', 'white')}>
                            Snap It!
                        </Heading>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={3}
                            mr={3}
                            display={{ base: 'none', md: 'flex' }}>
                            {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('teal.300', 'teal.300'),
                                }}
                                onClick={onAddFriendOpen}>
                                Add Friend
                            </Link>
                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('teal.300', 'teal.300'),
                                }}
                                onClick={onProfileOpen}>
                                Edit Profile
                            </Link>
                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('teal.300', 'teal.300'),
                                }}
                                onClick={onFriendOpen}>
                                Friend List
                            </Link>
                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('teal.300', 'teal.300'),
                                }}
                                onClick={logout}>
                                Log Out
                            </Link>
                        </HStack>
                        <Button
                            as={ReachLink} to='/NewAlbum'
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}>
                            Create New Album
                        </Button>
                        <Menu>
                            {/* <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton> */}
                        </Menu>
                    </Flex>
                </Flex>

                {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
            </Box>


            <Modal isOpen={isAddFriendOpen} onClose={onAddFriendClose}>
                <ModalOverlay>
                    <ModalContent>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            bg={useColorModeValue('gray.50', 'gray.800')}>
                            <Stack
                                spacing={4}
                                w={'full'}
                                maxW={'md'}
                                bg={useColorModeValue('white', 'gray.700')}
                                rounded={'xl'}
                                boxShadow={'lg'}
                                p={6}
                                my={12}>
                                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                                    Add Friend
                                </Heading>
                                <FormControl id="FriendEmail" isRequired>
                                    <FormLabel>Enter Friend's E-mail Address</FormLabel>
                                    <Input
                                        placeholder="Friend's e-mail"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="text"
                                    />
                                </FormControl>
                                <Stack spacing={6} direction={['column', 'row']}>
                                    <Button
                                        onClick={onAddFriendClose}
                                        bg={'red.400'}
                                        color={'white'}
                                        w="full"
                                        _hover={{
                                            bg: 'red.500',
                                        }}>
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        w="full"
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </ModalContent>
                </ModalOverlay>
            </Modal>


            <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
                <ModalOverlay>
                    <ModalContent>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            bg={useColorModeValue('gray.50', 'gray.800')}>
                            <Stack
                                spacing={4}
                                w={'full'}
                                maxW={'md'}
                                bg={useColorModeValue('white', 'gray.700')}
                                rounded={'xl'}
                                boxShadow={'lg'}
                                p={6}
                                my={12}>
                                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                                    User Profile Edit
                                </Heading>
                                <FormControl id="userName" isRequired>
                                    <FormLabel>User name</FormLabel>
                                    <Input
                                        placeholder="UserName"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="text"
                                    />
                                </FormControl>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        placeholder="your-email@example.com"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="email"
                                    />
                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        placeholder="password"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="password"
                                    />
                                </FormControl>
                                <Stack spacing={6} direction={['column', 'row']}>
                                    <Button
                                        onClick={onProfileClose}
                                        bg={'red.400'}
                                        color={'white'}
                                        w="full"
                                        _hover={{
                                            bg: 'red.500',
                                        }}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick = { () => {
                                            console.log('Test');
                                            console.log('Test2');
                                            onProfileClose()
                                        }}
                                        bg={'blue.400'}
                                        color={'white'}
                                        w="full"
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

        <Drawer
          isOpen={isFriendOpen}
          placement='right'
          onClose={onFriendClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Friends</DrawerHeader>
  
            <DrawerBody>
            <List spacing={3}>
                <p>Peter Piper</p>
              {/* {user.friends.map(() => (
                    <ListItem>
                        <ListIcon as={MdPeople} />
                        {user.friends.username}
                    </ListItem>
                ))} */}
            </List>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onFriendClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>



        </>
    );
}

export default DashboardNav;