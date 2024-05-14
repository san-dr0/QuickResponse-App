import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLOR_LISTS} from './colors';
import { EmergencyEducationalResourcesDTO } from '../types/EmergencyEducationRes.type';

export const DASHBOARD = {
  HOME: {
    name: 'Home-DashBoard',
    headerTitle: 'Home',
    tabBarIcon: (
      <FontAwesome6 name="house" size={25} color={COLOR_LISTS.RED_500} />
    ),
  },
  NEWS_FEEDS: {
    name: 'NewsFeed',
    headerTitle: 'News Feed',
    tabBarIcon: (
      <FontAwesome6 name="newspaper" size={25} color={COLOR_LISTS.YELLOW_600} />
    ),
  },
  ALERTS: {
    name: 'Alerts',
    headerTitle: 'Alerts',
    tabBarIcon: (
      <Feather name="alert-octagon" size={25} color={COLOR_LISTS.AMBER_400} />
    ),
  },
  INBOX: {
    name: 'Inbox',
    headerTitle: 'Inbox',
    tabBarIcon: <Feather name="inbox" size={25} color={COLOR_LISTS.GREEN} />,
  },
  FIRST_AID: {
    name: 'First Aid',
    headerTitle: 'First Aid',
    tabBarIcon: (
      <Fontisto name="first-aid-alt" size={25} color={COLOR_LISTS.RED} />
    ),
  },
  PROFILE: {
    name: 'Profile',
    headerTitle: 'Profile',
    tabBarIcon: (
      <FontAwesome6 name="user-gear" size={25} color={COLOR_LISTS.BLUE_400} />
    ),
  },
  // This was removed in bottom navigation
  FEEDBACK: {
    name: 'Feed & Rate',
    headerTitle: 'Feedback & Rating',
    tabBarIcon: (
      <FontAwesome6 name="microphone" size={25} color={COLOR_LISTS.GREEN} />
    ),
  },
  // This was removed in bottom navigation
  EMERGENCY_LOGS: {
    name: 'E Logs',
    headerTitle: 'Emergency Logs',
    tabBarIcon: <FontAwesome6 name="book" size={25} color={COLOR_LISTS.RED} />,
  },
  SERVICES: {
    name: 'Services',
    headerTitle: 'QRApp Services',
    tabBarIcon: (
      <FontAwesome6 name="sim-card" size={25} color={COLOR_LISTS.AMBER} />
    ),
  },
};

export enum TextAlignmentEnum {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
  AUTO = 'auto',
  JUSTIFY = 'justify',
}

export const STORAGE_KEY = {
  ACTIVE_USER_EMAIL: 'ACTIVE_USER_EMAIL',
  FB_ID: 'FB_ID',
};

export const QRAPP_USER_TYPES = [
  {label: 'User', value: 0},
  {label: 'Responder', value: 1},
];

export const supportingDocuments = 'Upload supporting documents';
export const pleaseProvideSupportingDocuments =
  'Please provide a supporting documents to continue.';
export const pleaseSelectUserType = 'Please select a user type.';
export const pleaseSelectResponderType = 'Please select a responder type.';
export const registrationWasSuccessfull = 'Your registration was successful!';
export const sometingWentWrong = 'Something went wrong';
export const emptyFields = 'Empty fields';
export const yourFeedBackWasValues = 'Your feedback was valued!';
export const RESPONDER_TYPES: {label: string; value: number}[] = [
  {label: 'MEDICAL', value: 0},
  {label: 'POLICE', value: 1},
  {label: 'FIREFIGHTER', value: 2},
  {label: 'RESCUER', value: 3},
];
export const TEMRS_AND_CONDITION = `
For Users:

Users must provide accurate and truthful information during emergencies.
Users are solely responsible for their own safety and well-being.
Users agree to comply with our Privacy Policy regarding their personal information.
For Responders:

Responders agree to provide assistance promptly and to the best of their abilities.
Responders are required to maintain confidentiality regarding user information.
Responders must adhere to ethical standards and guidelines while providing assistance.
`;

export const EMERGENCY_EDUCATIONAL_RESOURCES: EmergencyEducationalResourcesDTO[] = [
  {
    id: 1001,
    title: "Fire Preparedness Guide",
    content: [
      {
        subTitle: "Create a Plan:",
        subContent: "Develop a fire evacuation plan for your household or workplace. Include multiple escape routes from each room and designate a meeting point outside."
      },
      {
        subTitle: "Install Smoke Alarms: ",
        subContent: "Ensure smoke alarms are installed on every level of your home and inside each bedroom. Test them monthly and replace batteries annually. "
      },
      {
        subTitle: "Fire Extinguishers: ",
        subContent: "Keep fire extinguishers in key locations, such as the kitchen, garage, and near fireplaces. Learn how to use them properly."
      },
      {
        subTitle: "Clear Flammable Debris: ",
        subContent: "Remove dead vegetation, leaves, and other flammable materials from around your home or building. Keep your gutters clean to prevent the buildup of dry leaves and debris."
      },
      {
        subTitle: "Maintain Fireplaces and Chimneys: ",
        subContent: "Have chimneys and flues inspected and cleaned annually. Dispose of fireplace ashes in a metal container and store them away from the house."
      },
      {
        subTitle: "Create Defensible Space: ",
        subContent: "Create a defensible space around your home by clearing vegetation and creating a buffer zone. Trim trees and bushes, and keep grass mowed short."
      },
      {
        subTitle: "Emergency Contacts: ",
        subContent: "Keep a list of emergency contact numbers handy, including local fire departments, police, and medical services."
      },
      {
        subTitle: "Emergency Supplies Kit: ",
        subContent: "Prepare an emergency supplies kit that includes essentials such as water, non-perishable food, flashlights, batteries, a first aid kit, and important documents."
      },
      {
        subTitle: "Stay Informed: ",
        subContent: "Pay attention to weather conditions and fire danger alerts in your area. Stay informed through local news, weather apps, or emergency notification systems."
      },
      {
        subTitle: "Practice Fire Safety: ",
        subContent: "Be cautious with fire-related activities such as cooking, grilling, smoking, and using candles. Never leave these items unattended, and ensure they are fully extinguished when not in use."
      },
      {
        subTitle: "Evacuation Drill: ",
        subContent: "Conduct regular fire drills with your household or employees to practice evacuation procedures. Make sure everyone knows their roles and responsibilities."
      },
      {
        subTitle: "Community Resources: ",
        subContent: "Familiarize yourself with community resources such as evacuation shelters and emergency assistance programs."
      },
      {
        subTitle: "PS: ",
        subContent: "Remember, being prepared is key to staying safe in the event of a fire. Review and update your fire preparedness plan regularly to ensure it remains effective. "
      },
    ]
  },
  {
    id: 2001,
    title: "Earthquake Preparedness Guide",
    content: [
      {
        subTitle: "Educate Yourself: ",
        subContent: "Learn about earthquakes, their causes, and how they can affect your area. Understand the potential risks and hazards associated with earthquakes, such as ground shaking, tsunamis (if you live near the coast), landslides, and building collapse."
      },
      {
        subTitle: "Create a Family Emergency Plan: ",
        subContent: "Develop a family emergency plan that includes evacuation routes, meeting points, and communication strategies. Make sure all family members know what to do in case of an earthquake, including how to drop, cover, and hold on during shaking."
      },
      {
        subTitle: "Secure Your Home: ",
        subContent: "Take steps to secure your home and minimize hazards. Anchor heavy furniture and appliances to walls, secure tall furniture and bookcases, and store heavy or breakable items on lower shelves."
      },
      {
        subTitle: "Emergency Supplies Kit: ",
        subContent: "Prepare an emergency supplies kit with essential items to sustain you and your family for at least 72 hours. Include water, non-perishable food, first aid supplies, medications, flashlights, batteries, a portable radio, blankets, and important documents."
      },
      {
        subTitle: "Identify Safe Spaces: ",
        subContent: "Identify safe spaces in your home, workplace, and other locations you frequent. These spaces should provide protection from falling objects and debris during an earthquake, such as under sturdy tables or desks."
      },
      {
        subTitle: "Know How to Shut Off Utilities",
        subContent: "Learn how to shut off utilities such as gas, water, and electricity in case of a leak or damage. Keep necessary tools, such as wrenches or pliers, readily accessible for shutting off utilities if needed."
      },
      {
        subTitle: "Practice Earthquake Drills: ",
        subContent: "Conduct regular earthquake drills with your family or coworkers to practice drop, cover, and hold on procedures. Review your emergency plan and make adjustments as needed based on the drill."
      },
      {
        subTitle: "Stay Informed: ",
        subContent: "Stay informed about earthquake risks and preparedness measures in your area. Monitor seismic activity and updates from local authorities, and sign up for emergency alerts and notifications to receive timely information during an earthquake."
      },
      {
        subTitle: "Secure Hazardous Materials: ",
        subContent: "Secure hazardous materials in your home, workplace, or other locations to prevent spills or leaks during an earthquake. Follow safety guidelines for storing and handling hazardous materials, and take appropriate precautions to minimize risks."
      },
      {
        subTitle: "Assess and Mitigate Risks: ",
        subContent: "Identify potential hazards in your surroundings, such as tall buildings, bridges, or unstable slopes. Take steps to mitigate risks by reinforcing buildings, retrofitting structures, and avoiding construction in high-risk areas."
      },
      {
        subTitle: "Community Engagement: ",
        subContent: "Get involved in community preparedness efforts, such as neighbourhood emergency response teams or local disaster planning committees. Work together with your neighbours to share resources, support each other during emergencies, and build a resilient community."
      },
      {
        subTitle: "PS: ",
        subContent: "By taking proactive steps to prepare for earthquakes and staying informed about risks and hazards, you can better protect yourself, your family, and your community during seismic events. Regularly review and update your earthquake preparedness plan to ensure it remains effective and relevant to your needs."
      },
    ]
  },
  {
    id: 3001,
    title: "Flood Preparedness Guide",
    content: [
      {
        subTitle: "Know Your Risk: ",
        subContent: "Understand the flood risk in your area. Research flood maps, historical flood data, and information from local authorities to determine if your home or workplace is in a flood-prone zone."
      },
      {
        subTitle: "Create an Emergency Plan: ",
        subContent: "Develop a flood evacuation plan for your household or workplace. Identify evacuation routes, safe locations, and a communication strategy for contacting family members or co-workers."
      },
      {
        subTitle: "Pack an Emergency Kit: ",
        subContent: "Prepare an emergency supplies kit that includes essentials such as water, non-perishable food, first aid supplies, flashlights, batteries, a portable radio, medications, important documents, and clothing."
      },
      {
        subTitle: "Stay Informed: ",
        subContent: "Monitor weather forecasts and flood warnings issued by local authorities. Sign up for emergency alerts and notifications to stay informed about flood risks in your area."
      },
      {
        subTitle: "Protect Your Property: ",
        subContent: "Take proactive measures to protect your property from flood damage. Install flood barriers, such as sandbags or flood gates, around vulnerable areas of your home or building. Elevate electrical appliances, heating systems, and valuable items above potential flood levels."
      },
      {
        subTitle: "Secure Utilities: ",
        subContent: "Learn how to safely shut off utilities such as electricity, gas, and water in case of flooding. Keep necessary tools, such as wrenches or pliers, readily accessible for shutting off utilities if needed."
      },
      {
        subTitle: "Move Valuables to Higher Ground: ",
        subContent: "Store important documents, photographs, and valuables in waterproof containers or move them to higher floors to protect them from flood damage."
      },
      {
        subTitle: "Evacuation Planning: ",
        subContent: "Familiarize yourself with evacuation routes and emergency shelters in your area. Follow evacuation orders issued by local authorities, and evacuate early if instructed to do so."
      },
      {
        subTitle: "Community Resources: ",
        subContent: "Know the location of emergency shelters, evacuation centers, and community resources available to flood victims. Stay connected with neighbours and community organizations for support during and after a flood."
      },
      {
        subTitle: "After the Flood: ",
        subContent: "After a flood, wait for authorities to declare it safe before returning to your home or workplace. Assess and document any flood damage for insurance purposes, and take steps to clean and disinfect affected areas to prevent mold and other health hazards."
      },
      {
        subTitle: "PS: ",
        subContent: "By taking proactive measures and staying informed, you can better prepare yourself and your family or co-workers for the potential impacts of flooding. Review and update your flood preparedness plan regularly to ensure it remains effective."
      }
    ]
  },
  {
    id: 4001,
    title: "Accident Preparedness Guide",
    content: [
      {
        subTitle: "First Aid Kit: ",
        subContent: "Have a well-stocked first aid kit readily available at home, in your car, and at your workplace. Include items such as bandages, antiseptic wipes, adhesive tape, scissors, tweezers, pain relievers, and any necessary medications."
      },
      {
        subTitle: "CPR and First Aid Training: ",
        subContent: "Learn basic first aid and CPR (Cardiopulmonary Resuscitation) techniques. Consider taking a certified first aid course to gain practical skills and knowledge for responding to emergencies."
      },
      {
        subTitle: "Emergency Action Plan: ",
        subContent: "Develop an emergency action plan for your household or workplace. Identify potential hazards, evacuation routes, and emergency procedures for various types of accidents or disasters."
      },
      {
        subTitle: "Fire Safety: ",
        subContent: "Implement fire safety measures, such as installing smoke detectors, fire extinguishers, and carbon monoxide alarms. Conduct fire drills regularly to practice evacuation procedures."
      },
      {
        subTitle: "Home Safety Checks: ",
        subContent: "Conduct regular safety checks of your home or living space to identify and address potential hazards. Secure heavy furniture, use non-slip mats in bathrooms, and install handrails on staircases to prevent falls."
      },
      {
        subTitle: "Car Safety: ",
        subContent: "Maintain your vehicle in good working condition by scheduling regular maintenance checks. Keep an emergency kit in your car, including items like a flashlight, jumper cables, reflective triangles, and a spare tire."
      },
      {
        subTitle: "Safe Driving Practices: ",
        subContent: "Practice safe driving habits, such as wearing seat belts, obeying speed limits, avoiding distractions (e.g., texting while driving), and never driving under the influence of alcohol or drugs."
      },
      {
        subTitle: "Water Safety: ",
        subContent: "If you have a pool or live near water, ensure proper safety measures are in place, such as installing fences, pool covers, and safety alarms. Learn CPR and basic water rescue techniques if you'll be spending time around water."
      },
      {
        subTitle: "Workplace Safety: ",
        subContent: "Follow safety protocols and procedures in your workplace to prevent accidents and injuries. Use personal protective equipment (PPE) as required, and report any safety concerns or hazards to your employer."
      },
      {
        subTitle: "Child Safety: ",
        subContent: "Take steps to childproof your home and create a safe environment for children. Keep hazardous substances out of reach, install safety gates on stairs, and supervise young children around water and other potential dangers."
      },
      {
        subTitle: "Stay Calm and Assess the Situation: ",
        subContent: "In the event of an accident or emergency, stay calm and assess the situation before taking action. Follow your emergency action plan, administer first aid if needed, and seek help from emergency services as necessary."
      },
      {
        subTitle: "PS: ",
        subContent: "By being prepared and taking proactive measures, you can reduce the risk of accidents and injuries in your home, workplace, and community. Regularly review and update your accident preparedness plan to ensure it remains effective and relevant to your needs."
      },
    ]
  },
  {
    id: 5001,
    title: "Typhoon Preparedness Guide",
    content: [
      {
        subTitle: "Stay Informed: ",
        subContent: "Monitor weather forecasts and updates from official sources such as the National Weather Service or your country's meteorological agency. Pay attention to typhoon warnings, storm tracks, and evacuation advisories."
      },
      {
        subTitle: "Emergency Supplies Kit: ",
        subContent: "Prepare an emergency supplies kit with essentials to sustain you and your family for several days. Include items such as non-perishable food, bottled water, medications, first aid supplies, flashlights, batteries, a portable radio, blankets, and important documents."
      },
      {
        subTitle: "Secure Your Property: ",
        subContent: "Take proactive measures to secure your home against strong winds and heavy rainfall. Reinforce windows and doors, trim trees and shrubs, and secure outdoor furniture and loose objects that could become projectiles in high winds."
      },
      {
        subTitle: "Evacuation Plan: ",
        subContent: "Develop a typhoon evacuation plan for your household. Identify evacuation routes, safe shelters, and assembly points in your area. Follow evacuation orders issued by local authorities and evacuate early if necessary."
      },
      {
        subTitle: "Communication Plan: ",
        subContent: "Establish a communication plan with family members and loved ones to stay connected during a typhoon. Designate an out-of-town contact person as a central point of contact and share contact information with all family members.",
      },
      {
        subTitle: "Power Outage Preparedness: ",
        subContent: "Prepare for potential power outages by charging electronic devices, using surge protectors, and having alternative lighting sources such as flashlights, lanterns, or candles (use caution with open flames).",
      },
      {
        subTitle: "Water Safety: ",
        subContent: "Avoid flooded areas and stay away from fast-flowing rivers or streams during a typhoon. Be cautious of contaminated water sources and use bottled water or boil water for drinking and cooking if necessary.",
      },
      {
        subTitle: "Pet Preparedness: ",
        subContent: "Make arrangements to ensure the safety of your pets during a typhoon. Have pet supplies, food, medications, and carriers ready, and consider their safety when making evacuation plans.",
      },
      {
        subTitle: "Stay Indoors: ",
        subContent: "Stay indoors during the height of the typhoon and avoid unnecessary travel. Listen to updates from local authorities and shelter in a safe location, away from windows and doors.",
      },
      {
        subTitle: "After the Typhoon: ",
        subContent: "After the typhoon passes, wait for authorities to declare it safe before venturing outside. Be cautious of downed power lines, flooded areas, and debris. Assess any damage to your property and prioritize safety when cleaning up.",
      },
      {
        subTitle: "Community Support: ",
        subContent: "Offer assistance to neighbours, especially those who may need help with evacuation or recovery efforts. Stay connected with your community and support local relief efforts if possible.",
      },
      {
        subTitle: "PS: ",
        subContent: "By following these guidelines and staying prepared, you can reduce the risk of harm to yourself and your loved ones during a typhoon and better cope with its impacts. Regularly review and update your typhoon preparedness plan to ensure it remains effective and relevant to your needs.",
      },
    ]
  },
  {
    id: 6001,
    title: "Medical Preparedness Guide",
    content: [
      {
        subTitle: "First Aid Kit: ",
        subContent: "Keep a well-stocked first aid kit at home, in your car, and at your workplace. Include items such as bandages, gauze pads, adhesive tape, antiseptic wipes, scissors, tweezers, thermometer, pain relievers, and any necessary medications (e.g., EpiPen for allergies)."
      },
      {
        subTitle: "CPR and First Aid Training: ",
        subContent: "Learn basic first aid and CPR techniques. Consider taking a certified first aid course to gain practical skills and confidence in responding to medical emergencies."
      },
      {
        subTitle: "Medication Supply: ",
        subContent: "Ensure an adequate supply of prescription medications and over-the-counter remedies for common ailments. Keep medications organized and check expiration dates regularly. Consider having a backup supply in case of emergencies."
      },
      {
        subTitle: "Emergency Action Plan: ",
        subContent: "Develop an emergency action plan for medical emergencies. Identify potential risks, such as allergic reactions or chronic conditions, and outline specific steps for responding to each scenario."
      },
      {
        subTitle: "Special Needs: ",
        subContent: "If you or a family member has special medical needs, such as mobility issues or a disability, make necessary accommodations to ensure safety and accessibility during emergencies."
      },
      {
        subTitle: "Healthy Lifestyle: ",
        subContent: "Maintain a healthy lifestyle by eating a balanced diet, staying physically active, managing stress, getting enough sleep, and avoiding harmful habits such as smoking and excessive alcohol consumption. These practices can help prevent or manage many medical conditions."
      },
      {
        subTitle: "PS: ",
        subContent: "By taking proactive steps to prepare for medical emergencies, you can better protect yourself and your loved ones and improve your ability to respond effectively in stressful situations. Regularly review and update your medical preparedness plan to ensure it remains relevant and effective for your needs."
      }
    ]
  }
];

export const DEFAULT_COORDINATES = {
  latitude: 10.2975,
  longitude: 123.897,
}; // this will POINT TO UC
