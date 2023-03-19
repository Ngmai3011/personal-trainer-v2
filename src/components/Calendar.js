import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import {useContext} from "react";
import moment from "moment";
import {TrainingContext} from "./TrainingContext";

export default function Calendar() {
  const {data} = useContext(TrainingContext);

  const events = data.map((value) => ({
    start: moment(value.date)._d,
    end: moment(value.date).add(value.duration, "m")._d,
    title: `${value.activity} / ${value.customer.firstname} ${value.customer.lastname}`,
  }));

  return (
    <div
      style={{
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "24px",
      }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventColor="#8322ce"
        headerToolbar={{
          left: "title",
          center: "prev,next today",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
}
