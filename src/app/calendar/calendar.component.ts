import {Component, OnInit, Output, ViewChild} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Cours} from '../shared/interfaces/cours';
import {CoursService} from '../shared/services/cours.service';


import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit{
	private  _cours: Cours[];
	private calendarVisible : boolean;
	private  _calendarEvents : EventInput[]=[];
	private _calendarWeekends : boolean;
	private  _calendarPlugins : any [];
	private   locales : any[];
	private _locale : string;

	@ViewChild('calendar') calendarComponent: FullCalendarComponent; 


constructor(private _coursService : CoursService){
this._cours=[];
}

get calendarEvents : EventInput[]{
  return this._calendarEvents;
}

get locale(): string {
    return this._locale;
  }

  get calendarWeekends(): boolean {
      return this._calendarWeekends;
    }


get calendarPlugins():  any [] {
    return this._calendarPlugins;
  }


ngOnInit(){
this.calendarVisible=true;
this.locales=[frLocale];
this._locale="fr";
this._calendarWeekends=true;
this._calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
 this._coursService.fetch().subscribe((cours: Cours[]) => {
this._cours = cours;
this._cours.forEach(cour =>{
cour.seances.forEach(seance =>{
this._calendarEvents=this.calendarEvents.concat({ title: cour.matiere, start :seance.date+' 10:00'});
});
});
});

   

}
}
