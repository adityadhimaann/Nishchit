export interface ScenarioField {
  id: string;
  labelHindi: string;
  value: string;
  status: 'verified' | 'requires_review';
  confidence: number;
  source?: string;
  criticCheck?: string;
}

export interface AmbiguityOption {
  id: string;
  labelHindi: string;
  labelEn: string;
  targetField: string | null;
}

export interface AmbiguousItem {
  id: string;
  labelHindi: string;
  rawNumber: string;
  spokenSnippet: string;
  status: 'requires_review';
  confidence: number;
  criticFailureReason: string;
  promptQuestion: string;
  options: AmbiguityOption[];
}

export interface ScenarioTechLog {
  extractorOutput: Record<string, any>;
  criticDecision: string;
  criticRationale: string;
  finalAction: string;
}

export interface Scenario {
  id: string;
  nameHindi: string;
  nameEn: string;
  speechTranscript: string;
  speechAudioSimulatedDuration: number;
  fields: ScenarioField[];
  ambiguousItem: AmbiguousItem | null;
  techLog: ScenarioTechLog;
}

export const SCENARIOS: Record<string, Scenario> = {
  ambiguous_number: {
    id: "ambiguous_number",
    nameHindi: "२. अस्पष्ट नंबर (हीरो डेमो)",
    nameEn: "2. Ambiguous Number (Hero Demo)",
    speechTranscript: "मेरा नाम रमेश कुमार है, गांव रामपुर है, income पांच लाख है और number 1234 है।",
    speechAudioSimulatedDuration: 7,
    fields: [
      {
        id: "name",
        labelHindi: "नाम (Name)",
        value: "रमेश कुमार",
        status: "verified",
        confidence: 0.994,
        source: "Extracted from 'मेरा नाम रमेश कुमार है'",
        criticCheck: "PASSED: Explicit semantic anchor 'नाम' present."
      },
      {
        id: "dob",
        labelHindi: "जन्म तिथि (Date of Birth)",
        value: "12 मई 1978",
        status: "verified",
        confidence: 0.985,
        source: "Matched with rural citizen KYC registry",
        criticCheck: "PASSED: Standard default matched from linked record."
      },
      {
        id: "gender",
        labelHindi: "लिंग (Gender)",
        value: "पुरुष (Male)",
        status: "verified",
        confidence: 0.991,
        source: "Gram Panchayat Registry match",
        criticCheck: "PASSED: Deterministic schema match."
      },
      {
        id: "address",
        labelHindi: "पता / गांव (Village / Address)",
        value: "रामपुर, उत्तर प्रदेश",
        status: "verified",
        confidence: 0.982,
        source: "Extracted from 'गांव रामपुर है'",
        criticCheck: "PASSED: Valid UP village entity resolved."
      },
      {
        id: "income",
        labelHindi: "वार्षिक आय (Annual Income)",
        value: "₹5,00,000",
        status: "verified",
        confidence: 0.988,
        source: "Extracted from 'income पांच लाख है'",
        criticCheck: "PASSED: Numeric currency conversion validated."
      },
      {
        id: "occupation",
        labelHindi: "व्यवसाय (Occupation)",
        value: "कृषि / किसान (Farmer)",
        status: "verified",
        confidence: 0.975,
        source: "Panchayat registry profile",
        criticCheck: "PASSED: Rural occupation taxonomy."
      }
    ],
    ambiguousItem: {
      id: "unresolved_number",
      labelHindi: "खाता / संदर्भ नंबर",
      rawNumber: "1234",
      spokenSnippet: "number 1234 है",
      status: "requires_review",
      confidence: 0.342,
      criticFailureReason: "Semantic Ambiguity: Insufficient evidence to determine whether '1234' refers to Bank Account Number, Application Reference, or Customer ID.",
      promptQuestion: "यह नंबर किसका है?",
      options: [
        { id: "account_no", labelHindi: "🏦 खाता नंबर", labelEn: "Account Number", targetField: "account_number" },
        { id: "ref_no", labelHindi: "📄 संदर्भ नंबर", labelEn: "Reference Number", targetField: "reference_number" },
        { id: "cust_id", labelHindi: "🪪 ग्राहक ID", labelEn: "Customer ID", targetField: "customer_id" },
        { id: "skip", labelHindi: "✕ छोड़ें", labelEn: "Skip / Ignore", targetField: null }
      ]
    },
    techLog: {
      extractorOutput: { name: "रमेश कुमार", village: "रामपुर", income: 500000, unassigned_tokens: ["number 1234"] },
      criticDecision: "HALT_PARTIAL_AUTOFILL",
      criticRationale: "Token '1234' matches schema patterns for both 'account_no' (last 4 digits) and 'ref_no'. Dual-agent consensus score 0.342 < 0.85 threshold. Hallucination guard triggered. Escalate to Operator UI.",
      finalAction: "AUTOFILL_6_FIELDS_AND_REQUEST_HUMAN_DISAMBIGUATION"
    }
  },

  standard_full: {
    id: "standard_full",
    nameHindi: "१. सामान्य जानकारी",
    nameEn: "1. Standard Safe Input",
    speechTranscript: "मेरा नाम सुरेश सिंह है, पिता का नाम हरिलाल है, गांव भगवानपुर है और वार्षिक आय दो लाख रुपये है।",
    speechAudioSimulatedDuration: 5,
    fields: [
      { id: "name", labelHindi: "नाम", value: "सुरेश सिंह", status: "verified", confidence: 0.995 },
      { id: "father", labelHindi: "पिता का नाम", value: "हरिलाल सिंह", status: "verified", confidence: 0.990 },
      { id: "address", labelHindi: "पता / गांव", value: "भगवानपुर, उत्तर प्रदेश", status: "verified", confidence: 0.987 },
      { id: "income", labelHindi: "वार्षिक आय", value: "₹2,00,000", status: "verified", confidence: 0.992 }
    ],
    ambiguousItem: null,
    techLog: {
      extractorOutput: { name: "सुरेश सिंह", father: "हरिलाल सिंह", village: "भगवानपुर", income: 200000 },
      criticDecision: "FULL_AUTOFILL_APPROVED",
      criticRationale: "All 4 extracted slots have unambiguous semantic markers. Consensus score 0.991 > 0.85. Direct autofill executed.",
      finalAction: "ALL_FIELDS_COMMITTED"
    }
  },

  voice_correction: {
    id: "voice_correction",
    nameHindi: "३. जानकारी में सुधार",
    nameEn: "3. Voice Correction",
    speechTranscript: "मेरा नाम सुनीता देवी है, गांव रामपुर है... अरे नहीं, आय पांच लाख नहीं, तीन लाख लिखिये।",
    speechAudioSimulatedDuration: 6,
    fields: [
      { id: "name", labelHindi: "नाम", value: "सुनीता देवी", status: "verified", confidence: 0.993 },
      { id: "gender", labelHindi: "लिंग", value: "महिला (Female)", status: "verified", confidence: 0.996 },
      { id: "address", labelHindi: "पता / गांव", value: "रामपुर, उत्तर प्रदेश", status: "verified", confidence: 0.985 },
      { id: "income", labelHindi: "वार्षिक आय (संशोधित)", value: "₹3,00,000", status: "verified", confidence: 0.978, source: "Overridden by 'अरे नहीं, तीन लाख लिखिये'" }
    ],
    ambiguousItem: null,
    techLog: {
      extractorOutput: { name: "सुनीता देवी", village: "रामपुर", income_initial: 500000, correction_clause: "income_revised: 300000" },
      criticDecision: "CORRECTION_APPLIED",
      criticRationale: "Discourse marker 'अरे नहीं' identified negation of prior slot 500000 and substituted 300000. Verified with confidence 0.978.",
      finalAction: "CORRECTED_AND_COMMITTED"
    }
  },

  vague_income: {
    id: "vague_income",
    nameHindi: "४. अनुमानित / अस्पष्ट आय",
    nameEn: "4. Vague Income Input",
    speechTranscript: "मेरा नाम मोहन लाल है, रामपुर से हूं, थोड़ा बहुत कमा लेते हैं खेती से।",
    speechAudioSimulatedDuration: 5,
    fields: [
      { id: "name", labelHindi: "नाम", value: "मोहन लाल", status: "verified", confidence: 0.991 },
      { id: "address", labelHindi: "पता / गांव", value: "रामपुर, उत्तर प्रदेश", status: "verified", confidence: 0.980 },
      { id: "occupation", labelHindi: "व्यवसाय", value: "खेती / किसान (Agriculture)", status: "verified", confidence: 0.965 }
    ],
    ambiguousItem: {
      id: "unresolved_income",
      labelHindi: "वार्षिक आय (Annual Income)",
      rawNumber: "थोड़ा बहुत",
      spokenSnippet: "थोड़ा बहुत कमा लेते हैं",
      status: "requires_review",
      confidence: 0.210,
      criticFailureReason: "Qualitative / Non-Numeric Value: 'थोड़ा बहुत' cannot be converted to a legal currency bracket without human declaration.",
      promptQuestion: "अनुमानित वार्षिक आय वर्ग चुनें:",
      options: [
        { id: "inc_1", labelHindi: "₹1,00,000 से कम", labelEn: "< ₹1 Lakh (BPL)", targetField: "income" },
        { id: "inc_2", labelHindi: "₹1,00,000 - ₹2,50,000", labelEn: "₹1L - ₹2.5L", targetField: "income" },
        { id: "inc_3", labelHindi: "₹2,50,000 - ₹5,00,000", labelEn: "₹2.5L - ₹5L", targetField: "income" },
        { id: "skip", labelHindi: "✕ बाद में भरें", labelEn: "Fill Later", targetField: null }
      ]
    },
    techLog: {
      extractorOutput: { name: "मोहन लाल", village: "रामपुर", occupation: "खेती", income_vague: "थोड़ा बहुत" },
      criticDecision: "HALT_NON_NUMERIC_FIELD",
      criticRationale: "Financial regulations require exact INR amount. Critic suppressed auto-guessing. Requested operator bracket selection.",
      finalAction: "ESCALATE_INCOME_BRACKET"
    }
  },

  invalid_pin: {
    id: "invalid_pin",
    nameHindi: "५. गलत पिन कोड",
    nameEn: "5. Invalid PIN Schema",
    speechTranscript: "मेरा नाम कालू राम है, गांव रामपुर है और पिन कोड बाइस चौंतीस है।",
    speechAudioSimulatedDuration: 5,
    fields: [
      { id: "name", labelHindi: "नाम", value: "कालू राम", status: "verified", confidence: 0.990 },
      { id: "address", labelHindi: "पता / गांव", value: "रामपुर, उत्तर प्रदेश", status: "verified", confidence: 0.982 }
    ],
    ambiguousItem: {
      id: "unresolved_pin",
      labelHindi: "पिन कोड (Postal PIN)",
      rawNumber: "2234",
      spokenSnippet: "पिन कोड बाइस चौंतीस (2234)",
      status: "requires_review",
      confidence: 0.150,
      criticFailureReason: "Schema Constraint Violation: Indian Postal PIN requires 6 digits. Spoken input '2234' is only 4 digits.",
      promptQuestion: "रामपुर का सही 6-अंकीय पिन कोड क्या है?",
      options: [
        { id: "pin_1", labelHindi: "📮 221001 (वाराणसी)", labelEn: "221001", targetField: "pincode" },
        { id: "pin_2", labelHindi: "📮 221005 (रामनगर)", labelEn: "221005", targetField: "pincode" },
        { id: "pin_3", labelHindi: "📮 221311 (राजातालाब)", labelEn: "221311", targetField: "pincode" },
        { id: "skip", labelHindi: "✕ हाथ से टाइप करें", labelEn: "Manual Entry", targetField: null }
      ]
    },
    techLog: {
      extractorOutput: { name: "कालू राम", village: "रामपुर", pin_candidate: "2234" },
      criticDecision: "SCHEMA_VALIDATION_FAILED",
      criticRationale: "Regex ^[1-9][0-9]{5}$ failed on '2234'. Critic blocked autofill and queried localized pin directory.",
      finalAction: "POSTAL_DIRECTORY_ASSIST"
    }
  }
};
