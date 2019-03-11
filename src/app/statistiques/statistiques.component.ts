import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {StatistiquesService} from '../shared/services/statistiques.service';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material';
import {forEach} from '@angular/router/src/utils/collection';
import {Groupe} from '../shared/interfaces/groupe';


@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {


  constructor(private _statistiquesService: StatistiquesService, private _sitesService: SitesService, private _router: Router) {}

  private _sexeLabels: Map<string, string[]> = new Map();
  private _sexeData: Map<string, number[]> = new Map();
  private _nationaliteLabels: Map<string, string[]> = new Map();
  private _nationaliteData: Map<string, number[]> = new Map();
  private _ageLabels: Map<string, string[]> = new Map();
  private _ageData: Map<string, number[]> = new Map();
  private _siteLabels: Map<string, string[]> = new Map();
  private _siteData: Map<string, number[]> = new Map();
  public _sejourLabels: Map<String, String[]> = new Map();
  public _sejourData: Map<String, number[]> = new Map();

  /*
  public niveauLangueLabels: Map<String, String[]> = new Map();
  public niveauLangueData: Map<String, number[]> = new Map();
  public niveauScolLabels: Map<String, String[]> = new Map();
  public niveauScolData: Map<String, number[]> = new Map();
  public quartierPrioLabels: Map<String, String[]> = new Map();
  public quartierPrioData: Map<String, number[]> = new Map();
  public bar = 'bar';
  */

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
  public _sites: Site[];
  public tmpL: string[] = [];
  public tmpD: number[] = [];

  private _site: string;


  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  get site(): string {
    return this._site;
  }

  get sexeData(): number[] {
    return this._sexeData.get(this._site);
  }

  get sexeLabels(): string[] {
    return this._sexeLabels.get(this._site);
  }

  get nationaliteData(): number[] {
    return this._nationaliteData.get(this._site);
  }

  get nationaliteLabels(): string[] {
    return this._nationaliteLabels.get(this._site);
  }

  get ageData(): number[] {
    return this._ageData.get(this._site);
  }

  get ageLabels(): string[] {
    return this._ageLabels.get(this._site);
  }

  get siteData(): number[] {
    return this._siteData.get('all');
  }

  get siteLabels(): string[] {
    return this._siteLabels.get('all');
  }

  ngOnInit() {
    this._site = 'all';
    this._sexeLabels.set(this._site, ['Hommes', 'Femmes']);
    this._sexeData.set(this._site, []);

    this._ageData.set('all', []);
    this._ageLabels.set('', []);

    this._nationaliteData.set('all', []);
    this._nationaliteLabels.set('', []);

    this._siteData.set('all', []);
    this._siteLabels.set('', []);

    this._sitesService.fetch().subscribe((sites: Site[]) => {
      this._sites = sites;
      this._sites.forEach((current_site) => {
        this._statistiquesService.fetchByNationalite(current_site.ville).subscribe((stat: Map<string, number>) => {
          for (let i = 0; i < Object.keys(stat).length; i++) {
            this.tmpL.push(Object.keys(stat)[i]);
          }
          this._nationaliteLabels.set(current_site.ville, Array.from(this.tmpL));
          this._nationaliteData.set(current_site.ville, Object.values(stat));
          this.tmpL = [];
        });
      });

    });

    this._statistiquesService.fetchBySexe().subscribe((stat: Map<string, number>) => {
      this._sexeData.set('all', [stat['M'], stat['F']]);
    });

    this._statistiquesService.fetchByAge().subscribe( (stat: Map<string, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.tmpL.push(Object.keys(stat)[i]);
      }

      this._ageLabels.set('all', Array.from(this.tmpL));
      this._ageData.set('all', Object.values(stat));
      this.tmpL = [];
    });

    this._statistiquesService.fetchByNationalite('all').subscribe((stat: Map<string, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.tmpL.push(Object.keys(stat)[i]);
      }
      this._nationaliteLabels.set(this._site, Array.from(this.tmpL));
      this._nationaliteData.set(this._site, Object.values(stat));
      this.tmpL = [];
    });

    this._statistiquesService.fetchBySite().subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.tmpL.push(Object.keys(stat)[i]);
      }
      this._siteLabels.set('all', Array.from(this.tmpL));
      this._siteData.set('all', Object.values(stat));
      this.tmpL = [];
    });


    this._statistiquesService.fetchBySejour('all').subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.tmpL.push(Object.keys(stat)[i]);
      }
      this.sejourLabels.set('all', Array.from(this.tmpL));
      this.sejourData.set('all', Object.values(stat));
      this.tmpL = [];
    });

      /*

          this._statistiquesService.fetchByQuartierPrio('all').subscribe((stat: Map<String, number>) => {
            for (let i = 0; i < Object.keys(stat).length; i++) {
              this.tmpL.push(Object.keys(stat)[i]);
            }
            this.quartierPrioLabels.set('all', Array.from(this.tmpL));
            this.quartierPrioData.set('all', Object.values(stat));
            this.tmpL = [];
          });

          this._statistiquesService.fetchByNiveauScol('all').subscribe((stat: Map<number, number>) => {
            for (let i = 0; i < Object.keys(stat).length; i++) {
              this.tmpL.push(Object.keys(stat)[i]);
            }
            this.niveauScolLabels.set('all', Array.from(this.tmpL));
            this.niveauScolData.set('all', Object.values(stat));
            this.tmpL = [];
          });

          this._statistiquesService.fetchByStatutPro('all').subscribe((stat: Map<String, number>) => {
          });

          this._statistiquesService.fetchByPriseCharge('all').subscribe((stat: Map<number, number>) => {
          });

          this._statistiquesService.fetchByNiveauLangue('all').subscribe((stat: Map<String, number>) => {
            for (let i = 0; i < Object.keys(stat).length; i++) {
              this.tmpL.push(Object.keys(stat)[i]);
            }
            this.niveauLangueLabels.set('all', Array.from(this.tmpL));
            this.niveauLangueData.set('all', Object.values(stat));
            this.tmpL = [];
          });
      */
/*    this._sitesService.fetch().subscribe((sites: Site[]) => {
      this._sites = sites;
      this._sites.forEach((sit) => {
        this._statistiquesService.fetchByNationalite(sit.ville).subscribe((stat: Map<String, number>) => {
          for (let i = 0; i < Object.keys(stat).length; i++) {
            this.tmpL.push(Object.keys(stat)[i]);
          }
          this.nationaliteLabels.set(sit.ville, Array.from(this.tmpL));
          this.nationaliteData.set(sit.ville, Object.values(stat));
          this.tmpL = [];
        });

        this._statistiquesService.fetchBySejour(sit.ville).subscribe((stat: Map<String, number>) => {
          for (let i = 0; i < Object.keys(stat).length; i++) {
            this.tmpL.push(Object.keys(stat)[i]);
          }
          this.sejourLabels.set(sit.ville, Array.from(this.tmpL));
          this.sejourData.set(sit.ville, Object.values(stat));
          this.tmpL = [];
        });

        this._statistiquesService.fetchByQuartierPrio(sit.ville).subscribe((stat: Map<String, number>) => {
          for (let i = 0; i < Object.keys(stat).length; i++) {
            this.tmpL.push(Object.keys(stat)[i]);
          }
          this.quartierPrioLabels.set(sit.ville, Array.from(this.tmpL));
          this.quartierPrioData.set(sit.ville, Object.values(stat));
          this.tmpL = [];
        });

        this._statistiquesService.fetchByNiveauScol(sit.ville).subscribe((stat: Map<number, number>) => {
          for (let i = 0; i < Object.keys(stat).length; i++) {
            this.tmpL.push(Object.keys(stat)[i]);
          }
          this.niveauScolLabels.set(sit.ville, Array.from(this.tmpL));
          this.niveauScolData.set(sit.ville, Object.values(stat));
          this.tmpL = [];
        });

        this._statistiquesService.fetchByStatutPro(sit.ville).subscribe((stat: Map<String, number>) => {
        });

        this._statistiquesService.fetchByPriseCharge(sit.ville).subscribe((stat: Map<number, number>) => {
        });

        this._statistiquesService.fetchByNiveauLangue(sit.ville).subscribe((stat: Map<String, number>) => {
          for (let i = 0; i < Object.keys(stat).length; i++) {
            this.tmpL.push(Object.keys(stat)[i]);
          }
          this.niveauLangueLabels.set(sit.ville, Array.from(this.tmpL));
          this.niveauLangueData.set(sit.ville, Object.values(stat));
          this.tmpL = [];
        });
      });
    });*/
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public get sites() : Site[] {
    return this._sites;
  }

  public tabChanged(event: MatTabChangeEvent) {
    this._site = event.tab.textLabel;
    const clone = JSON.parse(JSON.stringify(this._nationaliteData));
    //clone[0].data = data;
    //this._nationaliteData = data;
    //console.log(event.tab.textLabel);
  }


/*  public changeData(event) {
    this.niveauLangueLabels = [];
    this.niveauLangueData = [];
    this.niveauScolLabels = [];
    this.niveauLangueData = [];
    this.quartierPrioLabels = [];
    this.quartierPrioData = [];
    this.sejourLabels = [];
    this.sejourData = [];
    this.nationaliteData = [];
    this.nationaliteLabels = [];
    this._statistiquesService.fetchByNationalite(event.tab.textLabel).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);
      }
      this.nationaliteData = Object.values(stat);
    });

    this._statistiquesService.fetchBySejour(event.tab.textLabel).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

    this._statistiquesService.fetchByQuartierPrio(event.tab.textLabel).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });

    this._statistiquesService.fetchByNiveauScol(event.tab.textLabel).subscribe((stat: Map<number, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauScolLabels.push(Object.keys(stat)[i]);
      }
      this.niveauScolData = Object.values(stat);
    });

    this._statistiquesService.fetchByStatutPro(event.tab.textLabel).subscribe((stat: Map<String, number>) => {
    });

    this._statistiquesService.fetchByPriseCharge(event.tab.textLabel).subscribe((stat: Map<number, number>) => {
    });

    this._statistiquesService.fetchByNiveauLangue(event.tab.textLabel).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauLangueLabels.push(Object.keys(stat)[i]);
      }
      this.niveauLangueData = Object.values(stat);
    });
  }
*/
}
