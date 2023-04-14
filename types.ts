import { StaticImageData } from "next/image";
import { ReactElement, RefObject } from "react";

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

export interface projectDataType {
  name: Array<string>;
  icon?: StaticImageData;
  header: {
    title: Array<string>;
    subTitle: Array<string>;
  };
  imgs?: Array<StaticImageData>;
  summary: { name: string; date: string; headCount: number };
  description: string;
  skills: Array<skillType>;
  links: {
    github: string;
    velog?: string;
    project?: { icon: string; href: string };
  };
  testAccount?: {
    id: string;
    pw: string;
  };
}

export interface ScrollIndicatorPropType {
  homeContainerRef: RefObject<HTMLDivElement>;
}

export interface SectionPropType {
  data: projectDataType;
  children?: ReactElement;
}

export interface PhonesPropType {
  containerRef: any;
  stickyElRef: any;
}

export interface BeefPropType {
  containerRef: any;
  stickyElRef: any;
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
  | "Blender"
  | "Tailwindcss"
  | "Vercel"
  | "React Query";

export interface SkillPropType {
  skill: skillType;
  disableAnimation?: boolean;
}

export interface InitLoadingPropType {
  init: boolean;
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

export interface ReduxStateType {
  getGuestBook: getGusetBookStateType;
  getToken: getTokenStateType;
}

export interface TokenDataType {
  list: Array<string>;
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

export interface getTokenStateType {
  data: TokenDataType;
  error: any;
  loading: boolean;
}

export interface getTokenStartType {
  type: string;
}

export interface getTokenSuccessType {
  type: string;
  data: TokenDataType;
}

export interface getTokenFailType {
  type: string;
  error: any;
}

export interface setStartType {
  type: string;
}

export interface guestBookType {
  id: string;
  name: string;
  pw: string;
  content: string;
  createdAt: number;
  displayIp?: string;
  ip?: string;
}

export interface styleType {
  duration?: number;
  ease?: string;
  translateX?: string | number;
  translateY?: string | number;
  scale?: string | number;
  clipPath?: string | number;
  opacity?: number;
}
