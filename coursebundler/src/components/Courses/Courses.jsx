import { Button, Container, Heading, HStack, Input , Stack, Text , Image, Link , VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';


const Course = ({
    views,
    title,
    imageSrc,
    id,
    addToPlaylistHandler,
    creator,
    description,
    lectureCount,
    loading,
  }) => {
    return (
      <VStack className="course" alignItems={['center', 'flex-start']}>
        <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
        <Heading
          textAlign={['center', 'left']}
          maxW="200px"
          size={'sm'}
          fontFamily={'sans-serif'}
          noOfLines={3}
          children={title}
        />
        <Text noOfLines={2} children={description} />
  
        <HStack>
          <Text
            fontWeight={'bold'}
            textTransform="uppercase"
            children={'Creator'}
          />
  
          <Text
            fontFamily={'body'}
            textTransform="uppercase"
            children={creator}
          />
        </HStack>
  
        <Heading
          textAlign={'center'}
          size="xs"
          children={`Lectures - ${lectureCount}`}
          textTransform="uppercase"
        />
  
        <Heading
          size="xs"
          children={`Views - ${views}`}
          textTransform="uppercase"
        />
  
        <Stack direction={['column', 'row']} alignItems="center">
          <Link to={`/course/${id}`}>
            <Button colorScheme={'yellow'}>Watch Now</Button>
          </Link>
          <Button
            isLoading={loading}
            variant={'ghost'}
            colorScheme={'yellow'}
            onClick={() => addToPlaylistHandler(id)}
          >
            Add to playlist
          </Button>
        </Stack>
      </VStack>
    );
  };



const Courses = () => {
  const [keyword,setKeyWord] = useState("");
  const [category ,setCategory] = useState("");
  const categories = [
      "Web Develpoment",
      "App Development",
      "Ai",
      "Data Structure & Algorithem",
      "python"
  ];
  return (
    <Container 
    minH={'95vh'} 
    maxW="container.lg"
    padding={'8'}
    >
    <Heading children="All Courses" m = {'8'}/>
    <Input value={keyword} 
    onChange={(e)=>setKeyWord(e.target.value)} 
    placeholder="Search a course..." 
    type={'text'} 
    focusBorderColor="yellow.500"      
    />

    <HStack 
    overflowX={'auto'} 
    paddingY="8" 
    css={
        {"&::-webkit-scrollbar":
            {   
            display:"none"
            }
        }
     }
     >
     {
        categories.map((item , index)=>(
            <Button key={index} onClick={(e)=>setCategory(item)} minW={'60'}>
                <Text children={item} />
            </Button>
         ))
     }      
    </HStack>

    {/* <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading mt="4" children="Courses Not Found" />
        )}
      </Stack> */}
    </Container>
  )
}

export default Courses