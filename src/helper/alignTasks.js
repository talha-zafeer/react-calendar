import { convertTime } from "./convertTime";
// import { listenForOverlap } from "element-overlap";

var listenForOverlap = require("element-overlap").listenForOverlap;

const elementsOverlap = (el1, el2) => {
  const event1 = el1.getBoundingClientRect();
  const event2 = el2.getBoundingClientRect();

  // console.log("Event 1 : ", el1, event1);
  // console.log("Event 2 : ", el2, event2);

  return !(
    event1.top > event2.bottom ||
    event1.bottom < event2.top ||
    event1.right < event2.left ||
    event1.left > event2.right
  );
};

const alignTasks = (renderedEvents) => {
  let time, time1, time2;
  renderedEvents.sort((a, b) => (a.startAt < b.startAt ? -1 : 1));

  // console.log(renderedEvents);

  for (let i = 0; i < renderedEvents.length; i++) {
    for (let j = i + 1; j < renderedEvents.length; j++) {
      time1 = renderedEvents[i].parentElement.children[0].children[0].innerText;
      time2 = renderedEvents[j].children[0].innerText;
      time = convertTime(time1, time2);
      const marginTop = (time[1] - time[0]) * 100 - 9 + "px";
      listenForOverlap(renderedEvents[i], renderedEvents[j], function () {
        document
          .getElementById(renderedEvents[i].parentElement.id)
          .appendChild(renderedEvents[j]);
        renderedEvents[j].style.marginTop = marginTop;
        return true;
      });
    }
  }
};

export { alignTasks };
