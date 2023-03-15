/** 일반 회원가입 */
type JoinRequestDTO = {
    email: string; // 이메일
    password: string; // 비밀번호
    phoneNumber: string; // 휴대전화번호
    isAgreedForReceivingMessage: boolean; // 이메일/SMS 수신 동의 여부
    isAgreedForReceivingNewsletter: boolean; // 뉴스레터 발송 동의 여부
    name: string; // 이름
};

/** 기관 회원가입 */
type OrganizationJoinRequestDTO = Omit<
    JoinRequestDTO & {
        nameOfThePersonInCharge: string; // 담당자 이름
        extOrganizationId: number; // 소속 id
        businessRegistrationInBase64: string; // 사업자등록증 이미지(base64 인코딩)
        orgContact: string; // 기관전화번호
    },
    'name'
>;

/** 기관 회원가입시 소속 목록 */
type Organization = {
    extOrganizationId: number; // 소속 id
    name: string; // 소속 이름
    isRegistered: boolean; // 소속 계정 등록 여부
};

export { JoinRequestDTO, OrganizationJoinRequestDTO, Organization };
