import { CrimeFilterState } from "@/types/map.interface";
import { SidebarState } from "@/types/charts.interface";
export const TABLE_ROW_CLASSES = {
  form_label: "text-gray-500 font-semibold w-full",
  form_input: "rounded p-2 border border-gray-300 w-full",
  form_row: "flex items-center",
};

export const HEADER_CLASSES = {
  view_button: "bg-blue-500 text-white rounded",
};

interface CrimeFilters {
  [category: string]: {
    [subcategory: string]: {
      [name: string]: string;
    };
  };
}

export const crimeFilters: CrimeFilters = {
  "Violent Crimes": {
    "Assault & Battery": {
      Battery: "242 PC",
      "Battery on a Peace Officer": "243(B) PC",
      "Battery Causing Serious Bodily Injury": "243(D) PC",
      "Domestic Battery": "243(E)(1) PC",
      "Assault with Caustic Chemicals": "244 PC",
      "Assault with a Stun Gun or Taser": "244.5(B) PC",
      "Assault with a Deadly Weapon (not a firearm)": "245(A)(1) PC",
      "Assault by Means Likely to Produce Great Bodily Injury": "245(A)(4) PC",
    },
    "Domestic Violence": {
      "Infliction of Injury on a Spouse or Cohabitant": "273.5(A) PC",
      "Corporal Injury Resulting in a Traumatic Condition": "273.5(D) PC",
      "Violation of a Protective Order": "273.6(A) PC",
    },
    "Kidnapping & False Imprisonment": {
      Kidnapping: "207(A) PC",
      "False Imprisonment": "236 PC",
    },
    "Robbery & Carjacking": {
      Robbery: "211 PC",
      Carjacking: "215(A) PC",
    },
    "Homicide-Related": {
      Mayhem: "203 PC",
    },
    "Weapons Violations": {
      "Carrying a Concealed Dirk or Dagger": "21310 PC",
      "Possession of a Switchblade Knife": "21510 PC",
      "Possession of Metal Knuckles": "21810 PC",
      "Possession of a Baton or Leaded Cane": "22210 PC",
      "Carrying a Concealed Firearm in a Vehicle": "25400(A)(1) PC",
      "Carrying a Loaded Firearm in Public": "25850(A) PC",
    },
  },

  "Sex Crimes": {
    "Sexual Assault": {
      "Rape by Force or Fear": "261(A)(2) PC",
      "Rape of an Unconscious Person": "261(A)(4) PC",
      "Forcible Sexual Penetration": "289(A)(1)(A) PC",
    },
    "Indecency & Exploitation": {
      "Possession of Child Pornography": "311.11(A) PC",
      "Indecent Exposure": "314.1 PC",
      "Annoying or Molesting a Child": "647.6(A)(1) PC",
    },
  },

  "Crimes Against Children & Elderly": {
    "Child Abuse & Endangerment": {
      "Child Endangerment Likely to Produce Great Bodily Harm": "273A(A) PC",
      "Child Endangerment Not Likely to Produce Great Bodily Harm":
        "273A(B) PC",
      "Corporal Punishment or Injury on a Child": "273D(A) PC",
    },
    "Elder Abuse": {
      "Elder or Dependent Adult Abuse": "368(A) PC",
      "Elder Abuse: Non-Caretaker": "368(C) PC",
      "Theft or Embezzlement from Elder by Caretaker": "368(D) PC",
      "Theft or Embezzlement from Elder by Non-Caretaker": "368(E) PC",
    },
    "Child Exploitation": {
      "Lewd Acts with a Child Aged 14 or 15": "288(C)(1) PC",
    },
  },

  "Theft & Fraud": {
    "Burglary & Theft": {
      Burglary: "459 PC",
      "Grand Theft: Automobile": "487(D) PC",
      "Petty Theft": "488 PC",
      "Receiving Stolen Property": "496(A) PC",
    },
    "Financial Crimes": {
      Forgery: "470(A) PC",
      "Possession of Forged Documents": "475(A) PC",
      "Making or Passing Fictitious Checks": "476 PC",
      "False Personation": "530 PC",
      "Identity Theft": "530.5(A) PC",
    },
    Embezzlement: {
      Embezzlement: "503 PC",
    },
  },

  "Drug-Related Crimes": {
    Possession: {
      "Possession of Controlled Substance": "11350(A) HS",
      "Possession for Sale of Controlled Substance": "11351 HS",
      "Possession of Marijuana for Sale": "11359(B) HS",
      "Possession of Methamphetamine": "11377(A) HS",
    },
    "Sales & Distribution": {
      "Possession for Sale of Methamphetamine": "11378 HS",
      "Transportation or Sale of Controlled Substance": "11379(A) HS",
    },
    "Under the Influence": {
      "Under the Influence of a Controlled Substance": "11550(A) HS",
    },
    "Controlled Substance Paraphernalia": {
      "Possession of Drug Paraphernalia": "11364(A) HS",
    },
  },

  "DUI & Traffic Violations": {
    "DUI & Reckless Driving": {
      "DUI: Alcohol or Drugs": "23152(A) VC",
      "DUI: Blood Alcohol Content 0.08% or More": "23152(B) VC",
      "DUI Causing Injury": "23153(A) VC",
      "DUI Causing Injury with BAC 0.08% or More": "23153(B) VC",
    },
    "Hit & Run": {
      "Hit and Run Causing Injury or Death": "20001(A) VC",
      "Hit and Run Causing Property Damage": "20002(A) VC",
    },
    "License & Registration Violations": {
      "Driving Without a License": "12500(A) VC",
      "Driving with a Suspended License": "14601.1(A) VC",
    },
  },

  "Public Disturbances & Nuisances": {
    "Disorderly Conduct": {
      "Solicitation of Prostitution": "647(B) PC",
      "Lodging Without Permission": "647(E) PC",
      "Public Intoxication": "647(F) PC",
    },
    "Public Nuisance": {
      "Public Nuisance": "372 PC",
      "Illegal Dumping": "374.3(A) PC",
    },
  },

  "Environmental & Hazardous Waste Violations": {
    "Pollution & Waste": {
      "San Rafael Municipal Code: Illegal Dumping": "17-12.170(A) SR",
      "Littering in Waters of the State": "5652 FG",
      "Illegal Disposal of Hazardous Waste": "25189.5(A) HS",
    },
  },

  "Probation & Parole Violations": {
    "Parole/Probation": {
      "Violation of Probation": "1203.2 PC",
      "Parole Hold": "3056 PC",
      "Post-Release Community Supervision Violation": "3452 PC",
    },
  },

  "Court Order Violations": {
    "Protective Orders": {
      "Violation of Court Order: Domestic Violence": "166(C)(1) PC",
      "Violation of Court Order: Civil Harassment": "166(C)(4) PC",
    },
  },
};

export const initialCrimeFilterState: CrimeFilterState = {
  "242 PC": false,
  "243(B) PC": false,
  "243(D) PC": false,
  "243(E)(1) PC": false,
  "244 PC": false,
  "244.5(B) PC": false,
  "245(A)(1) PC": false,
  "245(A)(4) PC": false,
  "273.5(A) PC": false,
  "273.5(D) PC": false,
  "273.6(A) PC": false,
  "207(A) PC": false,
  "236 PC": false,
  "211 PC": false,
  "215(A) PC": false,
  "203 PC": false,
  "21310 PC": false,
  "21510 PC": false,
  "21810 PC": false,
  "22210 PC": false,
  "25400(A)(1) PC": false,
  "25850(A) PC": false,
  "261(A)(2) PC": false,
  "261(A)(4) PC": false,
  "289(A)(1)(A) PC": false,
  "311.11(A) PC": false,
  "314.1 PC": false,
  "647.6(A)(1) PC": false,
  "273A(A) PC": false,
  "273A(B) PC": false,
  "273D(A) PC": false,
  "368(A) PC": false,
  "368(C) PC": false,
  "368(D) PC": false,
  "368(E) PC": false,
  "288(C)(1) PC": false,
  "459 PC": false,
  "487(D) PC": false,
  "488 PC": false,
  "496(A) PC": false,
  "470(A) PC": false,
  "475(A) PC": false,
  "476 PC": false,
  "530 PC": false,
  "530.5(A) PC": false,
  "503 PC": false,
  "11350(A) HS": false,
  "11351 HS": false,
  "11359(B) HS": false,
  "11377(A) HS": false,
  "11378 HS": false,
  "11379(A) HS": false,
  "11550(A) HS": false,
  "11364(A) HS": false,
  "23152(A) VC": false,
  "23152(B) VC": false,
  "23153(A) VC": false,
  "23153(B) VC": false,
  "20001(A) VC": false,
  "20002(A) VC": false,
  "12500(A) VC": false,
  "14601.1(A) VC": false,
  "647(B) PC": false,
  "647(E) PC": false,
  "647(F) PC": false,
  "372 PC": false,
  "374.3(A) PC": false,
  "17-12.170(A) SR": false,
  "5652 FG": false,
  "25189.5(A) HS": false,
  "1203.2 PC": false,
  "3056 PC": false,
  "3452 PC": false,
  "166(C)(1) PC": false,
  "166(C)(4) PC": false,
};

export const checkCrimeFilterState: CrimeFilterState = {
  "242 PC": true,
  "243(B) PC": true,
  "243(D) PC": true,
  "243(E)(1) PC": true,
  "244 PC": true,
  "244.5(B) PC": true,
  "245(A)(1) PC": true,
  "245(A)(4) PC": true,
  "273.5(A) PC": true,
  "273.5(D) PC": true,
  "273.6(A) PC": true,
  "207(A) PC": true,
  "236 PC": true,
  "211 PC": true,
  "215(A) PC": true,
  "203 PC": true,
  "21310 PC": true,
  "21510 PC": true,
  "21810 PC": true,
  "22210 PC": true,
  "25400(A)(1) PC": true,
  "25850(A) PC": true,
  "261(A)(2) PC": true,
  "261(A)(4) PC": true,
  "289(A)(1)(A) PC": true,
  "311.11(A) PC": true,
  "314.1 PC": true,
  "647.6(A)(1) PC": true,
  "273A(A) PC": true,
  "273A(B) PC": true,
  "273D(A) PC": true,
  "368(A) PC": true,
  "368(C) PC": true,
  "368(D) PC": true,
  "368(E) PC": true,
  "288(C)(1) PC": true,
  "459 PC": true,
  "487(D) PC": true,
  "488 PC": true,
  "496(A) PC": true,
  "470(A) PC": true,
  "475(A) PC": true,
  "476 PC": true,
  "530 PC": true,
  "530.5(A) PC": true,
  "503 PC": true,
  "11350(A) HS": true,
  "11351 HS": true,
  "11359(B) HS": true,
  "11377(A) HS": true,
  "11378 HS": true,
  "11379(A) HS": true,
  "11550(A) HS": true,
  "11364(A) HS": true,
  "23152(A) VC": true,
  "23152(B) VC": true,
  "23153(A) VC": true,
  "23153(B) VC": true,
  "20001(A) VC": true,
  "20002(A) VC": true,
  "12500(A) VC": true,
  "14601.1(A) VC": true,
  "647(B) PC": true,
  "647(E) PC": true,
  "647(F) PC": true,
  "372 PC": true,
  "374.3(A) PC": true,
  "17-12.170(A) SR": true,
  "5652 FG": true,
  "25189.5(A) HS": true,
  "1203.2 PC": true,
  "3056 PC": true,
  "3452 PC": true,
  "166(C)(1) PC": true,
  "166(C)(4) PC": true,
};

export const navLinks = [
  {
    name: "About",
    link: "#work",
  },
  {
    name: "Resources",
    link: "#experience",
  },
  {
    name: "Developer",
    link: "#skills",
  },
];

export const initialSidebarState: SidebarState = {
  Age: false,
  Gender: false,
  Location: false,
  Ethnicity: false,
  Degree: false,
  Charge: false,
};
