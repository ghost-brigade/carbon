import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

const slideUpAnimation = trigger("slide", [
  state(
    "open",
    style({
      top: 0,
      opacity: 1,
    })
  ),
  state(
    "closed",
    style({
      top: "100%",
      opacity: 0,
    })
  ),
  transition("open <=> closed", [animate("200ms")]),
]);

export default slideUpAnimation;
