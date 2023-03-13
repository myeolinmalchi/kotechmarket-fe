import React, { useState } from 'react';

type UserLoginContextType = {
  userType: 0 | 1 | 2; // 0: 비회원, 1: 일반회원, 2: 수요회원
  checkLogin: () => void;
  //login: (id: string, pw: string) => void;
};

export const UserLoginContext = React.createContext<UserLoginContextType>(
  {} as UserLoginContextType
);

const UserLoginProvider = ({ children }: React.PropsWithChildren) => {
  const [userType, setUserType] = useState<0 | 1 | 2>(0);

  // 만료시 true, 유효할시 false 반환
  const checkTokenExpired = React.useCallback((token: string) => {
    // TODO 토큰 유효기간 만료 여부 체크 로직
    return true;
  }, []);

  const checkUserType = React.useCallback((token: string): 1 | 2 => {
    // TODO 페이로드에서 유저 종류 확인 후 반환
    return 1;
  }, []);

  const checkLogin = React.useCallback(() => {
    const accessToken = localStorage.getItem('AccessToken');
    const refreshToken = localStorage.getItem('RefreshToken');
    if (accessToken && refreshToken) {
      if (checkTokenExpired(accessToken)) {
        if (checkTokenExpired(refreshToken)) {
          // TODO RT가 만료된 경우
        } else {
          // TODO RT가 만료되지 않은 경우
          // 서버에 요청을 보내 AT를 재발급 받는다.
          // 401 받으면 로그인 정보 리셋
          const newAccessToken = '';
          const userType = checkUserType(newAccessToken);
          setUserType(userType);
        }
      }
    }
  }, [userType]);

  const value = React.useMemo(() => ({ userType, checkLogin }), [userType]);

  return (
    <UserLoginContext.Provider value={value}>
      {children}
    </UserLoginContext.Provider>
  );
};

export default UserLoginProvider;
