//
// Props

//
export interface BeefModelPropType {
  beefRef: any;
}

export interface PlateModelPropType {
  plateRef: any;
}

export interface ProgressiveLogoPropType {
  preLoad: string;
  original: string;
  alt: string;
}

export interface sectionDataType {
  name: Array<string>;
  header: {
    title: Array<string>;
    subTitle: Array<string>;
  };
  imgs?: Array<string>;
  app?: any;
  summary: { name: string; date: string; headCount: number };
  description: string;
  skills: Array<skillType>;
  links: Array<{ icon: string; href: string }>;
}

export interface SectionPropType {
  data: sectionDataType;
}

export interface PhonesPropType {
  sectionRef: any;
}

export interface BeefPropType {
  sectionRef: any;
  setText: Function;
}

export interface FlipCardPropType {
  position?: [number, number, number];
}

export interface FlipLinePropType {
  position?: [number, number, number];
  center?: boolean;
  first?: boolean;
  second?: boolean;
  third?: boolean;
  forth?: boolean;
  fifth?: boolean;
}

export interface TutorialPropType {
  setTutorialActive: Function;
}

export interface HeaderPropType {
  title: any;
  subTitle?: any;
  classes?: Array<string>;
}

export interface ButtonPropType {
  text?: string;
  onClick?: any;
  classes?: Array<string>;
  icon?: string;
  href?: string;
}

export interface NavPropType {}

export interface ToolbarPropType {}

export interface ScrollDownPropType {}

export type skillType =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "TypeScript"
  | "React"
  | "Next"
  | "React Native"
  | "Sass"
  | "Redux"
  | "Three.js"
  | "Firebase"
  | "Netlify"
  | "Illustrator"
  | "Blender";

export interface SkillPropType {
  skill: skillType;
}

export interface HomePropType {}

export interface ProfilePropType {}

export interface ContactPropType {}

export interface FrontPropType {}

export interface PlaceReviewPropType {}

export interface MetaBeefPropType {}

export interface CubePropType {}

export interface GuestBookPropType {
  data: guestBookType;
}

//
// redux
//
export interface ReduxStateType {
  getGuestBook: getGusetBookStateType;
}

export interface getGusetBookStateType {
  data: Array<guestBookType>;
  error: any;
  loading: boolean;
}

export interface getGuestBookStartType {
  type: string;
}

export interface getGuestBookSuccessType {
  type: string;
  data: guestBookType;
}

export interface getGuestBookFailType {
  type: string;
  error: any;
}

export interface setStartType {
  type: string;
}

//
// etc
//
export interface guestBookType {
  id: string;
  name: string;
  pw: string;
  content: string;
  createdAt: number;
  displayIp: string;
  ip: string;
}
