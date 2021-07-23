import { EpisodesService } from './../../shared/services/episodes.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-episodes-page',
  templateUrl: './episodes-page.component.html',
  styleUrls: ['./episodes-page.component.scss']
})
export class EpisodesPageComponent implements OnInit {

  episodes: any;

  currentPage = 1;

  functionActive = true;

  episodeDetail: any;
  episodeDetailActive = false;

  constructor(private episodesService: EpisodesService) { }

  ngOnInit(): void {
    this.episodesService.getEpisodes().subscribe((res: any) => {
      this.episodes = res.results;
      console.log(res);
    });
  }

  onScroll(): void{
  console.log('scrolled');
  this.episodesService.getEpisodes(this.currentPage + 1).subscribe((res: any) => {
    const newEpisodes = res.results;
    this.episodes = this.episodes.concat(newEpisodes);
    this.episodes.length - 1 ? this.currentPage++ : this.currentPage = this.currentPage;
    this.episodes.count === 41 ? this.functionActive = false : this.functionActive = true;
    console.log(newEpisodes);
  });
}

  showDetail(url): void{
    this.episodesService.getDetail(url).subscribe((res: any) => {
      this.episodeDetail = res;
      this.episodeDetailActive = true;
      console.log(res);
    });
  }
}
