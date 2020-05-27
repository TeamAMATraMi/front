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
	private  calendarEvents : EventInput[]=[];
	private calendarWeekends : boolean;
	private  calendarPlugins : any [];
	private   locales : any[];
	private  locale :string;
	@ViewChild('calendar') calendarComponent: FullCalendarComponent; 


constructor(private _coursService : CoursService){
this._cours=[];
}

ngOnInit(){
this.calendarVisible=true;
this.locales=[frLocale];
this.locale="fr";
this.calendarWeekends=true;
this.calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
 this._coursService.fetch().subscribe((cours: Cours[]) => {
this._cours = cours;
this._cours.forEach(cour =>{
cour.seances.forEach(seance =>{
this.calendarEvents=this.calendarEvents.concat({ title: cour.matiere, start :seance.date+' 10:00'});
});
});
});

   

}
}
