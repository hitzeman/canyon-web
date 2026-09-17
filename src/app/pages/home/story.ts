import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-story',
  imports: [RouterLink],
  templateUrl: './story.html',
})
export class Story {
  protected readonly stats = [
    { value: '40', label: 'Shirts per drop' },
    { value: '2017', label: 'Founded' },
    { value: '4', label: 'People total' },
    { value: '100%', label: 'Cotton heavyweight' },
  ];
}
