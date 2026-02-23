// Auto-generated from docs/specs/*.json
window.ALL_SPECS = {
  "0048": {
    "screen_id": "0048",
    "screen_name": "업체(부서)정보",
    "action": "정보입력",
    "persona": {
      "corp_biz": true,
      "personal_biz": false
    },
    "input": {
      "fields": [
        "업체(부서)명",
        "영문업체명",
        "전화번호(3필드)",
        "우편번호",
        "주소(기본/상세)"
      ],
      "note": "모든 항목 필수 입력"
    },
    "backend": {
      "system": "회원",
      "txn": "업체/부서 정보 저장",
      "purpose": "기업카드 발급 시 필요한 업체/부서 정보 수집"
    },
    "ui_nature": [
      "입력형 화면",
      "좌 라벨/우 입력 필드 구조(Grid 2col)",
      "전화번호 3분할 입력 방식"
    ],
    "entry_condition": [
      "대표자_사업자정보(0047) 완료 후 진입"
    ],
    "control_rules": [
      "모든 입력값 필수",
      "영문업체명은 특수문자 6종만 허용(-,.,&,/,)",
      "전화번호 형식 검증 필요(실서비스)",
      "주소검색은 목업 버튼이며 실제 연계 필요"
    ],
    "audit_log_points": [
      "화면 진입 시점",
      "입력값 검증 실패 로그",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "0047 샘플의 요구사항 모달 구조를 그대로 적용",
      "입력값은 실서비스에서는 회원원장/이전세션과 병합될 수 있음",
      "location.hash 이동은 목업용"
    ]
  },
  "0009": {
    "screen_id": "META.id",
    "screen_name": "META.name",
    "purpose": "상품/회원 약관 및 필수 동의사항 동의 수집 후 다음 단계 진행",
    "business_rule_source": "화면기능목록 ID:0009 (신용카드 상품 약관동의)",
    "action": "고객동의",
    "input": "동의여부",
    "host_processing": "N(동의 수집 자체는 UI/플랫폼 처리, 필요 시 동의 증적 저장/전문 호출은 별도)",
    "rules": [
      "필수 약관/동의 미동의 시 다음 단계 진행 불가",
      "화면에 '소기업' 등 공공 마이데이터 동의 항목 반드시 포함",
      "공공 마이데이터 동의 정보는 당사 회원 탈회 시까지 유효(정책 기준)",
      "전체동의 제공(필수/전체 범위는 정책에 맞게 확정 필요)",
      "동의 증적(버전/일시/채널/고객키) 저장 및 재현 가능성 확보 권장"
    ],
    "required_agreements": "requiredKeys()",
    "flow": {
      "prev": "META.prevTarget",
      "next": "META.nextTarget"
    },
    "qa_points": [
      "필수 동의 누락 시 Next disabled + 클릭 방어",
      "전체동의 on/off 시 개별 체크 상태/카운트 일관성",
      "그룹(아코디언) 펼침/접힘 상태에서 체크 동기화",
      "자세히보기(전문) 이동/닫기 UX(모바일 포함)",
      "공공 마이데이터 동의 항목 노출 및 문구(유효기간) 확인"
    ],
    "data_spec": {
      "state_shape": "{ [agreeKey]: boolean }",
      "note": "실서비스는 약관 목록/필수여부/전문URL/버전정보를 서버에서 내려받는 구조 권장"
    }
  },
  "0025": {
    "screen_id": "0025",
    "screen_name": "발급 확인 및 약관수령",
    "action": "약관 수령 방법 선택",
    "ui_nature": [
      "폼 입력 화면(부분)",
      "수령방법(이메일/문자) 선택 + 입력 검증"
    ],
    "entry_condition": [
      "이전 단계(예: 신청매수/기본정보) 완료 후 진입",
      "약관 수령/확인 단계에서 수령방법 선택 필요"
    ],
    "control_rules": [
      "수령방법은 필수(*)이며 미선택/미입력 시 다음 진행 불가",
      "이메일 선택 시: 아이디 + 도메인 필수, 도메인 프리셋 선택 가능",
      "문자메시지 선택 시: 휴대폰 번호 필요(실서비스는 회원정보 자동 세팅 가능)"
    ],
    "backend": {
      "domain": "약관/회원",
      "txn": "약관수령방법 저장(가정)",
      "purpose": "약관 수령 채널 확정 및 발급 확인 단계 진행"
    },
    "audit_log_points": [
      "수령방법 선택값(email/sms)",
      "입력된 이메일/휴대폰(마스킹 저장 권장)",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "이미지 기준 UI: 좌측 라벨/우측 입력 형태(그리드)로 구현",
      "수령방법 더 보기: 토글 패널(목업)로 구현",
      "실제 라우팅은 location.hash 기반 목업이며, 추후 업무흐름 확정 후 변경"
    ]
  },
  "0072": {
    "screen_id": "0072",
    "screen_name": "약관동의(개사자_체크)",
    "channel": "mobile web (개인사업자_체크)",
    "targets": "개인사업자(체크)",
    "action": "고객동의",
    "processing_core_call": false,
    "processing_domain": "N/A",
    "processing_purpose": "체크 상품 및 회원 약관 동의 수집",
    "purpose": "체크 상품 및 회원 약관 동의",
    "fields": [
      {
        "key": "동의여부",
        "required": true,
        "type": "checkbox(list)",
        "note": "필수 항목 전체 동의 필요"
      }
    ],
    "control_rules": [
      "필수 약관 미동의 시 다음 단계 진행 불가",
      "각 항목의 상세보기 제공(>)",
      "그룹(대표자/개별카드 이용자) 접힘/펼침 제공"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "N/A",
      "notes": "실서비스에서는 동의 이력 저장/전문 호출 여부 확인 필요"
    },
    "audit_log_points": [
      "동의 항목별 선택/해제 이벤트",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "스크린샷 UI 반영: 체크 아이콘 + 항목명 + 우측 화살표, 그룹 접힘/펼침, 하단 다음 버튼",
      "필수 동의 정책은 실제 약관 목록/구성에 맞춰 required 플래그 기반으로 제어 권장"
    ]
  },
  "0064": {
    "screen_id": "0064",
    "screen_name": "카드정보수정하기(개사자전용)",
    "channel": "mobile web (개인사업자)",
    "action": "정보확인",
    "purpose": "카드신청 처리에 필요한 정보 재확인 또는 수정 기능 제공",
    "fields": [
      {
        "key": "카드종류(상품명)",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "카드디자인명(자재)",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "신청유형",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "발급확인 및 약관수령 방법",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "브랜드",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "결제계좌",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "결제일",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "신청매수",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "카드수령지",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "사업자 등록번호",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "업체명/업체영문명",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "사업장주소/사업장전화",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "대표자 자택주소",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "대표자 휴대폰",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "대표자 영문성명",
        "required": false,
        "type": "display(요약)"
      },
      {
        "key": "대표자 이메일",
        "required": false,
        "type": "display(요약)"
      }
    ],
    "control_rules": [
      "본 화면은 확인용 요약 화면이며, 수정은 ‘수정하기’ 버튼으로 이전 입력 화면(0063)에서 수행(목업 가정)",
      "요약 값은 이전 세션/회원원장/플랫폼 저장값을 집계하여 표시(목업)",
      "‘다음’ 클릭 시 신청완료(0065)로 진행(목업)"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "신청 정보 최종 확인/확정(가정)",
      "purpose": "오입력 방지 및 고객 확인 이력 확보"
    },
    "audit_log_points": [
      "요약 화면 진입 시각",
      "수정하기 버튼 클릭 여부/시각",
      "다음 버튼 클릭 여부/시각"
    ],
    "notes": [
      "제공 이미지(0064) 기준: 상단 ‘신청내역확인’ + 단계 아이콘(마지막 4 강조) + 하단 ‘수정하기/다음’ 2버튼 구성 반영",
      "카드 정보 요약과 사업자/대표자 정보 요약을 한 화면에 스크롤로 구성"
    ]
  },
  "0033": {
    "screen_id": "META.id",
    "screen_name": "META.name",
    "purpose": "추가 서류 제출(필수/선택 파일 업로드) 후 다음 단계 진행",
    "business_rule_source": "화면기능목록 ID:0033 (추가서류제출)",
    "rules": [
      "업로드 파일 형식은 PDF, 이미지(jpg, jpeg, png) 허용",
      "필수 항목: 사업자등록증, 법인등기부, 주주명부 및 정관, 신청인 신분증",
      "선택 항목: 표준재무제표증명, 부가세과세표준증명원, 기타(2개)",
      "필수 미제출 또는 확장자 오류 시 다음 진행 불가",
      "수정하기 버튼 클릭 시 '명세서 받으실 곳(ID:0020)'으로 이동"
    ],
    "required_docs": "DOCS.filter(d => d.required).map(d => d.name)",
    "optional_docs": "DOCS.filter(d => !d.required).map(d => d.name)",
    "next": "${META.nextTarget}(목업) - 실제 플로우에 맞게 교체",
    "qa_points": [
      "각 행 '찾아보기' 버튼이 해당 file input을 정상 트리거하는지",
      "허용 확장자 외 업로드 시 invalid 표시 + 토스트 안내",
      "필수 미충족 시 Next 비활성 + Next 클릭 방어",
      "모바일 레이아웃(3열 → 1열) 전환 시 UI 깨짐 여부",
      "파일 재선택/취소 시 state/표시값/Next 활성화 일관성"
    ],
    "data_spec": {
      "accept": "ACCEPT",
      "allowed_ext": "Array.from(ALLOWED_EXT)",
      "state_shape": "{ [key]: { file: File|null, valid: boolean } }"
    }
  },
  "0044": {
    "screen_id": "0044",
    "screen_name": "개별카드 동의 조회(추가전용)",
    "purpose": "개별카드 고객의 동의서 작성 상태 조회",
    "ui_rules": [
      "부서명 선택 후 조회",
      "최근 3일간 접수건 조회",
      "동의서 작성 재요청 기능 포함"
    ]
  },
  "0013": {
    "screen_id": "0013",
    "screen_name": "신청인 CDD 조건부 검증(신설필요)",
    "action": "정보입력",
    "input_value_shape": [
      "고객식별 Key: 주민번호(원장/세션 기반)",
      "신청인 영문명(텍스트)",
      "자택주소(우편번호 + 기본주소 + 상세주소)",
      "신분증 종류(라디오) + 신분증 정보(발급일자 등)",
      "직업(선택형)",
      "직업 구분 상세(선택형)",
      "거래목적(선택형)",
      "거래자금 원천(선택형)"
    ],
    "control_rules": [
      "원장 정보가 있는 경우 조회하여 출력(가능하면 Disable)",
      "모든 필수값은 Null로 진행 불가",
      "미입력 시 'ㅇㅇㅇ 값을 선택해 주세요' 형태로 에러 처리",
      "본 화면은 0012 본인인증 시점의 CDD 대상 여부 판단 결과에 따라 조건부 진입"
    ],
    "backend": {
      "domain": "고객",
      "txn": "고객 확인 의무 대상 판단/등록(가정)",
      "purpose": "CDD 필수 정보 수집 및 고객확인의무 이행"
    },
    "audit_log_points": [
      "CDD 입력 필수 항목(주소/직업/업종/거래목적/자금원천)",
      "신분증 종류 선택값",
      "다음 클릭 시점"
    ],
    "notes": [
      "스크린샷 기반: 상단 안내 박스 + '본인확인' 섹션 테이블형 입력",
      "주소검색은 목업(샘플값 주입)이며 실제는 주소검색 API/팝업 연동 필요",
      "다음 라우팅은 #/0014(대표자 정보)로 가정"
    ]
  },
  "0005": {
    "screen_id": "0005",
    "screen_name": "제출서류",
    "title": "제출서류",
    "segment": {
      "corp": true,
      "sole_prop": false
    },
    "action_type": "SIMPLE_GUIDE",
    "input_spec": "N (단순안내)",
    "purpose": "카드 신청 진행 전 제출 서류(최근 3개월 이내 발급분) 목록을 고객에게 안내",
    "business_rule_source": "화면기능목록 ID:0005 (제출서류)",
    "rules": [
      "제출서류는 '최종 3개월 이내 발급분' 기준으로 안내",
      "법인인감증명서는 대표자 휴대폰인증 시 생략 가능",
      "법인등록번호가 없는 법인(예: 비영리법인) 또는 임의단체는 대표자 개인인감증명서 제출",
      "다음 단계(0006)는 외부 KoDATA 기반 '서류자동제출서비스' 동의/이동 화면(연계 화면)"
    ],
    "docs": [
      "사업자등록증 사본 또는 사업자등록증명원",
      "법인인감증명서 (대표자 휴대폰인증 시 생략 가능)",
      "법인등기사항전부증명서",
      "표준재무제표증명",
      "부가세과세표준증명원",
      "주주명부 및 (정관)"
    ],
    "navigation": {
      "prev": "0004",
      "next": "0006"
    },
    "qa_points": [
      "목록 문구가 기준 문서/이미지와 정확히 일치하는지(띄어쓰기/괄호 포함)",
      "‘최종 3개월 이내 발급분’ 강조 표기(색/배지) 가독성",
      "예외 문구(법인등록번호 없는 법인/임의단체) 누락 여부",
      "모바일에서 패널/텍스트 줄바꿈이 깨지지 않는지"
    ],
    "data_spec": {
      "ssot_meta": "META",
      "docs_shape": "Array"
    }
  },
  "0052": {
    "screen_id": "0052",
    "screen_name": "카드 신청정보",
    "action": "정보조회(확인)",
    "persona": {
      "corp_biz": true,
      "personal_biz": false
    },
    "input": {
      "fields": [],
      "note": "입력 없음, 모든 값은 조회 표시용"
    },
    "backend": {
      "system": "회원",
      "txn": "카드신청정보 조회",
      "purpose": "고객이 신청한 카드 정보 최종 확인"
    },
    "ui_nature": [
      "조회형 화면",
      "최종 카드 신청정보 확인 테이블",
      "버튼 2개: 발급상황조회, 확인"
    ],
    "entry_condition": [
      "카드 발급 흐름 상 모든 입력 완료 후",
      "회원원장 또는 이전 세션에서 신청 정보 조회 가능"
    ],
    "control_rules": [
      "조회 전용 (수정 불가)",
      "필드값 누락 시 '정보 없음' 또는 정책 필요"
    ],
    "audit_log_points": [
      "화면 진입 시점",
      "버튼 클릭 시점(발급상황조회 / 확인)"
    ],
    "notes": [
      "0047 샘플의 요구사항 모달 구조를 완전히 준수함",
      "location.hash() 네비게이션은 목업",
      "UI 표는 이미지 기반으로 동일한 형태로 구성됨"
    ]
  },
  "0029": {
    "screen_id": "META.id",
    "screen_name": "META.name",
    "purpose": "이전 세션에서 입력/선택한 카드 관련 정보를 요약하여 고객에게 확인시키는 화면",
    "business_rule_source": "화면기능목록 ID:0029 (카드정보(확인용))",
    "target": {
      "corp": true,
      "sole": false
    },
    "action": "정보조회",
    "processing": {
      "integration": false,
      "domain": "-",
      "source": "이전 세션 결과(클라이언트 상태/서버 세션/플랫폼 DB)",
      "description": "값 변경 없음. 읽기 전용 확인 화면"
    },
    "fields": "ROWS.map(x => x.label)",
    "rules": [
      "본 화면은 읽기 전용(수정 불가)으로 제공한다.",
      "‘수정하기’ 클릭 시 카드 관련 최초 입력 화면(ID:0021)으로 이동한다.",
      "표시 값은 직전 단계/세션에서 최종 저장된 값과 반드시 일치해야 한다.",
      "계좌/연락처 등 민감 정보는 정책에 따라 마스킹하여 노출한다."
    ],
    "qa_points": [
      "값 누락/포맷 오류(예: 결제일 01/11/21일 범위 검사)는 이전 단계에서 이미 검증되어야 함",
      "디자인명/브랜드/신청매수 등 공용/개별 시나리오 차이 표시 확인",
      "마스킹 규칙(계좌번호/연락처) 일관성",
      "다음 단계(0030) 이동 후 뒤로가기 시 상태 보존 여부"
    ],
    "next": {
      "success": "0030 (사업자정보(확인용))"
    }
  },
  "0068": {
    "screen_id": "0068",
    "screen_name": "신분증정보 입력(개사 체크)",
    "channel": "mobile web (개인사업자)",
    "action": "본인인증",
    "input": "신분증 정보(주민등록증/운전면허증) + 기본정보(성명/주민번호)",
    "purpose": "신분증 진위확인(심사) 진행을 위한 신분증 유형 선택 및 직접 입력값 수집",
    "fields": [
      {
        "key": "대표자 성명",
        "required": true,
        "type": "text"
      },
      {
        "key": "주민등록번호",
        "required": true,
        "type": "digits(13)",
        "note": "’-’ 제외"
      },
      {
        "key": "신분증 종류",
        "required": true,
        "type": "tab(주민등록증/운전면허증)"
      },
      {
        "key": "지역(운전면허)",
        "required": "운전면허 선택 시",
        "type": "select"
      },
      {
        "key": "면허증 앞 8자리",
        "required": "운전면허 선택 시",
        "type": "digits(8)"
      },
      {
        "key": "일련번호 6자리",
        "required": "운전면허 선택 시",
        "type": "alnum(6, 대문자)"
      }
    ],
    "control_rules": [
      "대표자 성명/주민등록번호는 필수",
      "운전면허증 선택 시 지역/앞8자리/일련번호 6자리 모두 필수",
      "주민번호는 숫자만(’-’ 제거), 운전면허 앞8은 숫자만, 일련번호는 영숫자 6자리로 제한(목업에서 자동 정리)"
    ],
    "backend": {
      "domain": "심사",
      "txn": "신분증 진위확인(가정)",
      "purpose": "신분증 진위확인 입력값 수집 및 다음 단계(확인/접수) 진행"
    },
    "audit_log_points": [
      "신분증 종류 선택값(RRN/DL)",
      "대표자 성명/주민번호 입력(마스킹 저장 권장)",
      "운전면허 입력값(지역/앞8/일련번호) 및 다음 클릭 시각"
    ],
    "notes": [
      "제공 이미지(0068) 기준: 상단 ‘카드신청’ + 진행도(1~5) + ‘정보입력’ + ‘신분증 정보’ 탭(주민등록증/운전면허증) 구조 반영",
      "운전면허 탭에서만 ‘지역/면허증 앞 8자리/일련번호 6자리’ 입력 필드 노출",
      "라우팅은 location.hash 목업이며 실제 플로우 확정 후 수정"
    ]
  },
  "0069": {
    "screen_id": "0069",
    "screen_name": "본인확인(개사_체크)",
    "channel": "mobile web (개인사업자_체크)",
    "targets": "개인사업자(체크)",
    "action": "정보입력",
    "processing_core_call": false,
    "processing_domain": "N/A",
    "processing_purpose": "본인확인 기본정보 입력",
    "purpose": "대표자 기본정보 확인 및 사업자등록번호 입력, 추천인(선택) 수집",
    "fields": [
      {
        "key": "대표자성명",
        "required": true,
        "type": "readonly(prefilled)",
        "note": "이전세션 값"
      },
      {
        "key": "주민등록번호",
        "required": true,
        "type": "readonly(prefilled)",
        "note": "이전세션 값(마스킹/보안 고려)"
      },
      {
        "key": "휴대폰번호",
        "required": true,
        "type": "readonly(prefilled)",
        "note": "이전세션 값"
      },
      {
        "key": "사업자등록번호",
        "required": true,
        "type": "digits(10)",
        "note": "’-’ 제외"
      },
      {
        "key": "추천인",
        "required": false,
        "type": "text",
        "note": "추천직원번호"
      }
    ],
    "control_rules": [
      "사업자등록번호 필수(’-’ 제외 10자리 숫자)",
      "추천인은 선택 입력",
      "다음 버튼 클릭 시 다음 화면으로 이동(목업 라우팅)"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "N/A",
      "notes": "실서비스에서는 세션/신청키 기반으로 다음 단계와 연계"
    },
    "audit_log_points": [
      "사업자등록번호 입력 완료 여부",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "스크린샷 구성 반영: 본인확인/단계(1~5), 정보입력 테이블, 사업자번호 강조, 유의사항 아코디언, 하단 다음 버튼",
      "이미지 제공 시 IMG_MAP에 img_0069_hero 경로만 추가하면 자동 적용"
    ]
  },
  "0053": {
    "screen_id": "0053",
    "screen_name": "유의 및 준비사항(개사자_신용)",
    "channel": "mobile web (개인사업자)",
    "action": "단순안내",
    "persona": {
      "corp_biz": false,
      "personal_biz": true
    },
    "purpose": "개인사업자(신용) 카드신청 전 준비사항/유의사항 고지",
    "ui_nature": [
      "풀페이지(모바일) 안내 화면",
      "준비사항(신규/추가) 카드 2개 + 공통 경고 1회 + 유의사항 아코디언"
    ],
    "control_rules": [
      "중복 문구(외국인/공동대표 제한)는 공통 경고로 1회만 표시",
      "확인 버튼으로 다음 단계 진입(목업: 0054)",
      "취소 버튼으로 이전 단계 이동(목업)"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "없음(안내 화면)",
      "purpose": "신청 전 필수 고지 및 사용자 확인"
    },
    "audit_log_points": [
      "확인 버튼 클릭 시점",
      "유의사항 펼침 여부(선택)"
    ],
    "notes": [
      "요청사항: 0053을 하나의 화면으로 구성(중복 항목 제거)",
      "디자인: 제공 이미지의 카드/아코디언/하단 버튼 구조 반영",
      "라우팅은 location.hash 목업이며 실제 흐름 확정 후 수정"
    ]
  },
  "0004": {
    "screen_id": "META.id",
    "screen_name": "META.name",
    "title": "META.title",
    "segment": {
      "corp": true,
      "sole_prop": false
    },
    "action_type": "INFO",
    "inputs": [],
    "calls": [],
    "purpose": "고객에게 진행 전 준비사항을 단순 안내한다",
    "ui_contents": "PREP_ITEMS",
    "navigation": {
      "prev": "0002 또는 0003(시나리오에 따라 상이) - 현재 목업은 0003",
      "next": "${META.nextTarget}(목업) - 실제 플로우에 맞게 교체"
    },
    "notes": [
      "화면기능목록 ID:0004는 '단순안내'로 정의됨(처리계 거래 없음).",
      "0004는 신규/추가 공용 화면이므로 이전 화면(Prev)은 시나리오에 따라 달라질 수 있음."
    ],
    "qa_points": [
      "스크린샷과 동일한 제목/문구/불릿(-) 스타일인지",
      "PC/모바일에서 카드 박스 여백/줄바꿈이 자연스러운지",
      "이전/다음 버튼 노출 정책이 확정되면 라벨/유무 조정",
      "접근성: 목록이 읽기 순서대로 낭독되는지"
    ],
    "data_spec": {
      "ssot_meta": "META",
      "page_type": "info_page",
      "items": "PREP_ITEMS"
    },
    "business_rule_source": "화면기능목록 ID:0004 (준비사항)"
  },
  "0012": {
    "screen_id": "0012",
    "screen_name": "신청인 본인인증",
    "action": "고객인증",
    "input_shape": [
      "인증방법 선택(휴대폰/공동인증서/카드인증)",
      "휴대폰 선택 시: 필수 약관 동의 + 통신사 선택 + 인증번호 전송",
      "공동인증서 선택 시: 인증서 파일 선택 후 인증(목업)",
      "카드인증 선택 시: 카드번호/유효기간/CVV 입력 후 인증(목업)"
    ],
    "backend": {
      "domain": "고객",
      "txn": "본인인증 거래수행",
      "purpose": "신청인(대표자/대리인) 본인확인 및 CDD 대상 여부 판단 트리거"
    },
    "control_rules": [
      "인증방법은 3가지 중 택1",
      "휴대폰 인증은 '휴대폰 본인인증 동의(필수)' 동의 없으면 진행 불가",
      "인증 성공 후 다음 단계 진행 가능",
      "이 거래 시점에서 CDD 대상 여부를 고객IT로 전문 조회(요건) → 결과에 따라 0013(CDD 조건부 검증) 수행"
    ],
    "audit_log_points": [
      "선택된 인증방법",
      "휴대폰 약관 동의 여부(필수 항목별)",
      "통신사 선택값",
      "인증 시도/성공/실패 결과",
      "CDD 대상 조회 결과(Y/N)"
    ],
    "notes": [
      "스크린샷 기반 레이아웃: 상단 인증방법 라디오 + 휴대폰 동의 박스 + 통신사/인증번호 전송",
      "‘자세히보기’와 ‘가상키보드 안내’는 목업 토스트로 구현",
      "실서비스에서는 KB국민카드(개인카드)만 카드인증 가능, 기업카드 인증 불가 요건 반영"
    ]
  },
  "0045": {
    "screen_id": "0045",
    "screen_name": "기본정보",
    "layout": "Flexible Modal (Internal Scroll)",
    "purpose": "기업 기본정보 원장 조회 및 필수 연락처 정보 수정",
    "rules": [
      "상단 헤더에 '기본정보' 타이틀과 '0045' 화면 ID를 명시적으로 노출함",
      "모달 크기는 980px이며, 브라우저 높이에 따라 내부 스크롤이 자동 생성됨",
      "원장 정보(업체명, 결제정보 등)는 수정 불가능하도록 disabled 처리함",
      "영문업체명은 특정 특수문자(.-&/ ) 6종만 허용하도록 가이드 문구를 제공함",
      "전화번호는 지역번호/국번/번호로 분할하여 입력을 받음",
      "주소검색 시 우편번호와 기본주소가 자동 입력되는 프로세스를 지원함"
    ],
    "audit_point": "영문업체명 및 상세주소 입력값의 무결성 검증 필수"
  },
  "0032": {
    "screen_id": "0032",
    "screen_name": "법인인증",
    "purpose": "법인 대표자 본인 확인을 휴대폰 또는 법인 인감증명서를 통해 검증한다.",
    "trigger": "대표자 및 사업자 정보 입력이 완료된 단계 후 본인확인이 필요할 때",
    "next_step": "휴대폰 인증번호 입력 화면 또는 인감증명서 업로드 화면",
    "backend": {
      "phone_auth": "통신사 PASS 본인확인 API 연동",
      "corp_doc": "법인 인감증명서 파일 업로드 처리"
    },
    "ui_elements": [
      "인증방법 선택 (휴대폰 / 법인 인감증명서)",
      "대표자 성명 readonly 표시",
      "이동통신사 선택",
      "휴대폰번호 3구간 입력",
      "필수 약관 4종 + 전체동의",
      "인증번호 전송 버튼"
    ],
    "validations": [
      "휴대폰번호 자리수 검증",
      "필수 약관 미동의 시 전송불가",
      "인증번호 전송 시 중복 클릭 방지",
      "인감증명서 선택 시 파일형식/용량 검증"
    ],
    "qa_checklist": [
      "모바일 PASS 인증 중 예외 상황 처리",
      "약관 상세보기 팝업 정상열림",
      "전체동의 ON/OFF 동작 정상여부",
      "이동통신사별 인증 실패 시 메시지 노출"
    ]
  },
  "0065": {
    "screen_id": "0065",
    "screen_name": "카드신청완료(개사자전용)",
    "channel": "mobile web (개인사업자)",
    "targets": "개인사업자",
    "action": "정보조회",
    "processing_core_call": false,
    "processing_domain": "N/A",
    "processing_purpose": "카드신청결과 안내",
    "purpose": "카드 신청 접수 결과(정상 접수)를 고객에게 안내",
    "fields": [
      {
        "key": "상품명",
        "required": false,
        "type": "text(display)",
        "note": "예: MyBiz 사장님든든 기업카드"
      },
      {
        "key": "고객명",
        "required": false,
        "type": "text(display)",
        "note": "예: 고객님"
      },
      {
        "key": "카드이미지",
        "required": false,
        "type": "image(display)",
        "note": "img_0065_card"
      },
      {
        "key": "안내문구",
        "required": false,
        "type": "text(display)",
        "note": "정상 접수 안내"
      }
    ],
    "control_rules": [
      "확인 버튼 클릭 시 종료/홈 이동(정책에 따라 앱딥링크/웹 라우팅)",
      "표시 데이터는 이전 세션/플랫폼 저장값 기반(목업)"
    ],
    "backend": {
      "domain": "N/A",
      "txn": "N/A",
      "notes": "처리계 호출 없이 결과 화면 표시"
    },
    "audit_log_points": [
      "확인 버튼 클릭 시점",
      "완료 화면 노출 이벤트(선택)"
    ],
    "notes": [
      "스크린샷 구조 반영: 상단 타이틀/닫기, 중앙 카드 이미지, 안내문구, 하단 노란 확인 버튼",
      "이미지 제공 시 IMG_MAP에 img_0065_card 경로만 추가하면 자동 적용"
    ]
  },
  "0073": {
    "screen_id": "0073",
    "screen_name": "신청정보_수정하기(개사자_체크)",
    "channel": "mobile web (개인사업자_체크)",
    "targets": "개인사업자(체크)",
    "action": "정보확인/수정",
    "purpose": "신청정보를 보여주고 수정 기능 제공",
    "fields": [
      {
        "key": "신청정보",
        "required": true,
        "type": "display + editable(partial)",
        "note": "카드정보/업체/대표자 정보"
      }
    ],
    "control_rules": [
      "수정하기 버튼으로 편집 모드 전환",
      "저장 시 필수값 체크 (빈 값 저장 불가)",
      "저장 후 다음 진행 가능(수정 중 진행 차단)",
      "민감정보는 마스킹 표시 권장(계좌/연락처 등)"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "N/A",
      "notes": "실서비스는 수정 저장 시 플랫폼 DB/처리계 연동 여부 확인 필요"
    },
    "audit_log_points": [
      "수정 모드 진입/저장 이벤트",
      "다음 버튼 클릭 시점"
    ]
  },
  "0024": {
    "screen_id": "0024",
    "screen_name": "신청매수",
    "applies_to": {
      "법인사업자": "Y",
      "개인사업자": "N"
    },
    "channel": [
      "법사자 PC웹"
    ],
    "action": "정보입력",
    "input_schema": [
      {
        "field": "공용카드 신청매수",
        "type": "select",
        "required": true,
        "note": "[확인 필요] 최대 매수/옵션 범위(기존과 동일)"
      }
    ],
    "backend": {
      "domain": "N",
      "txn": "N",
      "purpose": "-"
    },
    "rules": [
      "공용카드 신청매수는 필수",
      "개별카드는 신청매수 항목 없음(기능목록 0024)"
    ],
    "flow": [
      "신청매수 선택 → 다음 단계로 진행"
    ],
    "notes": [
      "이미지에 '1매'만 노출되어 있어 샘플 옵션은 1매만 구현",
      "최대 매수/옵션 범위 값이 제공되면 select 옵션을 확장 필요"
    ]
  },
  "0049": {
    "screen_id": "0049",
    "screen_name": "기본정보2",
    "action": "정보조회",
    "persona": {
      "corp_biz": true,
      "personal_biz": false
    },
    "input": {
      "fields": [],
      "note": "입력 없음(조회 전용)"
    },
    "backend": {
      "system": "회원",
      "txn": "업체/부서 정보 조회",
      "purpose": "前 화면(0048)에서 입력된 정보 확인"
    },
    "ui_nature": [
      "조회 화면",
      "좌 라벨 / 우 값 형태",
      "정보 재확인 목적"
    ],
    "entry_condition": [
      "0048 업체(부서)정보 입력 완료"
    ],
    "control_rules": [
      "수정 기능 없음",
      "조회값 없을 시 안내 필요(실서비스 정책)"
    ],
    "audit_log_points": [
      "조회 성공 여부",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "0047 샘플의 요구사항 모달 구조 그대로 적용됨",
      "실서비스에서는 회원원장 또는 이전 세션에서 조회됨",
      "location.hash 이동은 목업용"
    ]
  },
  "0042": {
    "screen_id": "0042",
    "screen_name": "법인 EDD정보",
    "action": "정보입력",
    "ui_nature": [
      "선택형 폼 입력(EDD 필수값)",
      "2개 필수 Select UI"
    ],
    "entry_condition": [
      "대표자/법인정보 입력 완료 후 진입"
    ],
    "control_rules": [
      "거래목적 필수",
      "거래자금의 원천 필수",
      "누락 시 다음 단계 진행 불가"
    ],
    "backend": {
      "domain": "고객",
      "txn": "EDD 정보 저장",
      "purpose": "고객확인(CDD/EDD) 준수 및 발급 심사 정보 확보"
    },
    "audit_log_points": [
      "선택된 거래목적",
      "선택된 자금 원천",
      "다음 버튼 클릭"
    ],
    "notes": [
      "모든 값은 선택형 메뉴(텍스트 입력 없음)",
      "실제 코드는 처리계/기초 DB 연동 필요"
    ]
  },
  "0015": {
    "screen_id": "0015",
    "screen_name": "사업자 정보",
    "applies_to": {
      "corp": "Y",
      "personal": "N"
    },
    "action": "정보입력",
    "input_value_shape": [
      {
        "key": "biz_no",
        "label": "사업자번호",
        "required": true,
        "source": "전세션(0001)에서 가져옴",
        "editable": false
      },
      {
        "key": "company_name_ko",
        "label": "업체명",
        "required": true
      },
      {
        "key": "company_name_en",
        "label": "영문업체명",
        "required": true,
        "rule": "특수문자 제한(.,-&/)"
      },
      {
        "key": "tel",
        "label": "전화번호(지역/국번/번호)",
        "required": true
      },
      {
        "key": "address",
        "label": "주소(우편번호/기본주소/상세주소)",
        "required": true,
        "rule": "주소검색 연동"
      },
      {
        "key": "founded_date",
        "label": "설립일(YYYYMMDD)",
        "required": true
      }
    ],
    "backend": {
      "system": "회원(처리계)",
      "purpose": "사업자 정보 조회/등록(또는 변경)",
      "read": "회원원장에 사업자 정보가 있는 경우 조회하여 기본 세팅",
      "write": "입력/변경된 사업자 정보를 회원원장에 반영(정책에 따라)"
    },
    "entry_condition": [
      "이전 단계(0014 대표자 정보) 완료 후 진입",
      "사업자번호는 전세션(0001) 입력값을 보유한 상태"
    ],
    "ui_nature": [
      "사업자 기본정보 입력 화면",
      "필수 항목 입력 + 주소검색(외부/플랫폼) 연동 가능"
    ],
    "control_rules": [
      "사업자번호는 전세션에서 가져오며 수정 불가(Disabled/ReadOnly) 처리한다.",
      "회원원장에 기존 값이 존재하면 화면에 기본 세팅한다.",
      "업체명/영문업체명/전화번호/주소/설립일은 필수(*)이며 미입력 시 다음 진행 불가",
      "영문업체명은 영문 대문자 기준 입력(자동 변환 가능), 특수문자는 (.,-&/)만 허용(문구 기준)",
      "전화번호는 숫자만 입력, 세그먼트(예: 032-000-8101)로 입력",
      "주소는 우편번호+기본주소+상세주소로 구성되며, 주소검색 버튼으로 기본주소/우편번호 세팅 가능",
      "설립일은 YYYYMMDD(8자리)로 입력하며 유효한 날짜만 허용"
    ],
    "error_cases": [
      "사업자번호 누락/형식 오류(전세션 값 불일치 포함): 진행 차단 및 오류 안내",
      "필수값 누락(업체명/영문업체명/전화번호/주소/설립일): 해당 입력으로 포커스 이동",
      "영문업체명 허용 문자 위반: 특수문자 제한 안내",
      "주소검색 실패/취소: 고객이 수동 입력 가능 여부 정책 확인 필요(기본주소 필드 편집 정책)",
      "처리계 오류(조회/저장 실패): 재시도 가능 메시지 + 오류코드(운영정책) 노출"
    ],
    "audit_log_points": [
      "다음 버튼 클릭(저장 시도) 이벤트",
      "저장 성공/실패 결과(결과코드)",
      "주소검색 호출/결과 이벤트(성능/UX 모니터링)",
      "사업자번호/주소/전화번호 등은 로그 최소화 정책 적용 권장"
    ],
    "related_scenarios": [
      "신용_신규_공용(대표 또는 대리인) 흐름 내 0015 포함",
      "신용_신규_개별(대표 또는 대리인) 흐름 내 0015 포함"
    ],
    "next_screens": {
      "prev": "0014",
      "next": "0016"
    },
    "annotations": [
      {
        "no": 1,
        "selector": "[data-anno='1']",
        "title": "라벨: 사업자번호",
        "desc": "전세션(0001) 입력값 기반(수정 불가)"
      },
      {
        "no": 2,
        "selector": "#bizNo",
        "title": "입력: 사업자번호",
        "desc": "Disabled/ReadOnly 처리(형식: 10자리, 표시 시 하이픈 가능)"
      },
      {
        "no": 3,
        "selector": "[data-anno='3']",
        "title": "라벨: 업체명",
        "desc": "필수(*)"
      },
      {
        "no": 4,
        "selector": "#companyNameKo",
        "title": "입력: 업체명",
        "desc": "회원원장 값 존재 시 기본 세팅(없으면 고객 입력)"
      },
      {
        "no": 5,
        "selector": "[data-anno='5']",
        "title": "라벨: 영문업체명",
        "desc": "필수(*)"
      },
      {
        "no": 6,
        "selector": "#companyNameEn",
        "title": "입력: 영문업체명",
        "desc": "대문자 입력 권장, 특수문자 제한(.,-&/)"
      },
      {
        "no": 7,
        "selector": "[data-anno='7']",
        "title": "영문업체명 안내문",
        "desc": "허용 특수문자 문구(운영정책 확정 필요)"
      },
      {
        "no": 8,
        "selector": "[data-anno='8']",
        "title": "라벨: 전화번호",
        "desc": "필수(*)"
      },
      {
        "no": 9,
        "selector": "[data-anno='9']",
        "title": "입력: 전화번호(3분할)",
        "desc": "숫자만, 032-000-8101 형태"
      },
      {
        "no": 10,
        "selector": "[data-anno='10']",
        "title": "라벨: 주소",
        "desc": "필수(*)"
      },
      {
        "no": 11,
        "selector": "#zipCode",
        "title": "입력: 우편번호",
        "desc": "5자리 숫자"
      },
      {
        "no": 12,
        "selector": "#addrSearchBtn",
        "title": "버튼: 주소검색",
        "desc": "외부/플랫폼 주소검색 연동(우편번호/기본주소 세팅)"
      },
      {
        "no": 13,
        "selector": "#addr1",
        "title": "입력: 기본주소",
        "desc": "주소검색 결과로 세팅(정책에 따라 편집 가능/불가)"
      },
      {
        "no": 14,
        "selector": "#addr2",
        "title": "입력: 상세주소",
        "desc": "고객 입력(필수)"
      },
      {
        "no": 15,
        "selector": "[data-anno='15']",
        "title": "라벨: 설립일",
        "desc": "필수(*)"
      },
      {
        "no": 16,
        "selector": "#foundedDate",
        "title": "입력: 설립일",
        "desc": "YYYYMMDD(8자리), 유효 날짜 검증"
      },
      {
        "no": 17,
        "selector": "[data-anno='17']",
        "title": "이전/다음 버튼",
        "desc": "이전: 0014, 다음: 저장 후 0016(목업)"
      },
      {
        "no": 18,
        "selector": "[data-anno='18']",
        "title": "안내문구",
        "desc": "입력정보는 고객정보 등록/변경에 사용됨(고지)"
      }
    ],
    "requirements": [
      {
        "id": "REQ-0015-001",
        "priority": "Must",
        "desc": "사업자번호는 전세션(0001) 입력값을 가져와 화면에 표시하며 수정할 수 없도록 한다.",
        "acceptance": "0015 진입 시 사업자번호가 자동 표시되고 편집 불가(Disabled/ReadOnly)로 동작한다."
      },
      {
        "id": "REQ-0015-002",
        "priority": "Must",
        "desc": "회원원장에 업체명/영문업체명/전화번호/주소/설립일 정보가 존재하는 경우 조회하여 기본 세팅한다.",
        "acceptance": "조회값이 있는 항목은 자동 입력되며, 값이 없으면 고객이 입력할 수 있다."
      },
      {
        "id": "REQ-0015-003",
        "priority": "Must",
        "desc": "업체명/영문업체명/전화번호/주소/설립일은 필수이며 미입력 시 다음 단계로 진행할 수 없다.",
        "acceptance": "필수값 누락 시 다음 클릭 시 오류 메시지 표시 및 진행 차단, 해당 필드로 포커스 이동."
      },
      {
        "id": "REQ-0015-004",
        "priority": "Must",
        "desc": "영문업체명은 허용 문자(영문/숫자/공백 및 특수문자 . , - & /)만 입력 가능해야 한다.",
        "acceptance": "허용 문자 외 입력 시 제거 또는 오류 처리되며, 오류 시 안내 문구가 제공된다."
      },
      {
        "id": "REQ-0015-005",
        "priority": "Should",
        "desc": "영문업체명은 대문자 입력을 권장하며, 자동 대문자 변환을 적용할 수 있다.",
        "acceptance": "입력 중 영문이 대문자로 변환되거나, 저장 시 대문자화되어 저장된다."
      },
      {
        "id": "REQ-0015-006",
        "priority": "Must",
        "desc": "전화번호는 숫자만 입력되며 세그먼트(지역-국번-번호) 기준으로 유효성 검증을 수행한다.",
        "acceptance": "숫자 외 문자는 입력/저장되지 않으며, 길이/형식 검증 실패 시 오류 처리된다."
      },
      {
        "id": "REQ-0015-007",
        "priority": "Must",
        "desc": "주소검색 버튼을 통해 우편번호/기본주소를 설정할 수 있어야 하며, 상세주소는 고객 입력을 받는다.",
        "acceptance": "주소검색 후 우편번호/기본주소가 채워지고, 상세주소 미입력 시 진행이 차단된다."
      },
      {
        "id": "REQ-0015-008",
        "priority": "Must",
        "desc": "설립일은 YYYYMMDD 8자리로 입력되며 유효한 날짜인지 검증한다.",
        "acceptance": "유효하지 않은 날짜(예: 20240231) 입력 시 오류 안내 및 진행 차단."
      },
      {
        "id": "REQ-0015-009",
        "priority": "Must",
        "desc": "다음 버튼 클릭 시 입력된 사업자 정보를 처리계(회원)에 저장(등록/변경)하고 성공 시 다음 화면(0016)으로 이동한다.",
        "acceptance": "저장 성공 응답 후 0016으로 이동, 실패 시 오류 안내 후 재시도 가능."
      }
    ],
    "notes": [
      "화면기능목록(0015) 기준: 법인사업자(Y) 전용, 개인사업자(N).",
      "모바일 Web 비고: 사업자번호는 전세션에서 가져옴(표의 Mobile Web 내용 반영).",
      "영문업체명 특수문자 허용 범위는 화면 문구 기준으로 구현했으며, '6종' 표기와 실제 리스트 불일치 여부는 운영정책 확인 필요."
    ]
  },
  "0054": {
    "screen_id": "0054",
    "screen_name": "추가정보선택(개사자전용)",
    "channel": "mobile web (개사자)",
    "action": "정보입력(버튼 선택)",
    "persona": {
      "corp_biz": false,
      "personal_biz": true
    },
    "purpose": "후불교통카드 신청 여부를 수집(개인사업자 전용)",
    "control_rules": [
      "옵션은 '신청'/'미신청' 2택1",
      "선택 후 CTA(카드신청하기)로 다음 단계 진입",
      "후불교통카드 신청은 이후 카드신청 단계에서 변경 불가(고정)"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "신청정보 저장(가정)",
      "payload_example": {
        "postpaid_transit": "Y|N"
      }
    },
    "audit_log_points": [
      "선택값(Y/N)",
      "CTA 클릭 시점"
    ],
    "notes": [
      "UI: 제공 이미지와 동일하게 상단 타이틀 + 닫기(X) + 2분할 선택 탭 + 하단 고정 CTA",
      "실제 서비스는 선택값을 세션/플랫폼 DB에 저장 후 0055로 이동하는 흐름을 가정"
    ]
  },
  "0039": {
    "screen_id": "0039",
    "screen_name": "개인신용정보 동의서 - 개별",
    "action": "정보입력(동의) + 버튼클릭(본인인증 연계)",
    "ui_nature": [
      "하나의 모달 내부 2-슬라이드 구성",
      "Slide1: 개인(신용)정보 동의서(필수 전체동의)",
      "Slide2: 휴대폰 본인인증(통신사 탭 + 필수약관 동의 + OTP)"
    ],
    "control_rules": [
      "Slide1 필수 전체동의 미완료 시 본인인증(Slide2) 이동 불가",
      "Slide1 상단: 3일 유효기간 안내 문구 포함",
      "Slide1 항목: 5개 필수 동의 항목 (고객정보/기업정보 수집·이용·조회·제공/예금주용 개인정보)",
      "Slide2 필수 약관 전체동의 + 휴대폰번호 + 인증번호(6자리) + 유효시간 내 입력 필요"
    ],
    "backend": {
      "domain": "회원/심사",
      "txn": "동의정보 저장 + 본인인증 호출(가정)",
      "purpose": "개별카드 신청자의 필수 동의 확보 및 본인확인"
    },
    "audit_log_points": [
      "0039 필수동의 완료 여부",
      "인증번호 전송/검증 시각",
      "다음 버튼 클릭 이벤트"
    ],
    "notes": [
      "슬라이드 전환은 CSS transform 기반(연속 애니메이션)",
      "목업 저장: sessionStorage(mock_0039)"
    ]
  },
  "0019": {
    "screen_id": "0019",
    "screen_name": "이용한도",
    "applies_to": {
      "corp": "Y",
      "personal": "N"
    },
    "action": "정보입력",
    "input_value_shape": [
      {
        "key": "requested_limit_manwon",
        "label": "요청한도(만원)",
        "required": true,
        "type": "numeric",
        "rule": "10만원 단위 입력(만원 기준 10의 배수)"
      }
    ],
    "backend": {
      "system": "N(처리계 거래 없음, 표 기준)",
      "purpose": "신청 고객의 요청한도(총한도) 수집 → 심사/한도 부여 프로세스에 활용",
      "read": "이전 입력값이 있으면 플랫폼 저장/세션에서 복원(가정)",
      "write": "플랫폼 임시저장/세션 저장(가정). 최종 신청 전문 포함 시점은 흐름 확정 필요"
    },
    "entry_condition": [
      "이전 단계(0018 필수확인사항) 완료 후 진입",
      "신용카드 신청 프로세스에서 요청한도 수집 필요"
    ],
    "ui_nature": [
      "단일 필수 입력(요청한도) + 안내 문구 제공",
      "단위 표기: 만원",
      "✅ 모달은 1화면(뷰포트) 내 표시 + 내부 스크롤 구조"
    ],
    "control_rules": [
      "요청한도는 필수(*)이며 미입력 시 다음 진행 불가",
      "요청한도는 10만원 단위로만 입력 가능(표 기준)",
      "입력 단위는 만원(숫자 입력 + 단위 텍스트 '만원')",
      "안내 문구 2개는 고정 노출(심사 후 감액 가능 / 1,000만원 초과 안내)",
      "총한도 1,000만원 초과 입력 시, 카드별 한도 1,000만원으로 변경될 수 있다는 안내를 유지/강조(정책 확정 필요)"
    ],
    "error_cases": [
      "미입력: '요청한도를 입력해 주세요' 후 진행 차단",
      "10만원 단위 위반(만원 기준 10의 배수 아님): '10만원 단위로 입력' 안내 후 진행 차단",
      "최소/최대 허용범위는 요건/상품에 따라 상이할 수 있어 확정 필요(현재는 미적용)"
    ],
    "audit_log_points": [
      "요청한도 입력/변경 이벤트(금액 로그 최소화 권장)",
      "다음 버튼 클릭 시점",
      "저장 성공/실패(플랫폼 저장 기준)"
    ],
    "related_scenarios": [
      "신용_신규_공용(대표 또는 대리인) 흐름 내 0019 포함",
      "신용_신규_개별(대표 또는 대리인) 흐름 내 0019 포함"
    ],
    "next_screens": {
      "prev": "0018",
      "next": "0020"
    },
    "annotations": [
      {
        "no": 1,
        "selector": "[data-anno='1']",
        "title": "라벨: 요청한도",
        "desc": "필수(*) 표시"
      },
      {
        "no": 2,
        "selector": "[data-anno='2']",
        "title": "입력영역: 요청한도",
        "desc": "숫자 입력 + 단위표기(만원)"
      },
      {
        "no": 3,
        "selector": "[data-anno='3']",
        "title": "단위: 만원",
        "desc": "입력값 단위를 명확히 표시"
      },
      {
        "no": 4,
        "selector": "[data-anno='4']",
        "title": "입력 규칙 안내",
        "desc": "10만원 단위(만원 기준 10의 배수)"
      },
      {
        "no": 5,
        "selector": "[data-anno='5']",
        "title": "안내 문구(2개)",
        "desc": "심사 후 감액 가능 / 1,000만원 초과 시 변경 가능"
      },
      {
        "no": 6,
        "selector": "[data-anno='6']",
        "title": "1,000만원 초과 배지",
        "desc": "입력값이 1000(만원) 초과 시 강조(목업)"
      },
      {
        "no": 7,
        "selector": "[data-anno='7']",
        "title": "이전/다음 버튼",
        "desc": "이전: 0018, 다음: 저장 후 0020(목업)"
      }
    ],
    "requirements": [
      {
        "id": "REQ-0019-001",
        "priority": "Must",
        "desc": "요청한도 입력 UI는 '숫자 입력 + 단위(만원)' 형태로 제공한다.",
        "acceptance": "입력 필드와 단위 텍스트가 항상 함께 노출된다."
      },
      {
        "id": "REQ-0019-002",
        "priority": "Must",
        "desc": "요청한도는 필수(*)이며 미입력 시 다음 단계로 진행할 수 없다.",
        "acceptance": "'다음' 클릭 시 미입력이면 오류 메시지 노출 및 진행 차단."
      },
      {
        "id": "REQ-0019-003",
        "priority": "Must",
        "desc": "요청한도는 10만원 단위로 입력되어야 한다.",
        "acceptance": "만원 기준 입력값이 10의 배수가 아니면 오류 처리된다. (예: 105 입력 불가)"
      },
      {
        "id": "REQ-0019-004",
        "priority": "Should",
        "desc": "입력값은 천 단위 콤마 표시 등 가독성 포맷을 제공한다.",
        "acceptance": "1000 입력 시 1,000으로 표시된다(내부 저장은 숫자 값)."
      },
      {
        "id": "REQ-0019-005",
        "priority": "Must",
        "desc": "화면 안내 문구(심사 후 감액 가능, 1,000만원 초과 시 변경 가능)를 화면에 고정 노출한다.",
        "acceptance": "항상 2개 안내 문구가 노출되고, UI/문구 변경 시 요건서에 반영된다."
      },
      {
        "id": "REQ-0019-006",
        "priority": "Should",
        "desc": "총한도 1,000만원 초과 입력 시 사용자에게 추가 강조(UI 배지/경고 등)를 제공할 수 있다.",
        "acceptance": "1,000만원 초과 입력 시 별도 강조 요소가 노출되거나 토스트 안내가 발생한다."
      },
      {
        "id": "REQ-0019-007",
        "priority": "Must",
        "desc": "0019 화면의 모달은 1개의 화면(뷰포트) 안에 보이도록 max-height를 적용하고, 필요 시 모달 내부만 스크롤한다.",
        "acceptance": "페이지(body)는 스크롤되지 않고, 콘텐츠가 많아지면 모달 content에서만 스크롤된다."
      }
    ],
    "notes": [
      "화면기능목록(0019) 기준: '이용한도는 10만원 단위로 입력' 요건 반영.",
      "처리계 거래가 N으로 표기되어 있어 본 화면 단독 처리계 호출은 없다고 가정(최종 전문 포함 시점은 확정 필요)."
    ]
  },
  "0023": {
    "screen_id": "0023",
    "screen_name": "결제계좌",
    "applies_to": {
      "법인사업자": "Y",
      "개인사업자": "N"
    },
    "channel": [
      "법사자 PC웹"
    ],
    "action": "정보입력",
    "input_schema": [
      {
        "field": "은행",
        "type": "select",
        "required": true,
        "note": "[확인 필요] 은행 목록/코드"
      },
      {
        "field": "계좌번호",
        "type": "numeric text",
        "required": true
      }
    ],
    "backend": {
      "domain": "회원",
      "txn": "계좌 유효성 및 본인 계좌 체크",
      "purpose": "결제계좌 유효성 검증"
    },
    "rules": [
      "결제계좌는 필수",
      "회원 전문으로 결제계좌 유효성 체크 필요",
      "본인 계좌 체크 필요"
    ],
    "flow": [
      "은행/계좌번호 입력 → (처리계: 회원) 유효성/본인계좌 체크 수행"
    ],
    "notes": [
      "계좌 길이/형식 상세 규칙은 컨텍스트에 없으므로 본 샘플에서는 '숫자만' 최소 정제만 수행",
      "실서비스에서는 blur/확정 시점에 처리계 전문 호출로 대체 필요",
      "은행 드롭다운 목록은 컨텍스트에 없으므로 이미지에 보이는 '국민은행'만 구현(확장 필요)"
    ]
  },
  "0074": {
    "screen_id": "0074",
    "screen_name": "접수완료(개사자_체크)",
    "channel": "mobile web (개인사업자_체크)",
    "targets": "개인사업자(체크)",
    "action": "단순안내",
    "processing_core_call": false,
    "processing_domain": "N/A",
    "processing_purpose": "접수완료 안내",
    "purpose": "체크카드 발급 신청 접수 완료 안내 및 신청내역 조회 경로 제공",
    "fields": [
      {
        "key": "상품명",
        "required": false,
        "type": "text(display)",
        "note": "예: MyBiz 사장님든든 기업체크카드"
      },
      {
        "key": "카드이미지",
        "required": false,
        "type": "image(display)",
        "note": "img_0074_card"
      },
      {
        "key": "완료문구",
        "required": false,
        "type": "text(display)"
      },
      {
        "key": "진행상황 안내",
        "required": false,
        "type": "text(display)",
        "note": "메뉴 경로 안내"
      }
    ],
    "control_rules": [
      "‘체크카드 신청 내역 조회’ 버튼 클릭 시 신청내역 화면으로 이동(딥링크/라우팅)",
      "‘확인’ 클릭 시 종료/홈 이동(정책에 따라 다름)",
      "처리계 호출 없이 결과 안내만 표시"
    ],
    "backend": {
      "domain": "N/A",
      "txn": "N/A",
      "notes": "표시 데이터는 이전 세션/플랫폼 저장값 기반"
    },
    "audit_log_points": [
      "완료 화면 노출 이벤트(선택)",
      "신청내역 조회 버튼 클릭",
      "확인 버튼 클릭"
    ],
    "notes": [
      "스크린샷 구성 반영: 상단 타이틀/닫기, 상품명/카드 이미지, 접수 완료 문구, 회색 버튼, 하단 노란 확인 버튼",
      "이미지 제공 시 IMG_MAP에 img_0074_card 경로만 추가하면 자동 적용"
    ]
  },
  "0062": {
    "screen_id": "0062",
    "screen_name": "필수확인사항(개사자전용)",
    "channel": "mobile web (개사자)",
    "action": "정보입력",
    "persona": {
      "corp_biz": false,
      "personal_biz": true
    },
    "purpose": "고객 소득 확인, 신용점수 확인, 결제일 결정, 필수 설명서 확인 후 적합성 판단 완료",
    "control_rules": [
      "연간소득, 신용점수, 결제일 미선택 시 '확인' 버튼 비활성화",
      "상품설명서 및 신용카드설명서 확인 체크 없이 다음 단계 진행 불가",
      "모든 항목 입력 + 체크박스 동의 완료 시 '확인' 버튼 활성화",
      "'확인' 버튼 클릭 시 적합성 진단 확인서 모달(별도 레이어) 표시",
      "모달에서 선택값(연소득·신용점수·결제일) 확인 후 최종 확인 버튼으로 0063 이동",
      "결제일은 기업회원 부서별 관리 → 총괄관리자/부서별 관리자 권한 로그인 시 변경 가능",
      "신용점수 조회는 처리계(심사) 거래 수행 → CSS 스코어 반환"
    ],
    "backend": {
      "domain": "심사",
      "txn": "CSS 스코어 조회",
      "payload_example": {
        "annual_income": "string(소득구간코드)",
        "credit_score": "string(점수구간코드)",
        "pay_day": "string(01|05|10|14|15|20|25)",
        "confirm": "boolean"
      }
    },
    "audit_log_points": [
      "연간소득 선택값",
      "신용점수 선택값",
      "결제일 선택값",
      "설명서 확인 동의 여부(Y/N)",
      "확인 버튼 클릭 시점",
      "적합성 진단 확인서 모달 최종 확인 시점"
    ],
    "notes": [
      "금융소비자보호법 제17조(적합성), 제19조(설명의무) 이중 충족 화면",
      "확인 버튼 → 적합성 진단 확인서 팝업(별도 모달 레이어, z-index:800) 표시 후 최종 확인",
      "CSS 스코어 조회 결과에 따라 다음 화면(0063 카드정보) 분기 가능",
      "개인사업자 전용 화면 — 법인사업자 해당 없음"
    ]
  },
  "0035": {
    "screen_id": "[Dynamic META.id]",
    "screen_name": "[Dynamic META.name]",
    "purpose": "개별카드 발급을 위해 사용자(개별카드 회원)의 필수 동의서 작성 절차 및 유효기간(3일)을 안내하고 확인을 받는다.",
    "business_rule_source": "화면기능목록 ID:0035 (개별 카드 회원 동의서 작성안내)",
    "target": {
      "corp": true,
      "sole": false
    },
    "action": "고객동의",
    "inputs": {
      "checkbox": {
        "id": "chk-agree",
        "label": "확인했습니다.",
        "required": true
      }
    },
    "processing": {
      "integration": false,
      "domain": "-",
      "description": "안내 확인 후 다음 단계로 진행. 실제 동의서 작성/수집은 이후 단계(0037, 0038, 0039, 0040 등)에서 수행."
    },
    "rules": [
      "‘확인했습니다’ 체크 전까지 다음 버튼 비활성",
      "동의서 유효기간은 LMS 발송일 포함 3일",
      "실제 동의서 작성/재요청/조회는 별도 화면(0037~0040 시퀀스)에서 관리"
    ],
    "qa_points": [
      "체크박스 상태에 따른 버튼 활성/비활성",
      "뒤로가기 재진입 시 체크 상태 보존 여부(정책 선택)",
      "접근성: 체크박스 포커스, 설명 연결(aria-describedby), 모달 접근성"
    ],
    "next": {
      "success": "0036 (개별카드 사용자 개인명의계좌 등록-개별)"
    }
  },
  "0034": {
    "screen_id": "META.id",
    "screen_name": "META.name",
    "purpose": "카드 신청 접수 완료를 안내하고, 핵심 신청 정보를 요약하여 제시한다.",
    "business_rule_source": "화면기능목록 ID:0034 (신청완료)",
    "target": {
      "corp": true,
      "sole": false
    },
    "action": "정보조회",
    "processing": {
      "integration": false,
      "domain": "회원",
      "source": "이전 세션/플랫폼 DB",
      "description": "상태 변화 없음. 접수 완료 상태 안내 및 내역 확인 분기"
    },
    "fields": "ROWS.map(x => x.label)",
    "rules": [
      "본 화면은 확인/안내 목적의 읽기 전용이며, 데이터 수정은 불가하다.",
      "‘신청내역조회’ 클릭 시 마이/내역 화면으로 이동한다.",
      "‘확인’ 클릭 시 0052(신청완료-카드신청정보(확인용)) 또는 홈으로 이동(정책 선택).",
      "민감 정보(연락처/계좌 등)는 정책에 따라 마스킹하여 노출한다.",
      "동일 사업자 중복 접수 안내 문구를 포함한다."
    ],
    "qa_points": [
      "접수 완료 메시지와 후속 안내 문구가 최신 가이드와 일치하는지",
      "테이블 값이 직전 단계 최종 값과 일치하는지",
      "버튼 라우팅(내역/확인)과 뒤로가기 시 상태 보존 여부",
      "반응형(모바일) 레이아웃에서 가독성/접근성(테이블 스크린리더) 확인"
    ],
    "next": {
      "confirm": "0052 (신청완료-카드신청정보(확인용))",
      "history": "마이/내역(HIST)"
    }
  },
  "0022": {
    "screen_id": "0022",
    "screen_name": "결제일",
    "applies_to": {
      "법인사업자": "Y",
      "개인사업자": "N"
    },
    "channel": [
      "법사자 PC웹"
    ],
    "action": "정보조회",
    "input_schema": [
      {
        "field": "결제일",
        "type": "select(일)",
        "required": true,
        "source": "필수확인사항에서 가져옴",
        "note": "[확인 필요] disable 여부"
      }
    ],
    "backend": {
      "domain": "회원",
      "txn": "회원 원장에서 기존 정보 조회",
      "purpose": "결제일 정보 제공"
    },
    "rules": [
      "결제일은 필수",
      "[확인 필요] 기능목록에 'disable' 문구가 있으나 '고객이 바꿀 수 있음'도 존재",
      "[확인 필요] 가능한 결제일 선택 범위는 별도 요건 확인 필요(플랫폼 개발부 확인 필요 문구 존재)"
    ],
    "flow": [
      "이전 단계(필수확인사항)에서 결제일 값을 가져와 화면에 표시",
      "회원 원장 기존 정보 조회 후 표시(기능목록)",
      "[확인 필요] 고객 변경 가능 여부에 따라 입력 가능/불가 처리"
    ],
    "notes": [
      "현재 샘플은 이미지처럼 '01' 선택 UI로 구현",
      "실서비스에서는 처리계 조회 결과로 기본 선택값을 세팅해야 함",
      "선택 가능 범위는 컨텍스트 상 '확인 필요'로 남김"
    ]
  },
  "0059": {
    "screen_id": "SCREEN_ID",
    "screen_name": "SCREEN_NAME",
    "channel": "CHANNEL",
    "action": "ACTION",
    "input_fields": [
      {
        "name": "대표자성명",
        "source": "이전세션(disable)"
      },
      {
        "name": "주민등록번호",
        "source": "이전세션(disable)"
      },
      {
        "name": "휴대폰번호",
        "source": "이전세션(disable)"
      },
      {
        "name": "사업자등록번호",
        "source": "이전세션(disable)"
      },
      {
        "name": "설립년월일",
        "source": "고객 입력"
      },
      {
        "name": "업종 및 산업분류",
        "source": "선택/조회(검색 UI)"
      },
      {
        "name": "고객군형태",
        "source": "선택"
      },
      {
        "name": "희망한도",
        "source": "고객 입력(만원 단위)"
      },
      {
        "name": "추천인",
        "source": "선택(직원번호 입력/검색)"
      }
    ],
    "control_rules": [
      "이전세션 값(대표자/주민번호/휴대폰/사업자번호)은 수정 불가(disable)",
      "고객군형태는 필수(미선택 시 진행 불가)",
      "희망한도는 숫자 입력(만원 단위)",
      "업종/산업분류는 선택 버튼을 통한 검색/선택 UI를 연동(목업에서는 미구현)"
    ],
    "backend": {
      "domain": "고객/심사(개사자)",
      "txn": "설립년월/업종분류/희망한도 저장(가정)",
      "purpose": "개인사업자 신청 기본정보 및 분류 값 확정"
    },
    "audit_log_points": [
      "설립년월일",
      "업종/산업분류 선택값",
      "고객군형태 선택값",
      "희망한도",
      "추천인 입력값(선택)",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "제공 이미지 기준: 상단 ‘카드신청’ + 단계 표시(1 완료, 2 진행중) + 하단 고정 ‘다음’ 버튼",
      "우측 화면의 ‘고객군형태’ 노란 포커스 테두리를 목업으로 반영",
      "추천인 로직(은행/카드 회원 분리 등)은 정책 확정 후 상세 구현"
    ]
  },
  "0018": {
    "screen_id": "0018",
    "screen_name": "필수확인사항",
    "action": "정보입력",
    "input_value_shape": [
      "금융소비자유형선택(라디오 3종)",
      "연간 매출액(라디오 4종)",
      "대표자 신용점수(라디오 2종)",
      "결제일(드롭다운 1종 + 안내 버튼)"
    ],
    "backend": {
      "domain": "-",
      "txn": "별도 유효성 체크 로직(요건 메모)",
      "purpose": "적합성 원칙에 따른 고객 정보 확인 및 다음 단계 진행"
    },
    "control_rules": [
      "본 목업은 화면상 선택값을 필수로 처리(진행 불가)하도록 구현",
      "실제 요건은 '기존 가능 결제일 선택 범위' 등 플랫폼 개발부 확인 필요",
      "슬라이드2 확인서는 슬라이드1 입력값과 매칭되어 표시(값 매칭 구현)"
    ],
    "audit_log_points": [
      "금융소비자유형 선택값",
      "연간 매출액 선택값",
      "대표자 신용점수 선택값",
      "결제일 선택값",
      "확인서 확인 클릭 시점"
    ],
    "notes": [
      "요구사항: '두개의 이미지를 하나의 모달안에 두개의 슬라이드로 연결' 반영",
      "결과(적합/부적합)는 목업 규칙으로 계산되며, 실제는 정책/심사 로직 확정 후 교체"
    ]
  },
  "0038": {
    "screen_id": "0038",
    "screen_name": "개별카드 신청내역 조회",
    "action": "개별카드 신청내역 조회 및 동의 상태 확인",
    "ui_nature": [
      "PC 웹 기반 조회 화면",
      "테이블 형태로 신청 목록 표시",
      "새로고침(수동) + 카운트다운 잔여시간 표시",
      "동의 완료 시 다음 버튼 활성화"
    ],
    "entry_condition": [
      "이전 단계(0037 개별카드 발급대상 고객정보) 완료 및 LMS 발송 완료 후 진입",
      "고객의 개인정보 동의 상태 확인 필요"
    ],
    "control_rules": [
      "미동의 상태에서는 다음 버튼 비활성",
      "동의 완료(전원) 시 다음(→0039) 버튼 활성화",
      "미동의 시 '동의서 작성 재요청하기' 버튼 노출(LMS 재발송)",
      "새로고침 중에는 버튼 잠금(연속 클릭 방지)"
    ],
    "backend": {
      "domain": "개별카드/신용정보",
      "txn": "개별카드 신청 건 조회 및 동의 상태 확인",
      "purpose": "LMS 발송 후 고객의 정보동의 완료 여부를 확인하여 다음 단계(본인인증) 진입 여부 결정"
    },
    "audit_log_points": [
      "신청내역 조회 시점",
      "동의서 재요청 클릭 및 대상 고객명",
      "다음 버튼 클릭 시점 및 동의 상태"
    ],
    "notes": [
      "0037 → 0038 → 0039 흐름(개별카드 발급 루트)",
      "새로고침 버튼: 잔여시간이 0이 되면 자동 리셋(목업)",
      "목업에서는 새로고침 클릭 시 동의 상태 토글(미동의↔동의완료) 데모",
      "실서비스 연동 시 백엔드 API polling 또는 SSE로 동의 상태 갱신"
    ]
  },
  "0002": {
    "screen_id": "0002",
    "screen_name": "신규 대상 통합 발급 안내",
    "applies_to": {
      "법인사업자": "Y",
      "개인사업자": "N"
    },
    "action": "조회 결과 안내",
    "backend": {
      "domain": "회원",
      "txn": "발급유형판단 결과 안내",
      "purpose": "신규 발급 대상 안내 후 카드신청 프로세스 진입"
    },
    "entry_condition": [
      "0001 사업자번호 입력 후",
      "처리계(회원) 조회 결과 = 신규 대상"
    ],
    "ui_nature": [
      "모달 팝업",
      "정보성 + 흐름 제어 화면"
    ],
    "control_rules": [
      "[확인] 클릭 시 카드신청 프로세스 진입",
      "[X] 클릭 시 이전 화면 유지 또는 종료(정책 확정 필요)"
    ],
    "audit_log_points": [
      "신규 대상 판정 결과",
      "고객 확인 버튼 클릭 여부",
      "다음 Flow 진입 시점"
    ],
    "notes": [
      "실제 라우팅/다음 화면은 업무흐름 확정 후 location.hash만 교체",
      "이 화면 자체는 '조회 결과 안내' 성격: 입력값 없음",
      "모달 닫기 동작(이전 유지/종료)은 채널 정책에 따라 분기 필요"
    ]
  },
  "0014": {
    "meta": {
      "id": "0014",
      "name": "대표자 정보",
      "actor": "법인 대리인/대표자"
    },
    "rules": [
      "회원원장 정보 존재 시 자동 세팅 및 수정 불가(정책에 따름)",
      "한글 성명: 2자 이상 완성형 한글 (자음/모음 단독 입력 불가)",
      "영문 성명: 국제 표준 규격(A-Z, 공백, 일부 특수문자) 준수 및 자동 대문자 변환",
      "필수값 누락 시 '다음' 버튼 차단 및 토스트 안내"
    ],
    "annotations": [
      {
        "no": 1,
        "title": "한글 성명 라벨",
        "selector": "[data-anno='1']",
        "desc": "필수 항목 표시(*) 포함"
      },
      {
        "no": 2,
        "title": "한글 성명 입력",
        "selector": "#repNameKo",
        "desc": "원장 조회값 존재 시 비활성화(ReadOnly) 처리"
      },
      {
        "no": 3,
        "title": "영문 성명 라벨",
        "selector": "[data-anno='3']",
        "desc": "Passport 규격 영문 성명"
      },
      {
        "no": 4,
        "title": "영문 성명 입력",
        "selector": "#repNameEn",
        "desc": "실시간 대문자 변환 및 특수문자 필터링 적용"
      },
      {
        "no": 5,
        "title": "유의 사항",
        "selector": "[data-anno='5']",
        "desc": "고객 정보 변경에 대한 법적 고지 문구"
      },
      {
        "no": 6,
        "title": "내비게이션",
        "selector": "[data-anno='6']",
        "desc": "이전(0013) / 다음(0015) 단계 이동"
      }
    ],
    "requirements": [
      {
        "id": "REQ-14-01",
        "prio": "Must",
        "req": "원장 데이터 매핑",
        "acc": "진입 시 처리계 서버에서 조회된 성명 데이터가 즉시 바인딩되어야 함"
      },
      {
        "id": "REQ-14-02",
        "prio": "Must",
        "req": "데이터 유효성",
        "acc": "한글/영문 성명 형식 미준수 시 서버 인터페이스 호출 전 클라이언트단에서 차단"
      },
      {
        "id": "REQ-14-03",
        "prio": "Should",
        "req": "사용자 편의",
        "acc": "영문 입력 시 키보드 상태와 관계없이 대문자로 강제 변환되어 노출됨"
      }
    ]
  },
  "0043": {
    "screen_id": "0043",
    "screen_name": "발급 대상 부서 팝업(신설필요)",
    "action": "정보입력",
    "input_shape": [
      "부서 선택: [부서내 추가 / 부서 추가] 라디오",
      "부서명: 부서내 추가=드롭다운 선택 / 부서 추가=텍스트 입력(필수)"
    ],
    "business_rule": [
      "‘부서내 추가’ 선택 시: 선택 가능한 부서 조회 후 선택(목업에서는 고정 옵션).",
      "‘부서 추가’ 선택 시: 부서명 필수 입력.",
      "현재는 팝업 형태 UI로 표현했으나, ‘거래 분개’ 성격이면 팝업 적합성 검토 필요(요건 메모)."
    ],
    "routing_mock": {
      "prev": "#/0040",
      "next": "#/0044",
      "note": "실제 라우팅은 업무흐름 확정 후 수정(0044/0045 등)"
    },
    "backend": {
      "domain": "회원",
      "txn": "부서 조회/선택 저장(가정)",
      "purpose": "추가발급(부서내/부서추가) 분개를 위한 대상 부서 확정"
    },
    "audit_log_points": [
      "부서 선택 모드(in/new)",
      "선택된 부서코드 또는 입력 부서명",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "이미지 기준 UI: 좌측 라벨/우측 입력(그리드) + 중앙 큰 다음 버튼",
      "부서 선택 모드에 따라 부서명 입력 컴포넌트 토글",
      "목업 저장: sessionStorage(mock_0043)"
    ]
  },
  "0001": {
    "screen_id": "0001",
    "screen_name": "사업자번호 입력",
    "target": "법인사업자 / 개인사업자 공통 진입점",
    "backend": "회원도메인 / TXN_ID: BIZ_ISSUE_TYPE_CHK",
    "scenarios": [
      "SC-01-A",
      "SC-01-B",
      "SC-01-C",
      "SC-01-D",
      "SC-01-E",
      "SC-01-F",
      "SC-02-A",
      "SC-02-B",
      "SC-03-A",
      "SC-03-B",
      "SC-03-C",
      "SC-03-D",
      "SC-03-E",
      "SC-03-F",
      "SC-04-A",
      "SC-04-B"
    ],
    "logic": [
      "입력값: 3-2-5 형태의 총 10자리 숫자",
      "숫자 이외 문자 입력 시 즉시 제거",
      "각 칸 입력 완료 시 다음 칸 자동 포커스",
      "백스페이스 + 빈칸 → 이전 칸으로 포커스 이동",
      "조회 결과에 따라 신규(0002) 또는 추가(0003) 화면으로 분기"
    ],
    "qa_points": [
      "숫자 이외의 문자 입력 차단 여부",
      "모바일 Numeric 키패드 호출 여부 (inputmode=numeric)",
      "연속 클릭 방지 (Loading State) 처리 여부",
      "오류 상황(네트워크 타임아웃 등) 시 사용자 알림 적절성"
    ],
    "data_fields": {
      "bizNo": "사업자등록번호 (10자리 숫자, 하이픈 제외)"
    }
  },
  "0017": {
    "screen_id": "0017",
    "screen_name": "EDD 정보",
    "applies_to": {
      "corp": "Y",
      "personal": "N"
    },
    "action": "정보입력(선택형)",
    "key_rule": "사업자번호가 구분 Key",
    "input_value_shape": [
      {
        "key": "transaction_purpose",
        "label": "거래목적",
        "required": true,
        "type": "select",
        "rule": "선택형(텍스트 입력 없음)"
      },
      {
        "key": "fund_source",
        "label": "거래자금의 원천",
        "required": true,
        "type": "select",
        "rule": "선택형(텍스트 입력 없음)"
      }
    ],
    "backend": {
      "system": "N(처리계 거래 없음)",
      "purpose": "EDD 필수 선택값 수집(AML/리스크 관리 목적) — 이후 신청/심사 단계 전문 포함 여부 확정",
      "read": "기본적으로 코드리스트 제공(정책/공통코드). 이전 입력값이 있으면 복원(플랫폼 저장 기반).",
      "write": "플랫폼 임시저장/세션 저장(가정). 최종 신청 시 함께 제출 가능(확정 필요)."
    },
    "entry_condition": [
      "이전 단계(0016 법인 정보) 완료 후 진입",
      "사업자번호(구분 Key)가 확보된 상태"
    ],
    "ui_nature": [
      "EDD 선택값 입력 화면",
      "두 항목 모두 선택형 드롭다운",
      "필수(*) 선택값 검증 후 다음 단계로 진행"
    ],
    "control_rules": [
      "거래목적/거래자금의 원천은 필수(*)이며, 미선택 시 다음 진행 불가",
      "텍스트 입력 없이 선택형 메뉴만 제공(표 기준)",
      "옵션은 업무정책/공통코드 기반으로 제공(옵션 구성은 확정 필요)",
      "사업자번호 기준으로 선택값을 저장/관리한다(구분 Key)"
    ],
    "error_cases": [
      "필수값 미선택: '○○를 선택해 주세요' 메시지 노출 및 해당 select로 포커스 이동",
      "옵션코드 미정/코드 조회 실패(정책): 기본 안내 + 재시도 가능(운영정책/에러코드 노출 여부 확정 필요)"
    ],
    "audit_log_points": [
      "선택값 변경 이벤트(선택 코드만 기록 권장)",
      "다음 버튼 클릭 시점",
      "사업자번호 등 식별정보는 로그 마스킹/최소화 적용 권장"
    ],
    "related_scenarios": [
      "신용_신규_공용(대표 또는 대리인) 흐름 내 0017 포함",
      "신용_신규_개별(대표 또는 대리인) 흐름 내 0017 포함"
    ],
    "next_screens": {
      "prev": "0016",
      "next": "0018"
    },
    "annotations": [
      {
        "no": 1,
        "selector": "[data-anno='1']",
        "title": "라벨: 거래목적",
        "desc": "필수(*) 표시"
      },
      {
        "no": 2,
        "selector": "#purposeSelect",
        "title": "선택: 거래목적",
        "desc": "선택형 드롭다운(텍스트 입력 없음)"
      },
      {
        "no": 3,
        "selector": "[data-anno='3']",
        "title": "안내문구",
        "desc": "선택형 메뉴/코드값 확정 필요(개발/QA 포인트)"
      },
      {
        "no": 4,
        "selector": "[data-anno='4']",
        "title": "라벨: 거래자금의 원천",
        "desc": "필수(*) 표시"
      },
      {
        "no": 5,
        "selector": "#fundSourceSelect",
        "title": "선택: 거래자금의 원천",
        "desc": "선택형 드롭다운(텍스트 입력 없음)"
      },
      {
        "no": 6,
        "selector": "[data-anno='6']",
        "title": "Key 안내",
        "desc": "사업자번호 기준(구분 Key)으로 관리됨"
      },
      {
        "no": 7,
        "selector": "[data-anno='7']",
        "title": "이전/다음 버튼",
        "desc": "이전: 0016, 다음: 저장 후 0018(목업)"
      }
    ],
    "requirements": [
      {
        "id": "REQ-0017-001",
        "priority": "Must",
        "desc": "거래목적과 거래자금의 원천은 선택형(드롭다운)으로 제공하며 텍스트 입력은 제공하지 않는다.",
        "acceptance": "두 항목 모두 select UI로만 입력 가능하고 자유입력 필드는 없다."
      },
      {
        "id": "REQ-0017-002",
        "priority": "Must",
        "desc": "거래목적/거래자금의 원천은 필수(*)이며, 미선택 시 다음 단계로 진행할 수 없다.",
        "acceptance": "선택값이 비어있으면 '다음' 클릭 시 오류 메시지 노출 및 진행 차단."
      },
      {
        "id": "REQ-0017-003",
        "priority": "Must",
        "desc": "옵션은 업무정책/공통코드(코드리스트) 기반으로 제공되어야 한다.",
        "acceptance": "운영 코드리스트 변경 시 화면 옵션이 동일하게 반영된다(하드코딩 금지)."
      },
      {
        "id": "REQ-0017-004",
        "priority": "Must",
        "desc": "선택 결과는 사업자번호를 구분 Key로 저장/관리한다.",
        "acceptance": "동일 사업자번호로 재진입 시 이전 선택값이 복원되며, 다른 사업자번호로는 분리된다."
      },
      {
        "id": "REQ-0017-005",
        "priority": "Should",
        "desc": "본 화면의 저장 방식(처리계 거래 없음)과 최종 전문 포함 시점을 업무흐름으로 확정한다.",
        "acceptance": "요건서/전문설계에 '저장 위치'와 '최종 제출 시점'이 명시되고 구현과 일치한다."
      },
      {
        "id": "REQ-0017-006",
        "priority": "Must",
        "desc": "모달은 1개의 화면(뷰포트) 안에 보이도록 max-height를 적용하고, 내용이 늘어나면 모달 내부만 스크롤한다.",
        "acceptance": "페이지(body)는 스크롤되지 않고 필요 시 모달 content에서만 스크롤이 발생한다."
      }
    ],
    "notes": [
      "화면기능목록(0017) 기준: '거래 목적/거래자금의 원천' 선택형 메뉴 노출(텍스트 입력 없음).",
      "처리계 거래 컬럼이 N으로 되어 있어 본 화면 단독 거래 호출은 없다고 가정(최종 신청 전문 포함 여부는 확정 필요)."
    ]
  },
  "0040": {
    "screen_id": "0040",
    "screen_name": "개별카드 동의 조회(신청하기) - 개별",
    "action": "정보입력(버튼클릭)",
    "input_shape": [
      "조회부(테이블): 부서명 / 개별카드 고객명 / 신청카드 / LMS 발송 일시 / 정보 동의 일시 / 상태",
      "상태 컬럼 버튼: 신청하기(동의 완료 시)"
    ],
    "business_rule": [
      "사용자가 새로고침을 수행할 수 있다(동의서 작성 여부/상태 재조회 목적).",
      "‘신청하기’ 버튼 클릭 시 카드 발급 신청 시나리오를 재개한다.",
      "동의 미완료 상태에서는 신청하기 버튼을 비활성/제한할 수 있다(목업 처리)."
    ],
    "routing_mock": {
      "prev": "#/0039",
      "apply_or_next": "#/0046",
      "note": "실제 라우팅은 업무흐름 확정 후 수정"
    },
    "backend": {
      "domain": "심사/회원",
      "txn": "동의 상태 조회(가정)",
      "purpose": "개별카드 동의 완료 여부 확인 후 신청 프로세스 재개"
    },
    "audit_log_points": [
      "새로고침 클릭 시점",
      "신청하기 클릭(대상 row 식별자 필요: 부서/고객키/신청건키)",
      "동의 완료 여부/시간(표시값은 마스킹/정책 확인)"
    ],
    "notes": [
      "이미지 기준: 상단 ‘새로고침’, ‘남은 시간’, ‘총 n건’ 표시",
      "테이블은 1건 예시로 구성(추후 다건/페이징 가능)",
      "남은 시간은 목업 카운트다운으로 구현"
    ]
  },
  "0037": {
    "screen_id": "0037",
    "screen_name": "개별카드 발급 대상 고객정보",
    "purpose": "개별카드 발급 대상 사용자의 신원/연락처 정보를 수집하고, 이후 동의서 절차로 연결",
    "business_rule_source": "화면기능목록 ID:0037",
    "inputs": [
      "사용자 성명(한글, 2~20자)",
      "주민등록번호: 앞6자리+1자리",
      "휴대폰번호: 010-XXXX-XXXX"
    ],
    "rules": [
      "모든 필수입력값 없이 다음 단계 불가",
      "LMS 발송은 ‘동의서 작성 요청’ 버튼으로 수행",
      "RRN 뒷자리는 마스킹 처리"
    ],
    "qa_points": [
      "이름 한글만 허용",
      "주민번호 6+1자리 유효성",
      "휴대전화 3-4-4 자리 검증",
      "LMS 발송 실패 시 재시도 처리"
    ],
    "next": "0038(개별카드 동의 조회 – 조회하기)"
  },
  "0060": {
    "screen_id": "0060",
    "screen_name": "한도부여결과조회(개사자전용)",
    "channel": "mobile web (개인사업자)",
    "targets": "개인사업자",
    "action": "정보조회",
    "processing_core_call": true,
    "processing_domain": "심사",
    "processing_purpose": "부여한도확인",
    "purpose": "심사에서 산출된 업체 총한도(심사부여한도)를 고객에게 안내",
    "fields": [
      {
        "key": "심사부여한도",
        "required": false,
        "type": "readonly(number)",
        "unit": "만원",
        "note": "조회 결과 표시"
      }
    ],
    "control_rules": [
      "조회 실패/타임아웃 시 재시도 버튼 또는 고객 안내 토스트",
      "단위 표기(만원) 고정, 숫자 포맷팅(천단위 콤마) 옵션",
      "다음 단계로의 이동은 조회성 화면이라도 허용(정책에 따라 블로킹 가능)"
    ],
    "backend": {
      "domain": "심사(처리계)",
      "txn": "한도부여결과 조회",
      "notes": "사업자번호/신청세션 키로 조회. 오류코드별 리트라이/안내 정책 정의 필요"
    },
    "audit_log_points": [
      "조회 성공/실패 여부 및 응답코드",
      "표시된 심사부여한도 값(로그는 마스킹 또는 범주화 고려)",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "주어진 스크린샷 톤앤매너(상단 단계, 안내 문구, 읽기전용 필드, 유의사항) 반영",
      "문구/용어는 법무/심사와 확정 후 반영",
      "후속 화면은 0061(신분증 정보) 또는 0062(필수확인사항, 개인전용)로 정책에 맞게 연결"
    ]
  },
  "0021": {
    "screen_id": "0021",
    "screen_name": "카드선택",
    "applies_to": {
      "법인사업자": "Y",
      "개인사업자": "N"
    },
    "channel": [
      "법사자 PC웹"
    ],
    "action": "정보입력",
    "input_schema": [
      {
        "field": "브랜드",
        "type": "enum",
        "values": [
          "VISA",
          "MASTER",
          "DOMESTIC"
        ],
        "required": true
      },
      {
        "field": "해외원화결제차단서비스",
        "type": "boolean",
        "required": false,
        "note": "국내전용(DOMESTIC) 선택 시 disable"
      }
    ],
    "backend": {
      "domain": "N(또는 플랫폼 세션 저장)",
      "txn": "카드선택 저장",
      "purpose": "카드 브랜드 선택"
    },
    "rules": [
      "필수: 브랜드 3중 택일",
      "DOMESTIC(국내전용) 선택 시 해외원화결제 차단 서비스는 disable + unchecked 유지",
      "브랜드 미선택 시 다음 진행 불가"
    ],
    "flow": [
      "저장 → 다음 화면(0022 결제일)로 이동(시나리오에 따라 변경 가능)"
    ],
    "notes": [
      "실제 화면/브랜드 항목명은 운영 요건에 맞게 조정(스크린샷 기준으로 리스킨 예정)",
      "DOMESTIC일 때 disable 대상(문구/UX)은 실제 정책 문구로 확정 필요",
      "저장 위치: 회원원장/플랫폼DB/세션 중 어디인지 확정 필요"
    ]
  },
  "0020": {
    "screen_id": "0020",
    "screen_name": "명세서 받으실 곳",
    "applies_to": {
      "corp": "Y",
      "personal": "N"
    },
    "action": "정보입력",
    "input_value_shape": [
      {
        "key": "stmt_method",
        "label": "명세서 받는방법",
        "required": true,
        "type": "radio",
        "values": [
          "email",
          "app"
        ]
      },
      {
        "key": "receive_post",
        "label": "우편 명세서 수령(사업장 주소지)",
        "required": false,
        "type": "checkbox"
      },
      {
        "key": "email",
        "label": "이메일(아이디@도메인)",
        "required": "조건부",
        "type": "text+select",
        "rule": [
          "수령방법이 이메일인 경우 필수",
          "특정 상품코드인 경우(정책) 필수",
          "도메인 프리셋 선택 가능(직접입력/리스트)"
        ]
      }
    ],
    "backend": {
      "system": "N(처리계 거래 없음, 표 기준)",
      "purpose": "명세서 수령 채널(이메일/APP/우편) 설정 및 고객 안내",
      "read": "이전 입력값이 있으면 플랫폼 저장/세션에서 복원(가정)",
      "write": "플랫폼 임시저장/세션 저장(가정). 최종 신청 전문 포함/전달 시점은 확정 필요"
    },
    "entry_condition": [
      "이전 단계(0019 이용한도) 완료 후 진입",
      "명세서 수령 채널을 확정해야 다음 단계 진행 가능"
    ],
    "ui_nature": [
      "라디오 선택(이메일/KB국민기업카드(APP)) + 선택적 우편 수령",
      "이메일 입력(아이디/도메인 + 도메인 선택)",
      "ESG 추천 안내 문구 노출"
    ],
    "control_rules": [
      "명세서 받는방법은 필수(*)이며 미선택 시 진행 불가(라디오 그룹)",
      "이메일 선택 시 이메일 필수",
      "특정 상품코드 정책(force_email_by_product=true)인 경우, APP 선택이어도 이메일 필수",
      "우편 수령은 사업장 주소지로 발송(주소 상세/수정은 별도 화면/정책 범위)",
      "이메일 형식 검증: 아이디는 공백/@ 금지, 도메인은 '.' 포함"
    ],
    "error_cases": [
      "필수값(이메일 조건부 포함) 누락: '이메일을 입력해 주세요' 및 진행 차단",
      "이메일 형식 오류: '이메일 형식을 확인해 주세요' 및 진행 차단",
      "정책/코드 미확정(특정 상품코드 등): 운영 정책 확정 후 구현 값 반영 필요"
    ],
    "audit_log_points": [
      "stmt_method(email/app)",
      "receive_post true/false",
      "email 입력값(로그 저장 시 마스킹/최소화 권장)",
      "다음 버튼 클릭 시점"
    ],
    "related_scenarios": [
      "신용_신규_공용(대표 또는 대리인) 흐름 내 0020 포함",
      "신용_신규_개별(대표 또는 대리인) 흐름 내 0020 포함",
      "부서내추가/부서추가 흐름에서도 동일 개념 재사용 가능"
    ],
    "next_screens": {
      "prev": "0019",
      "next": "0021"
    },
    "annotations": [
      {
        "no": 1,
        "selector": "[data-anno='1']",
        "title": "라벨: 명세서 받는방법",
        "desc": "필수(*) 표기"
      },
      {
        "no": 2,
        "selector": "[data-anno='2']",
        "title": "입력: 수령방법 라디오그룹",
        "desc": "이메일/APP 중 선택"
      },
      {
        "no": 3,
        "selector": "[data-anno='3']",
        "title": "옵션: 이메일",
        "desc": "선택 시 이메일 입력 필수"
      },
      {
        "no": 4,
        "selector": "[data-anno='4']",
        "title": "옵션: KB국민기업카드(APP)",
        "desc": "APP로 명세서 확인 가능(정책에 따라 이메일은 선택/필수)"
      },
      {
        "no": 5,
        "selector": "[data-anno='5']",
        "title": "안내: ESG/APP 설명",
        "desc": "ESG 실천을 위해 이메일/APP 추천 문구"
      },
      {
        "no": 6,
        "selector": "[data-anno='6']",
        "title": "옵션: 우편 명세서(사업장 주소지)",
        "desc": "선택적(기본 체크 목업), 주소는 사업장 주소지로 가정"
      },
      {
        "no": 7,
        "selector": "[data-anno='7']",
        "title": "라벨: 이메일",
        "desc": "조건부 필수(이메일 선택 또는 특정 상품코드)"
      },
      {
        "no": 8,
        "selector": "[data-anno='8']",
        "title": "입력: 이메일 아이디/도메인",
        "desc": "아이디@도메인 입력"
      },
      {
        "no": 9,
        "selector": "[data-anno='9']",
        "title": "입력: 도메인 선택",
        "desc": "직접입력/프리셋 선택 시 도메인 필드 disable"
      },
      {
        "no": 10,
        "selector": "[data-anno='10']",
        "title": "안내: 이메일 발송",
        "desc": "현재 접수중인 부서 명세서 발송 안내(조건부 의미 포함)"
      },
      {
        "no": 11,
        "selector": "[data-anno='11']",
        "title": "이전/다음 버튼",
        "desc": "이전: 0019, 다음: 0021(목업)"
      }
    ],
    "requirements": [
      {
        "id": "REQ-0020-001",
        "priority": "Must",
        "desc": "명세서 받는방법(이메일/KB국민기업카드(APP))을 선택할 수 있어야 하며, 미선택 시 다음 단계로 진행할 수 없다.",
        "acceptance": "라디오 미선택 상태에서 '다음' 클릭 시 오류 처리(또는 기본값 강제)되며 진행되지 않는다."
      },
      {
        "id": "REQ-0020-002",
        "priority": "Must",
        "desc": "수령방법이 '이메일'인 경우 이메일 입력(아이디@도메인)은 필수이며, 형식 검증을 수행한다.",
        "acceptance": "아이디/도메인 누락 또는 형식 오류 시 오류 메시지 노출 및 진행 차단."
      },
      {
        "id": "REQ-0020-003",
        "priority": "Must",
        "desc": "특정 상품코드 정책에 따라(force_email_by_product) 수령방법이 APP이어도 이메일 입력이 필수일 수 있다.",
        "acceptance": "정책=true일 때 APP 선택 상태에서도 이메일 미입력 시 진행 차단된다."
      },
      {
        "id": "REQ-0020-004",
        "priority": "Should",
        "desc": "도메인은 직접입력과 프리셋 선택을 제공하며, 프리셋 선택 시 도메인 입력 필드를 자동 세팅 및 비활성화한다.",
        "acceptance": "프리셋 선택 시 도메인이 자동 입력되고, 직접입력 선택 시 다시 활성화된다."
      },
      {
        "id": "REQ-0020-005",
        "priority": "Should",
        "desc": "우편 명세서 수령(사업장 주소지) 옵션을 제공하며, 선택 여부를 저장/복원한다.",
        "acceptance": "옵션 on/off가 저장되고 재진입 시 동일하게 복원된다."
      },
      {
        "id": "REQ-0020-006",
        "priority": "Must",
        "desc": "본 화면은 처리계 거래(N)로 정의되어 있으므로, 저장 위치(플랫폼 DB/세션) 및 최종 전문 포함 시점을 업무흐름으로 확정해야 한다.",
        "acceptance": "요건서/전문설계에 저장 위치와 제출 시점이 명시되고 구현과 일치한다."
      },
      {
        "id": "REQ-0020-007",
        "priority": "Must",
        "desc": "ESG 관련 추천 안내 문구(APP/이메일 추천)는 화면에 노출한다.",
        "acceptance": "해당 안내 문구가 UI에 고정 노출된다(문구 변경 시 요건서 업데이트)."
      },
      {
        "id": "REQ-0020-008",
        "priority": "Must",
        "desc": "이메일 등 개인정보는 감사/로그 저장 시 마스킹 또는 최소화 정책을 적용한다.",
        "acceptance": "로그에 이메일 원문이 남지 않거나 마스킹되어 저장된다."
      },
      {
        "id": "REQ-0020-009",
        "priority": "Must",
        "desc": "모달은 1개의 화면(뷰포트) 안에 보이도록 max-height를 적용하고, 콘텐츠가 늘어나면 모달 내부만 스크롤한다.",
        "acceptance": "페이지(body)는 스크롤되지 않고 모달 content에서만 스크롤이 발생한다."
      }
    ],
    "notes": [
      "화면기능목록(0020) 기준: 이메일/app/우편 선택 개념 + 이메일 조건부 필수(특정 상품코드 포함).",
      "이미지에는 이메일/APP 라디오와 '우편 명세서 사업장 주소지 수령' 표시가 함께 존재하여 복수 채널(또는 옵션) 형태로 구현함.",
      "특정 상품코드 목록/정책값은 업무/상품 정책 확정 후 코드화 필요."
    ]
  },
  "0061": {
    "screen_id": "SCREEN_ID",
    "screen_name": "SCREEN_NAME",
    "channel": "CHANNEL",
    "action": "ACTION",
    "input_fields": [
      {
        "tab": "주민등록증",
        "fields": [
          "발급일자(YYYYMMDD)"
        ]
      },
      {
        "tab": "운전면허증",
        "fields": [
          "지역(코드)",
          "면허증 앞 8자리",
          "일련번호 6자리(영문/숫자)"
        ]
      }
    ],
    "control_rules": [
      "신분증 종류 탭은 단일 선택(주민등록증/운전면허증)",
      "주민등록증: 발급일자 8자리 필수",
      "운전면허증: 지역/앞8자리/일련번호6자리 필수",
      "일련번호는 영문/숫자 조합이며 자동 대문자 변환"
    ],
    "backend": {
      "domain": "회원",
      "txn": "신분증 진위확인 거래(가정)",
      "purpose": "신분증 정보 수집 및 진위확인 수행"
    },
    "audit_log_points": [
      "선택된 신분증 타입(RRN/DL)",
      "입력값(발급일자 또는 면허정보) — 저장 시 마스킹 권장",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "제공 이미지 기준: 탭 상단 체크(파란 원) + 노란 포커스 테두리 느낌을 반영",
      "운전면허증의 일련번호 도움말(?)는 미니 모달로 구현(목업)",
      "실제 OCR/촬영 기반 진위확인은 후속 화면(0067/0068 등)과 연계 가능"
    ]
  },
  "0036": {
    "screen_id": "[Dynamic META.id]",
    "screen_name": "[Dynamic META.name]",
    "purpose": "개별카드 사용자의 개인명의 결제계좌 등록 여부를 확인하고, 등록 시 LMS를 발송하여 계좌 등록 프로세스(별도)를 시작한다.",
    "business_rule_source": "화면기능목록 ID:0036 (개별카드 사용자 개인명의계좌 등록-개별)",
    "target": {
      "corp": true,
      "sole": false
    },
    "action": "고객동의",
    "inputs": {
      "agree_check": {
        "id": "chk-agree",
        "label": "안내 내용을 확인했습니다.",
        "required": true
      },
      "register_choice": {
        "name": "reg",
        "values": [
          "Y(등록)",
          "N(비등록)"
        ],
        "required": true
      },
      "phone_when_register": {
        "id": "phone",
        "required_if": "reg=Y",
        "format": "010-1234-5678",
        "validate": "/^01[0-9]-\\d{3,4}-\\d{4}$/"
      }
    },
    "processing": {
      "integration": true,
      "domain": "회원",
      "purpose": "개별카드 개인명의 계좌 등록 프로세스 시작",
      "description": "reg=Y 선택 시 LMS 실시간 발송(유효기간 3일) → 고객이 별도 링크로 계좌 인증/등록 진행. reg=N이면 스킵.",
      "events": [
        "LMS_SENT",
        "SKIPPED"
      ]
    },
    "rules": [
      "‘안내 확인’ 체크 전까지 다음 비활성",
      "등록 여부 선택 필수",
      "reg=Y인 경우 휴대폰 번호 유효성(국내 10~11자리 하이픈 포맷) 충족 필수",
      "LMS 링크 유효기간: 발송일 포함 3일 (만료 안내/재발송 정책 별도)"
    ],
    "qa_points": [
      "라디오 전환 시 보조 폼(휴대폰) show/hide",
      "휴대폰 포맷 자동화 및 커서 보정",
      "LMS 발송 실패/지연 시 재시도 및 사용자 안내",
      "뒤로가기 재진입 시 선택/입력값 보존 정책"
    ],
    "next": {
      "success": "0037 (개별카드 발급 대상 고객 정보-개별)"
    }
  },
  "0041": {
    "screen_id": "0041",
    "screen_name": "개별카드",
    "action": "정보입력",
    "input_shape": [
      "성명: 이전 세션 값(Disable)",
      "생년월일: 이전 세션 값(Disable) *필수표기",
      "영문명: 고객 입력 *필수",
      "이메일: 아이디/도메인 분리 입력 + 도메인 프리셋 선택",
      "디자인 선택: 라디오 선택(목업) *필수"
    ],
    "business_rule": [
      "성명/생년월일은 이전 세션 또는 회원원장 값으로 세팅(고객 수정 불가).",
      "영문명/이메일/디자인은 필수 입력이며 미입력 시 다음 진행 불가.",
      "디자인 자재가 여러 개인 경우 자재 코드 조회 및 선택이 필요할 수 있음(목업에서는 라디오로 대체).",
      "재발급 시 기존 디자인 운영 종료 시 기본디자인으로 발급될 수 있음(안내문구 표시)."
    ],
    "routing_mock": {
      "prev": "#/0040",
      "next": "#/0025",
      "note": "실제 라우팅은 업무흐름 확정 후 수정"
    },
    "backend": {
      "domain": "회원",
      "txn": "개별카드 정보 저장(가정)",
      "purpose": "개별카드 발급 정보(영문명/이메일/디자인) 수집"
    },
    "audit_log_points": [
      "영문명 입력값(정규화/대문자화 권장)",
      "이메일 입력값(마스킹 저장 권장)",
      "디자인 코드 선택값",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "이미지 기준 UI: 좌측 라벨/우측 입력 형태(그리드)로 구현",
      "성명/생년월일은 Disable 상태로 표현",
      "이메일 도메인 프리셋 선택 시 도메인 입력 Disable 처리"
    ]
  },
  "0016": {
    "screen_id": "0016",
    "screen_name": "법인 정보",
    "applies_to": {
      "corp": "Y",
      "personal": "N"
    },
    "action": "정보입력",
    "input_value_shape": [
      {
        "key": "corp_reg_no",
        "label": "법인등록번호",
        "required": true,
        "rule": "13자리(6-7 표시 가능)"
      },
      {
        "key": "corp_name",
        "label": "법인명",
        "required": true
      },
      {
        "key": "tel",
        "label": "전화번호(3분할)",
        "required": true
      },
      {
        "key": "address",
        "label": "주소(우편번호/기본주소/상세주소)",
        "required": true
      }
    ],
    "backend": {
      "system": "고객(처리계)",
      "purpose": "법인 정보 조회/등록(또는 변경)",
      "read": "고객 원장에서 법인등록번호/법인명/전화번호/주소를 조회하여 출력",
      "write": "입력/변경된 법인 정보를 고객 원장에 반영(정책에 따라)"
    },
    "entry_condition": [
      "이전 단계(0015 사업자 정보) 완료 후 진입",
      "법인 기본정보(법인등록번호/법인명 등) 수집 필요"
    ],
    "ui_nature": [
      "법인 기본정보 입력 화면",
      "필수 항목 입력 + 주소검색(외부/플랫폼) 연동 가능",
      "✅ 모달은 1화면(뷰포트) 내에 표시되도록 max-height 제약 + 내부 스크롤 구조 적용"
    ],
    "control_rules": [
      "법인등록번호/법인명/전화번호/주소는 모두 필수(*)이며 Null로 진행 불가",
      "고객 원장에 값이 존재하면 조회하여 화면에 출력한다. (없는 경우 고객 입력)",
      "원장값 존재 시 입력 필드 수정 가능/불가 정책은 확정 필요(샘플은 일부 disabled 목업)",
      "전화번호는 숫자만 입력하며 3분할(예: 010-1234-5678)로 받는다.",
      "주소는 우편번호+기본주소+상세주소로 구성되며, 주소검색 버튼으로 우편번호/기본주소 세팅 가능"
    ],
    "error_cases": [
      "필수값 누락: 해당 항목 입력 안내 후 진행 차단",
      "법인등록번호 형식 오류: 13자리 미충족 시 오류 안내",
      "처리계(고객) 조회/저장 실패: 재시도 가능 메시지 + 오류코드(운영정책) 노출"
    ],
    "audit_log_points": [
      "다음 버튼 클릭(저장 시도) 이벤트",
      "저장 성공/실패 결과(결과코드)",
      "주소검색 호출/결과 이벤트(성능/UX 모니터링)",
      "법인등록번호/주소/전화번호 등 개인정보/식별정보는 로그 최소화 정책 적용 권장"
    ],
    "related_scenarios": [
      "신용_신규_공용(대표 또는 대리인) 흐름 내 0016 포함",
      "신용_신규_개별(대표 또는 대리인) 흐름 내 0016 포함"
    ],
    "next_screens": {
      "prev": "0015",
      "next": "0017"
    },
    "annotations": [
      {
        "no": 1,
        "selector": "[data-anno='1']",
        "title": "라벨: 법인등록번호",
        "desc": "필수(*) 표시"
      },
      {
        "no": 2,
        "selector": "#corpRegNo",
        "title": "입력: 법인등록번호",
        "desc": "13자리(6-7), 원장값 존재 시 disabled 가능(정책확정 필요)"
      },
      {
        "no": 3,
        "selector": "[data-anno='3']",
        "title": "라벨: 법인명",
        "desc": "필수(*) 표시"
      },
      {
        "no": 4,
        "selector": "#corpName",
        "title": "입력: 법인명",
        "desc": "원장값 존재 시 자동 세팅(정책에 따라 수정 제한 가능)"
      },
      {
        "no": 5,
        "selector": "[data-anno='5']",
        "title": "라벨: 전화번호",
        "desc": "필수(*) 표시"
      },
      {
        "no": 6,
        "selector": "[data-anno='6']",
        "title": "입력: 전화번호(3분할)",
        "desc": "숫자만 입력, 010-1234-5678 형태"
      },
      {
        "no": 7,
        "selector": "[data-anno='7']",
        "title": "라벨: 주소",
        "desc": "필수(*) 표시"
      },
      {
        "no": 8,
        "selector": "#zipCode",
        "title": "입력: 우편번호",
        "desc": "5자리 숫자"
      },
      {
        "no": 9,
        "selector": "#addrSearchBtn",
        "title": "버튼: 주소검색",
        "desc": "외부/플랫폼 주소검색 연동(우편번호/기본주소 세팅)"
      },
      {
        "no": 10,
        "selector": "#addr1",
        "title": "입력: 기본주소",
        "desc": "주소검색 결과로 세팅(정책에 따라 편집 가능/불가)"
      },
      {
        "no": 11,
        "selector": "#addr2",
        "title": "입력: 상세주소",
        "desc": "고객 입력(필수)"
      },
      {
        "no": 12,
        "selector": "[data-anno='12']",
        "title": "안내문구",
        "desc": "입력정보는 고객정보 등록/변경에 사용됨(고지)"
      },
      {
        "no": 13,
        "selector": "[data-anno='13']",
        "title": "이전/다음 버튼",
        "desc": "이전: 0015, 다음: 저장 후 0017(목업)"
      }
    ],
    "requirements": [
      {
        "id": "REQ-0016-001",
        "priority": "Must",
        "desc": "화면 진입 시 처리계(고객)에서 법인등록번호/법인명/전화번호/주소를 조회하여 존재하는 경우 화면에 기본 세팅한다.",
        "acceptance": "고객 원장에 값이 존재할 때 입력 필드에 자동 표시된다."
      },
      {
        "id": "REQ-0016-002",
        "priority": "Must",
        "desc": "법인등록번호/법인명/전화번호/주소는 필수 항목이며, 미입력 시 다음 단계로 진행할 수 없다(Null 진행 불가).",
        "acceptance": "필수값 누락 시 '다음' 클릭 시 오류 메시지 노출 및 진행 차단."
      },
      {
        "id": "REQ-0016-003",
        "priority": "Must",
        "desc": "법인등록번호는 숫자 13자리(표시 시 6-7 하이픈 포함 가능) 형식 검증을 수행한다.",
        "acceptance": "13자리 미충족 또는 비정상 값이면 오류 처리된다."
      },
      {
        "id": "REQ-0016-004",
        "priority": "Must",
        "desc": "전화번호는 숫자만 입력되며 3분할(지역/국번/번호) 기준으로 유효성 검증을 수행한다.",
        "acceptance": "숫자 외 문자는 입력/저장되지 않으며, 형식 검증 실패 시 오류 처리된다."
      },
      {
        "id": "REQ-0016-005",
        "priority": "Must",
        "desc": "주소검색 버튼을 통해 우편번호/기본주소를 설정할 수 있어야 하며, 상세주소는 고객 입력을 받는다.",
        "acceptance": "주소검색 후 우편번호/기본주소가 채워지고, 상세주소 미입력 시 진행이 차단된다."
      },
      {
        "id": "REQ-0016-006",
        "priority": "Must",
        "desc": "다음 버튼 클릭 시 입력된 법인 정보를 처리계(고객)에 저장(등록/변경)하고 성공 시 다음 화면(0017)으로 이동한다.",
        "acceptance": "저장 성공 응답 후 0017로 이동, 실패 시 오류 안내 후 재시도 가능."
      },
      {
        "id": "REQ-0016-007",
        "priority": "Must",
        "desc": "0016 화면의 모달은 1개의 화면(뷰포트) 안에 보이도록 max-height를 적용하고, 콘텐츠가 늘어나면 모달 내부 영역만 스크롤한다.",
        "acceptance": "브라우저 높이 축소 시에도 페이지(body)는 스크롤되지 않고, 필요 시 모달 content에서만 스크롤이 발생한다."
      },
      {
        "id": "REQ-0016-008",
        "priority": "Should",
        "desc": "원장값 존재 시 법인등록번호/법인명 필드의 수정 가능 여부를 정책으로 확정하고 UI(readonly/disabled)로 반영한다.",
        "acceptance": "정책 확정 문서에 따라 일관되게 editable 상태가 적용된다."
      }
    ],
    "notes": [
      "화면기능목록(0016) 기준: 법인사업자(Y) 전용, 개인사업자(N).",
      "처리계 거래: 고객(처리계) / 고객 원장 조회 기반.",
      "본 화면은 분개(저널) 발생 구간이 아니며, 분개는 0008(공용/개별 선택) 등에서 발생."
    ]
  },
  "0057": {
    "screen_id": "0057",
    "screen_name": "카드신청 기본_CDD(개사자전용)",
    "channel": "mobile web (개인사업자)",
    "action": "정보입력",
    "purpose": "개인사업자 카드신청에 필요한 기본 정보 및 CDD 정보를 수집",
    "fields": [
      {
        "key": "대표자성명",
        "required": true,
        "type": "text"
      },
      {
        "key": "주민등록번호",
        "required": true,
        "type": "digits(13)",
        "note": "’-’ 제외"
      },
      {
        "key": "휴대폰번호",
        "required": true,
        "type": "digits(10~11)",
        "note": "’-’ 제외"
      },
      {
        "key": "사업자등록번호",
        "required": false,
        "type": "readonly(prefilled)"
      },
      {
        "key": "실제소유확인",
        "required": true,
        "type": "checkbox"
      },
      {
        "key": "직업구분 상세분류",
        "required": true,
        "type": "select"
      },
      {
        "key": "거래목적",
        "required": true,
        "type": "select"
      },
      {
        "key": "거래자금 원천",
        "required": true,
        "type": "select"
      }
    ],
    "control_rules": [
      "필수값 누락 시 다음 진행 불가",
      "주민번호/휴대폰은 ‘-’ 제외 숫자만 입력(목업에서 자동 정리)",
      "실제소유확인은 필수 체크",
      "드롭다운 3개(직업/목적/원천) 필수 선택"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "CDD 정보 수집/저장(가정)",
      "purpose": "KYC/CDD 기본요건 충족 및 후속 인증/심사 단계 진행"
    },
    "audit_log_points": [
      "필수 입력값(마스킹 저장 권장)",
      "실제소유확인 체크 여부",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "제공 이미지 기준: ‘카드신청’ 상단 + 단계(✓,2,3,4) + ‘본인확인’ 섹션 구조 반영",
      "이 화면은 0057(개사자전용)이며 모바일 풀페이지 구성",
      "라우팅은 location.hash 목업이며 실제 흐름 확정 후 변경"
    ]
  },
  "0031": {
    "screen_id": "0031",
    "screen_name": "대표자정보(확인용)",
    "purpose": "이전 세션에서 조회된 대표자 정보를 사용자에게 단순 확인 형태로 제공",
    "trigger": "대표자 정보 입력(ID:0014) 이후 조회 결과 표시",
    "next": "뒤로가기 또는 팝업 종료",
    "backend": "회원원장 기반 대표자 정보 조회",
    "fields": [
      "대표자 성명",
      "대표자 영문 이름",
      "대표자 휴대폰번호 (마스킹 포함)",
      "대표자 자택주소",
      "대표자 자택주소 상세"
    ],
    "ui": [
      "중앙 팝업 형태",
      "X 버튼, ESC, 오버레이 클릭으로 닫기",
      "테이블 형태 정보 표시",
      "모바일/PC 모두 대응"
    ],
    "qa_points": [
      "마스킹 처리 규칙 검증",
      "누락된 정보 있을 때 에러 처리",
      "사업자 유형(법인/개인)에 따른 차이 없음 확인",
      "주소 줄바꿈/overflow 체크"
    ]
  },
  "0066": {
    "screen_id": "0066",
    "screen_name": "유의 및 준비사항(개사_체크전용)",
    "channel": "mobile web (개인사업자)",
    "action": "단순안내",
    "purpose": "체크카드 신청 전 준비서류 및 유의사항 안내",
    "contents": {
      "checklist": [
        "대표자 신분증(주민등록증 또는 운전면허증)",
        "사업자등록증(사업자등록증명원)",
        "국민은행 결제계좌번호",
        "결제계좌는 국민은행 계좌만 지정 가능"
      ],
      "cautions": [
        "개인사업자의 대표자만 신청 가능",
        "공동명의 계좌는 ‘주 명의인’일 경우에만 결제계좌로 등록 가능",
        "정보/서류 불일치 또는 신용평가 결과 등에 따라 발급 거절 가능",
        "일정시간 경과 시 서비스가 원활하지 않을 수 있음"
      ]
    },
    "control_rules": [
      "본 화면은 안내 전용이며 입력 필드 없음",
      "확인 버튼 클릭 시 다음 단계로 진행(목업: 0067)",
      "취소/닫기 시 이전 화면 유지(목업)"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "N/A",
      "purpose": "사전 고지 및 고객 안내 이력 확보(가정)"
    },
    "audit_log_points": [
      "안내 화면 진입 시각",
      "확인/취소 버튼 클릭 여부 및 시각",
      "유의사항 아코디언 열림/닫힘(선택)"
    ],
    "notes": [
      "제공 이미지(0066) 기준: 상단 타이틀 + X 닫기 + ‘체크카드 발급’ 안내 박스 + ‘유의사항’ 아코디언 + 하단 ‘취소/확인’ 2버튼 구성 반영",
      "실데이터/문구는 확정 시 운영 문구로 교체"
    ]
  },
  "0070": {
    "screen_id": "0070",
    "screen_name": "신청정보_CDD(개사_체크)",
    "channel": "mobile web (개인사업자)",
    "action": "정보입력",
    "input": "신청유형(신규/추가) / 해외겸용/국내전용 선택 / 해외겸용 시: 해외 원화결제 차단 서비스 신청(필수) / 실소유자 여부(예/아니오) / 직업구분 / 거래목적 / 거래자금 원천",
    "purpose": "체크카드 발급에 필요한 신청정보 및 CDD 정보를 수집",
    "control_rules": [
      "신청유형은 신규/추가 중 1개 선택",
      "해외겸용/국내전용 중 1개 선택",
      "해외겸용 선택 시 ‘해외 원화결제 차단 서비스 신청’ 항목 필수",
      "실제 소유자 확인은 ‘예’가 아니면 다음 진행 제한(목업 정책)",
      "직업구분/거래목적/거래자금의 원천은 필수 선택"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "CDD 입력값 저장 및 심사조회(CSS 스코어 등) 전 단계(가정)",
      "purpose": "후속 단계(설립년월/계좌조회/결제일/비밀번호 등) 진행을 위한 기본 데이터 확보"
    },
    "audit_log_points": [
      "신청유형/브랜드 선택값",
      "해외겸용 시 원화차단 선택값",
      "실소유자 여부 선택값",
      "직업구분/거래목적/자금원천 선택값",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "제공 이미지(0070) 기준: 상단 ‘카드신청’ + 진행도(✓,2,3,4,5) + ‘신청유형’ 강조 영역 + 하단 드롭다운 3종 구성 반영",
      "이미지 상 우측 폼(실소유자/직업/목적/원천)과 좌측 폼(신청유형/브랜드)을 하나의 스크롤 화면으로 통합(중복 제거)",
      "해외브랜드 선택 시 원화차단 서비스 항목을 추가로 노출(요건 문구 반영)",
      "라우팅은 location.hash 목업"
    ]
  },
  "0027": {
    "screen_id": "0027",
    "screen_name": "추천인",
    "action": "추천인 선택/입력 및 공동인증서 인증 진입",
    "ui_nature": [
      "단일 입력(옵션) + CTA",
      "추천인 없음/직원코드(7자리) 입력 지원"
    ],
    "entry_condition": [
      "0026 카드 수령지 입력 완료 후 진입",
      "공동인증서 인증 단계(0028)로 진입 전 추천인 정보 확인"
    ],
    "control_rules": [
      "추천인(필수) 항목: '없음' 선택 가능",
      "직원코드 입력 선택 시 7자리 숫자만 허용",
      "직원코드 조회 버튼은 코드 입력 모드에서만 활성",
      "CTA(법인 공동인증서 인증하기) 클릭 시 인증 단계로 이동(목업은 #/0028)"
    ],
    "backend": {
      "domain": "회원/인증",
      "txn": "추천인 정보 저장 및 인증 진입(가정)",
      "purpose": "추천인 정보 기록(선택) 후 법인 공동인증서 인증 진행"
    },
    "audit_log_points": [
      "추천인 입력 방식(none/code)",
      "추천인 코드(있을 경우, 마스킹 저장 권장)",
      "직원코드 조회 시도 여부",
      "인증 버튼 클릭 시점"
    ],
    "notes": [
      "이미지 기준: 추천인 입력은 한 줄 구성(없음/7자리 입력/직원코드 조회)",
      "실서비스에서는 직원검색 팝업/검색 결과 선택 UI가 붙을 수 있음",
      "하단 큰 CTA가 메인 액션(공동인증서 인증 진입)"
    ]
  },
  "0050": {
    "screen_id": "0050",
    "screen_name": "부서별한도(요청한도 입력)",
    "action": "정보입력",
    "persona": {
      "corp_biz": true,
      "personal_biz": false
    },
    "input": {
      "fields": [
        {
          "name": "신청가능한도",
          "type": "number",
          "unit": "만원",
          "required": false,
          "source": "회원원장(조회)",
          "editable": false
        },
        {
          "name": "요청한도",
          "type": "number",
          "unit": "만원",
          "required": true,
          "source": "사용자 입력",
          "editable": true
        }
      ],
      "validation": [
        "요청한도 필수",
        "요청한도는 신청가능한도를 초과할 수 없음",
        "목업: 10만원 단위 입력(정책 확정 시 수정 가능)"
      ]
    },
    "backend": {
      "system": "회원",
      "txn": "신청가능한도 조회",
      "purpose": "신청 가능한 한도 조회 후 고객 요청한도 수집"
    },
    "ui_nature": [
      "요약+입력 혼합 화면",
      "신청가능한도(조회값) + 요청한도(필수 입력)"
    ],
    "entry_condition": [
      "업체/부서 정보가 확보된 상태",
      "회원원장에서 신청가능한도를 조회 가능한 상태"
    ],
    "control_rules": [
      "요청한도 미입력/0 입력 시 진행 불가",
      "요청한도 초과 입력 시 진행 불가",
      "요청한도 단위(10만원 등)는 정책 확정 필요(목업에서는 10만원 단위 적용)"
    ],
    "audit_log_points": [
      "화면 진입 시점",
      "신청가능한도 조회 결과(성공/실패)",
      "요청한도 입력값(마스킹 불필요)",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "이미지 기준 레이아웃(좌 라벨/우 값) 재현",
      "문구(※ 요청하신 한도보다 실제 발급 시 낮은 한도가 부여될 수 있습니다) 반영",
      "해시 라우팅(#/0049, #/0051)은 목업이며 실제 흐름 확정 후 수정"
    ]
  },
  "0007": {
    "screen_id": "META.id",
    "screen_name": "META.name",
    "purpose": "카드발급 신청 관련 주요 유의사항(법/계좌/신청제한/거절조건 등) 고객 안내",
    "business_rule_source": "화면기능목록 ID:0007 (유의사항)",
    "action": "단순안내",
    "input": "N",
    "host_processing": "N",
    "rules": [
      "고객확인의무(특금법) 관련 신분증 등 확인 요청 가능",
      "결제계좌는 사업자명의 계좌만 가능(개인계좌 불가)",
      "마이너스통장 지정 시 대출이자 발생 가능",
      "입금 제한 계좌는 캐시백(매출취소 환급) 입금 거절 가능",
      "입력정보/제출서류 불일치 또는 신용평가 결과에 따라 발급 거절 가능",
      "공동대표/지정사업자/외국법인/대표자 외국인 사업자는 비대면 신청 불가",
      "대리인 신청 시 이용약관 및 필수동의사항 동의 절차 포함"
    ],
    "flow": {
      "prev": "META.prevTarget",
      "next": "META.nextTarget"
    },
    "qa_points": [
      "문구 줄바꿈/가독성(모바일 포함) 확인",
      "긴 문구에서 스크롤/레이아웃 깨짐 여부",
      "이전/다음 버튼 터치 영역(56px) 유지 여부",
      "안내성 화면이므로 불필요한 입력/검증 로직이 없는지"
    ],
    "data_spec": {
      "ssot_meta": "META"
    }
  },
  "0011": {
    "screen_id": "META.id",
    "screen_name": "META.name",
    "action": "고객동의",
    "input": "동의여부",
    "purpose": "신청자(대표자 또는 대리인) 신용정보 조회 이용 동의 수집",
    "business_rule_source": "화면기능목록 ID:0011 (신청자 신용정보 조회 이용 동의(대표자/대리인) 신설필요)",
    "condition_rule_policy": {
      "condition": [
        "대표자 또는 대리인이 신청 진행",
        "신용정보 조회가 필요한 신청 단계에 진입"
      ],
      "rule": [
        "필수 동의 미체크 시 다음 단계 진행 불가",
        "전체동의는 화면 내 필수 동의 항목에 대해 일괄 적용"
      ],
      "policy": [
        "동의 근거/수집항목/보유기간/제3자 제공 등 고지 문구는 법무/준법 확정본으로 교체",
        "동의 이력 저장 위치(플랫폼 DB vs 처리계 전문)는 플랫폼 개발부 확인 필요"
      ]
    },
    "ui_elements": [
      "전체동의 체크",
      "필수동의 항목(1개 이상 가능) 체크",
      "자세히보기(동의 상세 모달)",
      "이전/다음 버튼"
    ],
    "rules": [
      "신용정보조회 필수 동의",
      "동의 없이 다음 단계 진행 불가",
      "대표자/대리인 공용"
    ],
    "flow": {
      "prev": "META.prevTarget",
      "next": "META.nextTarget"
    },
    "qa_points": [
      "필수 동의 체크 전 Next 비활성 유지",
      "전체동의 토글 시 개별 동의와 동기화",
      "개별 동의만 체크해도 Next 활성",
      "자세히보기 모달 오픈/닫기(ESC/바깥클릭) 정상 동작",
      "모바일 레이아웃에서 버튼/체크 UI 깨짐 여부"
    ],
    "data_spec": {
      "state_shape": "{ required: { credit_inquiry_consent: boolean } }"
    }
  },
  "0046": {
    "screen_id": "0046",
    "screen_name": "유의 및 준비사항 안내",
    "action": "단순안내(스크롤) + 확인 버튼",
    "ui_nature": [
      "모달 팝업 형태",
      "스크롤 가능한 안내문(필수 준비사항/필수 제출서류/유의사항)"
    ],
    "entry_condition": [
      "이전 단계에서 유의/준비사항 확인 필요 시 진입(예: 0004/0005/0040 등에서 호출)"
    ],
    "control_rules": [
      "내용은 스크롤로 전체 확인 가능",
      "확인 버튼 클릭 시 모달 닫고 다음 단계 진행(목업)"
    ],
    "backend": {
      "domain": "-",
      "txn": "없음(단순안내)",
      "purpose": "신청 전 필요한 준비사항/서류/법적 유의사항을 고객에게 고지"
    },
    "audit_log_points": [
      "모달 오픈 시각",
      "확인 버튼 클릭 시각(필요 시)"
    ],
    "notes": [
      "이미지 기준 상단 파란 라인 느낌을 헤더 하단 보더로 구현",
      "필수 제출서류의 '최근 3개월 이내'는 강조 색상 처리",
      "실제 문구/항목은 운영 요건에 따라 변경 가능"
    ]
  },
  "0047": {
    "screen_id": "0047",
    "screen_name": "대표자_사업자정보",
    "action": "정보조회(확인용)",
    "persona": {
      "corp_biz": true,
      "personal_biz": false
    },
    "input": {
      "fields": [],
      "note": "입력 없음(조회 화면)"
    },
    "backend": {
      "system": "회원",
      "txn": "대표자 정보 조회",
      "purpose": "원장상 대표자 정보 확인(확인용 표출)"
    },
    "ui_nature": [
      "확인(조회) 화면",
      "좌 라벨/우 값 형태의 요약 테이블"
    ],
    "entry_condition": [
      "이전 단계에서 대표자/사업자 정보가 확보된 상태",
      "회원원장 또는 이전 세션에서 조회 가능한 상태"
    ],
    "control_rules": [
      "입력 필드 없음",
      "값이 없을 경우: '정보를 확인할 수 없습니다' 안내(실서비스 정책 필요)"
    ],
    "audit_log_points": [
      "화면 진입 시점",
      "조회 성공/실패 여부(실서비스)",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "이미지 기반으로 테이블 레이아웃 재현",
      "본 화면은 기능목록상 '대표자_사업자정보(0047) / 정보조회 / 입력값없음 / 회원 / 대표자 정보 조회'에 해당",
      "해시 라우팅(#/0046, #/0048)은 목업이며 실제 흐름 확정 후 수정"
    ]
  },
  "0010": {
    "screen_id": "META.id",
    "screen_name": "META.name",
    "purpose": "신청인 기본 정보(대표자 여부/성명/주민번호/휴대폰) 수집 및 회원원장 정보 세팅(있으면 조회/없으면 입력)",
    "business_rule_source": "화면기능목록 ID:0010 (신청인정보)",
    "action": "정보입력",
    "host": {
      "system": "회원원장",
      "intent": "회원원장에서 대표자 정보(신청인 성명/주민등록번호/휴대폰) SET, 없으면 고객 입력"
    },
    "required_fields": [
      {
        "key": "is_representative_same",
        "label": "대표자 여부(신청인=대표자 체크)",
        "required": false
      },
      {
        "key": "applicant_name",
        "label": "신청인 성명",
        "required": true
      },
      {
        "key": "rrn",
        "label": "주민등록번호(6-7)",
        "required": true
      },
      {
        "key": "mobile",
        "label": "휴대폰번호(010-0000-0000)",
        "required": true
      }
    ],
    "rules": [
      "필수값 미입력/형식 오류 시 다음 단계 진행 불가",
      "회원원장에 값이 있으면 prefill 가능(Disable 정책은 플랫폼/업무요건 확정 필요)",
      "민감정보(주민번호 등) 입력은 마스킹/암호화/보안키패드 등 보안요건 적용 필요"
    ],
    "flow": {
      "prev": "META.prevTarget",
      "next": "META.nextTarget"
    },
    "qa_points": [
      "숫자 필드에 숫자 외 입력 시 자동 제거 동작",
      "주민번호 6/7자리 미충족 시 에러 표시 + Next 비활성",
      "휴대폰 3-4-4 자리 미충족 시 에러 표시 + Next 비활성",
      "모바일 레이아웃에서 2열 → 1열 전환 시 UI 깨짐 여부",
      "회원원장 값 prefill 시(가정) 수정 가능/불가 정책에 따른 UX 확인"
    ],
    "data_spec": {
      "state_shape": "{ isRepSame:boolean, name:string, rrn:{a6:string,b7:string}, mobile:{p3:string,p4:string,p4b:string} }"
    }
  },
  "0006": {
    "screen_id": "META.id",
    "screen_name": "META.name",
    "title": "META.title",
    "segment": {
      "corp": true,
      "sole_prop": false
    },
    "action_type": "EXTERNAL_LOOKUP",
    "input_spec": {
      "consent_required": true,
      "consent_field": "agree:boolean"
    },
    "external_integration": {
      "vendor": "한국평가데이터(KoDATA, 구 한국기업데이터)",
      "type": "web redirect / return",
      "realtime": false,
      "note": "배치 작업으로 당사 제공(실시간 아님)"
    },
    "purpose": "외부 서비스(KoDATA)로 제출 서류 대행 신청 후 복귀, 완료 상태 확인 후 다음 단계 진행",
    "rules": [
      "동의(필수) 없이는 외부 서비스 이동/다음 단계 진행 불가",
      "서류 자동제출 서비스 완료 후에만 '다음' 버튼 활성(권장: 서버 검증 기반)",
      "자동 제출 대상 서류: 사업자등록증명, 법인등기사항전부증명서, 표준재무제표증명, 부가가치세과세표준증명원",
      "주주명부(제출 필수) 및 정관(비영리법인, 임의단체 등)은 자동제출 불가 → 직접 등록 대상"
    ],
    "navigation": {
      "prev": "${META.prevTarget}(목업)",
      "external": "${META.externalUrl}(목업) - 실제 외부 URL/연동 방식으로 교체",
      "next": "${META.nextTarget}(목업)"
    },
    "qa_points": [
      "동의 미체크 상태에서 '바로가기' 클릭 시 방어(토스트/포커스) 되는지",
      "외부 서비스 완료 전 Next 비활성 유지되는지",
      "복귀 후 완료 상태를 서버 검증으로 판정 가능한지(증빙ID/상태조회)",
      "배치(비실시간) 특성 안내 문구/가이드가 필요한지",
      "모바일에서 동의 토글/버튼 영역 터치가 쉬운지"
    ],
    "data_spec": {
      "ssot_meta": "META",
      "state": "{ agree:boolean, serviceDone:boolean }",
      "completion_source": "server-verified recommended"
    },
    "business_rule_source": "화면기능목록 ID:0006 (서류자동제출서비스)"
  },
  "0051": {
    "screen_id": "0051",
    "screen_name": "업체(부서)정보(확인용)",
    "action": "정보조회(확인용)",
    "persona": {
      "corp_biz": true,
      "personal_biz": false
    },
    "input": {
      "fields": [],
      "note": "입력 없음(조회 화면)"
    },
    "backend": {
      "system": "회원",
      "txn": "업체(부서)정보 조회(가정)",
      "purpose": "업체/부서 정보를 확인용으로 표출"
    },
    "ui_nature": [
      "확인(조회) 화면",
      "좌 라벨/우 값 형태의 요약 테이블"
    ],
    "entry_condition": [
      "업체(부서)정보가 이전 단계에서 수집/확정된 상태",
      "회원원장 또는 플랫폼 DB에서 조회 가능한 상태"
    ],
    "control_rules": [
      "입력 필드 없음",
      "값이 없을 경우: 항목별 '정보 없음' 처리 또는 진행 차단 여부(정책 필요)"
    ],
    "audit_log_points": [
      "화면 진입 시점",
      "조회 성공/실패 여부(실서비스)",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "이미지 기준 레이아웃(업체(부서)정보 테이블) 재현",
      "기능목록상 0051: '업체(부서)정보(확인용) / 정보조회 / 회원 / 단순확인용'에 해당",
      "해시 라우팅(#/0050, #/0052)은 목업이며 실제 흐름 확정 후 수정"
    ]
  },
  "0026": {
    "screen_id": "0026",
    "screen_name": "카드 수령지",
    "action": "카드 수령지/수령동의/연락처 입력",
    "ui_nature": [
      "폼 입력 화면(필수 항목 포함)",
      "수령지 선택 + 동의 체크 + 수령인/휴대폰 확인"
    ],
    "entry_condition": [
      "0025 발급 확인 및 약관수령 완료 후 진입",
      "발급 진행을 위해 카드 수령지 및 수령동의가 필요"
    ],
    "control_rules": [
      "카드 수령지 선택: 사업장/제3청구지",
      "수령동의(신청인 수령동의)는 필수(*)이며 미동의 시 다음 진행 불가",
      "법인/임의단체는 사업장 수령 선택 시 신청인만 수령 가능(안내문 노출)",
      "휴대폰은 필수이며 숫자 형식 검증(목업 단순검증)"
    ],
    "backend": {
      "domain": "배송/회원",
      "txn": "카드수령지 및 연락처 저장(가정)",
      "purpose": "카드 배송 정보 확정 및 다음 단계 진행"
    },
    "audit_log_points": [
      "수령지 선택값(biz/third)",
      "수령동의 체크 여부",
      "휴대폰 입력값(마스킹 저장 권장)",
      "다음 버튼 클릭 시점"
    ],
    "notes": [
      "이미지 기준 좌/우 그리드 레이아웃으로 구성",
      "카드수령지 더 보기: 토글 패널로 구현(목업)",
      "실제 서비스에서는 선택값에 따라 주소 입력/검색 UI가 추가될 수 있음"
    ]
  },
  "0071": {
    "screen_id": "0071",
    "screen_name": "신청정보_설립년월(개사_체크)",
    "channel": "mobile web (개인사업자)",
    "action": "정보입력",
    "purpose": "체크카드 발급 정보 + 설립년월일 + 계좌조회/결제일/비밀번호 등을 수집",
    "fields": [
      {
        "key": "대표자 영문명",
        "required": true,
        "type": "text"
      },
      {
        "key": "대표자 자택주소",
        "required": true,
        "type": "address + (optional detail)"
      },
      {
        "key": "대표자 이메일",
        "required": "조건부(개별카드 신청 또는 약관수령 이메일)",
        "type": "email"
      },
      {
        "key": "대표자 휴대폰",
        "required": true,
        "type": "readonly(prefilled)"
      },
      {
        "key": "업체명",
        "required": true,
        "type": "text"
      },
      {
        "key": "영문업체명",
        "required": true,
        "type": "text(인쇄용)"
      },
      {
        "key": "업체 전화번호",
        "required": true,
        "type": "tel"
      },
      {
        "key": "업체 주소",
        "required": true,
        "type": "address + (optional detail)"
      },
      {
        "key": "설립년월일",
        "required": true,
        "type": "date"
      },
      {
        "key": "공용카드 신청매수",
        "required": true,
        "type": "select(0~99)"
      },
      {
        "key": "개별카드 신청여부",
        "required": true,
        "type": "radio(신청/미신청)"
      },
      {
        "key": "약관수령방법",
        "required": true,
        "type": "radio(이메일/문자)"
      },
      {
        "key": "카드 수령지",
        "required": true,
        "type": "radio(사업장/제3청구지)"
      },
      {
        "key": "결제계좌",
        "required": true,
        "type": "picker(처리계 확인)"
      },
      {
        "key": "결제일",
        "required": false,
        "type": "disabled(고정)"
      },
      {
        "key": "카드비밀번호/확인",
        "required": true,
        "type": "digits(4) + match"
      }
    ],
    "control_rules": [
      "개별카드 신청 시 이메일 필수",
      "약관수령방법이 이메일인 경우 수령 이메일 필수",
      "결제계좌는 처리계 확인/선택(목업에서는 버튼)",
      "결제일은 고객 변경 불가(스크린샷 기준 disable)",
      "비밀번호는 4자리, 확인값과 일치해야 함"
    ],
    "backend": {
      "txn": "체크 결제 가능 계좌 조회(가정)",
      "purpose": "발급 정보 수집 완료 후 약관동의/접수로 진행"
    },
    "audit_log_points": [
      "개별카드 신청 여부",
      "약관수령방법(이메일/문자) 및 수령처",
      "카드 수령지 선택값",
      "결제계좌 선택값(마스킹 저장 권장)",
      "비밀번호 입력 시도(저장 금지, 이벤트만 로깅 권장)"
    ],
    "notes": [
      "제공 이미지(0071) 좌/중/우 화면을 중복 제거하여 하나의 스크롤 화면으로 통합",
      "신청매수(공용) + 개별카드(신청/미신청) + 약관수령(이메일/문자) + 결제계좌/결제일/비밀번호를 한 페이지에서 처리",
      "라우팅은 location.hash 목업"
    ]
  },
  "0067": {
    "screen_id": "0067",
    "screen_name": "신분증진위확인_촬영 또는 직접 입력 선택(개사자_체크)",
    "channel": "mobile web (개인사업자)",
    "action": "본인인증방법선택",
    "input": "방법선택(촬영 / 직접입력)",
    "purpose": "신분증 진위확인 진행을 위한 입력 방식 선택 및 촬영 안내",
    "control_rules": [
      "촬영하기 선택 시 카메라 촬영 플로우로 진행(목업: 0068?mode=capture)",
      "직접입력 선택 시 신분증정보 입력 화면으로 진행(목업: 0068)",
      "주민등록증/운전면허증만 허용(안내 문구 고정)"
    ],
    "backend": {
      "domain": "N/A(목업)",
      "txn": "N/A(0068에서 신분증 진위확인 거래 수행 가정)",
      "purpose": "신분증 진위확인 채널 분기(촬영 OCR vs 수기입력)"
    },
    "audit_log_points": [
      "진입 시각",
      "선택값(촬영/직접입력) 및 클릭 시각",
      "촬영 모드 진입 여부(가정)"
    ],
    "notes": [
      "제공 이미지(0067) 기준: 상단 ‘카드신청’ + X 닫기 + 안내문 + 주민등록증/운전면허증 예시 프리뷰 + 하단 ‘직접입력/촬영하기’ 2버튼 구성 반영",
      "프리뷰는 예시이며 실제 촬영/검증은 다음 화면에서 수행"
    ]
  }
};
