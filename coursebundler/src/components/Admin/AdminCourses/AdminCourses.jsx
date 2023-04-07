import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr ,  useDisclosure} from '@chakra-ui/react'
import cursor from '../../../assets/images/cursor.png'
import React from 'react'
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal';

const AdminCourses = () => {

   const courses = [{
        _id : "bncydusdvfihsbg",
        poster:{
            url:"https://media.istockphoto.com/id/1334906074/photo/web-designer-working-with-multiple-devices.jpg?b=1&s=170667a&w=0&k=20&c=gQtc5l3nwoegnM8fc9jKzOCbh709i1FYE1p8gljrtOs="
        },
        email:"Yashasvi7@gmail.com",
        role:"Admin",
        subscription:{
           status:"active"
        },
   }]

   const { isOpen, onClose, onOpen } = useDisclosure();

   const coureDetailsHandler = (courseId) => {
      onOpen();
      console.log(courseId);
    };

    const deleteButtonHandler = (courseId) => {
        console.log(courseId);
    };

    const deleteLectureButtonHandler = async (courseId, lectureId) => {
      // await dispatch(deleteLecture(courseId, lectureId));
      // dispatch(getCourseLectures(courseId));
      console.log(courseId);
    };
  
    const addLectureHandler = async (e, courseId, title, description, video) => {
      e.preventDefault();
      // const myForm = new FormData();
  
      // myForm.append('title', title);
      // myForm.append('description', description);
      // myForm.append('file', video);
  
      // await dispatch(addLecture(courseId, myForm));
      // dispatch(getCourseLectures(courseId));
      console.log(courseId);
    };
  

  return (
     <Grid 
     css = {{
        cursor: `url(${cursor}),default`,
     }}
     minH={'100vh'} 
     templateColumns={['1fr','5fr 1fr']}
     >
     <Box padding={['0','8']} overflowX={'auto'}>
     <Heading textTransform={'uppercase'} children="All Courses" my={'16'} textAlign={['center','left']}/>
     <TableContainer w={['100vw','full']} >
      <Table variant={'simple'} size={'lg'}>
         <TableCaption >
              All avaiable Courses in the database
         </TableCaption>
         <Thead>
            <Tr>
               <Th>Id</Th>
               <Th>Poster</Th>
               <Th>Title</Th>
               <Th>Category</Th>
               <Th>Creator</Th>
               <Th isNumeric>Views</Th>
               <Th isNumeric>Lactures</Th>
               <Th isNumeric>Action</Th>
            </Tr>
         </Thead>
         <Tbody>
            {
               courses.map((item)=>(
                  <Row
                  coureDetailsHandler={coureDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  // loading={loading}
                />
               ))
            }
         </Tbody>
      </Table>
     </TableContainer>
     <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={'ansbasvujkn'}
          courseTitle= "React Course"
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
         //  lectures={lectures}
         //  loading={loading}
        />
     </Box>
     <Sidebar/>
     </Grid>
  )
}


function Row({ item, coureDetailsHandler, deleteButtonHandler }) {
   return (
     <Tr>
       <Td>#{item._id}</Td>
 
       <Td>
         <Image src={item.poster.url} />
       </Td>
 
       <Td>{item.title}</Td>
       <Td textTransform={'uppercase'}>{item.category}</Td>
       <Td>{item.createdBy}</Td>
       <Td isNumeric>{item.views}</Td>
       <Td isNumeric>{item.numOfVideos}</Td>
 
       <Td isNumeric>
         <HStack justifyContent={'flex-end'}>
           <Button
             onClick={() => coureDetailsHandler(item._id, item.title)}
             variant={'outline'}
             color="purple.500"
            //  isLoading={loading}
           >
             View Lectures
           </Button>
 
           <Button
             onClick={() => deleteButtonHandler(item._id)}
             color={'red'}
            //  isLoading={loading}
           >
             <RiDeleteBin7Fill />
           </Button>
         </HStack>
       </Td>
     </Tr>
   );
 }

export default AdminCourses