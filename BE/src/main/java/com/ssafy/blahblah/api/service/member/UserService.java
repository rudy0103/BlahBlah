package com.ssafy.blahblah.api.service.member;


import com.ssafy.blahblah.api.request.member.UserInfoPostReq;
import com.ssafy.blahblah.db.entity.User;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserInfoPostReq userRegisterInfo);
	User getUserByEmail(String userId);
	List<User> getUserTable();
}
