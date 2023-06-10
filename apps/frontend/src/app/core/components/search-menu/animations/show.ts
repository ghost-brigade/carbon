import {
  trigger,
  state,
  style,
  transition,
  sequence,
  query,
  animateChild,
} from "@angular/animations";

const showAnimation = trigger("show", [
  state("shown", style({ display: "block" })),
  state(
    "hidden",
    style({
      display: "none",
    })
  ),
  transition("shown => hidden", [sequence([query("@slide", animateChild())])]),
]);

export default showAnimation;
