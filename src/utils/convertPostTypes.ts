const postToAbrv = {
  "violence & assault": "VA",
  "sexual safety": "SS",
  "children & elderly safety": "CE",
  "theft & burglary": "TB",
  "fraud & scams": "FS",
  "dui / drunk driving": "DD",
  "traffic incidents": "TI",
  "public disturbance": "PD",
  "environmental hazards": "EH",
  "probation & legal alerts": "PL",
  "court orders & legal notices": "CO",
} as const;

const abrvToPost = {
  va: "Violence & Assault",
  ss: "Sexual Safety",
  ce: "Children & Elderly Safety",
  tb: "Theft & Burglary",
  fs: "Fraud & Scams",
  dd: "DUI / Drunk Driving",
  ti: "Traffic Incidents",
  pd: "Public Disturbance",
  eh: "Environmental Hazards",
  pl: "Probation & Legal Alerts",
  co: "Court Orders & Legal Notices",
} as const;

export type postKey = keyof typeof postToAbrv;
export type abrvKey = keyof typeof abrvToPost;

export function getPostType(value: postKey | abrvKey) {
  if (value in postToAbrv) return postToAbrv[value as postKey];
  else if (value in abrvToPost) return abrvToPost[value as abrvKey];

  return undefined;
}
