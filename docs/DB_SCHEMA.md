# KB카드 비대면 발급 — 데이터베이스 스키마 정의 (DB Schema)

본 문서는 목업 시스템에서 사용하는 두 가지 핵심 원장(**회원 원장**, **신청서 접수 원장**)의 데이터 구조를 정의합니다.

---

## 1. 회원 원장 (Member Ledger) / `MEMBER_DB`
**목적**: 기 보유 회원의 정보를 조회하여 신규/추가 발급 여부 및 기업 정보를 판별함. (Master Data)

| 논리명 (Logical) | 물리명 (Physical) | 타입 (Type) | 필수 | 설명 |
| :--- | :--- | :--- | :--- | :--- |
| **사업자번호** | `biz_no` | CHAR(10) | **PK** | 사업자 등록번호 (하이픈 제외) |
| **고객유형** | `cust_type` | VARCHAR(10) | Y | `CORP` (법인), `INDIV` (개인사업자) |
| **고객명** | `cust_name` | VARCHAR(100) | Y | 법인명 또는 상호명 |
| **대표자명** | `rep_name` | VARCHAR(50) | N | 대표자 성명 (본인인증 대조용) |
| **회원상태** | `cust_status` | VARCHAR(10) | Y | `NORMAL` (정상), `STOP` (거래중지), `CLOSE` (폐업) |
| **가입상품코드** | `product_codes` | JSON/Array | N | 기 보유 카드 상품 코드 목록 |
| **부서정보** | `depts` | JSON/Array | N | (법인 전용) 보유 부서 목록 |
| **신용카드보유** | `has_credit` | BOOLEAN | Y | 신용카드 보유 여부 |
| **체크카드보유** | `has_check` | BOOLEAN | Y | 체크카드 보유 여부 |

### JSON 예시 (Mock Data)
```json
{
  "1118111111": {
    "biz_no": "1118111111",
    "cust_type": "CORP",
    "cust_name": "(주)KB테스트",
    "rep_name": "홍길동",
    "cust_status": "NORMAL",
    "depts": ["영업부", "관리부", "IT개발팀"],
    "has_credit": true,
    "has_check": false
  }
}
```

---

## 2. 신청서 접수 원장 (Application Ledger) / `kb_ledg_{ID}`
**목적**: 시나리오 진행을 통해 수집된 모든 신청 정보를 저장함. (Transaction Data)

### 2.1. 헤더 (Header) — 신청 메타데이터

| 논리명 | 물리명 | 타입 | 설명 |
| :--- | :--- | :--- | :--- |
| **원장 ID** | `ledger_id` | VARCHAR | 유니크 신청 번호 (PK) |
| **세션 ID** | `session_id` | VARCHAR | 연결된 세션 ID |
| **시나리오코드** | `sc_code` | VARCHAR | 예: `SC-01-A` |
| **발급구분** | `app_type` | VARCHAR | `NEW` (신규), `ADD` (추가) |
| **카드상품구분** | `card_type` | VARCHAR | `CREDIT` (신용), `CHECK` (체크) |
| **진행상태** | `status` | VARCHAR | `IN_PROGRESS`, `COMPLETED` |
| **접수일시** | `created_at` | DATETIME | 신청 완료 시각 |

### 2.2. 바디 (Body) — 수집 데이터 구조 (JSON)

수집된 데이터는 화면 단위가 아닌 **의미 단위(Domain)**로 구조화하여 저장합니다.

#### A. 신청인 정보 (`applicant`)
| 필드명 | 설명 | 출처 화면 |
| :--- | :--- | :--- |
| `name` | 신청인(실무자/대표자) 성명 | 0010 |
| `rrn` | 주민등록번호 (암호화 대상) | 0010 |
| `mobile` | 휴대전화번호 | 0010 |
| `ci` | 본인인증 CI값 | 0012 |

#### B. 기업/사업자 정보 (`biz_info`)
| 필드명 | 설명 | 출처 화면 |
| :--- | :--- | :--- |
| `biz_no` | 사업자등록번호 | 0001 |
| `biz_name_ko` | 법인명/상호 (국문) | 0015 |
| `biz_name_en` | 법인명/상호 (영문) | 0015 |
| `rep_name_ko` | 대표자명 (국문) | 0014 |
| `rep_name_en` | 대표자명 (영문) | 0014 |
| `corp_reg_no` | 법인등록번호 | 0016 |
| `address` | 사업장 주소 (우편번호 포함) | 0015/0016 |
| `founded_date` | 설립일 | 0015 |

#### C. 거래 목적 및 자금 (`edd`)
| 필드명 | 설명 | 출처 화면 |
| :--- | :--- | :--- |
| `purpose` | 거래목적 | 0017 |
| `fund_source` | 자금원천 | 0017 |

#### D. 상품 및 결제 정보 (`product_payment`)
| 필드명 | 설명 | 출처 화면 |
| :--- | :--- | :--- |
| `requested_limit` | 요청 한도 | 0019 |
| `billing_day` | 결제일 | 0022 |
| `bank_code` | 결제 은행 | 0023 |
| `account_no` | 계좌번호 | 0023 |
| `card_product_id` | 신청 카드 ID | 0021 |

#### E. 동의 내역 (`agreements`)
| 필드명 | 설명 | 출처 화면 |
| :--- | :--- | :--- |
| `terms_credit` | 신용카드 약관 동의 여부 | 0009 |
| `credit_inquiry` | 신용정보 조회 동의 여부 | 0011 |

---

## 3. 구현 가이드

### 회원 원장 연동 (`checkMember`)
- 입력된 `biz_no`를 `MEMBER_DB`에서 조회.
- 존재 시: `cust_type`, `has_credit` 등을 반환 → **추가 발급** 프로세스로 유도.
- 미존재 시: 4번째 자리수 로직으로 `CORP`/`INDIV` 추정 → **신규 발급** 프로세스로 유도.

### 신청서 원장 생성 (`completeSession`)
- `SessionDB`에 `flat`하게 저장된 필드들을 위 **2.2 바디 구조**에 맞춰 매핑(Mapping)하여 최종 JSON 생성.
- 예: `0015_companyNameKo` → `biz_info.biz_name_ko`
