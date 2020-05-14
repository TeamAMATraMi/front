import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apprenant} from '../../interfaces/apprenant';
import {StatistiquesService} from '../../services/statistiques.service';

@Component({
  selector: 'app-apprenant-details',
  templateUrl: './apprenant-details.component.html',
  styleUrls: ['./apprenant-details.component.css']
})
export class ApprenantDetailsComponent implements OnInit {

  public sexeLabels: string[] = ['Present', 'Absent'];
  public sexeData: any[] = [];
   public bar = 'bar';
  public doughnut = 'doughnut';
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: false
  };

  public chartColors: any[] = [
    {
      backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2', '#FFFCC4', '#B9E8E0', '#74B2F4',
        '#BE74F4', '#F474A6', '#7474F4', '#74EEF4', '#F4BE74', '#CC045C', '#79EE4E', '#BABF7E']
    }];
  private _apprenant: Apprenant;
  private readonly _modifier$: EventEmitter<Apprenant>;

  constructor(private _statistiquesService: StatistiquesService) {
    this._modifier$ = new EventEmitter<Apprenant>();
    this._apprenant = {} as Apprenant;
  }


  get apprenant(): Apprenant {
    return this._apprenant;
  }

  @Input()
  set apprenant(apprenant: Apprenant) {
    this._apprenant = apprenant;
  }

  @Output('modifier')
  get modifier$(): EventEmitter<Apprenant> {
    return this._modifier$;
  }

  ngOnInit() {
this._statistiquesService.fetchByPresence().subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['Present'], stat['Absent']];
    });
  }

  modifier() {
    this._modifier$.emit(this._apprenant);
  }
	 // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
