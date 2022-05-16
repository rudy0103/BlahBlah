/* eslint-disable */
import { Container, Row, Col, ListGroup, Figure, Card, Button } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { Email } from '@mui/icons-material';
import langarr from '../../../component/user/Langarr'
import langkey from '../../../component/user/Lang'
import langIMG from '../../../component/user/LangImg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import User from '..';
import Avatar from '@mui/material/Avatar';


export default function UserDetail() {
  const router = useRouter();
  const {email} = router.query
  const [user,setUser] = useState<any>()
  const [lang,setLang] = useState<any>([])

  // 기억하자..배열 사용할때 any!
  const larr:any = langarr
  const lkey:any = langkey
  const lImg:any = langIMG

  // 학습언어
  const [langa,setLangA] = useState([])
  // 구사언어
  const [langb,setLangB] = useState([])
  // 모국어
  const [langc,setLangC] = useState([])
  

  const onEmailCheck = () => {
    axios({
      method:'get',
      url:`https://blahblah.community:8443/api/user/${email}`,
    })
    .then((result)=>{
     console.log('이메일로정보 요청성공')
     console.log(result.data)
     setUser(result.data)
     setLang(result.data['langInfos'])
     console.log(result.data['langInfos'])
  })
    .catch((error)=>{
      console.log('이메일로정보 요청실패')
    console.log(error)  
  })
  };

  // 페이지 넘어오자마자 이메일 인증체크!
  useEffect(() => {
    onEmailCheck()
  }, []);
  useEffect(()=>{
    if(lang.length!==0){
      console.log('됫다!')
      // var newarr:any = [...langa]
      var newarra:any = [...langa]
      var newarrb:any  = [...langb]
      var newarrc:any  = [...langc]


      for(let i=0;i<Object.keys(lang).length;i++){

        if(lang[i]['level']===1 ||lang[i]['level']===2 || lang[i]['level']===3){
          // var newarr:any = [...langa]
          newarra.push(lang[i]['langId'])
          setLangA(newarra)
        }else if(lang[i]['level']===4){
          newarrb.push(lang[i]['langId'])
          setLangB(newarrb)
        }
        else if(lang[i]['level']===5){
          // any형식의 인수는never형식에 할당할 수없음, 배열도any로 설정
          newarrc.push(lang[i]['langId'])
          setLangC(newarrc)
        }
      }
    }
  },[lang])

    // 유저 좋아요 버튼
    const [likeBtn,setLikeBtn] = useState(true)
    // 유저 팔로우 버튼
    const [followBtn,setFollowBtn] = useState(true)

  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  // 팔로우요청,언팔로우요청
  const userFollow = (event:any) => {
    event.preventDefault();
    setFollowBtn(!followBtn)
    axios({
      method:'post',
      url:`https://blahblah.community:8443/api/follow/${user.id}`,
      headers: setToken(),
      // data: {
      //   'email':email
      // },
    })
    .then((result)=>{
    console.log('팔로우 요청성공')
    console.log(result)
 
  })
    .catch((error)=>{
      console.log('팔로우 요청실패')
      console.log(error)  
  })
  };

  // 좋아요 요청
  const userLike = (event:any) => {
    event.preventDefault();
    setLikeBtn(!likeBtn)
    axios({
      method:'post',
      url:`https://blahblah.community:8443/api/rate/${email}`,
      headers: setToken(),
      data: {
        'email':email
      },
    })
    .then((result)=>{
      // setLikeBtn(!likeBtn)
      // props.findMate()
      // 이걸로 상위 함수 바꿔줘서 좋아요 실시간
      // setLike(props.user.rating)
      console.log('유저 좋아 요청성공')
    console.log(result)
 
  })
    .catch((error)=>{
      console.log('유저 좋아 요청실패')
      console.log(email)
    console.log(error)  
  })
  };

  const [following,setFollowing] = useState<any>()
  const [rateList,setRateList] = useState<any>()
  const getFollowing = () => {
    axios({
      url: "https://blahblah.community:8443/api/follow/following",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log('팔로잉 목록 요청성공')
      // console.log(res)
      console.log(res.data)
      setFollowing(res.data)
      // setFollowing(res.data)
    }).catch((err)=>{
      console.log('팔로잉 목록 요청실패')
      console.log(err)
    });
  };

  const getRateList = () => {
    axios({
      url: "https://blahblah.community:8443/api/rate/ratedlist",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log('좋아요 목록 요청성공')
      // console.log(res)
      console.log(res.data)
      setRateList(res.data)
      // setFollowing(res.data)
      // setFollowing(res.data)
    }).catch((err)=>{
      console.log('좋아요 목록 요청실패')
      console.log(err)
    });
  };

  useEffect(() => {
    getFollowing()
    getRateList()
  }, []);

  useEffect(()=>{
    console.log('챙겨오기~')
    console.log(following)
    console.log('유저출력~')
    console.log(user)
    if(user){
      for(let i=0;i<Object(following).length;i++){
        if(following[i].id === user.id){
          setFollowBtn(false)
        }
      }
      for(let i=0;i<Object(rateList).length;i++){
        if(rateList[i].userId === user.id){
          setLikeBtn(false)
        }
      }
    }
  },[following])




  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
          
          {
            user
            ?<> 
            <Avatar
        alt="ProfileImage"
        src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${user.profileImg}`}
        // src="/user/young-man.png"
        sx={{ width: 100, height: 100 }}
      />
            <ListGroup variant="flush">
            <ListGroup.Item><div className="fw-bold">Name</div>{user.name}{
    followBtn
    ?<>  <Button variant="secondary" size="sm" onClick={userFollow}>
    follow
  </Button></>
    :<>  <Button variant="outline-secondary" size="sm" onClick={userFollow}>
    unfollow
  </Button></>
  }

{
          likeBtn
          ?<FavoriteBorderIcon onClick={userLike} style={{cursor:'pointer'}}></FavoriteBorderIcon>
          :<FavoriteIcon onClick={userLike} style={{cursor:'pointer'}}></FavoriteIcon>
        }
            </ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Email</div>{user.email}</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Native Language</div>{
          langc
          ?<>
          {
            langc.map((a,i)=>{
              return <span key={i}>
                  {larr[a-1]}
                  <img src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}
                  style={{margin:'5px'}}></img>
              </span>
            })
          }
          </>        
          :null
        }</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Second Language</div>{
          langb
          ?<span>
          {
            langb.map((a,i)=>{
              return <span key={i}>
                
                      {larr[a-1]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Study Language</div>{
          langa
          ?<span>
          {
            langa.map((a,i)=>{
              return <span key={i}>
                
           {larr[a-1]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Sex</div>{user.gender === 1
              ? <>Woman</>
              : <>Man</>
            }</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Age</div>{user.age}</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Description</div>{user.description}</ListGroup.Item>
          </ListGroup>
            </>
            :null
          }
          <Button onClick={() => {
                router.push('/main') 
              }} style={{margin:'5px'}}
              className="btncs" variant="outline-secondary">뒤로가기</Button>
            
         
          </Col>
          <Col></Col>

        </Row>
      </Container>
 

      <style jsx>{`
        
        .logdiv {
          width:300px;
          margin-top:50px;
        }
        .link {
          color: black;
          text-decoration-line: none;
        }

      `}</style>
    </>
  )
}