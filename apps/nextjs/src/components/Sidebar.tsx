import React, { useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CloseButton,
  Code,
  Drawer,
  DrawerContent,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import type { BoxProps, FlexProps } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
  FiAlertTriangle,
  FiBell,
  FiCheckSquare,
  FiChevronDown,
  FiCloudOff,
  FiCompass,
  FiDownload,
  FiDownloadCloud,
  FiExternalLink,
  FiGitPullRequest,
  FiHome,
  FiMail,
  FiMap,
  FiMapPin,
  FiMenu,
  FiMessageSquare,
  FiMonitor,
  FiPenTool,
  FiSettings,
  FiStar,
  FiTool,
  FiTrendingUp,
  FiTv,
  FiUserCheck,
  FiUserPlus,
} from "react-icons/fi";
import { IoMdPin } from "react-icons/io";
import {
  MdContactPage,
  MdPin,
  MdRecordVoiceOver as MdUserVoice,
} from "react-icons/md";

interface LinkItemProps {
  href: string;
  name: string;
  icon: IconType;
  tooltip?: string;
}
const NormalLinkItems: LinkItemProps[] = [
  { name: "Overview", icon: FiHome, href: "/dashboard" },
  {
    name: "Pit Display",
    icon: FiMonitor,
    href: "/pitdisplay",
    tooltip:
      "Pit Display shows live streams, match schedule, queueing information, and more.",
  },
  {
    name: "Broadcast",
    icon: MdUserVoice,
    href: "/broadcast",
    tooltip: "Broadcast a message to all members.",
  },
  {
    name: "Page User",
    icon: MdContactPage,
    href: "/pageusers",
    tooltip: "Paging a member will send them a notification with a message.",
  },
  {
    name: "Attendance",
    icon: FiExternalLink,
    href: "/attendance/home",
  },
  {
    name: "Scouting",
    icon: FiExternalLink,
    href: "/scouting/home",
  },
  { name: "Settings", icon: FiTool, href: "/settings" },
  { name: "Admin Settings", icon: FiSettings, href: "/settings" },
  { name: "Developer Settings", icon: FiPenTool, href: "/settings" },
];

const ScoutingLinkItems: LinkItemProps[] = [
  { name: "Event Overview", icon: FiHome, href: "/scouting/home" },
  { name: "Explore Matches", icon: FiMap, href: "/scouting/matches" },
  { name: "Explore Teams", icon: FiCompass, href: "/scouting/explore" },
  {
    name: "Compare Teams",
    icon: FiGitPullRequest,
    href: "/scouting/team/compare",
  },
  { name: "Match Predictions", icon: FiTrendingUp, href: "/scouting/predict" },
  { name: "Favorite Teams", icon: FiStar, href: "/scouting/favorite" },
  {
    name: "Assign Member Roles",
    icon: FiUserCheck,
    href: "/scouting/settings",
  },
  { name: "Invite Alliance Member", icon: FiMail, href: "/scouting/invite" },
];

const AttendanceLinkItems: LinkItemProps[] = [
  {
    name: "Attendance Overview",
    icon: FiHome,
    href: "/attendance/home",
  },
  {
    name: "Per-Member Attendance",
    icon: FiUserCheck,
    href: "/attendance/member",
  },
  {
    name: "Per-Meeting Attendance",
    icon: FiCheckSquare,
    href: "/attendance/meeting",
  },
  {
    name: "At-Risk Members",
    icon: FiAlertTriangle,
    href: "/attendance/at-risk",
  },
  {
    name: "Manage Auto-Attendance",
    icon: FiUserPlus,
    href: "/attendance/auto",
  },
  {
    name: "Attendance Settings",
    icon: FiSettings,
    href: "/attendance/settings",
  },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [LinkItems, setLinkItems] =
    React.useState<LinkItemProps[]>(NormalLinkItems);
  const [inSubMenu, setInSubMenu] = React.useState<boolean>(false);

  useEffect(() => {
    // Read the current path from the URL
    const path = window.location.pathname;
    // If the path is /scouting, change the LinkItems to ScoutingLinkItems
    if (path.includes("/scouting/")) {
      setLinkItems(ScoutingLinkItems);
      setInSubMenu(true);
    } else if (path.includes("/attendance/")) {
      setLinkItems(AttendanceLinkItems);
      setInSubMenu(true);
    }
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        inSubMenu={inSubMenu}
        linkItems={LinkItems}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            inSubMenu={inSubMenu}
            linkItems={LinkItems}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  inSubMenu?: boolean;
  linkItems: LinkItemProps[];
}

const SidebarContent = ({
  inSubMenu,
  onClose,
  linkItems,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        mt={6}
      >
        <Image sizes="2xl" src="/images/SidLogoCropped.png" alt="Logo" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {/* Breadcrumbs - are they in a submenu (eg. scouting, attendance) */}
      <div hidden={!inSubMenu}>
        <Box
          as="nav"
          px="4"
          marginBottom={4}
          // bg={useColorModeValue("white", "gray.900")}
        >
          <Link href="/main">
            <Button variant={"outline"}>
              <Icon as={FiHome} mr={2} />
              Back to Dashboard
            </Button>
          </Link>
        </Box>
        <hr />
      </div>
      {linkItems.map((link) => (
        <Tooltip
          label={link.tooltip}
          key={link.name}
          isDisabled={!link.tooltip}
        >
          <NavItem icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        </Tooltip>
      ))}
      <Alert status="error" mt={4}>
        <HStack>
          <Icon as={FiCloudOff} />
          <Text fontSize={"sm"}>
            Lost connection to server. Trying to reconnect...
          </Text>
        </HStack>
      </Alert>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  href: string;
}

// change to forwardRef
//
// const NavItem = forwardRef(
//   ({ icon, href, children, ...rest }: NavItemProps, ref) => {
//     return (
//       <Link href={href} style={{ textDecoration: "none" }}>
//         <Flex
//           align="center"

const NavItem = React.forwardRef(
  ({ icon, href, children, ...rest }: NavItemProps, ref) => {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Link href={href} style={{ textDecoration: "none" }} ref={ref}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  },
);

NavItem.displayName = "NavItem";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [isProMode, setProMode] = [
    false,
    (e: boolean) => {
      console.log(e);
    },
  ];

  const {
    isOpen: broadcastModal_isOpen,
    onOpen: broadcastModal_onOpen,
    onClose: broadcastModal_onClose,
  } = useDisclosure();

  const initialRef = React.useRef(null);

  return (
    <>
      <Modal
        isOpen={broadcastModal_isOpen}
        onClose={broadcastModal_onClose}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={broadcastModal_onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Logo
        </Text>

        <HStack spacing={{ base: "0", md: "6" }}>
          <HStack spacing={1}>
            {/* <Tooltip label="Broadcast">
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<MdUserVoice />}
            />
          </Tooltip>
          <Tooltip label="Page User">
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<MdContactPage />}
            />
          </Tooltip> */}
            <Menu>
              <Tooltip label="Broadcast Menu">
                <MenuButton
                  as={IconButton}
                  variant={"ghost"}
                  aria-label="Broadcast Menu"
                  icon={<MdUserVoice />}
                />
              </Tooltip>
              <MenuList>
                <MenuGroup title="Broadcast">
                  <MenuItem>Broadcast to event</MenuItem>
                  <MenuItem>Broadcast to everyone </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Page Groups">
                  <MenuItem>Pit Team</MenuItem>
                  <MenuItem>Drive Team</MenuItem>
                  <MenuItem>Pit+Drive</MenuItem>
                  <MenuItem>Scouting / Stands</MenuItem>
                  <MenuItem>Leads</MenuItem>
                </MenuGroup>
                <MenuGroup title="Page Users">
                  <MenuItem>
                    <IoMdPin /> &nbsp; Lucas Zheng
                  </MenuItem>
                  <MenuItem>
                    <IoMdPin /> &nbsp; Vivek Nadig
                  </MenuItem>
                  <MenuItem>Samuel Yu</MenuItem>
                  <MenuItem>Ryan Niu</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem>
                  Page Others &nbsp; <FiExternalLink />
                </MenuItem>
              </MenuList>
            </Menu>
            {/* <Menu>
            <MenuButton
              as={IconButton}
              variant={"ghost"}
              aria-label="Page User Menu"
              icon={<MdContactPage />}
            />
            <MenuList>
              <Input placeholder="Search" />
              <MenuItem>Send Broadcast</MenuItem>
            </MenuList>
          </Menu> */}

            <Tooltip label="Install PWA (caches data & app)">
              <IconButton
                size="lg"
                variant="ghost"
                aria-label="open menu"
                icon={<FiDownloadCloud />}
              />
            </Tooltip>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiBell />}
            />
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">Vivek Nadig</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      confirm(
                        "This will " +
                          (isProMode ? "disable" : "enable") +
                          " pro mode. Continue?",
                      )
                    ) {
                      setProMode(!isProMode);
                      // setTimeout(() => {
                      //   // Allow localStorage to update.
                      //   window.location.reload();
                      // }, 1000);
                    }
                  }}
                >
                  {isProMode ? "Disable" : "Enable"} Comp Mode
                </MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};
