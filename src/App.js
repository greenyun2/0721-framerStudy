import './App.css';
import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from 'react';

const Wrapper = styled.div`
  width: 100vw;
  height: 300vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div: first-child, div: last-child {
    grid-column: span 2;
  }
`;

const OverLay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background: #fff;
  width: 70px;
  height: 70px;
  place-self: center;
  border-radius: 35px; 
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled(motion.div)`
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // overflow: hidden;
`;

// d애니메이션 효과를 주기위해서 반드시 필요한 개념 : 시작 : initial / 끝 : animate

// 변수에 애니메이션 값을 할당해 쓸수있다

//  Framer-motion 에서는 부모요소에 적용한 애니메이션 효과가 자녀요소에게 상속이 된다!!!

const myVars = {
  start: {scale: 0},
  end: {
    scale: 1,
    rotateZ: 360, 
    transition: {type: 'spring', delay: 0.5}
  },
}

// const boxVariants = {
//   start: {
//     opacity: 0,
//     scale: 0.5,
//   },
//   end: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       type: 'spring',
//       bounce: 0.5,
//       duration: 0.5,
//       delayChildren: 0.5,
//       staggerChildren: 0.5,
//     }
//   }
// }

// const circleVariants = {
//   start: {
//     opacity: 0,
//     y: 30,
//   },
//   end: {
//     opacity: 1,
//     y: 0,
//   }
// }

// const boxVariants = {
//   hover: {
//     scale: 1.5, rotateZ: 90
//   },
//   click: {
//     scale: 2, rotateZ: 180, borderRadius: '50%'
//   },
//   drag: {
//     backgroundColor: 'rgb(46,204,113)', transition: {duration: 10}
//   }
// }

// useMotionValue() : 동적인 모션이 발생되었을때, 위치값을 저장하는 공간을 생성하고 싶을때 사용

// useTransform() : 모션값에 따라 애니메이션을 도출하고 싶을때 사용한다

// useViewportScroll(): 스크롤 시 픽셀 위치값 & 젠체 스크롤 가능 공간 중 비율을 찾을때 사용


function App() {
  const biggerBoxRef = useRef();
  const x = useMotionValue(0);
  // 각배열의 값은 자리에 따라 매칭된다
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x, 
    [-800, 0, 800], 
    [
    "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
    "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
    "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );



  // console.log(x);

  // useEffect(() => {
  //   scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()))
  // }, [scrollY, scrollYProgress]);


  // 버튼 클릭시 모달창
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing(prev=> !prev);
  // 배경화면 모달
  const [clicked, setClicked] = useState(false);
  const toggle = () => setClicked((prev) => !prev); 

  const [selectedId, setSelectedId] = useState(null)

  const item = [
    {
      id: 1,
      title: "아이템 1번",
      desc: "아이템 1번의 내용입니다"
    },
    {
      id: 2,
      title: "아이템 2번",
      desc: "아이템 2번의 내용입니다"
    },
    {
      id: 3,
      title: "아이템 3번",
      desc: "아이템 3번의 내용입니다"
    },
    {
      id: 4,
      title: "아이템 4번",
      desc: "아이템 4번의 내용입니다"
    },
    {
      id: 5,
      title: "아이템 5번",
      desc: "아이템 5번의 내용입니다"
    },
    {
      id: 6,
      title: "아이템 6번",
      desc: "아이템 6번의 내용입니다"
    },
    {
      id: 7,
      title: "아이템 7번",
      desc: "아이템 7번의 내용입니다"
    },
  ]
  // 모달창
  // const showMe = (id, title, desc) => {
  //   setSelectedId({id, title, desc});
  // }
  // console.log(selectedId, "들어온 아이디 값");

  // scrollYProgress = % 스크롤 이벤트
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  console.log(scale, "스크롤 값이 안먹엉")

  return (
    <div className="wrapper">
      <motion.div
        className="container"
        style={{
          scale
        }}
      >
        <motion.div
          className="item"
          style={{
            scaleY: scrollYProgress
          }}
        />
      </motion.div>
    </div>
  );
}

export default App;

   // <Wrapper style={{ background: gradient }}>
    //   <Box 
    // 스크롤 이벤트
    //   style={{x, rotateZ, scale: scrollYProgress}}
    //   drag='x'
    //   dragSnapToOrigin
    //   />
    // </Wrapper>
    // <Wrapper>
    //   <button onClick={toggleShowing}>Click</button>
    //   {showing ? <Box /> : null}
    // </Wrapper>
      /* 모달창  */
      /* <Grid>
        {item.map((it) => (
          <Box layoutId={it.id} onClick={() => showMe(it.id, it.title, it.desc)}>
            <motion.h1>{it.title}</motion.h1>
            <motion.h2>{it.desc}</motion.h2>
          </Box>
        ))}
      </Grid>

      <AnimatePresence>
      { selectedId && (
      <OverLay 
      onClick={() => setSelectedId(null)}
      initial={{opacity: 0}}
      animate={{opacity: 1}} 
      exit={{opacity: 0}}
      >
        <Box 
        layoutId={selectedId.id} 
        style={{width: '50%', height: '80%' }}
        >
          <motion.h1>{selectedId.id}</motion.h1>
          <motion.h1>{selectedId.title}</motion.h1>
          <motion.h1>{selectedId.desc}</motion.h1>
          </Box>
      </OverLay> )}
      </AnimatePresence> */