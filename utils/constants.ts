import { ConfigKeys } from "./types";

export const MOBILE_PHONE_REGEX = /^[1-9]{1}[0-9]{9}$/;
export const PASSWORD_REGEX = /.{8,}/;
export const EMAIL_CHECK_REGEX = /\S+@\S+\.\S+/;

export const DEFAULT_COORDINATES = {
    LAT: 28.4634,
    LNG: 77.0768,
};

export const CONFIGS_INITIAL_STATE = {
    [ConfigKeys.BHK_TYPE]: [],
    [ConfigKeys.PLOT_SIZE]: [],
    [ConfigKeys.FACING]: [],
    [ConfigKeys.FLOORS]: [],
    [ConfigKeys.BUILDER_NAME]: [],
    [ConfigKeys.LOCALITY]: [],
    [ConfigKeys.LOCATIONS]: [],
    [ConfigKeys.CONSTRUCTION_STATUS]: [
        { _id: "uc", value: "uc", label: "Under Construction" },
        { _id: "rtm", value: "rtm", label: "Ready to move" },
    ],
    [ConfigKeys.PROPERTY_FOR]: [],
    [ConfigKeys.PROPERTY_SEGMENT]: [],
    [ConfigKeys.TENANT_PREFERRED]: [],
    [ConfigKeys.LEAD_SOURCE]: [],
    [ConfigKeys.SOCIETY_NAME]: [],
    [ConfigKeys.PROPERTY_TYPE]: [],
    [ConfigKeys.FURNISHING]: [],
    [ConfigKeys.BUDGET]: { min: 0, max: 0 },
};

export const USER_TYPE = {
    BUILDER: "builder",
    BROKER: "broker",
};

export const PLAN_TYPE = {
    PRO: "0",
    BASIC: "1",
    FREE: "-1",
};

export const FACING: { [key: string]: string } = {
    FN: "North",
    FS: "South",
    FE: "East",
    FW: "West",
};

export const CONSTRUCTION_STATUS: { [key: string]: string } = {
    uc2: "Under Construction",
    uc6: "Under Construction",
    uc: "Under Construction",
    rtm: "Ready to Move",
    forBooking: "For booking",
};

export enum LeadsStatus {
    WON = "WON",
    LOST = "LOST",
}

export const COUNTRY_CODES: {
    text: string | number;
    value: string | number;
    key: string;
}[] = [
    {
        key: "AF",
        value: "+93",
        text: "+93",
    },
    {
        key: "AX",
        value: "+358",
        text: "+358",
    },
    {
        key: "AL",
        value: "+355",
        text: "+355",
    },
    {
        key: "DZ",
        value: "+213",
        text: "+213",
    },
    {
        key: "AS",
        value: "+1684",
        text: "+1684",
    },
    {
        key: "AD",
        value: "+376",
        text: "+376",
    },
    {
        key: "AO",
        value: "+244",
        text: "+244",
    },
    {
        key: "AI",
        value: "+1264",
        text: "+1264",
    },
    {
        key: "AQ",
        value: "+672",
        text: "+672",
    },
    {
        key: "AG",
        value: "+1268",
        text: "+1268",
    },
    {
        key: "AR",
        value: "+54",
        text: "+54",
    },
    {
        key: "AM",
        value: "+374",
        text: "+374",
    },
    {
        key: "AW",
        value: "+297",
        text: "+297",
    },
    {
        key: "AU",
        value: "+61",
        text: "+61",
    },
    {
        key: "AT",
        value: "+43",
        text: "+43",
    },
    {
        key: "AZ",
        value: "+994",
        text: "+994",
    },
    {
        key: "BS",
        value: "+1242",
        text: "+1242",
    },
    {
        key: "BH",
        value: "+973",
        text: "+973",
    },
    {
        key: "BD",
        value: "+880",
        text: "+880",
    },
    {
        key: "BB",
        value: "+1246",
        text: "+1246",
    },
    {
        key: "BY",
        value: "+375",
        text: "+375",
    },
    {
        key: "BE",
        value: "+32",
        text: "+32",
    },
    {
        key: "BZ",
        value: "+501",
        text: "+501",
    },
    {
        key: "BJ",
        value: "+229",
        text: "+229",
    },
    {
        key: "BM",
        value: "+1441",
        text: "+1441",
    },
    {
        key: "BT",
        value: "+975",
        text: "+975",
    },
    {
        key: "BO",
        value: "+591",
        text: "+591",
    },
    {
        key: "BA",
        value: "+387",
        text: "+387",
    },
    {
        key: "BW",
        value: "+267",
        text: "+267",
    },
    {
        key: "BR",
        value: "+55",
        text: "+55",
    },
    {
        key: "IO",
        value: "+246",
        text: "+246",
    },
    {
        key: "BN",
        value: "+673",
        text: "+673",
    },
    {
        key: "BG",
        value: "+359",
        text: "+359",
    },
    {
        key: "BF",
        value: "+226",
        text: "+226",
    },
    {
        key: "BI",
        value: "+257",
        text: "+257",
    },
    {
        key: "KH",
        value: "+855",
        text: "+855",
    },
    {
        key: "CM",
        value: "+237",
        text: "+237",
    },
    {
        key: "CA",
        value: "+1",
        text: "+1",
    },
    {
        key: "CV",
        value: "+238",
        text: "+238",
    },
    {
        key: "KY",
        value: "+ 345",
        text: "+ 345",
    },
    {
        key: "CF",
        value: "+236",
        text: "+236",
    },
    {
        key: "TD",
        value: "+235",
        text: "+235",
    },
    {
        key: "CL",
        value: "+56",
        text: "+56",
    },
    {
        key: "CN",
        value: "+86",
        text: "+86",
    },
    {
        key: "CX",
        value: "+61",
        text: "+61",
    },
    {
        key: "CC",
        value: "+61",
        text: "+61",
    },
    {
        key: "CO",
        value: "+57",
        text: "+57",
    },
    {
        key: "KM",
        value: "+269",
        text: "+269",
    },
    {
        key: "CG",
        value: "+242",
        text: "+242",
    },
    {
        key: "CD",
        value: "+243",
        text: "+243",
    },
    {
        key: "CK",
        value: "+682",
        text: "+682",
    },
    {
        key: "CR",
        value: "+506",
        text: "+506",
    },
    {
        key: "CI",
        value: "+225",
        text: "+225",
    },
    {
        key: "HR",
        value: "+385",
        text: "+385",
    },
    {
        key: "CU",
        value: "+53",
        text: "+53",
    },
    {
        key: "CY",
        value: "+357",
        text: "+357",
    },
    {
        key: "CZ",
        value: "+420",
        text: "+420",
    },
    {
        key: "DK",
        value: "+45",
        text: "+45",
    },
    {
        key: "DJ",
        value: "+253",
        text: "+253",
    },
    {
        key: "DM",
        value: "+1767",
        text: "+1767",
    },
    {
        key: "DO",
        value: "+1849",
        text: "+1849",
    },
    {
        key: "EC",
        value: "+593",
        text: "+593",
    },
    {
        key: "EG",
        value: "+20",
        text: "+20",
    },
    {
        key: "SV",
        value: "+503",
        text: "+503",
    },
    {
        key: "GQ",
        value: "+240",
        text: "+240",
    },
    {
        key: "ER",
        value: "+291",
        text: "+291",
    },
    {
        key: "EE",
        value: "+372",
        text: "+372",
    },
    {
        key: "ET",
        value: "+251",
        text: "+251",
    },
    {
        key: "FK",
        value: "+500",
        text: "+500",
    },
    {
        key: "FO",
        value: "+298",
        text: "+298",
    },
    {
        key: "FJ",
        value: "+679",
        text: "+679",
    },
    {
        key: "FI",
        value: "+358",
        text: "+358",
    },
    {
        key: "FR",
        value: "+33",
        text: "+33",
    },
    {
        key: "GF",
        value: "+594",
        text: "+594",
    },
    {
        key: "PF",
        value: "+689",
        text: "+689",
    },
    {
        key: "GA",
        value: "+241",
        text: "+241",
    },
    {
        key: "GM",
        value: "+220",
        text: "+220",
    },
    {
        key: "GE",
        value: "+995",
        text: "+995",
    },
    {
        key: "DE",
        value: "+49",
        text: "+49",
    },
    {
        key: "GH",
        value: "+233",
        text: "+233",
    },
    {
        key: "GI",
        value: "+350",
        text: "+350",
    },
    {
        key: "GR",
        value: "+30",
        text: "+30",
    },
    {
        key: "GL",
        value: "+299",
        text: "+299",
    },
    {
        key: "GD",
        value: "+1473",
        text: "+1473",
    },
    {
        key: "GP",
        value: "+590",
        text: "+590",
    },
    {
        key: "GU",
        value: "+1671",
        text: "+1671",
    },
    {
        key: "GT",
        value: "+502",
        text: "+502",
    },
    {
        key: "GG",
        value: "+44",
        text: "+44",
    },
    {
        key: "GN",
        value: "+224",
        text: "+224",
    },
    {
        key: "GW",
        value: "+245",
        text: "+245",
    },
    {
        key: "GY",
        value: "+595",
        text: "+595",
    },
    {
        key: "HT",
        value: "+509",
        text: "+509",
    },
    {
        key: "VA",
        value: "+379",
        text: "+379",
    },
    {
        key: "HN",
        value: "+504",
        text: "+504",
    },
    {
        key: "HK",
        value: "+852",
        text: "+852",
    },
    {
        key: "HU",
        value: "+36",
        text: "+36",
    },
    {
        key: "IS",
        value: "+354",
        text: "+354",
    },
    {
        key: "IN",
        value: "+91",
        text: "+91",
    },
    {
        key: "ID",
        value: "+62",
        text: "+62",
    },
    {
        key: "IR",
        value: "+98",
        text: "+98",
    },
    {
        key: "IQ",
        value: "+964",
        text: "+964",
    },
    {
        key: "IE",
        value: "+353",
        text: "+353",
    },
    {
        key: "IM",
        value: "+44",
        text: "+44",
    },
    {
        key: "IL",
        value: "+972",
        text: "+972",
    },
    {
        key: "IT",
        value: "+39",
        text: "+39",
    },
    {
        key: "JM",
        value: "+1876",
        text: "+1876",
    },
    {
        key: "JP",
        value: "+81",
        text: "+81",
    },
    {
        key: "JE",
        value: "+44",
        text: "+44",
    },
    {
        key: "JO",
        value: "+962",
        text: "+962",
    },
    {
        key: "KZ",
        value: "+77",
        text: "+77",
    },
    {
        key: "KE",
        value: "+254",
        text: "+254",
    },
    {
        key: "KI",
        value: "+686",
        text: "+686",
    },
    {
        key: "KP",
        value: "+850",
        text: "+850",
    },
    {
        key: "KR",
        value: "+82",
        text: "+82",
    },
    {
        key: "KW",
        value: "+965",
        text: "+965",
    },
    {
        key: "KG",
        value: "+996",
        text: "+996",
    },
    {
        key: "LA",
        value: "+856",
        text: "+856",
    },
    {
        key: "LV",
        value: "+371",
        text: "+371",
    },
    {
        key: "LB",
        value: "+961",
        text: "+961",
    },
    {
        key: "LS",
        value: "+266",
        text: "+266",
    },
    {
        key: "LR",
        value: "+231",
        text: "+231",
    },
    {
        key: "LY",
        value: "+218",
        text: "+218",
    },
    {
        key: "LI",
        value: "+423",
        text: "+423",
    },
    {
        key: "LT",
        value: "+370",
        text: "+370",
    },
    {
        key: "LU",
        value: "+352",
        text: "+352",
    },
    {
        key: "MO",
        value: "+853",
        text: "+853",
    },
    {
        key: "MK",
        value: "+389",
        text: "+389",
    },
    {
        key: "MG",
        value: "+261",
        text: "+261",
    },
    {
        key: "MW",
        value: "+265",
        text: "+265",
    },
    {
        key: "MY",
        value: "+60",
        text: "+60",
    },
    {
        key: "MV",
        value: "+960",
        text: "+960",
    },
    {
        key: "ML",
        value: "+223",
        text: "+223",
    },
    {
        key: "MT",
        value: "+356",
        text: "+356",
    },
    {
        key: "MH",
        value: "+692",
        text: "+692",
    },
    {
        key: "MQ",
        value: "+596",
        text: "+596",
    },
    {
        key: "MR",
        value: "+222",
        text: "+222",
    },
    {
        key: "MU",
        value: "+230",
        text: "+230",
    },
    {
        key: "YT",
        value: "+262",
        text: "+262",
    },
    {
        key: "MX",
        value: "+52",
        text: "+52",
    },
    {
        key: "FM",
        value: "+691",
        text: "+691",
    },
    {
        key: "MD",
        value: "+373",
        text: "+373",
    },
    {
        key: "MC",
        value: "+377",
        text: "+377",
    },
    {
        key: "MN",
        value: "+976",
        text: "+976",
    },
    {
        key: "ME",
        value: "+382",
        text: "+382",
    },
    {
        key: "MS",
        value: "+1664",
        text: "+1664",
    },
    {
        key: "MA",
        value: "+212",
        text: "+212",
    },
    {
        key: "MZ",
        value: "+258",
        text: "+258",
    },
    {
        key: "MM",
        value: "+95",
        text: "+95",
    },
    {
        key: "NA",
        value: "+264",
        text: "+264",
    },
    {
        key: "NR",
        value: "+674",
        text: "+674",
    },
    {
        key: "NP",
        value: "+977",
        text: "+977",
    },
    {
        key: "NL",
        value: "+31",
        text: "+31",
    },
    {
        key: "AN",
        value: "+599",
        text: "+599",
    },
    {
        key: "NC",
        value: "+687",
        text: "+687",
    },
    {
        key: "NZ",
        value: "+64",
        text: "+64",
    },
    {
        key: "NI",
        value: "+505",
        text: "+505",
    },
    {
        key: "NE",
        value: "+227",
        text: "+227",
    },
    {
        key: "NG",
        value: "+234",
        text: "+234",
    },
    {
        key: "NU",
        value: "+683",
        text: "+683",
    },
    {
        key: "NF",
        value: "+672",
        text: "+672",
    },
    {
        key: "MP",
        value: "+1670",
        text: "+1670",
    },
    {
        key: "NO",
        value: "+47",
        text: "+47",
    },
    {
        key: "OM",
        value: "+968",
        text: "+968",
    },
    {
        key: "PK",
        value: "+92",
        text: "+92",
    },
    {
        key: "PW",
        value: "+680",
        text: "+680",
    },
    {
        key: "PS",
        value: "+970",
        text: "+970",
    },
    {
        key: "PA",
        value: "+507",
        text: "+507",
    },
    {
        key: "PG",
        value: "+675",
        text: "+675",
    },
    {
        key: "PY",
        value: "+595",
        text: "+595",
    },
    {
        key: "PE",
        value: "+51",
        text: "+51",
    },
    {
        key: "PH",
        value: "+63",
        text: "+63",
    },
    {
        key: "PN",
        value: "+872",
        text: "+872",
    },
    {
        key: "PL",
        value: "+48",
        text: "+48",
    },
    {
        key: "PT",
        value: "+351",
        text: "+351",
    },
    {
        key: "PR",
        value: "+1939",
        text: "+1939",
    },
    {
        key: "QA",
        value: "+974",
        text: "+974",
    },
    {
        key: "RO",
        value: "+40",
        text: "+40",
    },
    {
        key: "RU",
        value: "+7",
        text: "+7",
    },
    {
        key: "RW",
        value: "+250",
        text: "+250",
    },
    {
        key: "RE",
        value: "+262",
        text: "+262",
    },
    {
        key: "BL",
        value: "+590",
        text: "+590",
    },
    {
        key: "SH",
        value: "+290",
        text: "+290",
    },
    {
        key: "KN",
        value: "+1869",
        text: "+1869",
    },
    {
        key: "LC",
        value: "+1758",
        text: "+1758",
    },
    {
        key: "MF",
        value: "+590",
        text: "+590",
    },
    {
        key: "PM",
        value: "+508",
        text: "+508",
    },
    {
        key: "VC",
        value: "+1784",
        text: "+1784",
    },
    {
        key: "WS",
        value: "+685",
        text: "+685",
    },
    {
        key: "SM",
        value: "+378",
        text: "+378",
    },
    {
        key: "ST",
        value: "+239",
        text: "+239",
    },
    {
        key: "SA",
        value: "+966",
        text: "+966",
    },
    {
        key: "SN",
        value: "+221",
        text: "+221",
    },
    {
        key: "RS",
        value: "+381",
        text: "+381",
    },
    {
        key: "SC",
        value: "+248",
        text: "+248",
    },
    {
        key: "SL",
        value: "+232",
        text: "+232",
    },
    {
        key: "SG",
        value: "+65",
        text: "+65",
    },
    {
        key: "SK",
        value: "+421",
        text: "+421",
    },
    {
        key: "SI",
        value: "+386",
        text: "+386",
    },
    {
        key: "SB",
        value: "+677",
        text: "+677",
    },
    {
        key: "SO",
        value: "+252",
        text: "+252",
    },
    {
        key: "ZA",
        value: "+27",
        text: "+27",
    },
    {
        key: "SS",
        value: "+211",
        text: "+211",
    },
    {
        key: "GS",
        value: "+500",
        text: "+500",
    },
    {
        key: "ES",
        value: "+34",
        text: "+34",
    },
    {
        key: "LK",
        value: "+94",
        text: "+94",
    },
    {
        key: "SD",
        value: "+249",
        text: "+249",
    },
    {
        key: "SR",
        value: "+597",
        text: "+597",
    },
    {
        key: "SJ",
        value: "+47",
        text: "+47",
    },
    {
        key: "SZ",
        value: "+268",
        text: "+268",
    },
    {
        key: "SE",
        value: "+46",
        text: "+46",
    },
    {
        key: "CH",
        value: "+41",
        text: "+41",
    },
    {
        key: "SY",
        value: "+963",
        text: "+963",
    },
    {
        key: "TW",
        value: "+886",
        text: "+886",
    },
    {
        key: "TJ",
        value: "+992",
        text: "+992",
    },
    {
        key: "TZ",
        value: "+255",
        text: "+255",
    },
    {
        key: "TH",
        value: "+66",
        text: "+66",
    },
    {
        key: "TL",
        value: "+670",
        text: "+670",
    },
    {
        key: "TG",
        value: "+228",
        text: "+228",
    },
    {
        key: "TK",
        value: "+690",
        text: "+690",
    },
    {
        key: "TO",
        value: "+676",
        text: "+676",
    },
    {
        key: "TT",
        value: "+1868",
        text: "+1868",
    },
    {
        key: "TN",
        value: "+216",
        text: "+216",
    },
    {
        key: "TR",
        value: "+90",
        text: "+90",
    },
    {
        key: "TM",
        value: "+993",
        text: "+993",
    },
    {
        key: "TC",
        value: "+1649",
        text: "+1649",
    },
    {
        key: "TV",
        value: "+688",
        text: "+688",
    },
    {
        key: "UG",
        value: "+256",
        text: "+256",
    },
    {
        key: "UA",
        value: "+380",
        text: "+380",
    },
    {
        key: "AE",
        value: "+971",
        text: "+971",
    },
    {
        key: "GB",
        value: "+44",
        text: "+44",
    },
    {
        key: "US",
        value: "+1",
        text: "+1",
    },
    {
        key: "UY",
        value: "+598",
        text: "+598",
    },
    {
        key: "UZ",
        value: "+998",
        text: "+998",
    },
    {
        key: "VU",
        value: "+678",
        text: "+678",
    },
    {
        key: "VE",
        value: "+58",
        text: "+58",
    },
    {
        key: "VN",
        value: "+84",
        text: "+84",
    },
    {
        key: "VG",
        value: "+1284",
        text: "+1284",
    },
    {
        key: "VI",
        value: "+1340",
        text: "+1340",
    },
    {
        key: "WF",
        value: "+681",
        text: "+681",
    },
    {
        key: "YE",
        value: "+967",
        text: "+967",
    },
    {
        key: "ZM",
        value: "+260",
        text: "+260",
    },
    {
        key: "ZW",
        value: "+263",
        text: "+263",
    },
];
