import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Link,
  UnorderedList,
  ListItem,
  Card,
  Button,
  List,
  ListIcon,
  OrderedList,
  CardBody,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import axios from "axios";
import { deleteOneFile } from "../Redux/chatReducer/action";
import { useDispatch, useSelector } from "react-redux";

export const SidebarFuction = ({ render, forcedRender }) => {
  const [trig, setTrig] = useState(false);

  const [pdfs, setPdfs] = useState([]);
  const { upload } = useSelector((store) => store.chatReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect called", "render is", render);
    axios
      .get("http://127.0.0.1:8000/pdf/list/")
      .then((response) => {
        setPdfs(response.data.pdf_names);
      })
      .catch((error) => {
        console.error("Error fetching PDFs: ", error);
      });
  }, [render, trig, upload]);
  // console.log(upload);

  const handleDeleteFile = async (name) => {
    await dispatch(deleteOneFile(name));
    forcedRender((prev) => !prev);
    console.log("2-render", render);
  };

  return (
    <Box>
      <Text textAlign="center">Uploaded Pdfs</Text>
      <List spacing={3}>
        {pdfs?.map((el, ind) => {
          return (
            <ListItem key={ind}>
              <Flex
                justifyContent="center" // Horizontally center the content
                alignItems="center" // Vertically center the content
              >
                <Card
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  w="100%"
                  h="50px"
                  size="sm"
                  borderRadius="25px"
                >
                  <p
                    style={{
                      fontSize: "1rem",
                      margin: "auto",
                    }}
                  >
                    {" "}
                    <ListIcon as={MdPictureAsPdf} color="green.500" size="md" />
                    {el}
                  </p>
                </Card>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleDeleteFile(el)}
                >
                  Delete
                </Button>
              </Flex>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
