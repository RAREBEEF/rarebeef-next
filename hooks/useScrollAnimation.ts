import { styleType } from "../types";
import gsap from "gsap";

const useScrollAnimation = () => {
  return class Animation {
    targets: Array<HTMLElement>;
    initStyle: styleType;
    defaultStyle: styleType;

    constructor(
      targets: Array<HTMLElement>,
      defaultStyle: styleType,
      initStyle: styleType
    ) {
      this.targets = targets;
      this.initStyle = initStyle;
      this.defaultStyle = defaultStyle;
    }

    setStyle(style: styleType) {
      this.targets.forEach((target) => {
        gsap.to(target, {
          ...style,
        });
      });
    }
    setInit() {
      if (!this.initStyle) return;
      this.setStyle(this.initStyle);
    }
    setDefault() {
      this.setStyle(this.defaultStyle);
    }
    startAnimation(style: styleType) {
      this.setStyle({
        ...style,
      });
    }
  };
};

export default useScrollAnimation;
